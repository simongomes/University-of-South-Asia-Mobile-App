// Pannel script 
var panel = '<div data-role="panel" id="mypanel" data-display="overlay" style="background:#BC242A;">' + '<ul class="panel_nav"><li><a href="#homePage">Home</a></li><li><a href="#news_events_page">News, Events &amp; Notice</a></li><li><a href="#photo_page">Photo Gallery</a></li><li><a href="http://103.17.37.71/elearning/">eLearning</a></li><li><a href="http://103.17.37.71/index.php">South Asia Connect</a></li><li><a href="#map_page">Map</a></li><li><a href="#contact_page" data-rel="dialog" data-transition="pop">Contact Us</a></li></ul><div class="social-links"><a class="fb" href="https://www.facebook.com/pages/University-of-South-Asia/384978734950628">Facebook</a><a class="yt" href="https://www.youtube.com/channel/UCxezjINjUWgwQ62NZbomRpw">Youtube</a><a class="vm" href="https://vimeo.com/user19719682">Vimeo</a></div></div>';
$(document).one('pagebeforecreate', function () {
    $.mobile.pageContainer.prepend( panel );
    $("#mypanel").panel();
});

// Photo Gallery swiper script
// Fetching data from the server using ajax call
var dataURL = "http://www.southasia-uni.org/includes/mobileappcontent/photo_page.php";
$.getJSON( dataURL,  function( photoObj ) {
	var counter = 0;
	$.each( photoObj, function(index, val) {
		if( photoObj[index].img_active == "yes" ){
			counter++;
			$('#photo_page .image_gallery').append("<a rel='gallery' href='http://www.southasia-uni.org/files/photos/" + photoObj[index].img_filename + ".hdq." + photoObj[index].img_extension + "'class='swipebox'><img src='http://www.southasia-uni.org/files/photos/" + photoObj[index].img_filename + ".sml." + photoObj[index].img_extension + "'></a>" );	
			if( counter == 18) return false;
		}			
	});
}) // Photo Gallery swiper script
.done(function() {
	( function( $ ){
		$( '.swipebox' ).swipebox({
			hideBarsOnMobile : false
		});
	})( jQuery );
});

// News and Events script
dataURL = "http://www.southasia-uni.org/includes/mobileappcontent/news_events.php";
$.getJSON( dataURL, function( newsObj ) {
	counter = 0;
	$.each( newsObj, function(index, val) {
		$("#news_events_page #news_titles").append(
			"<li><a href='#full_news_page' id='" + 
			newsObj[index].news_id + 
			"' class='ui-btn ui-btn-icon-right ui-icon-carat-r'>" + newsObj[index].news_title + 
			"</a></li>"
		)
		counter++;
		if( counter == 15 ) return false;
	});
})
.done(function(){
	$("#news_events_page #news_titles li a").on( 'touchstart click', function(){
		$('.spinner').show();
		$("#full_news_page .news_content .content").hide();
		var newsID = $(this).attr( "id" );
		$.getJSON( dataURL, function( newsObj ) {
			$.each( newsObj, function(index, val) {
				if( newsObj[index].news_id == newsID ){
					$("#full_news_page .news_content .news_title").text( newsObj[index].news_title );
					$("#full_news_page .news_content .news_img").attr("src","http://www.southasia-uni.org/files/photos/" + newsObj[index].news_img + ".mid.jpg");
					$("#full_news_page .news_content .news_desc").html( newsObj[index].news_content );
					var htmlStr = $("#full_news_page .news_content .news_desc").text();
					$("#full_news_page .news_content .news_desc").html( htmlStr );
					return false;
				}
			})
		})
		.done( function(){
			$('.spinner').hide();
			$("#full_news_page .news_content .content").slideDown( 'slow' );
		})	
	})
})

// Google Map script [Using Google Map API]
// Initializing the google map function and it's options
var mapinit = function(){
	var mapOptions = {
          center: new google.maps.LatLng( 23.7947705, 90.4029254 ),
          zoom: 19,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };    
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions );
}

$(document).ready( function() {	
	// Setting the canvas size for google map
	$('#map-canvas').height( $( '[data-role="page"]' ).height() );
	$('#map-canvas').width( $( '[data-role="page"]' ).width() );

	google.maps.event.addDomListener( window, 'load', mapinit );
	//google.maps.event.trigger($('#map-canvas'), 'resize');
	$('[href="#map_page"]').on( 'touchstart click', function(){
		setTimeout( function(){
			window.location.reload();
			window.location.href = 'main.html#map_page';
		}, 100 );
	})
});