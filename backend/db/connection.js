require('dotenv').config();
const mongoose = require("mongoose")

const mongoURI= process.env.NODE_EVN === 'production'   
? process.env.DB_URL 
: process.env.DEV_DB_URL

mongoose.connect(mongoURI)
    .then(instence =>console.log(`Connected to ${instence.connections[0].name}`))
    .catch(error => console.log(`Failed connection`, error))

module.exports = mongoose;