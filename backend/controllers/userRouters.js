require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../db/models/users')
var mongoose = require('mongoose');
const async = require('hbs/lib/async');

router.get('/:id', (req,res)=>{
    User.findOne({userId: req.params.id})
        .then(data => res.send (JSON.stringify(data)))
        .catch(console.error)
})

router.post('/add', async(req, res) => {  
    const {userId, keys} = req.body
    const existsOnDb = await User.findOne({userId: userId})
    try{
        if (existsOnDb) {
            await User.updateOne({_id: existsOnDb['_id']}, {$push: { progress: keys}})
                return res.send(JSON.stringify({success: true}))
        } else {
            await User.create({userId, progress: keys})
                return res.send(JSON.stringify({success: true}))
        }
    }
    catch(error){
        console.error
    }
});

router.put('/:id/:name', async(req, res) => {
    const {id: userId, name} = req.params;
    let user = await User.findOne({userId})
    const newProgress = []
    const progress = user.progress.find(el => {
        if(el.name !== name){
            newProgress.push(el)
        }
    })
    
    newProgress.push(req.body.progress)
    const updd = await User.findOneAndUpdate({ userId: userId},{progress: newProgress},{new:true})      
        .then((data) => { 
                    return res.send(JSON.stringify({success: true}))
                })
        .catch(console.error)
});

router.delete('/:id/:name', async (req, res) => {
    const {id: userId, name} = req.params;
    let user = await User.findOne({userId})
    const progress = user.progress.find(el => el.name !== name)
    user = {
        ...user._doc,
        progress
    }
    const result = await User.findOneAndReplace({_id: user._id}, user)
    return res.send(JSON.stringify({success: true}))
});

module.exports = router



 