/*
    Authored by Brandon Gaius Ogle
*/
//-->Global Vars
var currentSection = "one";
var sections = ["#one", "#two", "#three", "#four", "#five"];
var scrollTest = true;
var inertialTest = true;

//-->Functions

function scrollPage(oe_wd, oe_d) {
    if (scrollTest && inertialTest) {
        scrollTest = false;
        inertialTest = false;
        var scrollUp;
        var scrollTo;
        if (oe_wd && oe_wd >= 0) {
            scrollUp = true; // UP
        } else if (oe_d && oe_d <= 0) {
            scrollUp = true; // UP
        } else {
            scrollUp = false; // DOWN
        }
        var documentScroll = $(document).scrollTop();
        var winHeight = $(window).height();
        var scrollUpTo;
        var scrollDownTo;
        console.log("Window's Scroll Position: " + documentScroll);
        console.log("Window's Height: " + winHeight);
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
        var scrollBuffer = setTimeout(function(){
            inertialTest = true;
            clearTimeout(scrollBuffer);
        }, 1000);
    }
}

$(document).ready(function() {
    $(".jumpdown").click(function(evt) {
        evt.preventDefault();
        $('html, body').animate({
            scrollTop: $(this).parent().next().offset().top
        }, 1000);
    });
    $(".jumpup").click(function(evt) {
        //evt.preventDefault();
        $('html, body').animate({
            scrollTop: $(this).parent().parent().offset().top
        }, 2000);
    });
    //$(window).on("mousewheel DOMMouseScroll onmousewheel touchmove scroll", function(event) {
    $(window).on("mousewheel", function(event) {
        if (event.target.id == 'el') return;
        event.preventDefault();
        event.stopPropagation();
        scrollPage(event.originalEvent.wheelDelta, event.originalEvent.detail);
    }).on("DOMMouseScroll", function(event) {
        if (event.target.id == 'el') return;
        event.preventDefault();
        event.stopPropagation();
        scrollPage(event.originalEvent.wheelDelta, event.originalEvent.detail);
    /*}).on("onmousewheel", function(event) {
        if (event.target.id == 'el') return;
        event.preventDefault();
        event.stopPropagation();
        scrollPage(event.originalEvent.wheelDelta, event.originalEvent.detail);
    }).on("scroll", function(event) {
        if (event.target.id == 'el') return;
        event.preventDefault();
        event.stopPropagation();
        scrollPage(event.originalEvent.wheelDelta, event.originalEvent.detail);
    */}).on("touchmove", function(event) {
        if (event.target.id == 'el') return;
        event.preventDefault();
        event.stopPropagation();
        scrollPage(event.originalEvent.wheelDelta, event.originalEvent.detail);
    }); 
    
    $(".menu").click(function() {
        if ($(this).parents("ul").css("height") === "40px" ) {
            if ($(this).parents("nav").css("width") === "40px" ) {
                console.log("menu opened");
                $(this).parents("nav").animate({
                    width: "370px",
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
                    "left": "-165px"
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