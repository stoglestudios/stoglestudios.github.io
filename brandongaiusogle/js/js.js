/*
    Authored by Brandon Gaius Ogle
*/
//-->Global Vars
var currentSection = "one";
var sections = ["#one", "#two", "#three", "#four", "#five", "#six", "#seven"];
var scrollTest = true;
var inertialTest = true;
var ts;

// animation variables 
// set frame rate; 80 milleseconds is 12.5 f/s
var frameFrequency = 80;
// set length of animation; 3 sec is 3000 mil sec 
var animationInterval = 6000;
// set interval between animated instances; 15 sec is 15000 mil sec
var pauseInterval = 10000;
// set counter for keeping track of on/off cycles
var animationCounter = 0;
// create random number between 0 -2
var randomSelector = Math.floor( Math.random()*2 );
// create a standard length for frame arrays
var maxFrames = 100;

//build frames array for each section and add opening frames
var loopFrames = [0,1,2,3];
for (var i=0; i < (animationInterval/frameFrequency - 8)/5; i++) {
    // push new values onto LoopFrames
    // Loop frame count 4,5,6,7 and back to 4
    loopFrames.push(4);
    loopFrames.push(5);
    loopFrames.push(6);
    loopFrames.push(7);
}
loopFrames.push(8);
loopFrames.push(9);
loopFrames.push(10);
loopFrames.push(11);
while (loopFrames.length < maxFrames) {
    loopFrames.push(0);
}

//build frames array for each section and add opening frames
var backforthFrames = [0,1,2,3];
for (var i=0; i < (animationInterval/frameFrequency - 8)/6; i++) {
    // push new values onto to loop back and forth
    backforthFrames.push(4);
    backforthFrames.push(5);
    backforthFrames.push(6);
    backforthFrames.push(7);
    backforthFrames.push(6);
    backforthFrames.push(5);
}
backforthFrames.push(8);
backforthFrames.push(9);
backforthFrames.push(10);
backforthFrames.push(11);
while (backforthFrames.length < maxFrames) {
    backforthFrames.push(0);
}

//build frames array for each section and add opening frames
var loopPauseFrames = [0,1,2,3];
for (var i=0; i < (animationInterval/frameFrequency - 8)/17; i++) {
    // push new values to loop w/ a on second pause between
    loopPauseFrames.push(4);
    loopPauseFrames.push(5);
    loopPauseFrames.push(6);
    loopPauseFrames.push(7);
    //pause at 4 one second
    for (var j=0; j< 12; j++) {
         loopPauseFrames.push(4);
    }
}
loopPauseFrames.push(8);
loopPauseFrames.push(9);
loopPauseFrames.push(10);
loopPauseFrames.push(11);
while (loopPauseFrames.length < maxFrames) {
    loopPauseFrames.push(0);
}

