$.support.cors = true;
$.mobile.allowCrossDomainPages = true;
$.ajaxSetup({ cache: false });

// Pannel script 
var panel = '<div data-role="panel" id="mypanel" data-display="reveal" style="background:#BC242A;" data-position-fixed="true">' + '<ul class="panel_nav"><li><a href="#homePage">Home</a></li><li><a href="#msgPage">Message</a></li><li><a href="#admissionPage">Admissions</a></li><li><a href="#dept_page">Departments</a></li><li><a href="#business_scl_page">Business School</a></li><li><a href="#engineering_scl_page">School of Engineering</a></li><li><a href="#humanities_scl_page">School of Humanities</a></li><li><a href="#pblic_scl_page">School Public Health and Life Science</a></li><li><a href="#news_events_page">News, Events &amp; Notice</a></li><li><a href="#photo_page">Photo Gallery</a></li><li><a href="#map_page">Map</a></li><li><a href="#contact_page">Contact Us</a></li></ul><div class="social-links"><a class="logo" href="http://www.southasia-uni.org/"></a><a class="fb" href="https://www.facebook.com/pages/University-of-South-Asia/384978734950628">Facebook</a><a class="yt" href="https://www.youtube.com/channel/UCxezjINjUWgwQ62NZbomRpw">Youtube</a><a class="vm" href="https://vimeo.com/user19719682">Vimeo</a></div></div>';
$(document).one('pagebeforecreate', function () {
    $.mobile.pageContainer.prepend( panel );
    $("#mypanel").panel();
});
$( document ).on( "pageinit", function() {
    $( document ).on( "swiperight", function( e ) {       
	    if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
	        if ( e.type === "swiperight" ) {
	            $( "#mypanel" ).panel( "open" );
	        }
	    }
    });
});

$(function() {
    FastClick.attach(document.body);
});

// Photo Gallery swiper script
// Fetching data from the server using ajax call
$.getJSON( 'http://www.southasia-uni.org/includes/mobileappcontent/photo_page.php',  function( photoObj ) {
	var counter = 0;
	$.each( photoObj, function(index, val) {
		if( photoObj[index].img_active == "yes" ){
			counter++;
			$('#photo_page .image_gallery').append("<a id='" + photoObj[index].img_id + "'' rel='gallery' href='http://www.southasia-uni.org/files/photos/" + photoObj[index].img_filename + ".hdq." + photoObj[index].img_extension + "'class='swipebox'><img src='http://www.southasia-uni.org/files/photos/" + photoObj[index].img_filename + ".mid." + photoObj[index].img_extension + "'></a>" );	
			if( counter == 5 ) return false;

			if( counter < 3 ){
				$("#homePage .content .photos").append(
					"<div class='item'><a id='" + photoObj[index].img_id + "'' rel='gallery' href='http://www.southasia-uni.org/files/photos/" + photoObj[index].img_filename + ".hdq." + photoObj[index].img_extension + "'class='swipebox'><img src='http://www.southasia-uni.org/files/photos/" + photoObj[index].img_filename + ".mid." + photoObj[index].img_extension + "'></a></div>"
				);
			}
		}			
	});
}) // Photo Gallery swiper script
.done(function() {
	$("#photo_page .load-more-img").css( 'visibility', 'visible' );
	$('#homePage .content .photos .sec_title, #homePage .content .view-more-photos').css( 'display', 'block' );
	( function( $ ){
		$( '.swipebox' ).swipebox({
			hideBarsOnMobile : false
		});
	})( jQuery );
});

