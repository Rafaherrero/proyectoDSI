(() => {
    'use strict';
    var mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    var SongSchema = mongoose.Schema({
        name: String,
        artist: String,
        album: String,
        song: {
            data: String,
            contentType: String
        },
            image: {data: String, 
            contentType: String
            
        },
        owner: { type: Schema.Types.ObjectId, ref: 'User' }
    });
    
    module.exports = {
        Song: mongoose.model('Song', SongSchema)
    };
})();