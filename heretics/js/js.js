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
    $('#intro').css("display", "inline-block").append($skip);
    $worlds = $("#cosmology a");
    
    $(".definitions").addClass("viewdef").hide();
    
    //Hide/show appropriate sections
    $('#page, #characters, #cosmology, #author, #contact').hide();
    
    //Initiate animated opener sections
    $('#intro').animate({ 
        backgroundPositionX: '100%',
        backgroundPositionY: '100%',
    }, 24000, function() {
        $('#intro').fadeOut(2000);
    });
    for (var i=0;i<5;i++) {
        var j = Math.floor(i/4) ? true : false;
        $openers[i][0].introAn(i*5000, j);
    }
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
    $("*").each(function(){
        $this = $(this);
        if ( $this.data("alert") && $this.data("alert").toString().length >0){
            var continueTo = $this.attr("href");
            var modalCode = "<div id='intersession'><span></span><div class='alertBox'><h1></h1><p></p><button class='cancel'>Cancel</button><button class='continue'>Continue</button></div></div>";
            $("body").append(modalCode);
            console.log("AlertBox Created");
            $("#intersession").css({
                position: "fixed",
                zIndex: "10101",
                left: "0",
                top:"0",
                width: "100%",
                height: "100vh",
                minHeight:"100%",
                backgroundColor: "black",
                backgroundColor: "rgba(0,0,0,.8)",
                display: "none"
            });
            $("#intersession span").css({
                display: "inline-block",
                height: "100vh",
                minHeight: "100%",
                lineHeight: "100%",
                verticalAlign: "middle",
                width: "0"
            });
            $("#intersession button").css({
                padding: "5px 10px",
                margin: "20px 20px 0 0"
            });
            $("#intersession .alertBox").css({
                maxWidth: "300px",
                backgroundColor: "white",
                color: "black",
                padding: "20px"
            });
            $(".alertBox h1").text("Greetings");
            $(".alertBox p").text("This site is currently in flight. Please be aware that there may be bugs or incomplete functionality. That said, reviewing work in progress is arguably more important in understanding me and my workforw than completed projects. I invite you to play around, view code, and leave feedback.");
            $this.on("click", function(ev) {
                console.log("AlertBox Button Clicked");
                ev.preventDefault();
                $("#intersession").css({
                    display: "inline-block"
                });
            });
            $("button.cancel").on("click", function(){
                console.log("Cancel");
                $(this).parent().parent().hide();
            });
            $("button.continue").on("click", function(){
                console.log("Continue to " + continueTo);
                $(this).parent().parent().hide();
                window.open( continueTo );
            });
        }
    });
});