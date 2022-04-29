const express = require('express');
const router = express.Router();
const User = require('../db/models/users')



// router.get('/', (req,res)=>{
//     // let note = req.params.note 
//     User.find({})
//         .then(data => {res.json(data)})
//         .catch(console.error)
// })


// router.get('/', (req, res)=>{
//    res.send(res.)
    // .then((cont)=>{res.json(cont)})
    // // .then((cont)=>{res.redirect('/gifs', {cont} )})
    // .catch(console.error)
// })
// router.get('/', (req, res)=>{
//     User.find({})
//     .then((cont)=>{res.json(cont)})
//     // .then((cont)=>{res.redirect('/gifs', {cont} )})
//     .catch(console.error)
// })

router.post('/add', async(req, res) => {  
    console.log(req.body)
    const objeto = req.body
    let userId;
    const progress = new Object()
    for( const [key,value] of Object.entries(objeto)){
        if(key === 'userId'){
            userId = value
        }else{
            progress[key] = value        
        }
    }

    User.findOneAndUpdate({userId: userId},{$push:{ progress: progress}})
        .then(data => {res.send(JSON.stringify({successful: true}))
        .then(
            User.create([{userId: userId, progress: [progress]}])
                .then(() => {res.send(JSON.stringify({successful: true}))})
                .catch(console.error)
        )
        .catch(console.log(error))
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

// router.delete('/:id', (req, res) => {
//     const id = req.params.id;
//     User.findOneAndRemove({ _id: id })
//         .then(() => res.redirect('/gifs'))
//         .catch(console.error);
// });

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


 