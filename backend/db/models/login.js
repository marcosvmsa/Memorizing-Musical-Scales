const mongoose = require('../connection');

const loginSchma = new mongoose.Schema(
    {
        UserName:{type: String,required: true},
        email:{type: String,required: true},
        picture:{type: String},
        password:{type: String}
    }
);

const Login = mongoose.model('Login', loginSchma);
module.exports = Login;