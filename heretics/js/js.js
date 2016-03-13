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
var lastDivToLoad = [];

// Functions
$skip.click( function() {
    $intro.stop().animate({
        opacity: "0"
    }, 200, function (){
        $intro.remove();
    });
    $('#page').css({opacity: "0"}).show().delay(200).animate({opacity: "1"}, 200);
    $(this).hide();
    //console.log("Skip Button Pressed");
});
// Function to animate opening sequence - REWRITE
(function( $ ){
    $.fn.introAn = function(waitForIt, startSite) {
        $this = $(this);
        $thisH = $this.children("h1");
        $thisImg = $this.children("img");
        var marH = parseInt($thisImg.css("margin-top"));
        marH = Math.round( 100*marH/$(window).height() );
        //console.log(marH);
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
    var cardNav = "<a class='prevbutton'>Prev</a><a class='closebutton'>Close</a>";
    var cardFade = "<div class='shadow'></div>"
    $(".characters, .definitions").prepend(cardNav).append(cardFade);
    //Build assets
    $('#intro').show();
    $skip.show();
//    $worlds = $("#cosmology a");
    $("#character-app").show();
    $(".characters").hide();
    
    $("#cosmological-map").show();
    $(".definitions").hide();
    
    //Hide/show appropriate sections
    $('#page, #characters, #cosmology, #samples, #author, #contact').hide();
    
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
            //console.log(pageClicked);
            $this.parent().toggleClass("selected");
            $this.parent().siblings().removeClass("selected");
            $("content").hide();
            $(pageClicked).show();
        }
    });
    var startSpeed = 200;
    var transSpeed = 200;
    var delaySpeed = 100;
    anSpeed = 10000;
    $("#modal").on("click", function(event){
        event.preventDefault();
        var getAttrID = event.target.getAttribute("id");
        var getAttrHREF = event.target.getAttribute("href");
        var getAttrClass = event.target.getAttribute("class");
        var getAttrTag = event.target.tagName.toLowerCase();
        if (getAttrID == "modal" || getAttrClass == "closebutton") {
            $("#modal").animate({
                opacity: "0"
            }, startSpeed, function(){
                $this = $(this);
                $this.hide();
                $this.children("div").remove();
            });
// ***************************************  PREV BUTTON  **************************************
        } else if (getAttrClass == "prevbutton" && lastDivToLoad.length>0) {
            $("#modalBox").show().animate({
                opacity: "0", 
                marginLeft: "100%"
            }, transSpeed, "easeInOutCirc", function(){
                $(this).remove();
                $(lastDivToLoad[lastDivToLoad.length-2]).clone().appendTo("#modal").attr("id", "modalBox").css({
                    opacity: "0", 
                    marginRight: "100%"
                }).show().animate({
                    opacity: "1", 
                    marginRight: "0%"
                }, transSpeed, "easeInOutCirc", function(){
                    console.log("an ended");
                });
                if (lastDivToLoad.length>2) {
                    $("#modalBox .prevbutton").css("display", "inline-block");
                } else {
                    $("#modalBox .prevbutton").css("display", "none");
                }
            });
            lastDivToLoad.pop();
// ************************************  LINK TO NEXT CARD  ************************************
        } else {
            if (getAttrTag == "a" && getAttrClass != "closebutton"  && getAttrClass != "prevbutton") {
                var divToLoad = getAttrHREF;
                if ($("#modalBox") && $("#modalBox").length>0) {
                    // ************************************  OLD CARD  ************************************
//                    $("#modalBox").attr("id", "oldBox");
//                    $("#modalBox").stop().remove();
                    $("#modalBox").show().animate({
                        opacity: "0", 
                        marginLeft: "-100%"
                    }, transSpeed, "easeInOutCirc", function(){
                        $(this).remove();
                        console.log("Old Box finished");
                        $(divToLoad).clone().appendTo("#modal").attr("id", "modalBox").css({
                            opacity: "0", 
                            marginLeft: "100%"
                        }).show().animate({
                            opacity: "1", 
                            marginLeft: "0%"
                        }, transSpeed, "easeInOutCirc", function () {
                            console.log("new an finished");
                        });
                        if (lastDivToLoad.length>0) {
                            $("#modalBox .prevbutton").css("display", "inline-block");
                        } else {
                            $("#modalBox .prevbutton").css("display", "none");
                        }
                    });
                    // ************************************  NEW CARD  ************************************
                    $("#modalBox .prevbutton").css("display", "inline-block");
                } else {
                    $(divToLoad).clone().appendTo("#modal").attr("id", "modalBox").css({
                        opacity: "0"
                    }).show().animate({
                        opacity: "1"
                    }, startSpeed, "easeInOutCirc");
                }
                lastDivToLoad.push(divToLoad);
            }
        }
    });
    //REPLACING WITH ABOVE FUNCTION
    $("#page .inpagelink").on("click", function(event){
        event.preventDefault();
        $this = $(this);
        var divToLoad = $this.attr("href");
        $("#modal").show().animate({
            opacity: "1"
        }, startSpeed);
        if ($("#modalBox") && $("#modalBox").length>0) { // <- If model is empty
//            $("#modalBox").attr("id", "oldBox").show();
//            $("#oldBox").animate({
//                opacity: "0", 
//                marginLeft: "-100%"
//            }, anSpeed, "easeInOutCirc", function(){
//                $(this).remove();
//            });
//            $(divToLoad).clone().appendTo("#modal").attr("id", "modalBox").css({
//                opacity: "0", 
//                marginLeft: "100%"
//            }).show().delay(anSpeed/2).animate({
//                opacity: "1", 
//                marginLeft: "0%"
//            }, anSpeed, "easeInOutCirc");
        } else {
            $(divToLoad).clone().appendTo("#modal").attr("id", "modalBox").css({
                opacity: "0"
            }).show().animate({
                opacity: "1"
            }, startSpeed, "easeInOutCirc");
            $("#modalBox .prevbutton").css("display", "none");
        }
        if (lastDivToLoad.length>0) {
            $("#modalBox .prevbutton").css("display", "inline-block");
        } else {
            $("#modalBox .prevbutton").css("display", "none");
        }
        lastDivToLoad.push(divToLoad);
    });
    $("a.char").on("mouseover", function(){
        $this = $(this);
        $this.css({
            zIndex: "100",
            width: "75%",
            height: "75%",
            boxShadow: "0 0 100px " + $this.data("color")
        });
        $("." + $this.data("close")).css({
            zIndex: "99",
            width: "70%",
            height: "70%",
            boxShadow: "0 0 70px " + $this.data("color")
        });
        $("." + $this.data("dist")).css({
            width: "60%",
            height: "60%",
            boxShadow: "0 0 40px " + $this.data("color")
        });
    })
    $("a.char").on("mouseout", function(){
        $this = $(this);
        $this.css({
            zIndex: "1",
            width: "50%",
            height: "50%",
            boxShadow: "0 0 10px black"
        });
        $("." + $this.data("close")).css({
            zIndex: "1",
            width: "50%",
            height: "50%",
            boxShadow: "0 0 10px black"
        });
        $("." + $this.data("dist")).css({
            width: "50%",
            height: "50%",
            boxShadow: "0 0 10px black"
        });
    });
});