// Pannel script 
var panel = '<div data-role="panel" id="mypanel" data-display="overlay" style="background:#BC242A;">' + '<ul class="panel_nav"><li><a href="#homePage">Home</a></li><li><a href="#photo_page">Photo Gallery</a></li><li><a href="#page_4">Video Gallery</a></li><li><a href="#map_page">Map</a></li></li><div class="social-links"><a class="fb" href="http://www.facebook.com">Facebook</a><a class="yt" href="http://youtube.com">Youtube</a><a class="tw" href="http://twitter.com">Twitter</a><a class="vm" href="http://vimeo.com">Vimeo</a></div></ul></div>';
$(document).one('pagebeforecreate', function () {
    $.mobile.pageContainer.prepend( panel );
    $("#mypanel").panel();
});

// Photo Gallery swiper script
// Fetching data from the server
$.ajax({
	url: 'http://www.southasia-uni.org/mobile-app-content/jsondb/image.json',
	type: 'GET',
	dataType: 'JSON',
	success: function(data){
		var counter = 0;
		$.each( data, function(index, val) {
			if( data[index].img_active == "yes" ){
				counter++;
				$('#photo_page .image_gallery').append("<a rel='gallery' href='http://www.southasia-uni.org/files/photos/" + data[index].img_filename + ".hdq." + data[index].img_extension + "'class='swipebox'><img src='http://www.southasia-uni.org/files/photos/" + data[index].img_filename + ".sml." + data[index].img_extension + "'></a>" );	
				if( counter == 15) return false;
			}			
		});		
	}
		
})
.done(function() {
	( function( $ ){
		$( '.swipebox' ).swipebox({
			hideBarsOnMobile : false
		});
	})( jQuery );
});


// Google Map script [Using Google Map API]
// Initializing the google map function and it's options
var mapinit = function(){
	var mapOptions = {
          center: new google.maps.LatLng( 23.7947705, 90.4029254 ),
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };    
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions );
}

$(document).ready( function() {	
		var winWidth = $( window ).width();
		var winHeight = $( window ).height();
		$('#map-canvas').css({
			'width'	: winWidth,
			'height': winHeight,
	   		'overflow': 'hidden'
		});	
	google.maps.event.addDomListener( window, 'load', mapinit );
});