const mongoose = require('../connection');
require('')
const userSchma = new mongoose.Schema(
    {
        id:{type: String,required: true, unique: true},
        progress:[{
            I: {type: String},
            II: {type: String},
            III: {type: String},
            VI: {type: String},
            V: {type: String},
            VI: {type: String},
            VII: {type: String},
        }],
    }
);

module.exports = mongoose.model('user', userSchma);