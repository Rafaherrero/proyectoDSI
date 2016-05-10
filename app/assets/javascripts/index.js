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
	
	var myaudio = new Audio('/prueba.mp3');

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