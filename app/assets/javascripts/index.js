$(document).ready(function() {
	id3('/prueba.mp3', function(err, tags) {
		if (tags.v2.private != null) {
            var len = tags.v2.private.data.byteLength ;
            var encodedStr = String.fromCharCode.apply(null, new Uint8Array(tags.v2.private.data));
            var decodedString = decodeURIComponent(escape( encodedStr ));
        }

	if (tags.v2.image != null) {
    var blob = new Blob( [ tags.v2.image.data ], { type: "image/png" } );
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL( blob );

    $('.image').attr('src', imageUrl);
    }
    else{
        
    }
	});
	
	/*
	
	http://stackoverflow.com/questions/17762763/play-wav-sound-file-encoded-in-base64-with-javascript
	Como desde la base de datos se pasa la cancion en base64 para poder reproducirla se debe hacer algo parecido a esto...
	En el link de arriba esta la pregunta con la respuesta.
	var snd = new Audio("data:audio/wav;base64," + base64string);
      snd.play();
	*/
	
	var myaudio = new Audio('/songs/ukjjgjhgjhg');
	
	myaudio.addEventListener('loadedmetadata', function() {
             $('#tiempo_cancion').text(myaudio.duration);
             $('#cargando').remove();
      });
      
      myaudio.addEventListener('timeupdate', function () {
            $('#tiempo_cancion_reproducido').text(myaudio.currentTime.toFixed(2));
      });
      
      /*var slider = document.getElementById('#rango_tiempo');
      
      noUiSlider.create(slider, {
            start: [20, 80],
            connect: true,
            step: 1,
            
            range: {
                  'min': 0,
                  'max': 100
            },
            
            format: wNumb({
                  decimals: 0
            })
      });*/

	$(document).on("click", "#boton_p", function() {
	      
	    if ($('#boton_p').text()==('play_arrow')){
			myaudio.play();
            $('#boton_p').replaceWith('<a class="btn-floating btn-large waves-effect" id="boton_p"><i id="boton_p_material_icons" class="material-icons">pause</i></a>');
	    }
	    else{
	        myaudio.pause();
	        $('#boton_p').replaceWith('<a class="btn-floating btn-large waves-effect" id="boton_p"><i id="boton_p_material_icons" class="material-icons">play_arrow</i></a>');
	    }
	});
});
	
	$(document).ready(function(){
      
      $('.carousel').carousel({
            time_constant: 100,
            dist:-150,
            shift:0,
            padding:20,
            full_width: false

      });
    });
    

//IMPORTANTE!!!! ID3JS ESTA MALL!!!!
//https://github.com/defenderjim/id3/blob/ebfb6792590d49aef00bfa031d28c2460b5313f2/dist/id3.js