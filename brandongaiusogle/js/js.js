/*
    Authored by Brandon Gaius Ogle
*/
//--Global Vars
var currentSection = "one";
var sections = ["#one", "#two", "#three", "#four", "#five"];
var scrollTest = true;

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
    //$(window).on("mousewheel", function(event) {
    $(window).on("touchmove", function(event) {
        event.preventDefault();
        if (scrollTest) {
            var scrollUp;
            var scrollTo;
            if (event.originalEvent.wheelDelta >= 0) {
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
        }
        scrollTest = false;
    });
    $(".menu").click(function() {
        if ($(this).parents("nav").css("width") === "40px" ) {
            console.log("menu opened");
            $(this).parents("nav").animate({
                width: "140px",
                height: "140px",
                margin: "20px",
                "border-radius": "70px"
            }, 500);
            $(this).parents("ul").animate({
                "top": "10px",
                "left": "10px"
            }, 500);
        } else {
            console.log("menu closed");
            $(this).parents("nav").animate({
                width: "40px",
                height: "40px",
                margin: "70px",
                "border-radius": "20px"
            }, 500); 
            $(this).parents("ul").animate({
                "top": "-40px",
                "left": "-40px"
            }, 500);
        }
    });
});