const mongoose = require("mongoose");

const topFavSchema = new mongoose.Schema({
    name:String,
    topFavImage:String,
    
});
//export make other file can use
module.exports =  mongoose.model('TopFav', topFavSchema);