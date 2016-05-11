(() => {
    'use strict';
    module.exports = function() {
        const express = require('express');
        const fs = require('fs');
        const util = require('util');
        const router = express.Router();
        var id3 = require('id3js');
        var glob = require("glob");
        let Models = require('../models/song');
        let mongoose = require('mongoose')
        const Song = Models.Song;
        
        function toBuffer(ab) {
            var buffer = new Buffer(ab.byteLength);
            var view = new Uint8Array(ab);
            for (var i = 0; i < buffer.length; ++i) {
                buffer[i] = view[i];
            }
            return buffer;
        }
        
        glob(__dirname + '/../../import/**/*.mp3', {}, function (err, files) {
            console.log(files);
            files.forEach((path) => {
                id3({ file: path, type: id3.OPEN_LOCAL }, function(err, tags) {
                    console.log('estas con las etiquetas: ')
                    console.log(tags.v2.title);
                    console.log(tags.v2.artist);
                    //console.log(Song);dasdasdasd
                    let s1 = new Song({
                        name: tags.v2.title,
                        artist: tags.v2.artist,
                        song: {
                            data: fs.readFileSync(path),
                            contentType: 'audio/mpeg'
                        },
                        image: {
                            data: toBuffer(tags.v2.image.data),
                            contentType: 'image/png'
                        },
                        owner:  new mongoose.mongo.ObjectID('573319e27b8da6a6274fd95a')
                    });
                    
                    console.log('Esto es s1: ')
                    console.log(s1)
                    
                    s1.save((err) => {
                        if(err){
                            console.log("dio error al guardar"+ err)
                            return err;
                        }
                    });
                });
            });
        })
        /*
        
        GET        /photos          photos#index   display a list of all photos
        GET        /photos/new      photos#new     return an HTML form for creating a new photo
        POST       /photos          photos#create  create a new photo
        GET        /photos/:id	    photos#show    display a specific photo
        GET        /photos/:id/edit	photos#edit    return an HTML form for editing a photo
        PATCH/PUT  /photos/:id	    photos#update  update a specific photo
        DELETE     /photos/:id	    photos#destroy delete a specific photo
        
        */

        router.get('/:id', (req, res) => {
            console.log(req.body);
            console.log(__dirname + '/../../public/prueba.mp3')
            let data = fs.readFileSync(__dirname + '/../../public/prueba.mp3');
            res.contentType('audio/mpeg');
            res.send(data);
        });
        router.get('/',(req,res)=>{
            console.log(req.body);
            console.log(__dirname + '/../../public/')
            Song.findOne({}, (err, song) => {
                 res.contentType('image/png');
                 res.send(song.image.data);
            })
           
            
            /*let datos = {
                image: data,
                titulo: 'JSON Derulo'
            }*/
            
            
        })

        return router;
    };
})();