const mongoose = require('../connection');

const userSchma = new mongoose.Schema(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "Login"},
        progress: {type: mongoose.Schema.Types.Array, of: Object}
    }
);

const User = mongoose.model('user', userSchma);
module.exports = User;