//build frames array for each section and add opening frames
var backPauseFrames = [0,1,2,3];
for (var i=0; i < (animationInterval/frameFrequency - 6)/20; i++) {
    // push new values to roch back and forth w/ a on second pause between
    backPauseFrames.push(4);
    backPauseFrames.push(5);
    backPauseFrames.push(6);
    backPauseFrames.push(7);
    backPauseFrames.push(6);
    backPauseFrames.push(5);
    for (var k=0; k<12; k++) {
         backPauseFrames.push(4);
    }
}
backPauseFrames.push(8);
backPauseFrames.push(9);
backPauseFrames.push(10);
backPauseFrames.push(11);
while (backPauseFrames.length < maxFrames) {
    backPauseFrames.push(0);
}

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
    if (animationCounter < maxFrames+1 && scrollTest) {
        // create X position value from random number
        var x_pos = randomSelector*-100;
        // check to see which section is currently displayed
        var sectionNum = $(document).scrollTop() / $(window).height();
        var $actionableObject = $("#one").children(".illustration").children("img");
        if (sectionNum >=0 && sectionNum < 1) { //<---SECTION 1: Hello World - Workbench
            $actionableObject = $("#one").children(".illustration").children("img");
            if (randomSelector == 1) {
                var y_pos = loopFrames[animationCounter]*-100; //<-- Welding (Looping)
            } else {
                var y_pos = backforthFrames[animationCounter]*-100; //<-- Hammering (Looping w/ Pause)
            }
        } else if (sectionNum >= 1 && sectionNum < 2) { //<---SECTION 2: Good Sign to Design - Drawing Table
            $actionableObject = $("#two").children(".illustration").children("img");
            if (randomSelector == 1) {
                var y_pos = loopFrames[animationCounter]*-100; //<-- Drums with pens (Back and forth)
            } else {
                var y_pos = backPauseFrames[animationCounter]*-100; //<-- Drinks Coffee (Back and forth w/ Pause)
            }
        } else if (sectionNum >= 2 && sectionNum < 3) { //<---SECTION 3: My Art History - Easel
            $actionableObject = $("#three").children(".illustration").children("img");
            if (randomSelector == 1) {
                var y_pos = backPauseFrames[animationCounter]*-100; //<-- Measures subject with brush in hand
            } else {
                var y_pos = loopFrames[animationCounter]*-100; //<-- Moves brush around pallet (Looping)
            }
        } else if (sectionNum >= 3 && sectionNum < 4) { //<---SECTION 4: Laziness is Hard Work - Pizza Make Table
            $actionableObject = $("#four").children(".illustration").children("img");
            if (randomSelector == 1) {
                var y_pos = loopFrames[animationCounter]*-100; //<-- Flips pizza dough (Looping)
            } else {
                var y_pos = loopFrames[animationCounter]*-100; //<-- Sprinkles Toppings (Looping)
            }
        } else if (sectionNum >= 4 && sectionNum < 5) { //<---SECTION 5: My Roots with STEM - Whiteboard
            $actionableObject = $("#five").children(".illustration").children("img");
            if (randomSelector == 1) {
                var y_pos = backforthFrames[animationCounter]*-100; //<-- Points with Marker (Back and Forth w/ Pause)
            } else {
                var y_pos = backPauseFrames[animationCounter]*-100; //<-- Points with Pointer (Back and forth w/ Pause)
            }
        } else if (sectionNum >= 5 && sectionNum < 6) { //<---SECTION 6: Leadership or Lead Ship - Open Door
            $actionableObject = $("#six").children(".illustration").children("img");
            if (randomSelector == 1) {
                var y_pos = backPauseFrames[animationCounter]*-100; //<-- Guesters with hand (Back and Forth w/ Pause)
            } else {
                var y_pos = backPauseFrames[animationCounter]*-100; //<-- Guesters with head (Back and Forth w/ Pause)
            }
        }
        //console.log(x_pos + "% " + y_pos + "% - " + animationCounter);
        $actionableObject.css({
            "top": y_pos + "%",
            "left": x_pos + "%"
        });
        animationCounter++;
    } else if (animationCounter > 
               (pauseInterval + animationInterval)/frameFrequency
              ) {
        // reset animation counter
        animationCounter = 0;
        // choose new random number
        randomSelector = Math.floor( Math.random()*2 );
        console.log("\n\n\n---------------RESET----------------\n\n\n");
    } else {
        //console.log("paused - " + animationCounter);
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
    
    $("#seven ul a").on("mouseover touchstart", function(evt) {
        evt.stopPropagation();
        var rollOver = ( randomSelector + 1 )*(-100) + "%";
        $("#seven").children(".illustration").children("img").css("top", rollOver);
    }).on("mouseout touchend", function(evt) {
        evt.stopPropagation();
        $("#seven").children(".illustration").children("img").css("top", "0");
        randomSelector = Math.floor( Math.random()*2 );
    }).on("click touchend", function(evt) {
        evt.stopPropagation();
    }); 
});