// News and Events script
$.getJSON( 'http://www.southasia-uni.org/includes/mobileappcontent/news_events.php', function( newsObj ) {
	counter = 0;
	var news_desc = '';	
	$.each( newsObj, function(index, val) {		
		if( !newsObj[index].news_desc ) news_desc = '';
		else news_desc = newsObj[index].news_desc ;

		$("#news_events_page #news").append(
			"<li><h3 class='title'><a href='#full_news_page' id='" + 
			newsObj[index].news_id + 
			"'>" + newsObj[index].news_title + 
			"</a></h3><img class='news-img' src='http://www.southasia-uni.org/files/photos/" + $.trim( newsObj[index].news_img ) + ".mid.jpg'/>" + 
			"<p class='news-desc'>" + news_desc + "</p><a href='#full_news_page' id='" + 
			newsObj[index].news_id + "' class='read-more ui-btn ui-btn-b'>Read More</a></li>"
		)
		if( counter < 2 ){
			$("#homePage .content .news_events").append(
				"<div class='item'><h3 class='title'><a href='#full_news_page' id='" + 
			newsObj[index].news_id + 
			"'>" + newsObj[index].news_title + 
			"</a></h3><img class='news-img' src='http://www.southasia-uni.org/files/photos/" + $.trim( newsObj[index].news_img ) + ".mid.jpg'/>" + 
			"<p class='news-desc'>" + news_desc + "</p><a href='#full_news_page' id='" + 
			newsObj[index].news_id + "' class='read-more ui-btn ui-btn-b'>Read More</a></div>"
			);
		}
		counter++;
		if( counter == 5 ) return false;
	});
})
.done(function(){
	$("#news_events_page .load-more-news").css( 'visibility', 'visible' );
	$("#homePage .news_events .sec_title, #homePage .view-more-news").css( 'display', 'block' );
	$("#news_events_page #news li a, #homePage .news_events a").on( 'click', function(){
		$("#full_news_page .news_content .content").hide();
		$("#full_news_page .loading").show();				
		var newsID = $(this).attr( "id" );
		$.getJSON( 'http://www.southasia-uni.org/includes/mobileappcontent/news_events.php', function( newsObj ) {
			$.each( newsObj, function( index, val ) {
				if( newsObj[index].news_id == newsID ){
					$("#full_news_page .news_content .news_title").text( newsObj[index].news_title );
					$("#full_news_page .news_content .news_img").attr("src","http://www.southasia-uni.org/files/photos/" + $.trim( newsObj[index].news_img ) + ".mid.jpg");
					$("#full_news_page .news_content .news_desc").html( newsObj[index].news_content );
					var htmlStr = $("#full_news_page .news_content .news_desc").text();
					$("#full_news_page .news_content .news_desc").html( htmlStr );
					return false;
				}
			})
		})
		.done( function(){				
			$("#full_news_page .news_content .content").fadeIn( 'fast' );
			$('#full_news_page .loading').fadeOut('fast');			
		})	
	})
})

$('#load-news').on('click', function(e) {
	e.preventDefault();
	var flag  = false;
	var counter = 0;
	$('#news_events_page .loading').show();
	var lastID = $('#news_events_page #news li:last-child .title a').attr('id');	
	$.getJSON( 'http://www.southasia-uni.org/includes/mobileappcontent/news_events.php', function( newsObj ) {
		var news_desc = '';
		$.each( newsObj, function(index, val) {
			if(  newsObj[index].news_id == lastID ){
				flag = true;
				return;
			}
			if( flag == true ){
				if( !newsObj[index].news_desc ) news_desc = '';
				else news_desc = newsObj[index].news_desc ;
				
				$("#news_events_page #news").append(
					"<li><h3 class='title'><a href='#full_news_page' id='" + 
					newsObj[index].news_id + 
					"'>" + newsObj[index].news_title + 
					"</a></h3><img class='news-img' src='http://www.southasia-uni.org/files/photos/" + $.trim( newsObj[index].news_img ) + ".mid.jpg'/>" + 
					"<p class='news-desc'>" + news_desc + "</p><a href='#full_news_page' id='" + 
					newsObj[index].news_id + "' class='read-more ui-btn ui-btn-b'>Read More</a></li>"
				)
				counter++;
				if( counter == 5 ) return false;
			}
		});
	})
	.done( function(){
		$('#news_events_page .loading').fadeOut();
		$("#news_events_page #news li a").on( 'click', function(){
			$("#full_news_page .news_content .content").hide();
			$('#full_news_page .loading').show();
			var newsID = $(this).attr( "id" );
			$.getJSON( 'http://www.southasia-uni.org/includes/mobileappcontent/news_events.php', function( newsObj ) {
				$.each( newsObj, function(index, val) {
					if( newsObj[index].news_id == newsID ){
						$("#full_news_page .news_content .news_title").text( newsObj[index].news_title );
						$("#full_news_page .news_content .news_img").attr("src","http://www.southasia-uni.org/files/photos/" + $.trim( newsObj[index].news_img ) + ".mid.jpg");
						$("#full_news_page .news_content .news_desc").html( newsObj[index].news_content );
						var htmlStr = $("#full_news_page .news_content .news_desc").text();
						$("#full_news_page .news_content .news_desc").html( htmlStr );
						return false;
					}
				})
			})
			.done( function(){						
				$("#full_news_page .news_content .content").fadeIn( 'fast' );
				$('#full_news_page .loading').fadeOut('fast');				
			})	
		})
	})
});

