require('dotenv').config();
const path = require('path')
const express = require('express');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();
const Login = require('../db/models/login');

router.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '/frontend/views/login.html'));
});

router.post('/', async (req, res) => {
    console.log(req.body)
    const {email, password} = req.body
    try{
        const userData =  await Login.findOne({email})            
            const isPasswordValid =  await bcrypt.compare(password, userData.password);
            if(isPasswordValid){
                res.send(JSON.stringify({
                    token: true,
                    userId: userData._id
                }))        
            }else{
                res.send(JSON.stringify({token: false}))      
            }
    }catch(error){
        res.send(JSON.stringify({token: false, error}))
    }
}); 

module.exports = router;