//Authored by Brandon Gaius Ogle

//STUFF TO DO
//1. Have jQuery turn off WS -> this way if JS is turned off they will go right to the site

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
// Function to animate opening sequence - REWRITE
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
                width: "80%",
                paddingLeft: "10%"
            }, totaltime);
        }
        return this;
   }; 
})( jQuery );

// Document ready
$(document).ready(function(){
    //Build assets
    $('#intro').css("display", "inline-block").append($skip);
    $worlds = $("#cosmology a");
    
    $(".definitions").addClass("viewdef").hide();
    
    //Hide/show appropriate sections
    $('#page, #characters, #cosmology, #author, #contact').hide();
    
    //Initiate animated opener sections -> REWRITE
    $('#intro').animate({ 
        backgroundPositionX: '100%',
        backgroundPositionY: '100%',
    }, 24000, function() {
        $('#intro').fadeOut(2000);
    });
    for (var i=0;i<$openers.length;i++) {
        var j = Math.floor(i/($openers.length-1)) ? true : false;
        $openers[i][0].introAn(i*5000, j);
    }
    //Toggle Sections
    $tabs.click(function(event) {
        $this = $(this);
        event.preventDefault();
        if ( !$this.parent().hasClass("selected") ) {
            var pageClicked = $this.html().toLowerCase();
            pageClicked = "#" + pageClicked;
            console.log(pageClicked);
            $this.parent().toggleClass("selected");
            $this.parent().siblings().removeClass("selected");
            $("content").hide();
            $(pageClicked).show();
        }
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