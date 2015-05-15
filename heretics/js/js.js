//Authored by Brandon Gaius Ogle

//STUFF TO DO
//1. Have jQuery turn off WS -> this way if JS is turn off they will go right to the site

//2. Have jQuery build Opening AN
    //1.1 create 5 div's
    //1.2 add bg to div's
    //1.3 add h1's to div's
    //1.4 Build a 'Skip' Button

// Variables
var contactStart = 0;

// Objects
var $evil = $('#evil');
var $love = $('#love');
var $hero = $('#hero');
var $world = $('#world');
var $all = $('#all');
var $skip = $("<button>skip</button>");

// Adding elements
$('#intro').append($skip);
$skip.click( function() {
    $('#intro').hide();
    $('#page').show();
    console.log("Skip Button Pressed");
});

// Functions
(function( $ ){
    $.fn.introAn = function(waitForIt) {
        var durationOS = 2000;
        var fadeTime = 2000;
        $(this).delay(waitForIt).animate({ 
            opacity: 1,
        }, fadeTime).delay(durationOS).animate({
            opacity: 0,
        }, fadeTime);
        $(this).children('h1').delay(waitForIt).animate({ 
            paddingLeft: '20%',
        }, 6000);
        console.log("IntroAn running for: " + this);
        return this;
   }; 
})( jQuery );

// Document ready
$(document).ready(function(){
    $('#page').hide();
    $('#intro').animate({ 
        backgroundPositionX: '100%',
        backgroundPositionY: '100%',
    }, 26000);
    
    $evil.introAn(0);
    $love.introAn(5000);
    $hero.introAn(10000);
    $world.introAn(15000);
    $all.introAn(20000);

    $('#page').delay(25000).animate({ 
        opacity: 1,
    }, 2000);
});