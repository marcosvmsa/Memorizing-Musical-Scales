const express = require('express');
const app  = express();
const cors = require('cors');
const methodOverride = require('method-override')
const loginRouters = require('./controllers/loginRouters')
const mainRouters  = require('./controllers/mainRouters')
const userRouters  = require('./controllers/userRouters')
const PORT = process.env.PORT || 4000;

// app.use(express.static(__dirname + '/' + 'public'));
app.use(express.json());
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}));
app.use(cors())
app.use('/',mainRouters);
// app.use('/login',loginRouters)
// app.use('/user',userRouters)

app.listen(PORT, ()=>{
    console.log(`Runing on Port :  ${PORT}`)
})

