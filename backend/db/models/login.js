const mongoose = require('../connection');

const loginSchma = new mongoose.Schema(
    {
        email:{type: String,required: true, unique: true},
        picture:{type: String},
        password:{type: String,required: true}
    }
);

const Login = mongoose.model('Login', loginSchma);
module.exports = Login;