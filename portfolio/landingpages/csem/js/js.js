/**
 * Audio player
 * The audio player element is accessible via jwplayer("movie-audio-player").
 * For example, jwplayer("movie-audio-player").pause() would pause the player.
 *
 * For full javascript API documentation for the player, see http://www.longtailvideo.com/support/jw-player/28851/javascript-api-reference
 *
 * Replay video
 * If you call the javascript function video_repla() it'll reset everything and restart the process.
 * So, <a href='javascript:video_replay();'>Replay</a> would do the trick.
 *
 * Path
 * The 'path' javascript variable points to the unzipped folder where all the data for this call to action is stored.
 * You must use 'path' when referencing URLs in this javascript file (you can use relative paths in the css.css file though).
 */

// Variables
var contactStart = 0; 
var contactEnd = 0;

// Document ready
$(document).ready(function() {
	setTimeout(function() {
	    movie.player.addListener('time', function(time) {
			console.log('time:'+time);
			narUpdatedMovie(time);
		});
	}, 5000);
	
	// Initialize placeholders for old browsers
	$('input, textarea').placeholder();

	// Form Handling
	$('.form-cta-wrap form').unbind(); // in case the replay button is pressed
    $('.form-cta-wrap form').on('submit', function(e){
        e.preventDefault ? e.preventDefault() : e.returnValue = false; // prevent action catch for ie
       
        var inputs = $(this).serialize();
		
		$.getJSON("http://www.myimpactmovie.com/?"+inputs+"&jsoncallback=?", function(data){
			$('.form-cta').slideUp();
			$('.form-cta-thank').slideDown();
		});
    });

    $('.form-return').on('click', function(e) {
    	e.preventDefault ? e.preventDefault() : e.returnValue = false;
		$('.form-cta-thank').slideUp();
    	$('.form-cta').slideDown();
    });
	movie.on_video_chapter(function(chapter) {
		$('.movie-chapters li a').removeClass('chapter-selected');
		$('.chapter'+chapter).addClass('chapter-selected');
		currentChapter = chapter;
		var container = $('.movie-chapters');
		var scrollTo = $('.chapter'+chapter);
		container.animate({
			scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
		});
	});

});

function narUpdatedMovie(position) {
	//debug('position: '+position);
	
	if (position > contactStart && position < contactEnd) {
		//$('.action-button').addClass('active');
	} else {
		//$('.action-button').removeClass('active');
	}
}

// Tel-links should not display errors
if (!navigator.userAgent.match(/(mobile)/gi)) {
    $('a[href^=tel]').click(function(e){
        e.preventDefault();
    });
}