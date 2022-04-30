const express = require('express');
const router = express.Router();
const User = require('../db/models/users')
var mongoose = require('mongoose');


router.get('/:id', (req,res)=>{
    console.log(req.params.id)
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

// router.get('/:id/edit', (req, res) => {
//     const id = req.params.id;
//     User.findById(id)
//         .then(gifs =>  res.render('', gifs))
//         .catch(console.error);
// });

// router.put('/:id', (req, res) => {
//     User.findByIdAndUpdate(req.params.id ,
//         {
//             name: req.body.name,
//             img: req.body.img
//         },
//         { new: true }
//     )
//     .then(() => res.redirect('/gifs'))
//     .catch(console.error);
// });

router.delete('/:id/:name', async (req, res) => {
    const {id: userId, name} = req.params;
    let user = await User.findOne({userId})
    const progress = user.progress.find(el => el.name !== name)
    user = {
        ...user._doc,
        progress
    }

    const result = await User.findOneAndReplace({_id: user._id}, user)
    
    res.send(result)
});

module.exports = router


// ----------exemplos------------
// console.log(req.body)
//     const arrayOfNotes = req.body.arrayOfNotes
//     const {UserName,email, password, picture} = req.body
//     arrayOfNotes.forEach(element => {console.log(element)});
//     const nums = ['I', 'II', 'III']
//     let progress = {}
//     const data =  req.body.arrayOfNotes.map((chords, index) =>{progress[nums[index]]= chords} )
//         console.log(progress)


 