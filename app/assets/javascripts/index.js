jQuery(document).ready(function($) {
      let datos_canciones;
      let myaudio = new Audio();
      $(() => {
      $.ajax(
      {     
            type: 'GET',
            url: '/songs',
            success: function (data) {
                  datos_canciones = data;
                  $("#cerdo_inicial").remove();
                  var imagen = data.image;
                  for(i=0; i<data.length; i++) {
                        var newSlide = makeCarousel(data[i]);   
                        $("#carousel_col").append(newSlide);
                        $('.carousel-item').first().addClass('active');
                  }
                  $('#carousel_col').carousel();
                  carga_cancion(datos_canciones[0]._id);
            },
            fail: function(){
                  alert("No se ha loguineado en la web");
            }
      });
      
      });
	
	/*
	http://stackoverflow.com/questions/17762763/play-wav-sound-file-encoded-in-base64-with-javascript
	*/
      
      function makeCarousel(photo) {

             var newItem = $("<a>").addClass("carousel-item");
             var Img = $("<img>").attr("src", "data:image/png;base64," + photo.image.data);
             
             newItem.attr("href", "#");
             newItem.append(Img);
             newItem.append(photo.name);

             return newItem;
      }
      
      function carga_cancion (ident){
      $.ajax(
      {     
            type: 'GET',
            url: `/songs/${ident}`,
            success: function (cancionmp3){
                  myaudio = new Audio("data:audio/mp3;base64," + cancionmp3);
            },
            
            statusCode: {
                  200: function() {
                  actualizar_datos();
                  }
            },
            complete: function(){
                  actualizar_datos();
            }
      });
      }

	var rangeSlider = document.getElementById('rango_tiempo');
	
	function actualizar_datos (){

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
      };

      myaudio.addEventListener('timeupdate', function () {
            let minutes, seconds;
            $('#tiempo_cancion_reproducido').text(formatTime(myaudio.currentTime));
            $('#tiempo_cancion_restante').text(formatTime(myaudio.duration - myaudio.currentTime));
            
            rangeSlider.noUiSlider.set([myaudio.currentTime]);
      });
      
      myaudio.onended = function() {
            myaudio.pause();
	      $('#boton_p').replaceWith('<a class="btn-floating btn-large waves-effect" id="boton_p"><i id="boton_p_material_icons" class="material-icons">play_arrow</i></a>');
	      myaudio.currentTime = 0;
      };
      
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
	
	function inicializarcarousel (){
	  $('.carousel').carousel({
            time_constant: 100,
            dist:-150,
            shift:0,
            padding:20,
            full_width: false
      });
      $('.carousel').removeClass('initialized');
	};
	$(document).ready(function(){
            inicializarcarousel();
    });


//IMPORTANTE!!!! ID3JS ESTA MALL!!!!
//https://github.com/defenderjim/id3/blob/ebfb6792590d49aef00bfa031d28c2460b5313f2/dist/id3.js