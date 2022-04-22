const express = require('express');
const router = express.Router();
const Chord = require('../db/models/chords')


router.get('/', (req, res)=>{
    gifModo.find({})
    .then((cont)=>{res.json(cont)})
    // .then((cont)=>{res.redirect('/gifs', {cont} )})
    .catch(console.error)
})

router.post('/', (req, res) => {
    gifModo.create(req.body)
        .then(gifs => res.redirect('/gifs'))
        .catch(console.error);
});

router.get('/:id/edit', (req, res) => {
    const id = req.params.id;
    gifModo.findById(id)
        .then(gifs =>  res.render('pokes/edit', gifs))
        .catch(console.error);
});

router.put('/:id', (req, res) => {
    gifModo.findByIdAndUpdate(req.params.id ,
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
    gifModo.findOneAndRemove({ _id: id })
        .then(() => res.redirect('/gifs'))
        .catch(console.error);
});

 module.exports = router