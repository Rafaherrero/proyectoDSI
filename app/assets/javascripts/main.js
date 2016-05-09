// Hola Mundo

var id3 = require('id3js');
 
id3({ file: '23.mp3', type: id3.OPEN_LOCAL }, function(err, tags) {
	// tags now contains your ID3 tags 
	console.log(tags);
});

console.log(id3);