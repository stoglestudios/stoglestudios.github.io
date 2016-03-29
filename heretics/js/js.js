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
    [$('#world'), "world", "Where Can Hope Be Found?", "hecate"],
    [$('#all'), "all", "Who Will Control it All?", "caster"],
    [$('#title'), "title", "There Are Two Sides to Every Story...", "heretics"],
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
        $thisTitle = $this.children("#heretics-an");
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
                    //$('#page').fadeIn(2000);        
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
        $thisTitle.children("img").delay(waitForIt).animate({
            margin: "0 .5%"
        }, totaltime);
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
    if (getCookie("seenit") != "true" || getParameterByName("an") == "1") {
        $("#page").hide();
        $('#intro').show();
        $skip.show();
        $('#intro').animate({ 
            backgroundPositionX: '100%',
            backgroundPositionY: '100%',
        }, 28000, function() {
            $('#intro').fadeOut(2000);
            $('.skip').fadeOut(1000);
            $('#page').show();
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
$(".news-carousel").each(function(){
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
        navBuilderString += "<div class='carousel-back car-btn'></div><ul class='slide-btns'>";
        for (i=1;i<=numOfSlides;i++) {
            navBuilderString += "<li class='car-slide-btn car-btn car-btn" + i + "' data-target-slide='.carousel-slide" + i + "'></li>";
            $this.children(".carousel-slide:nth-child(" + i + ")").addClass("carousel-slide"+i).attr("data-target-btn", ".car-btn"+i);
        }
        navBuilderString += "</ul><div class='carousel-playpause car-btn'>";
        navBuilderString += "<div class='carousel-pause'></div>";
        navBuilderString += "<div class='carousel-play'></div></div>";
        navBuilderString += "<div class='carousel-forward car-btn'></div></nav>";
        $this.append(navBuilderString);
        $(".carousel-slide").css("left","100%");
        $(".carousel-slide1").css("left","0");
        $(".car-btn1").addClass("cur-slide");
        for (j=1;j<=numOfSlides;j++) {
            if ($(".carousel-slide"+j).hasClass("first-sample")) {
                $(".car-btn"+j).addClass("first").addClass("cur-pages");
            } else if ($(".carousel-slide"+j).hasClass("second-sample")) {
                $(".car-btn"+j).addClass("second");
            } else if ($(".carousel-slide"+j).hasClass("third-sample")) {
                $(".car-btn"+j).addClass("third");
            }
        }
        $(".carousel-" + carNum + " .carousel-playpause>div").on("click", function(){
            $(this).siblings().show();
            $(this).hide();
        })
        $(".carousel-" + carNum + " .car-slide-btn").on("click", function() {
            $t = $(this);
            if ( $($t.data("target-slide")).css("left") != "0px" ){
                advanceSlideShow( $t.data("target-slide") );
            }
        });
        $(".carousel-" + carNum + " .carousel-back").on("click", function() {
            scrubSlideShow ( false, $(this), true );
        });
        $(".carousel-" + carNum + " .carousel-forward").on("click", function() {
            scrubSlideShow ( true, $(this), true );
        });
    });
    $(".sample-menu li:nth-child(1)").on("click", function(){
        advanceSlideShow( $(".first-sample")[0] );
    });
    $(".sample-menu li:nth-child(2)").on("click", function(){
        advanceSlideShow( $(".second-sample")[0] );
    });
    $(".sample-menu li:nth-child(3)").on("click", function(){
        advanceSlideShow( $(".third-sample")[0] );
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
    $(".sample-menu li:nth-child(1)").addClass("highlighted");
    $(".speech-bubble, .caption-bubble").on("click ", function(e){
        e.stopPropagation();
        $this = $(this);
        $(".speech-text, .caption-text").hide();
        $this.siblings($this.data("bubble")).show();
        var $parent = $this.parents(".news-carousel");
        $parent.children("nav").children(".carousel-playpause").children(".carousel-pause").hide();
        $parent.children("nav").children(".carousel-playpause").children(".carousel-play").show();
    });
    $(".next-bubble").on("click", function(e){ // <----------------------------------------UD:v3
        e.stopPropagation();
        var $this = $(this).parents("p").parent("div");
        var $parent = $this.parents(".news-carousel");
        $parent.children("nav").children(".carousel-playpause").children(".carousel-pause").hide();
        $parent.children("nav").children(".carousel-playpause").children(".carousel-play").show();
        var classString = $this.attr("class");
        var curText = 0;
        var temp = classString.split(" text");
        if ( temp.length>0 ) {
            curText = parseInt(temp[1]) + 1;
        }
        $(".speech-text, .caption-text").hide();
        $this.siblings(".text"+curText).show();
        $this.siblings().removeClass("hl-bubble");
        $this.siblings().each(function(){
            $t = $(this);
            if ( $t.data("bubble") == ".text"+curText ) {
                $t.addClass("hl-bubble");
            } 
        });
    });
    $(".next-page").on("click", function(e){ // <-----------------------------------------------NEW:v3
        e.stopPropagation();
        var $this = $(this).parents(".carousel-slide");
        var $parent = $this.parents(".news-carousel");
        $parent.children("nav").children(".carousel-playpause").children(".carousel-pause").hide();
        $parent.children("nav").children(".carousel-playpause").children(".carousel-play").show();
        advanceSlideShow ( $this.next() )
        $(".speech-text, .caption-text").hide();
    });
    $("body, #samples").on("click", function(){
        $(".speech-text, .caption-text").hide();
    });
    /* SWIPE LEFT / RIGHT */
    $(document).on("touchstart", ".carousel-slide", function(event){ // <----------------------------NEW:v3
        startX = event.originalEvent.touches[0].pageX ? event.originalEvent.touches[0].pageX : 0;
    });
    $(document).on("touchmove", ".carousel-slide", function(event){ // <-----------------------------NEW:v3
        endX = event.originalEvent.touches[0].pageX ? event.originalEvent.touches[0].pageX : 0;
    });
    $(document).on("touchend", ".carousel-slide", function(event){ // <---------------------------NEW:V3 - UD:V4
        var $this = $(this);
        if ( $this.hasClass("carousel-slide1") ){
            var $prev = $(".carousel-slide" + $(".carousel-slide").length );
        } else {
            //the last one
            var $prev = $this.prev();
        }
        if ( $this.next() && $this.next().prop('tagName').toLowerCase() == "img" ) {
            var $next = $(".carousel-slide1");
        } else {
            var $next = $this.next();
        }
        if ( typeof(endX) != "undefined" ) {
            if ( endX-10 > startX ) {
                //alert("Prev Page! - drag to left");
                advanceSlideShow ( $prev )
            } else if ( endX+10 < startX ) {
                //alert("Next Page! - drag to right");
                advanceSlideShow ( $next )
            }
        }
        delete startX;
        delete endX;
    });
    $(document).on("mousedown", ".carousel-slide", function(event){ // <--------------------------NEW:v3
        startMouseX = event.pageX ? event.pageX : 0;
        event.preventDefault();
    });
    $(document).on("mousemove", ".carousel-slide", function(event){ // <--------------------------NEW:v3
        endMouseX = event.pageX ? event.pageX : 0;
    });
    $(document).on("mouseup", ".carousel-slide", function(event){ // <-------------------------NEW:V3 - UD:V4
        var $this = $(this);
        if ( $this.hasClass("carousel-slide1") ){
            var $prev = $(".carousel-slide" + $(".carousel-slide").length );
        } else {
            var $prev = $this.prev();
        }    
        if ( $this.next() && $this.next().prop('tagName').toLowerCase() == "img" ) {
            var $next = $(".carousel-slide1");
        } else {
            var $next = $this.next();
        }
        if ( typeof(endMouseX) != "undefined" ) {
            if ( endMouseX-10 > startMouseX ) {
                //alert("Prev Page! - drag to left");
                advanceSlideShow ( $prev )
            } else if ( endMouseX+10 < startMouseX ) {
                //alert("Next Page! - drag to right");
                advanceSlideShow ( $next )
            }
        }
        delete startMouseX;
        delete endMouseX;
    });
});
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
    $(".sample-menu li").removeClass("highlighted");
    $(".slide-btns li").removeClass("cur-pages");
    if($targetSlide.hasClass("first-sample")){
        $(".sample-menu li:nth-child(1)").addClass("highlighted");
        $(".slide-btns li.first").addClass("cur-pages");
    } else if ($targetSlide.hasClass("second-sample")) {
        $(".sample-menu li:nth-child(2)").addClass("highlighted");
        $(".slide-btns li.second").addClass("cur-pages");
    } else if ($targetSlide.hasClass("third-sample")) {
        $(".sample-menu li:nth-child(3)").addClass("highlighted");
        $(".slide-btns li.third").addClass("cur-pages");
    }
    if ( goForward ) {
        $targetSlide.css("left", "100%").animate({
            left: "0%"
        }, slideTime);
        $currentSlide.animate({
            left: "-100%"
        }, slideTime, function(){
            $(".car-btn").removeClass("cur-slide");
            $($targetSlide.data("target-btn")).addClass("cur-slide");
        });
    } else {
        $targetSlide.css("left", "-100%").animate({
            left: "0%"
        }, slideTime);
        $currentSlide.animate({
            left: "100%"
        }, slideTime, function(){
            $(".car-btn").removeClass("cur-slide");
            $($targetSlide.data("target-btn")).addClass("cur-slide");
        });
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
    $(".sample-menu li").removeClass("highlighted");
    $(".slide-btns li").removeClass("cur-pages");
    if ( forward ) {
        $currentSlide.css("left", "0%").animate({
            left: "-100%"
        }, slideTime);
        $next = $currentSlide.siblings(".carousel-slide" + nextChildNum );
        $next.css("left", "100%").animate({
            left: "0%"
        }, slideTime, function(){
            $(".car-btn").removeClass("cur-slide");
            $($next.data("target-btn")).addClass("cur-slide");
        });
        if($next.hasClass("first-sample")){
            $(".sample-menu li:nth-child(1)").addClass("highlighted");
            $(".slide-btns li.first").addClass("cur-pages");
        } else if ($next.hasClass("second-sample")) {
            $(".sample-menu li:nth-child(2)").addClass("highlighted");
            $(".slide-btns li.second").addClass("cur-pages");
        } else if ($next.hasClass("third-sample")) {
            $(".sample-menu li:nth-child(3)").addClass("highlighted");
            $(".slide-btns li.third").addClass("cur-pages");
        }
    } else {
        $currentSlide.css("left", "0%").animate({
            left: "100%"
        }, slideTime);
        $prev = $currentSlide.siblings(".carousel-slide" + prevChildNum );
        $prev.css("left", "-100%").animate({
            left: "0%"
        }, slideTime, function(){
            $(".car-btn").removeClass("cur-slide");
            $($prev.data("target-btn")).addClass("cur-slide");
        });
        if($prev.hasClass("first-sample")){
            $(".sample-menu li:nth-child(1)").addClass("highlighted");
            $(".slide-btns li.first").addClass("cur-pages");
        } else if ($prev.hasClass("second-sample")) {
            $(".sample-menu li:nth-child(2)").addClass("highlighted");
            $(".slide-btns li.second").addClass("cur-pages");
        } else if ($prev.hasClass("third-sample")) {
            $(".sample-menu li:nth-child(3)").addClass("highlighted");
            $(".slide-btns li.third").addClass("cur-pages");
        }
    }
    if ( press ) {
        $parent.children("nav").children(".carousel-playpause").children(".carousel-pause").hide();
        $parent.children("nav").children(".carousel-playpause").children(".carousel-play").show();
    }
}

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
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    url = url.toLowerCase(); // This is just to avoid case sensitiveness  
    name = name.replace(/[\[\]]/g, "\\$&").toLowerCase();// This is just to avoid case sensitiveness for query parameter name
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}