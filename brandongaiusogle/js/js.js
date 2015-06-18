/*
    Authored by Brandon Gaius Ogle
*/
//-->Global Vars
var currentSection = "one";
var sections = ["#one", "#two", "#three", "#four", "#five"];
var scrollTest = true;
var inertialTest = true;
var ts;
 
//-->Functions

function scrollPage(oe_wd, oe_d, touchUp) {
    if (scrollTest && inertialTest) {
        scrollTest = false;
        inertialTest = false;
        var scrollUp;
        var scrollTo;
        //deturnmin UP or DOWN
        if (oe_wd && oe_wd >= 0) {
            scrollUp = true; // UP
        } else if (oe_d && oe_d <= 0) {
            scrollUp = true; // UP
        } else if (touchUp) {
            scrollUp = true; // UP
        } else {
            scrollUp = false; // DOWN
        }
        // get current scroll spot
        var documentScroll = $(document).scrollTop();
        var winHeight = $(window).height();
        var scrollUpTo;
        var scrollDownTo;
        console.log("Window's Scroll Position: " + documentScroll);
        console.log("Window's Height: " + winHeight);
        //figure out where to scroll to from current spot 
        for (var i=0; i<sections.length; i++) {
            var posTops = $(sections[i]).offset().top;
            if (posTops >= documentScroll && posTops < documentScroll + winHeight) {
                if (sections[i-1]) {
                    scrollUpTo = sections[i-1];
                } else {
                    scrollUpTo = sections[0];
                }
                if (sections[i+1]) {
                    scrollDownTo = sections[i+1];
                } else {
                    scrollDownTo = sections[sections.length-1];
                }
            }
            console.log(sections[i] + "'s Position: " + posTops);
        }
        if (scrollUp) {
            console.log("Scroll up to " + scrollUpTo);
            scrollTo = scrollUpTo;
        } else {
            console.log("Scroll down to " + scrollDownTo);
            scrollTo = scrollDownTo;
        }
        console.log("\n\n\n----------------END-----------------\n\n\n");
        $('html, body').animate({
            scrollTop: $(scrollTo).offset().top
        }, 1000, function () {
            scrollTest = true;
            
        });
    }
}

$(document).ready(function() {
    $(".jumpdown").click(function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        $('html, body').animate({
            scrollTop:              $(this).parents(".section").next().offset().top
        }, 1000);
    });
    $(".jumpup").click(function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        $('html, body').animate({
            scrollTop: 0//$(this).parents("html").offset().top
        }, 2000);
        $(this).parents(".section").children("h1").css("color", "black");
    });
    $(window).on("mousewheel", function(event) {
        if (event.target.id == 'el') return;
        event.preventDefault();
        event.stopPropagation();
        scrollPage(event.originalEvent.wheelDelta, event.originalEvent.detail, false);
        var scrollBuffer = setTimeout(function(){
            inertialTest = true;
            clearTimeout(scrollBuffer);
        }, 2000);
    }).on("DOMMouseScroll", function(event) {
        if (event.target.id == 'el') return;
        event.preventDefault();
        event.stopPropagation();
        scrollPage(event.originalEvent.wheelDelta, event.originalEvent.detail, false);
        var scrollBuffer = setTimeout(function(){
            inertialTest = true;
            clearTimeout(scrollBuffer);
        }, 2500);
    });
    //$("content .section, content h1, content p").on("touchstart", function(event) {
    $(".section:not(a)").on("touchstart", function(event) {
        event.preventDefault();
        ts = event.originalEvent.touches[0].clientY;
    }).on("touchend", function(event) {
        event.preventDefault();
        event.stopPropagation();
        var te = event.originalEvent.changedTouches[0].clientY;
        var touchUp;
        if(ts > te+5){
            touchUp = false;
        }else if(ts < te-5){
            touchUp = true;
        }
        scrollPage(0, 0, touchUp);
        var scrollBuffer = setTimeout(function(){
            inertialTest = true;
            clearTimeout(scrollBuffer);
        }, 500);
    }); 
    
    $(".menu").click(function() {
        if ($(this).parents("ul").css("height") === "40px" ) {
            if ($(this).parents("nav").css("width") === "40px" ) {
                console.log("menu opened");
                $(this).parents("nav").animate({
                    width: "300px",
                    height: "50px",
                    margin: "5px",
                    "border-radius": "25px"
                }, 500);
                $(this).parents("ul").animate({
                    "top": "0px",
                    "left": "0px"
                }, 500);
            } else {
                console.log("menu closed");
                $(this).parents("nav").animate({
                    width: "40px",
                    height: "40px",
                    margin: "10px",
                    "border-radius": "20px"
                }, 500); 
                $(this).parents("ul").animate({
                    "top": "-5px",
                    "left": "-130px"
                }, 500);
            }
        } else {
            if ($(this).parents("nav").css("width") === "40px" ) {
                console.log("menu opened");
                $(this).parents("nav").animate({
                    width: "120px",
                    height: "120px",
                    margin: "5px",
                    "border-radius": "60px"
                }, 500);
                $(this).parents("ul").animate({
                    "top": "0px",
                    "left": "0px"
                }, 500);
            } else {
                console.log("menu closed");
                $(this).parents("nav").animate({
                    width: "40px",
                    height: "40px",
                    margin: "45px",
                    "border-radius": "20px"
                }, 500); 
                $(this).parents("ul").animate({
                    "top": "-40px",
                    "left": "-40px"
                }, 500);
            }
        }
    });
});