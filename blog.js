const { response } = require('express');
const express = require('express');
const mongodb = require('mongodb');
const db = require('../data/database');

const ObjectId= mongodb.ObjectId;

const router = express.Router();

router.get('/', function(req, res) {
  res.redirect('/posts');
});

router.get('/posts', async function(req, res) {
  const posts = await db.getDb()
                .collection('posts')
                .find({})
                .project({name:1,price:1,time:1,'author.name':1})
                .toArray();
    res.render('posts-list',{posts : posts});
  // res.render('posts-list');
});

router.get('/search', async function(req, res) {
  const posts = await db.getDb()
                .collection('posts')
                .find({})
                .project({name:1,price:1,time:1,'author.name':1})
                .toArray();
    res.render('search',{posts : posts});
  // res.render('posts-list');
});
router.get('/paracetamol', async function(req, res) {
  const posts = await db.getDb()
                .collection('posts')
                .find({})
                .project({name:1,price:1,time:1,'author.name':1})
                .toArray();
    res.render('paracetamol',{posts : posts});
  // res.render('posts-list');
});
router.get('/ascoril', async function(req, res) {
  const posts = await db.getDb()
                .collection('posts')
                .find({})
                .project({name:1,price:1,time:1,'author.name':1})
                .toArray();
    res.render('ascoril',{posts : posts});
  // res.render('posts-list');
});

router.get('/new-post', async function(req, res) {
  const authors = await db.getDb().collection('authors').find().toArray();
  // console.log(authors);
  res.render('create-post',{ authors : authors});
});

router.get('/new-posts', async function(req, res) {
  const authors = await db.getDb().collection('authors').find().toArray();
  // console.log(authors);
  res.render('create-post',{ authors : authors});
});



router.post('/posts',async function(req, res){
  const authorId = new ObjectId(req.body.author);
  const author = await db.getDb().collection('authors').findOne({_id: authorId});

  const newPost = {
    name: req.body.name,
    price:req.body.price,
    time:req.body.time,
    //body: req.body.content,
    date: new Date(),
    author:{
      id : authorId ,
      name :  author.name,
      link: author.link

    }
  };
 

  const result = await db.getDb().collection ('posts').insertOne(newPost);
  console.log(result);
  res.redirect('/posts');
});

router.get('/posts/:id',async function(req,res){
  const postId = req.params.id;
  const post = await db
                     .getDb()
                     .collection('posts')
                     .findOne({_id: new ObjectId(postId)},{summary: 0});


  if(!post){
    return res.status(404).render('404');
  }
  res.render('post-detail',{post : post})
});


// router.get('/vashu', async function(req, res) {
//   const authors = await db.getDb().collection('authors').find().toArray();
//   // console.log(authors);
//   res.render('post-detail',{ authors : authors});
// });
module.exports = router;