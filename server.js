//NOTES:MONGOOSE http://mongoosejs.com/docs/populate.html DOCUMENTATION. MONGODB https://docs.mongodb.com/manual/tutorial/query-documents/#match-an-array-element

const express = require('express');
const app = express();
const mongoose = require('mongoose'); 
const path = require('path');
const bodyParser = require('body-parser');
const models = require('./models');
const Post = models.Post;
const Author = models.Author;

mongoose.connect('mongodb://localhost/blog-api-nate');

const db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: true }));

//IF /api/posts GET ALL POSTS
app.get('/api/posts',(req,res)=>{
	Post.find({}, (err,data)=>{
		if(err)console.log('error')
		else res.send(data)
			console.log('ALL POSTS WORKING')
	})
})

//IF /api/posts/:id GET A POST BY ID, req.params.id capture id
app.get('/api/posts/:id',(req,res)=>{
	Post.find({_id:req.params.id}, (err,data)=>{
		if(err)console.log('error')
		else res.send(data)
	})
})

//IF /api/posts/sort/by-date GET POSTS BY ORDER DAY
app.get('/api/posts/sort/by-date',(req,res) => {
	Post.find({}).sort({date: 'asc'}).exec((err,data)=> {
		if(err)console.log('error')
			else res.send(data)
	})
})


// //IF api/posts/sort/a-z SORT ALPHABETICALLY BY TITLE, asc 1,2,3..
app.get('/api/post/sort/a-z',(req,res)=>{
	Post.find({}).sort({title: 'asc'}).exec((err,data)=>{
		if(err)console.log('error')
			else res.send(data)
	})
})


//IF  /api/authors GET ALL AUTHORS
app.get('/api/authors',(req,res)=>{
	Author.find({}, (err,data)=> {
		if(err)console.log('error')
			else res.send(data)
	})
})

//IF /api/authors/sort/a-z SORT AUTHORS ALPHABETTICALLY
app.get('/api/authors/sort/a-z',(req,res)=>{
	Author.find({}).sort({name:'asc'}).exec((err,data)=> {
		if(err)console.log('error')
			else res.send(data)
	})
})

//IF /api/authors/:id GET AUTHOR BY ID
app.get('/api/authors/:id', (req,res)=>{
	Author.find({_id:req.params.id}, (err,data)=>{
		if(err)console.log('error')
			else res.send(data) 
	})
})

//IF /api/posts/tags/react  GET ALL BLOGS WITH TAG = REACT
app.get('/api/posts/tags/react', (req,res)=>{
	Post.find({tags:'react'}, (err,data)=>{
		if(err)console.log('error')
			else res.send(data)
	})
})

//IF /api/posts-with-authors get all posts with author's info name,id
//post.find({}) find posts then add author
app.get('/api/posts-with-authors', (req,res)=>{
	Post.find({}).populate('author').exec((err,data)=>{
		if(err)console.log('error')
			else res.send(data)
	})
})

//IF /api/posts POST a new blog post 
app.post('/api/posts',(req,res)=>{
	Post.create(req.body, (err,data)=>{
		if(err)console.log('error')
			else res.send(data)
	})
})

//IF /api/posts/:id DELETE a blog post
app.delete('/api/posts/:id',(req,res)=>{
	Post.remove({_id:req.params.id},(err,data)=>{
		if(err)console.log('error')
			else res.send(data)
	})
})

//IF /api/posts/:id PUT (update) a blog post
app.put('/api/posts/:id',(req,res)=>{
	Post.findOneAndUpdate({_id:req.params.id},req.body,(err,data)=>{
		if(err)console.log('error')
			else res.send(data)
				console.log('update WORKING')
	})
})


db.on('open', () => {
  console.log('db connection opened!');
  app.listen(4321, () => {
    console.log('Listening on port 4321!');
  });
})

db.on('error', () => {
  console.log('error in db connection!');
})
