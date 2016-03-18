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
    $('#page').css({
        opacity: "0"
    }).show().delay(200).animate({
        opacity: "1"
    }, 200);
    $(this).hide();
    setCookie("seenit", "true", 1);
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
    $(".characters, .definitions").prepend(cardNav);
    // Build assets
    
    $("#character-app").show();
    $(".characters").hide();
    $("#sample-menu").show();
    $("#cosmological-map").show();
    $(".definitions").hide();
    
    // Hide/show appropriate sections
    $('#characters, #cosmology, #samples, #author, #contact').hide();
    
    //Initiate animated opener sections -> REWRITE
    if (getCookie("seenit") != "true") {
        $("#page").hide();
        $('#intro').show();
        $skip.show();
        $('#intro').animate({ 
            backgroundPositionX: '100%',
            backgroundPositionY: '100%',
        }, 24000, function() {
            $('#intro').fadeOut(2000);
            // setCookie("seenit", "true", 1);
        });
        for (var i=0;i<$openers.length;i++) {
            var j = Math.floor(i/($openers.length-1)) ? true : false;
            $openers[i][0].introAn(i*5000, j);
        }
    } else {
        if (window.location.href.indexOf("#") > -1){
            var getURL = "#" + window.location.href.split("#")[1];
            $("content").hide();
            $(getURL).show();
            //$('#page').scrollTop(0);
        } else {
            var getURL = "#premise";
            $("content").hide();
            $(getURL).show();
        }
        $("nav ul li").each(function(){
            $this = $(this);
            if ( $this.children("a").attr("href") == getURL ) {
                $this.addClass("selected");
            } else {
                $this.removeClass("selected");
            }
        });
    }
    //Toggle Sections
    $tabs.click(function(event) {
        $this = $(this);
        //event.preventDefault();
        if ( !$this.parent().hasClass("selected") ) {
            var pageClicked = $this.html().toLowerCase();
            pageClicked = "#" + pageClicked;
            // console.log(pageClicked);
            $this.parent().toggleClass("selected");
            $this.parent().siblings().removeClass("selected");
            $("content").hide();
            $(pageClicked).show();
        }
    });
    var startSpeed = 200;
    var transSpeed = 200;
    var delaySpeed = 100;
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
            $("body").css("overflow-y", "auto");
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
                lastDivToLoad.pop();
                if (lastDivToLoad.length>1) {
                    $("#modalBox .prevbutton").css("display", "inline-block");
                } else {
                    $("#modalBox .prevbutton").css("display", "none");
                }
            });
