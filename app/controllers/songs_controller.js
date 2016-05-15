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
        var base64 = require('base64-js');
        //const User = Models.User;
        
        
        router.get('/update', (req, res) => {
            console.log(req.user)
            
            if(!req.user) {
                res.status(403).send('No tienes permisos para actualizar, inicia sesión primero');
                return;
            }
            
            glob(__dirname + '/../../import/**/*.mp3', {}, function (err, files) {
                if(err){
                    console.log(err);
                    res.status(500).send('Error importando archivos en el glob');
                    return
                }
                console.log(files);
                
                let promises = [];
                let error = null;
                
                files.forEach((path) => {
                    mm(fs.createReadStream(path), function (err, metadata) {
                        if (err) throw err;
                        //console.log(fs.readFileSync(path))
                        let s1 = new Song({
                            name: metadata.title,
                            artist: metadata.artist,
                            song: {
                                data: base64.fromByteArray(fs.readFileSync(path)),
                                contentType: 'audio/mpeg'
                            },
                            image: {
                                data: base64.fromByteArray(metadata.picture[0].data),
                                contentType: 'image/png'
                            },
                            owner:  req.user._id
                        });
                        //console.log(s1);
                        let prom = s1.save((err) => {
                            if(err){
                                console.log("dio error al guardar" + err)
                                error = err;
                                return err;
                            }
                            fs.unlink(path);
                        });
                        promises.push(prom);
                    });
                });
                Promise.all(promises).then(()=> {
                    if(error){
                        console.log("dio error al guardar" + error)
                        return error;
                    }
                    res.status(201).send('Insertado en la base de datos')
                });
            })
        });
   
        /*
        
        V GET        /photos          photos#index   display a list of all photos
        X GET        /photos/new      photos#new     return an HTML form for creating a new photo
        X POST       /photos          photos#create  create a new photo
        V GET        /photos/:id	    photos#show    display a specific photo
        X GET        /photos/:id/edit	photos#edit    return an HTML form for editing a photo
        X PATCH/PUT  /photos/:id	    photos#update  update a specific photo
        X DELETE     /photos/:id	    photos#destroy delete a specific photo
        
        */

        router.get('/:id', (req, res) => {
            if(!req.user) {
                res.status(403).send('No puedes ver esa canción, inicia sesión primero para ver si te pertenece.');
                return;
            }
            
            //Song.findOne({}, (err, song) => {
            
            Song.findById(req.params.id, (err, song) => {
                if(err){
                    console.log("dio error al buscar " + err);
                    
                    if(/Cast to ObjectId failed for value/.test(err.message)) {
                        res.status(404).send('No existe esta canción en la base de datos.');
                    }
                    else {
                        res.status(500).send('Error al buscar la canción en la base de datos');
                    }
                    return ;
                }

                if(song == null) {
                    res.status(404).send('No existe esta canción en la base de datos.');
                    return ;
                }

                res.contentType('audio/mpeg');
                console.log('Ya acabamos de coger la canción')
                res.send(song.song.data);
                //res.status(200).send('Tu cancion es ' + song.name)
            });
        });

        router.get('/',(req,res)=>{
            if(!req.user) {
                res.status(403).send('No puedes ver TOOODDAS las canciones, inicia sesión primero.');
                return;
            }
            
            let songsProjection = {
                artist: false,
                song: false,
                owner: false
            }
            
            Song.find({owner: req.user._id}, songsProjection, (err, songs) => {
                if(err){
                    console.log(err);
                    res.status(500).send('Mongo error in query');
                    return
                }

                //console.log(songs);
                res.json(songs);
            });
        })

        return router;
    };
})();