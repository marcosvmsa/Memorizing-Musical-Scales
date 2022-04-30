const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();
const Login = require('../db/models/login');

router.post('/register', async (req, res) => {
    const {UserName,email, password, picture} = req.body
    const hashPassword =  await bcrypt.hash(password, saltRounds);
        Login.create({UserName,email,password: hashPassword,picture })
            .then(() => {res.send(JSON.stringify({successful: true}))})
            .catch(console.error)
    
});


        
        
        


// router.post('/', async (req, res) => {
//     const {email, password} = req.body
//     try{
//         const userData =  await Login.findOne({email})
//         const isPasswordValid =  await bcrypt.compare(password, userData.password);
//         if(isPasswordValid){
//             res.send(JSON.stringify({token: true}))        
//         }else{
//             res.send(JSON.stringify({token: false}))      
//         }
//     }catch(error){
//         res.send(JSON.stringify({token: false, error}))
//     }
// })    


module.exports = router