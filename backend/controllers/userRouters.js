const express = require('express');
const router = express.Router();
const Chord = require('../db/models/chords')


router.get('/', (req, res)=>{
    Chord.find({})
    .then((cont)=>{res.json(cont)})
    // .then((cont)=>{res.redirect('/gifs', {cont} )})
    .catch(console.error)
})

router.post('/', (req, res) => {
    Chord.create(req.body)
        .then(gifs => res.redirect('/'))
        .catch(console.error);
});

router.get('/:id/edit', (req, res) => {
    const id = req.params.id;
    Chord.findById(id)
        .then(gifs =>  res.render('', gifs))
        .catch(console.error);
});

router.put('/:id', (req, res) => {
    Chord.findByIdAndUpdate(req.params.id ,
        {
            name: req.body.name,
            img: req.body.img
        },
        { new: true }
    )
    .then(() => res.redirect('/gifs'))
    .catch(console.error);
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Chord.findOneAndRemove({ _id: id })
        .then(() => res.redirect('/gifs'))
        .catch(console.error);
});

 module.exports = router