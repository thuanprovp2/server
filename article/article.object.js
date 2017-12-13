/**
 * Created by thuan on 11/22/2017.
 */
var mongoose = require("mongoose");

var ArticleSchema = mongoose.Schema({
        title: String,
        description: String,
        image:String
    }
    ,
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Article', ArticleSchema);