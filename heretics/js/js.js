//Authored by Brandon Gaius Ogle

// Variables
var contactStart = 0;

// Document ready
$(document).ready(function(){
    $('#intro').animate({ 
        backgroundPositionX: '100%',
        backgroundPositionY: '100%',
    }, 26000);

    $('#evil').animate({ 
        opacity: 1,
    }, 2000).delay(2000).animate({
        opacity: 0,
    }, 2000);
    
    $('#evil h1').animate({ 
        paddingLeft: '20%',
    }, 6000);
    
    $('#love').delay(5000).animate({ 
        opacity: 1,
    }, 2000).delay(2000).animate({
        opacity: 0,
    }, 2000);
    
    $('#love h1').delay(5000).animate({ 
        paddingLeft: '20%',
    }, 6000);
    
    $('#hero').delay(10000).animate({ 
        opacity: 1,
    }, 1000).delay(2000).animate({
        opacity: 0,
    }, 2000);
    
    $('#hero h1').delay(10000).animate({ 
        paddingLeft: '20%',
    }, 6000);
    
    $('#world').delay(15000).animate({ 
        opacity: 1,
    }, 2000).delay(2000).animate({
        opacity: 0,
    }, 2000);
    
    $('#world h1').delay(15000).animate({ 
        paddingLeft: '20%',
    }, 6000);
    
    $('#all').delay(20000).animate({ 
        opacity: 1,
    }, 2000).delay(2000).animate({
        opacity: 0,
    }, 2000);
    
    $('#all h1').delay(20000).animate({ 
        paddingLeft: '20%',
    }, 6000);
    
    $('#page').delay(25000).animate({ 
        opacity: 1,
    }, 2000);
});
/*
$(document).ready(function () {
	$("#page").animate({
        background-position: -100% -100%,
    }, 500);
    //alert('Functioning!');
    $("#evil").fadeOut;
    $("body").css({"backgroundPosition": "right bottom"});
	//$("#website").delay(1000).animate( {opacity: 1}, 500);
});
function narUpdated(position) {
	
	if (2 > 1) {
		$("#contact").css({"backgroundPosition": "right top"});
	} else {
		$("#contact").css({"backgroundPosition": "left top"});
	}
}
*/