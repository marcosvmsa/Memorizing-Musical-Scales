const express = require('express');
const router = express.Router();
const Chord = require('../db/models/chords')

//
// router.get('/', (req,res)=>{
//     res.render('index')
// })

router.get('/:note', (req,res)=>{
    let note = req.params.note 
    Chord.find({note: note})
        .then(data => {res.json(data)})
        .catch(console.error)
})

module.exports = router;