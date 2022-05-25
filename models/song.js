const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    name:String,
    coverImage:String,
    songFile:String,
    lyric:String,
    artist:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Artist'
        },
        name:String
    },
    likedBy:[
            {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
        ]
    
    
});
//export make other file can use
module.exports =  mongoose.model('Song', songSchema);