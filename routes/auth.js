const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcript = require('bcryptjs');
const jwt = require('jsonwebtoken');

//validations


// const Joi = require('@hapi/joi');

// const validetionschema = {

//     name : Joi.string().min(6).required(),
//     email: Joi.string().min(6).required().email(),
//     password : Joi.string().min(6).required()
// }


router.post('/register',async (req,res) => {

   //check user already exits

   const emailExitst = await User.findOne({email:req.body.email})

   if(emailExitst) return res.status(400).json({message:"email already exits"})
    
    //password hash
    const bcri = await bcript.genSalt(10);
    const hashpassword = await bcript.hashSync(req.body.password,bcri);

    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashpassword
    });
     
    try {
        const saveduser = await user.save()
        res.json(saveduser);

    }catch(err) {
        res.status(400).json(err);
    }
   
   

});


//login

router.post('/login', async (req,res) => {
     
    const emailExitst = await User.findOne({email:req.body.email})

   if(!emailExitst) return res.status(400).json({message:"email or password invalid"});

   //passwordcheck

   const validpass = await bcript.compareSync(req.body.password,emailExitst.password)

   if(!validpass) return res.status(400).json({message: "invalid username or password"})
   
  //token create
  const token = jwt.sign({_id: emailExitst._id},process.env.TOKEN_SECRET)

   return res.json({message: "successfully login",Token:token})

});

module.exports = router