$('#load-img').on('click', function(e) {
	e.preventDefault();	
	var flag  = false;
	var counter = 0;
	var lastID = $('#photo_page .image_gallery a:last-child').attr('id');
	$('#photo_page .loading').show();
	$.getJSON( 'http://www.southasia-uni.org/includes/mobileappcontent/photo_page.php',  function( photoObj ) {		
		$.each( photoObj, function(index, val) {
			if( photoObj[index].img_id == lastID ){
				flag = true;
				return;
			}
			if( flag == true ){
				if( photoObj[index].img_active == "yes" ){					
					$('#photo_page .image_gallery').append("<a id='" + photoObj[index].img_id + "'' rel='gallery' href='http://www.southasia-uni.org/files/photos/" + photoObj[index].img_filename + ".hdq." + photoObj[index].img_extension + "'class='swipebox'><img src='http://www.southasia-uni.org/files/photos/" + photoObj[index].img_filename + ".mid." + photoObj[index].img_extension + "'></a>" );					
					counter++;
					if( counter == 5 ) return false;
				}				
			}		
		});
	}) // Photo Gallery swiper script
	.done( function() {
		$('#photo_page .loading').fadeOut('fast');		
		$( '.swipebox' ).swipebox({
				hideBarsOnMobile : false
		});
	});
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
	$('[href="#map_page"]').on( 'click', function(){
		setTimeout( function(){
			window.location.reload();
			window.location.href = 'main.html#map_page';
		}, 100 );
	})
});

// Admissions Page Functions
// Functions to load scholarship page
$("#admissionPage ul li a").on('click', function(){
	$("#admContent .loading").show();
	$("#admContent .content").hide();
	$("#admContent .content .pg_img").attr( 'src', '#' );
	var pg_var = $(this).attr('id');	
	$.getJSON( 'http://www.southasia-uni.org/includes/mobileappcontent/get_page.php', {pg_var: pg_var}, function( data ) {
		$("#admContent .content .pg_title").text( data[0].pg_header );
		$("#admContent .content .pg_img").attr( 'src', 'http://www.southasia-uni.org/files/photos/'+ $.trim( data[0].pg_img ) + '.hdq.jpg' );
		$("#admContent .content .pg_content").html( data[0].pg_content );
		$("#admContent .content .pg_content").html( $("#admContent .content .pg_content").text() );
	})
	.done( function(){
		$("#admContent .loading").hide();
		$("#admContent .content").fadeIn();
	});
});

// Business School Page function

$.getJSON( 'http://www.southasia-uni.org/includes/mobileappcontent/get_page.php', { pg_var: 'sch_of_biz' }, function( data ) {
	$("#business_scl_page .content .pg_title").text( data[0].pg_header );
	$("#business_scl_page .content .pg_img").attr( 'src', 'http://www.southasia-uni.org/files/photos/' + $.trim( data[0].pg_img ) + '.hdq.jpg' );
	$("#business_scl_page .content .pg_content").html( data[0].pg_content );
	$("#business_scl_page .content .pg_content").html( $("#business_scl_page .content .pg_content").text() );	
});

//Engineering Page Function
$.getJSON( 'http://www.southasia-uni.org/includes/mobileappcontent/get_page.php', { pg_var: 'sch_of_engr' }, function( data ) {
	$("#engineering_scl_page .content .pg_title").text( data[0].pg_header );
	$("#engineering_scl_page .content .pg_img").attr( 'src', 'http://www.southasia-uni.org/files/photos/' + $.trim( data[0].pg_img ) + '.hdq.JPG' );
	$("#engineering_scl_page .content .pg_content").html( data[0].pg_content );
	$("#engineering_scl_page .content .pg_content").html( $("#engineering_scl_page .content .pg_content").text() );	
});

