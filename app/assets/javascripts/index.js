$(document).ready(function() {
	id3('/cancion1.mp3', function(err, tags) {
		//if (tags.v2.private != null) {
            //var len = tags.v2.private.data.byteLength ;
            //var encodedStr = String.fromCharCode.apply(null, new Uint8Array(tags.v2.private.data));
            //var decodedString = decodeURIComponent(escape( encodedStr ));
        //}

	if (tags.v2.image != null) {
    var blob = new Blob( [ tags.v2.image.data ], { type: "image/png" } );
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL( blob );

    $('.image').attr('src', imageUrl);
    }
    else{
        
    }
	});
	let prueba;
	console.log('/songs/update');
	/*
	
	http://stackoverflow.com/questions/17762763/play-wav-sound-file-encoded-in-base64-with-javascript
	Como desde la base de datos se pasa la cancion en base64 para poder reproducirla se debe hacer algo parecido a esto...
	En el link de arriba esta la pregunta con la respuesta.
	var snd = new Audio("data:audio/wav;base64," + base64string);
      snd.play();
	*/
	
	var myaudio = new Audio('/cancion1.mp3');
	var rangeSlider = document.getElementById('rango_tiempo');
	
	myaudio.addEventListener('loadedmetadata', function() {
            $('#tiempo_cancion_restante').text(formatTime(myaudio.duration));
            $('#tiempo_cancion_reproducido').text(formatTime(0));
            
            $('#cargando').remove();
            
	      noUiSlider.create(rangeSlider, {
                  start: [0],
                  connect: 'lower',
                  range: {
                  'min': [0],
                  'max': [myaudio.duration]
                  },
                  format: {
	                  to: function(value){
	                        minutes = Math.floor(value / 60);
                              minutes = (minutes >= 10) ? minutes : "0" + minutes;
                              value = Math.floor(value % 60);
                              value = (value >= 10) ? value : "0" + value;
                              return minutes + ":" + value;
	                  },
	                  from: function(value){
	                        var a = value.split(':');
	                        return a;
	                  }
                  }
            });
            
            rangeSlider.noUiSlider.on('slide', function(){
                  myaudio.currentTime = formatTime_back(rangeSlider.noUiSlider.get());
            });
      });

      myaudio.addEventListener('timeupdate', function () {
            let minutes, seconds;
            $('#tiempo_cancion_reproducido').text(formatTime(myaudio.currentTime));
            $('#tiempo_cancion_restante').text(formatTime(myaudio.duration - myaudio.currentTime));
            
            rangeSlider.noUiSlider.set([myaudio.currentTime]);
      });
      
      function formatTime(seconds) {
            minutes = Math.floor(seconds / 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
            seconds = Math.floor(seconds % 60);
            seconds = (seconds >= 10) ? seconds : "0" + seconds;
            return minutes + ":" + seconds;
      }
      
      function formatTime_back(time){
            let a = time.split(':');
            return ((parseInt(a[0])*60)+parseInt(a[1]))
      }
      
      


      
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