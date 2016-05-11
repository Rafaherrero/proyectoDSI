(() => {
    'use strict';
    var mongoose = require('mongoose');
    const Schema = mongoose.Schema;
    var SongSchema = mongoose.Schema({
        name: String,
        artist: String,
        song: {
            data: Buffer,
            contentType: String
        },
            image: {data: Buffer, 
            contentType: String
            
        },
        owner: { type: Schema.Types.ObjectId, ref: 'User' }
    });
    
    module.exports = {
        Song: mongoose.model('Song', SongSchema)
    };
})();