//Humanities Page Function
$.getJSON( 'http://www.southasia-uni.org/includes/mobileappcontent/get_page.php', { pg_var: 'sch_of_hum' }, function( data ) {
	$("#humanities_scl_page .content .pg_title").text( data[0].pg_header );
	$("#humanities_scl_page .content .pg_img").attr( 'src', 'http://www.southasia-uni.org/files/photos/' + $.trim( data[0].pg_img ) + '.hdq.jpg' );
	$("#humanities_scl_page .content .pg_content").html( data[0].pg_content );
	$("#humanities_scl_page .content .pg_content").html( $("#humanities_scl_page .content .pg_content").text() );	
});

//Public Science Page Function
$.getJSON( 'http://www.southasia-uni.org/includes/mobileappcontent/get_page.php', { pg_var: 'sch_of_ph_ls' }, function( data ) {
	$("#pblic_scl_page .content .pg_title").text( data[0].pg_header );
	$("#pblic_scl_page .content .pg_img").attr( 'src', 'http://www.southasia-uni.org/files/photos/' + $.trim( data[0].pg_img ) + '.hdq.jpg' );
	$("#pblic_scl_page .content .pg_content").html( data[0].pg_content );
	$("#pblic_scl_page .content .pg_content").html( $("#pblic_scl_page .content .pg_content").text() );	
});

$.getJSON ( 'http://www.southasia-uni.org/includes/mobileappcontent/department_page.php', function( data ) {
	
	$.each( data, function(index, val) {
		if( data[index].dept == "School of Business" ){
			$('#dept_page .content .bus_cont ul').append(
				"<li><a href='" + data[index].url + "'>" + data[index].prog + "</a></li>"
			)
		}
		if( data[index].dept == "School of Engineering" ){
			$('#dept_page .content .eng_cont ul').append(
				"<li><a href='" + data[index].url + "'>" + data[index].prog + "</a></li>"
			)
		}
		if( data[index].dept == "School of Public Health & Life Science" ){
			$('#dept_page .content .bublic_cont ul').append(
				"<li><a href='" + data[index].url + "'>" + data[index].prog + "</a></li>"
			)
		}
		if( data[index].dept == "School of Humanities" ){
			$('#dept_page .content .hum_cont ul').append(
				"<li><a href='" + data[index].url + "'>" + data[index].prog + "</a></li>"
			)
		}
		
	});
	/*$.each( data.departments[0].business, function( index, val){
		$('#dept_page .content .bus_cont ul').append(
			"<li>" + val.business + "</li>"
		)
	})
	$.each( data.departments[1].engineering, function( index, val){
		$('#dept_page .content .eng_cont ul').append(
			"<li>" + val.engineering + "</li>"
		)
	})
	$.each( data.departments[2].humanities, function( index, val){
		$('#dept_page .content .hum_cont ul').append(
			"<li>" + val.humanities + "</li>"
		)
	})	
	$.each( data.departments[3].public_health, function( index, val){
		$('#dept_page .content .bublic_cont ul').append(
			"<li>" + val.public_health + "</li>"
		)		
	})*/
});
// Message page function
$("#msgPage ul li a").on( 'click', function(){
	$("#msgContent .loading").show();
	$("#msgContent .content").hide();
	var pg_var_profile = $(this).attr('data-pg-var');
	var pg_var_msg = $(this).attr('id');	

	$.getJSON( 'http://www.southasia-uni.org/includes/mobileappcontent/get_page.php', { pg_var: pg_var_msg }, function( data ) {
		$("#msgContent .content .message .title").text( data[0].pg_header );
		$("#msgContent .content .message .pg_content").html( data[0].pg_content );
		$("#msgContent .content .message .pg_content").html( $("#msgContent .content .message .pg_content").text() );	
	})
	.done( function(){
		$.getJSON( 'http://www.southasia-uni.org/includes/mobileappcontent/get_page.php', { pg_var: pg_var_profile }, function( data ) {
			/*$("#msgContent .content .profile .title").text( data[0].pg_header );*/
			/*if( data[0].pg_var == "vc_pfile" ){
				$("#msgContent .content .profile .title").text( "Profile of VC" );
			} else if( data[0].pg_var == "provc_pfile" ){
				$("#msgContent .content .profile .title").text( "Profile of Pro-VC" );
			}*/
			$("#msgContent .content .profile .pg_img").attr( 'src', 'http://www.southasia-uni.org/files/photos/' + $.trim( data[0].pg_img ) + '.hdq.jpg' );
			$("#msgContent .content .profile .pg_content").html( data[0].pg_content );
			$("#msgContent .content .profile .pg_content").html( $("#msgContent .content .profile .pg_content").text() );	
		})
		
		.done( function(){
			$("#msgContent .loading").hide();
			$("#msgContent .content").fadeIn();
		})

	});
});

