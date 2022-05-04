require('dotenv').config();
const path = require('path')
const express = require('express');
const config = require('config');
const PORT = process.env.PORT || 4000;

const app  = express();
const cors = require('cors');
const methodOverride = require('method-override')
const loginRouters = require('./controllers/loginRouters')
const mainRouters  = require('./controllers/mainRouters')
const userRouters  = require('./controllers/userRouters')
const signUpRouter  = require('./controllers/signUpRouter')

app.use(express.json());
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}));
app.use(cors())
// app.use('/', express.static(path.join(__dirname, '/frontend/views/index.html')))
app.use('/',mainRouters);
app.use('/login',loginRouters)
app.use('/user',userRouters)
app.use('/SingUp',signUpRouter)


app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '/frontend/views/index.html'));
})

app.listen(PORT, ()=>{
    console.log(`Runing on Port :  ${PORT}`)
})