// ************************************  LINK TO NEXT CARD  ************************************
        } else {
            if (getAttrTag == "a" && getAttrClass != "closebutton"  && getAttrClass != "prevbutton") {
                var divToLoad = getAttrHREF;
                if ($("#modalBox") && $("#modalBox").length>0) {
                    // ************************************  OLD CARD  ************************************
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
                        $("#modalBox .prevbutton").css("display", "inline-block");
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
    $("#page .inpagelink").on("click touchend", function(event){
        event.preventDefault();
        $this = $(this);
        var divToLoad = $this.attr("href");
        $("#modal").show().animate({
            opacity: "1"
        }, startSpeed);
        $(divToLoad).clone().appendTo("#modal").attr("id", "modalBox").css({
            opacity: "0"
        }).show().animate({
            opacity: "1"
        }, startSpeed, "easeInOutCirc");
        $("#modalBox .prevbutton").css("display", "none");
        if (lastDivToLoad.length>0) {
            $("#modalBox .prevbutton").css("display", "inline-block");
        } else {
            $("#modalBox .prevbutton").css("display", "none");
        }
        lastDivToLoad.push(divToLoad);
        $("body").css("overflow-y", "hidden");
    });
    $("a.char").on("mouseover touchstart", function(event){
        event.preventDefault();
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
    $("a.char").on("mouseout touchend", function(event){
        event.preventDefault();
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
    $(".sample-carousel").each(function(){
        if(typeof carNum !== 'undefined'){
            carNum++;
        } else {
            carNum=1;
        }
        console.log(carNum);
        var $this = $(this);
        $this.addClass("carousel-"+carNum);
        var numOfSlides = $this.children("div").length;
        console.log("Slides: " + numOfSlides);
        var navBuilderString = "<nav class='carousel-controls'>";
        navBuilderString += "<div class='carousel-back car-btn'></div><ul>";
        for (i=1;i<=numOfSlides;i++) {
            navBuilderString += "<li class='car-slide-btn car-btn' data-target-slide='.carousel-slide" + i + "'></li>";
            $this.children(".carousel-slide:nth-child(" + i + ")").addClass("carousel-slide"+i);
        }
        navBuilderString += "</ul><div class='carousel-playpause car-btn'>";
        navBuilderString += "<div class='carousel-pause'></div>";
        navBuilderString += "<div class='carousel-play'></div></div>";
        navBuilderString += "<div class='carousel-forward car-btn'></div></nav>";
        $this.prepend(navBuilderString);
        $(".carousel-" + carNum + " .carousel-playpause>div").on("click", function(){
            $(this).siblings().show();
            $(this).hide();
        })
        $(".carousel-" + carNum + " .car-slide-btn").on("click", function() {
            $t = $(this);
            advanceSlideShow( $t.data("target-slide") );
        });
        $(".carousel-" + carNum + " .carousel-back").on("click", function() {
            scrubSlideShow ( false, $(this), true );
        });
        $(".carousel-" + carNum + " .carousel-forward").on("click", function() {
            scrubSlideShow ( true, $(this), true );
        });
    });
    var slideShowID = window.setInterval(function(){
        $(".news-carousel").each(function(){
            $this = $(this);
            $playpause = $this.children("nav").children(".carousel-playpause");
            $pause = $playpause.children(".carousel-pause");
            if ( $pause.is(":visible") ) {
                scrubSlideShow ( true, $playpause, false );
            }
        });
    }, 5000);
});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
var slideTime = 200;
function advanceSlideShow ( target ) {
    var $targetSlide = $( target );
    var $parent = $targetSlide.parent();
    $parent.children("nav").children(".carousel-playpause").children(".carousel-pause").hide();
    $parent.children("nav").children(".carousel-playpause").children(".carousel-play").show();
    var $currentSlide;
    $targetSlide.siblings("div").each( function() {
        if ( $(this).css("left") == "0px" ) {
            $currentSlide = $( this );
        }
    });
    var goForward = true;
    if ( $parent.children("div").index( $targetSlide ) < $parent.children("div").index( $currentSlide ) ) {
        goForward = false;
    }
    if ( goForward ) {
        $targetSlide.css("left", "100%").animate({
            left: "0%"
        }, slideTime);
        $currentSlide.animate({
            left: "-100%"
        }, slideTime);
    } else {
        $targetSlide.css("left", "-100%").animate({
            left: "0%"
        }, slideTime);
        $currentSlide.animate({
            left: "100%"
        }, slideTime);
    }
}
function scrubSlideShow ( forward, obj, press ) {
    var $button = obj;
    var $parent = obj.parent().parent();
    var $currentSlide = $parent.children(".carousel-slide1");
    $parent.children("div").each( function() {
        if ( $(this).css("left") == "0px" ) {
            $currentSlide = $( this );     
        }
    });
    var childNumber = $parent.children("div").index( $currentSlide ) + 1;
    var totalNumber = $parent.children("div").length;
    var $next;
    var $prev;
    var prevChildNum;
    var nextChildNum;
    if ( childNumber > 1 ) {
        prevChildNum = childNumber -1;
    } else {
        prevChildNum = totalNumber;
    }
    if ( childNumber < totalNumber ) {
        nextChildNum = childNumber + 1;
    } else {
        nextChildNum = 1;
    }
    if ( forward ) {
        $currentSlide.css("left", "0%").animate({
            left: "-100%"
        }, slideTime);
        $next = $currentSlide.siblings(".carousel-slide" + nextChildNum );
        $next.css("left", "100%").animate({
            left: "0%"
        }, slideTime);
    } else {
        $currentSlide.css("left", "0%").animate({
            left: "100%"
        }, slideTime);
        $prev = $currentSlide.siblings(".carousel-slide" + prevChildNum );
        $prev.css("left", "-100%").animate({
            left: "0%"
        }, slideTime);
    }
    if ( press ) {
        $parent.children("nav").children(".carousel-playpause").children(".carousel-pause").hide();
        $parent.children("nav").children(".carousel-playpause").children(".carousel-play").show();
    }
}