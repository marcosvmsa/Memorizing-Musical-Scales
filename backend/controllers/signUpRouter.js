require('dotenv').config();
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

module.exports = router