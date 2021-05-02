const express = require('express');
const { verify } = require('jsonwebtoken');

const router = express.Router();
const Post = require('../models/post');
const verifytoken = require('../tokenVerify')


router.get('/allget', verifytoken ,async (req,res) => {
    
    try{

        const posts = await Post.find();
        res.json(posts)

    }catch(err){
        res.json({message:err})
    }
   
});



router.post('/add', verifytoken,async (req,res) => {
     
     const post = new Post ({
         title : req.body.title,
         name : req.body.name
     })

    try{
    const savedone = await post.save()
     
    res.json(savedone);
    } catch(err) {

        res.json({message: err});
    }


   
     
    
});

module.exports = router
