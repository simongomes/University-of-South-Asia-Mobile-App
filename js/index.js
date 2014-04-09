// Pannel script 
var panel = '<div data-role="panel" id="mypanel" data-display="overlay" style="background:#BC242A;">' + '<ul class="panel_nav"><li><a href="#homePage">Home</a></li><li><a href="#photo_page">Photo Gallery</a></li><li><a href="#page_4">Video Gallery</a></li><li><a href="#page_5">One Another Page</a></li></ul>' + '</div>';
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
		$.each( data, function(index, val) {
			if( data[index].img_active == "yes" ){
				$('#photo_page #photo_container').append("<li class='swiper-slide'><img src='http://www.southasia-uni.org/files/photos/" + data[index].img_filename + ".hdq." + data[index].img_extension + "' style='width: 100%;'></li>" );
			}
		});
		/*var d = new Date( data[10].img_date * 1000 );
			console.log( d.getDate() + '/' + d.getMonth()+1 + '/' + d.getFullYear());*/	
	}
		
})
.done(function() {
	var mySwiper = $('.swiper-container').swiper({
		mode:'horizontal',
    	loop: true
	});		  
  $('.prev').on( 'click', function(){
		mySwiper.swipePrev();
	})
  $('.next').on( 'click', function(){
		mySwiper.swipeNext();
	})
});


/*$(function(){
	var mySwiper = $('.swiper-container').swiper({
    loop: true,
    autoResize:true
    //etc..
  });		  
  $('.prev').on( 'click', function(){
		mySwiper.swipePrev();
	})
  $('.next').on( 'click', function(){
		mySwiper.swipeNext();
	})
		
});*/
