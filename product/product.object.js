/**
 * Created by PC on 10/16/2016.
 */
var mongoose = require("mongoose");

var ProductSchema = mongoose.Schema({
        name: String,
        description: String,
        image:String,
        price: Number,
        status: Boolean,
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }
    }
    ,
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Product', ProductSchema);