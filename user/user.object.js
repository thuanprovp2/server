/**
 * Created by Thuan on 10/16/2016.
 */
var mongoose = require('mongoose');

//xem lai version 
var userSchema = mongoose.Schema({
        username: String,
        password: String,
        name:String,
        address: String,
        phone: String,
        email: String,
        sex: String,
        Birthday: String,
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        }
    }, {
    timestamps:true
}
);

module.exports = mongoose.model('User', userSchema);