document.querySelector('input[type="file"]').onchange = function(e) {
	id3(this.files[0], function(err, tags) {
		if (tags.v2.private != null) {
    var len = tags.v2.private.data.byteLength ;
    var encodedStr = String.fromCharCode.apply(null, new Uint8Array(tags.v2.private.data));
    var decodedString = decodeURIComponent(escape( encodedStr ));
}

	if (tags.v2.image != null) {
    var blob = new Blob( [ tags.v2.image.data ], { type: "image/png" } );
    var urlCreator = window.URL || window.webkitURL;
    var imageUrl = urlCreator.createObjectURL( blob );

    $('#image').attr('src', imageUrl);
    }
    else{
        
    }
	});
	
	$(document).ready(function(){
      $('.carousel').carousel();
    });
}

//IMPORTANTE!!!! ID3JS ESTA MALL!!!!
//https://github.com/defenderjim/id3/blob/ebfb6792590d49aef00bfa031d28c2460b5313f2/dist/id3.js