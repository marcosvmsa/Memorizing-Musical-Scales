const mongoose = require('../connection');

const userSchma = new mongoose.Schema(
    {
        userId: String,
        progress:[{}],
    }
);

const User = mongoose.model('user', userSchma);
module.exports = User;