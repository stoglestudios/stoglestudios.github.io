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
var $intro = $('#intro');
var $skip = $(".skip");
var $tabs = $("nav li a");

// Functions
$skip.click( function() {
    $intro.stop().animate({
        opacity: "0"
    }, 200, function (){
        $intro.remove();
    });
    $('#page').css({opacity: "0"}).show().delay(200).animate({opacity: "1"}, 200);
    $(this).hide();
    console.log("Skip Button Pressed");
});
// Function to animate opening sequence - REWRITE
(function( $ ){
    $.fn.introAn = function(waitForIt, startSite) {
        $this = $(this);
        $thisH = $this.children("h1");
        $thisImg = $this.children("img");
        var marH = parseInt($thisImg.css("margin-top"));
        marH = Math.round( 100*marH/$(window).height() );
        console.log(marH);
        var durationOS = 2000;
        var fadeTime = 2000;
        var totaltime = durationOS + fadeTime*2;
        $this.show();
        $this.delay(waitForIt).animate({ 
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
        if ( $thisH.css("text-align") !== "center" ) {
            $thisH.delay(waitForIt).animate({ 
                paddingLeft: '30%',
            }, totaltime);
            
            $thisImg.delay(waitForIt).animate({
                width: "70%",
                marginTop: "0vh"
            }, totaltime);
        }
        return this;
   }; 
})( jQuery );

// Document ready
$(document).ready(function(){
    //Build assets
    $('#intro').show();
    $skip.show();
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
//    $worlds.on("click", function(evt) {
//        $("#cosmological-map").css("opacity", ".5");
//        var idme = $(this).attr("href");
//        $(idme).show();
//        $(idme).siblings(".definitions").hide();
//    });
//    $(".backbutton").on("click", function(evt) {
//        $("#cosmological-map").css("opacity", "1");
//        //$(".definitions").hide().removeClass("viewdef");
//    });
    $("#modal").on("click", function(event){

        event.preventDefault();
        var getAttrID = event.target.getAttribute("id");
        var getAttrHREF = event.target.getAttribute("href");
        var getAttrTag = event.target.tagName.toLowerCase();
        if (getAttrID == "modal" ) {
            $("#modal").animate({opacity: "0"}, 200, function(){
                $this = $(this);
                $this.hide();
                $this.children("div").remove();
            });
        } else {
            console.log("Is: " + getAttrTag + ", href: " + getAttrHREF);
            if (getAttrTag == "a") {
                var divToLoad = getAttrHREF;
                
                if ($("#modalBox") && $("#modalBox").length>0) {
                    $("#modalBox").attr("id", "oldBox");
                    $("#oldBox").show().animate({opacity: "0", width: "40%", height: "40%"}, 200, function(){
                        $(this).remove();
                        $(divToLoad).clone().appendTo("#modal").attr("id", "modalBox").show().css({opacity: "0", width: "95%", maxWidth: "900px"}).animate({opacity: "1", width: "90%", maxWidth:"800px"}, 200);
                    });
                } else {
                    $(divToLoad).clone().appendTo("#modal").attr("id", "modalBox").show().css({opacity: "0", width: "95%", maxWidth: "900px"}).animate({opacity: "1", width: "90%", maxWidth:"800px"}, 200);
                }
            }
        }
    });
    //REPLACING WITH ABOVE FUNCTION
    $(".inpagelink").on("click", function(event){
        event.preventDefault();
        $this = $(this);
        var divToLoad = $this.attr("href");
        var parentID = $this.parents("div").attr("id");
        console.log("Link: " + divToLoad + " - Parent: " + parentID );
        //
        $("#modal").show().animate({opacity: "1"}, 200);
        
        if ($("#modalBox") && $("#modalBox").length>0) {
            $("#modalBox").attr("id", "oldBox").show();
            $("#oldBox").animate({opacity: "0"}, 200, function(){
                $(this).remove();
            });
        }  
        $(divToLoad).clone().appendTo("#modal").attr("id", "modalBox").show().css({opacity: "0", width: "95%", maxWidth: "900px"}).animate({opacity: "1", width: "90%", maxWidth:"800px"}, 200);
    });
});