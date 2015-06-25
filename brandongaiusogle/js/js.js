/*
    Authored by Brandon Gaius Ogle
*/
//-->Global Vars
var currentSection = "one";
var sections = ["#one", "#two", "#three", "#four", "#five"/*, "#six", "#seven"*/];
var scrollTest = true;
var inertialTest = true;
var ts;

// animation variables 
// set frame rate; 80 milleseconds is 12.5 f/s
var frameFrequency = 80;
// set length of animation; 3 sec is 3000 mil sec 
var animationInterval = 6000;
// set interval between animated instances; 15 sec is 15000 mil sec
var pauseInterval = 30000;
// set counter for keeping track of on/off cycles
var animationCounter = 0;
// create random number between 0 -2
var randomSelector = Math.floor( Math.random()*3 );

//build frames array for each section
var loopFrames = [0,1,2,3];
var backforthFrames = [0,1,2,3];
var loopPauseFrames = [0,1,2,3];
var backPauseFrames = [0,1,2,3];
for (var i=0; i < (animationInterval/frameFrequency - 8)/5; i++) {
    // push new values onto LoopFrames
    // Loop frame count 4,5,6,7 and back to 4
    loopFrames.push(4);
    loopFrames.push(5);
    loopFrames.push(6);
    loopFrames.push(7);
    loopFrames.push(8); 
}
for (var i=0; i < (animationInterval/frameFrequency - 8)/17; i++) {
    // push new values onto LoopFrames
    // Loop frame count 4,5,6,7 and back to 4
    loopPauseFrames.push(4);
    loopPauseFrames.push(5);
    loopPauseFrames.push(6);
    loopPauseFrames.push(7);
    for (var i=0; i< 12; i++) {
         loopPauseFrames.push(4);
    }
}
for (var i=0; i < (animationInterval/frameFrequency - 8)/20; i++) {
    // push new values onto backforthFrames
    // Backforth count 5,6,7,8,7,6,5
    backPauseFrames.push(4);
    backPauseFrames.push(5);
    backPauseFrames.push(6);
    backPauseFrames.push(7);
    backPauseFrames.push(8);
    backPauseFrames.push(7);
    backPauseFrames.push(6);
    backPauseFrames.push(5);
    for (var i=0; i< 12; i++) {
         backPauseFrames.push(4);
    }
}
loopFrames.push(9);
loopFrames.push(10);
loopFrames.push(11);
loopFrames.push(0);
backforthFrames.push(9);
backforthFrames.push(10);
backforthFrames.push(11);
backforthFrames.push(0);
loopPauseFrames.push(9);
loopPauseFrames.push(10);
loopPauseFrames.push(11);
loopPauseFrames.push(0);
backPauseFrames.push(9);
backPauseFrames.push(10);
backPauseFrames.push(11);
backPauseFrames.push(0);

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
        //console.log("Window's Scroll Position: " + documentScroll);
        //console.log("Window's Height: " + winHeight);
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
            //console.log(sections[i] + "'s Position: " + posTops);
        }
        if (scrollUp) {
            //console.log("Scroll up to " + scrollUpTo);
            scrollTo = scrollUpTo;
        } else {
            //console.log("Scroll down to " + scrollDownTo);
            scrollTo = scrollDownTo;
        }
        //console.log("\n\n\n----------------END-----------------\n\n\n");
        $('html, body').animate({
            scrollTop: $(scrollTo).offset().top
        }, 1000, function () {
            scrollTest = true;
            
        });
    }
}
function animateMe() {
    if (animationCounter < backPauseFrames.length) {
        // create X position value from random number
        var x_pos = randomSelector * -100;
        // set frame number to y po
        var y_pos = backPauseFrames[animationCounter]*-100;
        // check to see which section is currently displayed
        // ***???***
        // set that to a variable
        //var $currentSection = $(sections[/*???*/]);
        
        var newPosition = x_pos + "% " + y_pos + "%";
        console.log(newPosition + " - " + animationCounter);
        //$currentSection.children(".illustration .animated").css(
        //    "background-position", newPosition
        //);
        animationCounter++;
    } else if (animationCounter > 
               (pauseInterval + animationInterval)/frameFrequency
              ) {
        // reset animation counter
        animationCounter = 0;
        // choose new random number
        randomSelector = Math.floor( Math.random()*3 );
        console.log("\n\n\n---------------RESET----------------\n\n\n");
    } else {
        console.log("paused - " + animationCounter);
        animationCounter++;
    }
}

$(document).ready(function() {
    // timer for animation
    var animateBrandon = setInterval(animateMe, frameFrequency);
    
    $(".jumpdown").on("click touchend", function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        $('html, body').animate({
            scrollTop:              $(this).parents(".section").next().offset().top
        }, 1000);
    });
    $(".jumpup").on("click touchend", function(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        $('html, body').animate({
            scrollTop: 0
        }, 2000);
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
    $(".section").on("touchstart", function(event) {
        event.preventDefault();
        ts = event.originalEvent.touches[0].clientY;
    }).on("touchend", function(event) {
        event.preventDefault();
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