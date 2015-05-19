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
var $openers = [
    [$('#evil'), "evil", "What Does it Mean to be Evil?", "beast"],
    [$('#love'), "love", "When is Love too Powerfull?", "johnny"],
    [$('#hero'), "hero", "When Does One Become a Hero?", "kingsley"],
    [$('#world'), "world", "Where Will be the Final Battle?", "hecate"],
    [$('#all'), "all", "And Who Will Control it All?", "caster"]
];
var $skip = $("<button>skip ></button>");
var $tabs = $("nav li");

// Functions
$skip.click( function() {
    $('#intro').hide();
    $('#page').show();
    console.log("Skip Button Pressed");
});
(function( $ ){
    $.fn.introAn = function(waitForIt, startSite) {
        var durationOS = 2000;
        var fadeTime = 2000;
        var totaltime = durationOS + fadeTime*2;
        $(this).delay(waitForIt).animate({ 
            opacity: 1,
        }, fadeTime).delay(durationOS).animate({
            opacity: 0,
        }, fadeTime
            , function() {
                if (startSite) {
                    $('#intro').hide();
                    $('#page').show();
                    $skip.hide();
                    console.log("Opening Animation finished");
                }
            }
        );
        $(this).children('h1').delay(waitForIt).animate({ 
            paddingLeft: '20%',
        }, totaltime);
        $(this).children('img').delay(waitForIt).animate({ 
            width: '90%',
        }, totaltime);
        return this;
   }; 
})( jQuery );

// Adding elements
/*
for (i=0;i<$openers.length;i++) {
    $('#intro').append("<div id='" + $openers[i][1] + "'></div>");
    $("#" + $openers[i][1]).append("<h1>" + $openers[i][2] + "</h1>");
    $("#" + $openers[i][1]).append("<img src='images/" + $openers[i][3] + ".png'></img>");
    $("#" + $openers[i][0]).introAn(i*5000);
}*/
$('#intro').append($skip);

// Document ready
$(document).ready(function(){
    //Hide/show appropriate sections
    $('#page').hide();
    $('#characters').hide();
    $('#cosmology').hide();
    $('#author').hide();
    $('#contact').hide();
    $('#intro').animate({ 
        backgroundPositionX: '100%',
        backgroundPositionY: '100%',
    }, 26000);
    
    //Initiate animated opener sections
    $openers[0][0].introAn(0);
    $openers[1][0].introAn(5000);
    $openers[2][0].introAn(10000);
    $openers[3][0].introAn(15000);
    $openers[4][0].introAn(20000, true);
    
    //Toggle Sections
    $tabs.click(function() {
        var pageClicked = $(this).html().toLowerCase();
        pageClicked = "#" + pageClicked;
        console.log(pageClicked);
        $(this).toggleClass("selected");
        $(this).siblings().removeClass("selected");
        $("content").hide();
        $(pageClicked).show();
    });
    
    
    
    //$('#page').delay(25000).animate({ 
    //    opacity: 1,
    //}, 2000);
});