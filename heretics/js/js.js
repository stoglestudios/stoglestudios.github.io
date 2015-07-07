//Authored by Brandon Gaius Ogle

//STUFF TO DO
//1. Have jQuery turn off WS -> this way if JS is turn off they will go right to the site

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
var $intro = $("<div></div>");
var $skip = $("<span class='skip'>Skip</span>");
var $tabs = $("nav li a");

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
        $(this).show();
        $(this).delay(waitForIt).animate({ 
            opacity: 1,
        }, fadeTime).delay(durationOS).animate({
            opacity: 0,
        }, fadeTime,
            function() {
                if (startSite) {
                    $('#intro').hide();
                    $('#page').fadeIn(2000);        
                    $skip.hide();
                    console.log("Opening Animation finished");
                }
            }
        );
        if ( $(this).children('h1').css("text-align") !== "center" ) {
            $(this).children('h1').delay(waitForIt).animate({ 
                paddingLeft: '30%',
            }, totaltime);
            $(this).children('img').delay(waitForIt).animate({
                width: "75vh"
            }, totaltime);
        }
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


// Document ready
$(document).ready(function(){
    //Build assets
    $('#intro').css("display", "inline-block");
    $('#intro').append($skip);
    $worlds = $("#cosmology a");
    
    $(".definitions").addClass("viewdef");
    $(".definitions").hide();
    
    //Hide/show appropriate sections
    $('#page').hide();
    $('#characters').hide();
    $('#cosmology').hide();
    $('#author').hide();
    $('#contact').hide();
    
    //Initiate animated opener sections
    $('#intro').animate({ 
        backgroundPositionX: '100%',
        backgroundPositionY: '100%',
    }, 24000, function() {
        $('#intro').fadeOut(2000);
    });
    $openers[0][0].introAn(0);
    $openers[1][0].introAn(5000);
    $openers[2][0].introAn(10000);
    $openers[3][0].introAn(15000);
    $openers[4][0].introAn(20000, true);
    
    //Toggle Sections
    $tabs.click(function(event) {
        event.preventDefault();
        var pageClicked = $(this).html().toLowerCase();
        pageClicked = "#" + pageClicked;
        console.log(pageClicked);
        $(this).parent().toggleClass("selected");
        $(this).parent().siblings().removeClass("selected");
        $("content").hide();
        $(pageClicked).show();
    });
    $worlds.on("click", function(evt) {
        $("#cosmological-map").css("opacity", ".5");
        var idme = $(this).attr("href");
        $(idme).show();
        $(idme).siblings(".definitions").hide();
    });
    $(".backbutton").on("click", function(evt) {
        $("#cosmological-map").css("opacity", "1");
        //$(".definitions").hide().removeClass("viewdef");
    });
});