// Video page functions
/*dataURL = "http://www.southasia-uni.org/includes/mobileappcontent/video_page.php";
$.getJSON(dataURL, function( vidObj ) {
	$("#video_page .content .loading").show();
	$("#video_page .content .load-more-vid").hide();
	counter = 0;
	$.each( vidObj, function( index, val ) {		
		$("#video_page #videos").append(
			"<li><h3 class='title'>" + vidObj[index].vid_name + "</h3>" + 
			"<div class='vid"+ index + "' id='"+ vidObj[index].vid_id +"'>"+ vidObj[index].vid_embed +"</div>" + 
			"<object class='obj" + index + "' data='#'><param name='allowfullscreen' value='true' /></object>" +
			"</li>"
		);

		if( counter < 2 ){
			$("#homePage .content .videos").append(
				"<div class='item'><h3 class='title'>" + vidObj[index].vid_name + "</h3>" + 
				"<div class='vid"+ index + "' id='"+ vidObj[index].vid_id +"'>"+ vidObj[index].vid_embed +"</div>" + 
				"<object class='obj" + index + "' data='#'><param name='allowfullscreen' value='true' /></object>" +
				"</div>"
			);

			$( "#homePage .videos .vid" + index ).html( $("#homePage .videos .vid" + index ).text() );
			var source = $( "#homePage .videos .vid" + index + " iframe" ).attr( 'src' );
			if( source.substr(0, 5) != "http:"){ source = "http:" + source; }
			$( "#homePage .videos div .obj" + index ).attr( 'data',  source );
		}

		$( "#video_page #videos .vid" + index ).html( $("#video_page #videos .vid" + index ).text() );
		var source = $( "#video_page #videos .vid" + index + " iframe" ).attr( 'src' );
		if( source.substr(0, 5) != "http:"){ source = "http:" + source; }
		$( "#video_page #videos li .obj" + index ).attr( 'data',  source );				

		counter++;
		if( counter == 5 ) return false;
	})	
})
.done( function(){
	$("#video_page .load-more-vid").css( 'visibility', 'visible' );
	$("#homePage .content .videos .sec_title, #homePage .content .view-more-videos").css('display', 'block');		
});

$("#load-vid").on( 'click', function(e){
	e.preventDefault();
	var flag  = false;
	var counter = 0;
	$('#video_page .loading').show();
	var lastID = $('#video_page #videos li:last-child [class*="vid"]').attr('id');
	$.getJSON( dataURL, function( vidObj ) {
		$.each( vidObj, function(index, val) {
			if(  vidObj[index].vid_id == lastID ){
				flag = true;
				return;
			}
			if( flag == true ){
				$("#video_page #videos").append(
					"<li><h3 class='title'>" + vidObj[index].vid_name + "</h3>" + 
					"<div class='vid"+ index + "' id='"+ vidObj[index].vid_id +"'>"+ vidObj[index].vid_embed +"</div>" + 
					"<object class='obj" + index + "' data='#'><param name='allowfullscreen' value='true' /></object>" +
					"</li>"
				);
				$( "#video_page #videos .vid" + index ).html( $("#video_page #videos .vid" + index ).text() );
				var source = $( "#video_page #videos .vid" + index + " iframe" ).attr( 'src' );
				if( source.substr(0, 5) != "http:"){ source = "http:" + source; }
				$( "#video_page #videos li .obj" + index ).attr( 'data',  source );

				counter++;
				if( counter == 5 ) return false;
			}
		})
	})
	.done( function(){
		$('#video_page .loading').fadeOut('fast');
	});
})*/

