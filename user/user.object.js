/**
 * Created by Thuan on 10/16/2016.
 */
var mongoose = require('mongoose');
// var user = function () {
//     this.setUser = function (username, password, role_id) {
//         this.username = username;
//         this.password = password;
//         this.role_id = role_id;
//     };
//
//     this.getUser = function () {
//         return {
//             username: this.username, 
//             password: this.password,
//             role_id: this.role_id
//         }
//     }
// };
//xem lai version 
var userSchema = mongoose.Schema({
        username: String,
        password: String,
        address: String,
        phone: String,
        email: String,
        sex: Boolean,
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