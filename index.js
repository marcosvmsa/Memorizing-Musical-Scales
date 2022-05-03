require('dotenv').config();
const express = require('express');
const config = require('config');
const PORT = process.env.PORT || 4000;

const app  = express();
const cors = require('cors');
const methodOverride = require('method-override')
const loginRouters = require('./backend/controllers/loginRouters')
const mainRouters  = require('./backend/controllers/mainRouters')
const userRouters  = require('./backend/controllers/userRouters')
const signUpRouter  = require('./backend/controllers/signUpRouter')

app.use(express.json());
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use('/',mainRouters);
app.use('/login',loginRouters)
app.use('/user',userRouters)
app.use('/SingUp',signUpRouter)

app.listen(PORT, ()=>{
    console.log(`Runing on Port :  ${PORT}`)
})

