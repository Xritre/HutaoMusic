const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
    name:String,
    coverImage:String,
    songs:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Song'
        },
    ]
});
//export make other file can use
module.exports =  mongoose.model('Artist', artistSchema);