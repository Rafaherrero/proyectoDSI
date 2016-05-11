(() => {
    'use strict';
    module.exports = function() {
        const express = require('express');
        const fs = require('fs');
        const router = express.Router();
        var glob = require("glob");
        let Models = require('../models/song');
        let mongoose = require('mongoose')
        var mm = require('musicmetadata');
        const Song = Models.Song;
        
        glob(__dirname + '/../../import/**/*.mp3', {}, function (err, files) {
            console.log(files);
            files.forEach((path) => {
                var parser = mm(fs.createReadStream(path), function (err, metadata) {
                    if (err) throw err;
                    console.log(metadata);
                    let s1 = new Song({
                        name: metadata.title,
                        artist: metadata.artist,
                        song: {
                            data: fs.readFileSync(path),
                            contentType: 'audio/mpeg'
                        },
                        image: {
                            data: metadata.picture[0].data,
                            contentType: 'image/png'
                        },
                        owner:  new mongoose.mongo.ObjectID('573319e27b8da6a6274fd95a')
                    });
                    s1.save((err) => {
                        if(err){
                            console.log("dio error al guardar" + err)
                            return err;
                        }
                        fs.unlink(path);
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
            console.log('Estamos en el get :id');
            console.log(req.body);
            console.log('estamos despues de rewq.body');
            //console.log(__dirname + '/../../public/prueba.mp3')
            //let data = fs.readFileSync(__dirname + '/../../public/prueba.mp3');
            Song.findOne({}, (err, song) => {
                res.contentType('audio/mpeg');
                console.log('Ya acabamos de coger la canción')
                console.log(song.song)
                res.send(song.song.data);
            });
        });

        router.get('/',(req,res)=>{
            console.log(req.body);
            console.log(__dirname + '/../../public/')
            Song.findOne({}, (err, song) => {
                 res.contentType('image/png');
                 console.log(song);
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