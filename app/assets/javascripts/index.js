$(document).ready(function() {
      let datos_canciones;
      let myaudio = document.getElementById('miaudio');
      let cnt=0;
      var rangeSlider = document.getElementById('rango_tiempo');
      var volumenSlider = document.getElementById('rango_volumen');
      let id_cancion_actual = 0;
      let id_cancion_anterior = 0;
      let index_cancion_actual = 0;
      var imagen_actual=0;
      let volumen_actual=1;
      
      $(document).ready(function(){  
            var iOS = false,
            p = navigator.platform;
            if( p === 'iPad' || p === 'iPhone' || p === 'iPod' ) {
                  iOS = true;
            }
            if (iOS === true) {
                  $("#col_volumen").hide();
                  $("#col_tiempo").removeClass();
                  $("#col_tiempo").addClass("col s12 l7 center");
            }
      });

     /* <% datos_canciones.forEach((item, i) =>{ %>
            <tr class="reproducir_cancion_lista" id="<%= item._id %>&">
            <td><i class="small material-icons">play_circle_outline</i></td>
                <td><%= item.name %></td>
                <td><%= item.artist %></td>
                <td><%= item.album %></td>
                </tr>
            <% }); %>*/

      function makeTabla (row){
            var icono = $("<i>").addClass("small material-icons");
            icono.append("play_circle_outline");
            var newItem = $("<tr>").addClass("reproducir_cancion_lista");
            newItem.attr("id", `${row._id}&`);
            var newTd = $("<td>");
            newTd.append(icono);
            newItem.append(newTd);
            newTd = $("<td>");
            newTd.append(row.name);
            newItem.append(newTd);
            newTd = $("<td>");
            newTd.append(row.artist);
            newItem.append(newTd);
            newTd = $("<td>");
            newTd.append(row.album);
            newItem.append(newTd);
            
            return newItem;
      };

      $.ajax(
      {     
            type: 'GET',
            url: '/songs',
            success: function (data) {
                  datos_canciones = data;
                  datos_canciones.sort(function(a, b) {
                        return a.name.localeCompare(b.name);
                  });
                  $("#cerdo_inicial").remove();
                  for(var i=0; i<data.length; i++) {
                        var newrow = makeTabla(data[i]);
                        $('#body_tabla').append(newrow);
                  }
                  /*for(i=0; i<data.length; i++) {
                        var newSlide = makeCarousel(data[i]);   
                        $("#carousel_col").append(newSlide);
                        $('.carousel-item').first().addClass('active');
                        
                  }
                  $('#carousel_col').carousel();*/
                  id_cancion_actual = datos_canciones[0]._id;
                  carga_cancion(datos_canciones[0]._id);
            },
            error: function(){
                  alert("No se ha loguineado en la web");
            }
      });
      
      /*$("imagen_carousel").each(function(index) {
            $(this).on('click touchend', function(){
            console.log($(this).attr('id'));
            });
      });*/
      
      function carga_cancion (ident){
      $.ajax(
      {     
            type: 'GET',
            dataType: "json",
            url: `/songs/${ident}`,
            success: function (cancionmp3){
                  //http://stackoverflow.com/questions/17762763/play-wav-sound-file-encoded-in-base64-with-javascript
                  imagen_actual = cancionmp3.image;
                  myaudio.setAttribute('src', "data:audio/mp3;base64," + cancionmp3.song);
                  myaudio.volume = volumen_actual;
                  myaudio.load();
                  $('.outer').fadeOut(1000);
            },
      });
      
      };
	
      //http://stackoverflow.com/questions/7346827/javascript-find-array-index-with-value
      function IndexByKey(arraytosearch, key, valuetosearch) {

            for (var i = 0; i < arraytosearch.length; i++) {

            if (arraytosearch[i][key] == valuetosearch) {
                  return i;
            }
            }
            return null;
      };
      
      //http://stackoverflow.com/questions/34404127/trouble-initializing-a-dynamically-built-materialize-carousel
      /*function makeCarousel(photo) {
             var newItem = $("<a>").addClass("carousel-item");
             newItem.attr("id", photo._id);
             var Img = $("<img>").attr("src", "data:image/png;base64," + photo.image.data);
             
             newItem.attr("href", "javascript:;");
             Img.addClass("imagen_carousel");
             newItem.append(Img);
             newItem.append(photo.name);

             return newItem;
      };*/
      

      function cargando_caratula () {
        $("#img_caratula").toggle();
        $("#cargando_cara").toggle();
      };
      
      function formatTime_back(time){
            let a = time.split(':');
            return ((parseInt(a[0])*60)+parseInt(a[1]))
      }
      
      function cambiar_por_play (){
            myaudio.play();
            $('#boton_p').replaceWith('<a class="btn-floating btn-large waves-effect waves-light" id="boton_p"><i id="boton_p_material_icons" class="material-icons">pause</i></a>');
      }
      
      function cambiar_por_pause (){
            myaudio.pause();
	      $('#boton_p').replaceWith('<a class="btn-floating btn-large waves-effect waves-light" id="boton_p"><i id="boton_p_material_icons" class="material-icons">play_arrow</i></a>');
      }
      
      myaudio.addEventListener("loadedmetadata", function() {
            if(cnt>0){
            rangeSlider.noUiSlider.destroy();
            volumenSlider.noUiSlider.destroy();
            cambiar_por_play();
            $(`#${id_cancion_anterior}\\&`).css('background','none');
            }
            let Img = $("<img>").attr("src", "data:image/png;base64," + imagen_actual);
            Img.attr("id", "img_caratula");
            Img.addClass("responsive-img");
            Img.addClass("z-depth-4");
            Img.addClass("hoverable");
            $("#img_caratula").replaceWith(Img);
            $("#cargando_cara").toggle();
            
            $(`#${datos_canciones[index_cancion_actual]._id}\\&`).css('background','#f5f5f5');
            
            $('#cancion_sonando').text(`${datos_canciones[index_cancion_actual].name}`);
            $('#artista_sonando').text(`${datos_canciones[index_cancion_actual].artist}`);
            $('#album_sonando').text(`${datos_canciones[index_cancion_actual].album}`);
            
	      noUiSlider.create(rangeSlider, {
                  start: [0],
                  connect: 'lower',
                  range: {
                  'min': [0],
                  'max': [myaudio.duration]
                  },
                  format: {
	                  to: function(value){
	                         var minutes = Math.floor(value / 60);
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
            
            noUiSlider.create(volumenSlider, {
                  start: [myaudio.volume*100],
                  connect: 'lower',
                  range: {
                  'min': [0],
                  'max': [100],
                  },
                  step: 10,
                  
                  format: {
                        to: function(value){
                              value = Math.round(value);
                              return value;
                        },
                        from: function(value){
                              return value;
                        }
                  },
            });
            actualizar_datos();
            cnt++;
      });
      
      myaudio.onended = function() {
            cambiar_por_pause();
	      myaudio.currentTime = 0;
	      siguiente_cancion();
      };
      
      function formatTime(seconds) {
            var minutes = 0;
            minutes = Math.floor(seconds / 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
            seconds = Math.floor(seconds % 60);
            seconds = (seconds >= 10) ? seconds : "0" + seconds;
            return minutes + ":" + seconds;
      }
      
      myaudio.addEventListener('timeupdate', function () {
            let minutes, seconds;
            $('#tiempo_cancion_reproducido').text(formatTime(myaudio.currentTime));
            $('#tiempo_cancion_restante').text(formatTime(myaudio.duration - myaudio.currentTime));
            
            rangeSlider.noUiSlider.set([myaudio.currentTime]);
            
            });
            
      myaudio.addEventListener('volumechange', function () {
            volumenSlider.noUiSlider.set([myaudio.volume*100]);
      });

  	function actualizar_datos() {

            $('#tiempo_cancion_restante').text(formatTime(myaudio.duration));
            $('#tiempo_cancion_reproducido').text(formatTime(0));
            
            rangeSlider.noUiSlider.on('slide', function(){
                  myaudio.currentTime = formatTime_back(rangeSlider.noUiSlider.get());
            });
            
            volumenSlider.noUiSlider.on('slide', function(){
                  volumen_actual = volumenSlider.noUiSlider.get()/100;
                  myaudio.volume = volumen_actual;
            });
            
      };
      
	$(document).on('click', "#boton_p", function() {
	      
	   if ($('#boton_p').text()==('play_arrow')){
		cambiar_por_play();
	    }
	    else{
	      cambiar_por_pause();
	    }
	});
	
	$(window).scroll(function(){
            if ($(this).scrollTop() > 100) {
                $('.scrollup').fadeIn();
            } else {
                $('.scrollup').fadeOut();
            }
        });

        function scroll_up(){
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        };

	
	function siguiente_cancion (){
	      cambiar_por_pause();
	      cargando_caratula();
	      scroll_up();
	      id_cancion_anterior = id_cancion_actual;
	      index_cancion_actual = (IndexByKey(datos_canciones,"_id",id_cancion_actual)+1)%datos_canciones.length;
	      id_cancion_actual = datos_canciones[index_cancion_actual]._id;
	      carga_cancion(id_cancion_actual);
	      myaudio.currentTime = 0;
	};

	function cancion_anterior (){
	      cambiar_por_pause();
	      cargando_caratula();
	      scroll_up();
	      if(IndexByKey(datos_canciones,"_id",id_cancion_actual) == 0)
	            index_cancion_actual = datos_canciones.length-1;
	      else{
	            index_cancion_actual = (IndexByKey(datos_canciones,"_id",id_cancion_actual)-1)%datos_canciones.length;
	      }
	      id_cancion_anterior = id_cancion_actual;
	      id_cancion_actual = datos_canciones[index_cancion_actual]._id;
	      carga_cancion(id_cancion_actual);
	      myaudio.currentTime = 0;
	};
	
	$(document).on('click', "#boton_siguiente", function() {
	      siguiente_cancion();
	});
	
	$(document).on('click', "#boton_anterior", function() {
	      cancion_anterior();
	});
	
	$(document).on('click', "#boton_volume_up", function() {
	      if(volumen_actual<=0.9){
	            volumen_actual = volumen_actual+0.1;
	            myaudio.volume = volumen_actual;
	      }
	});
	
	$(document).on('click', "#boton_volume_down", function() {
	      if(volumen_actual>=0.10){
	            volumen_actual = volumen_actual-0.1;
	            myaudio.volume = volumen_actual;
	      }
	});
	
	$(document).on('click', ".reproducir_cancion_lista", function() {
	      cambiar_por_pause();
	      cargando_caratula();
	      scroll_up();
	      id_cancion_anterior = id_cancion_actual;
	      index_cancion_actual = (IndexByKey(datos_canciones,"_id",this.id.slice(0,-1)));
	      id_cancion_actual = this.id.slice(0,-1);
	      carga_cancion(id_cancion_actual);
	      myaudio.currentTime = 0;
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