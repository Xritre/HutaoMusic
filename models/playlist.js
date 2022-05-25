const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
    name:String,
    coverImage:String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'Song'
        },
        name:String
    },
    songs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Song'
        },
    ]
});
//export make other file can use
module.exports =  mongoose.model('Playlist', playlistSchema);