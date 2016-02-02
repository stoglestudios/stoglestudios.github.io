$(document).ready(function() {
    //Search Field
    $(".site-search").hide();
    $("#mag-glass").show();
    var dashTracker;
    $(".dash-container section").hide();
    magBGcolor = $("#mag-glass").css("background-color");
    $("#mag-glass").css("background-color", magBGcolor);
    $("#mag-glass").on("click", function(){
        $t = $(this);
        if ( $t.css("background-color") == magBGcolor ) {
            $(".site-search").show("blind", 300);
            $(this).css("background-color", "rgba(255,255,255,.3)");
        } else {
            $(".site-search").hide("blind", 300);
            $(this).css("background-color", magBGcolor);
        }
    });
    $(".orange-ribbon").append("<div class='ribbon-tail'></div>")
    $(".dashboard-menu li").append("<div class='dash-tail'></div>");
    
    $(".forward-arrow").append("<img src='img/forward-arrow.png' />");
    $(".inner-content").parent("div").css({
        padding: "0",
    });
    $(".dashboard-menu li:not(.hamburger)").on("click", function(event) {
        var l = $(".dashboard").length;
        for (j=1;j<=l; j++) {
            var $dashItem = $(".dashboard:nth-child(" + j + ")");
            if ( $dashItem.is(":visible") ) {
                dashTracker = "#" + $dashItem.attr("id");
            }
        }
        event.preventDefault();
        var $this = $(this);
        var thisDash = $this.children("a").attr("href");
        var $dash = $(".dash-container");
        var dashHeight = $(thisDash).outerHeight() + 150;
        dashHeight = dashHeight.toString() + "px";
        $this.addClass("dash-open");
        if ($dash.height() > 0) {
            $dash.animate({height: "0px", marginTop: "0px"}, 300, "easeInOutBack", function(){
                $(thisDash).hide();
                $(thisDash).siblings().hide();
                if ( thisDash != dashTracker ) {
                    $dash.animate({height: dashHeight, marginTop: "30px"}, 300, "easeInOutBack", function(){
                        $this.addClass("dash-open");
                    });
                    $(thisDash).show();
                }
                $this.removeClass("dash-open");
                $this.siblings().removeClass("dash-open");
            });
        } else {
            $dash.animate({height: dashHeight, marginTop: "30px"}, 300, "easeInOutBack");
            $(thisDash).show();
        }
    });
    moveMainBoxes();
    $(window).resize(function(){
        moveMainBoxes();
        if ( $(".dash-container").height() > 0 ) {
            adjustDashHeight();
        }
    });
    $(".dashboard .arrow-up").on("click", function (){
        var $dash = $(".dash-container");
        $dash.animate({height: "0px", marginTop: "0px"}, 300, "easeInOutBack", function(){
            $(".dashboard").hide();
            $(".dashboard-menu li").removeClass("dash-open");
        });
    });
    dataSource = "http://pdx-intra-web2.umpquanet.local/sites/Connect/Challenge.svc/getindividual";
    $.ajax({
        "url": dataSource,
        "dataType" : "json",
        "success": function ( data ) {
            fullData = data;
            connectCounter( $("#totalHours"), Math.round( fullData.Totals["MinutesUsed"]/60 ) );
            connectCounter( $("#totalAssociates"), Math.round( fullData.Totals["Participating"] ) );
            connectCounter( $("#myTotalHours"), Math.round( fullData["MinutesUsed"]/60 ) );
        }
    }).fail( function () {
        fullData = {
            //Default Data
            "ManagerName":"Manager",
            "MinutesAvailable":1000,
            "MinutesUsed":500,
            "Name":"John Doe",
            "TeamName":"Team",
            "Totals":{
                "Eligibile":4487,
                "MinutesAvailable":9802080,
                "MinutesUsed":5114677, // total hours
                "Participating":2542 // associates
            }
        }
        connectCounter( $("#totalHours"), Math.round( fullData.Totals["MinutesUsed"]/60 ) );
        connectCounter( $("#totalAssociates"), Math.round( fullData.Totals["Participating"] ) );
        connectCounter( $("#myTotalHours"), Math.round( fullData["MinutesUsed"]/60 ) );
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

var mainBoxLength = $(".main-box").length;
function moveMainBoxes() {
    var mainWidth = $(".main-box").width();
    var fullWidth = $(".full-box").width();
    if ( mainWidth < fullWidth ) {
        for (i=mainBoxLength;i>0;i--) {
            $(".main-box:nth-child(" + i + ")").insertAfter( $(".main-box").siblings("section:last-child") );
        }
        $(".full-box").insertBefore( $(".full-box").siblings("section:first-child") );
    } else {
        $(".main-box").insertBefore( $(".main-box").siblings("section:first-child") );
        $(".full-box").insertBefore( $(".full-box").siblings("section:first-child") );
    }
}
// creates and animates the Connect Today Widget pass in the <ul> id for each
//    option. The "data-target" attr in the HTML defines the final number counted to
function connectCounter ( targetObject, targetData ) {
    var $this = targetObject;
    // How long you want the animation to last (the animation needs to complete so this may take longer, esp for large numbers)
    var totalAnimationTime = 5000;
    //var finalNumber = $this.data("target") + "";
    var finalNumber = targetData + "";
    var stopNumber = parseInt(finalNumber);
    var stopString = finalNumber.toString();
    var char = stopString.length;
    var timeCounter = 0;
    // creates a bigger counter interval for very large numbers 
    var timeInterval = Math.ceil(stopNumber/1500);
    for (i=0;i<char;i++) {
        $this.append("<li class='digitHolder digitPlace" + (char-i) + "'>0</li>");
    }
    var countTo = setInterval ( animateCounter, totalAnimationTime/stopNumber );
    function animateCounter() {
        if ( timeCounter < stopNumber ) {
            timeCounter = timeCounter + timeInterval;
            var currentTime = timeCounter.toString();
            var timeDigits = currentTime.split("");
            timeDigits.reverse();
            for (j=1;j<char+1;j++){
                $this.children(".digitPlace" + j).text( timeDigits[j-1] );
            }
        } else {
            timeCounter = stopNumber;
            var currentTime = timeCounter.toString();
            var timeDigits = currentTime.split("");
            timeDigits.reverse();
            for (j=1;j<10;j++){
                $this.children(".digitPlace" + j).text( timeDigits[j-1] );
            }
            clearInterval( countTo );
            console.log( $this.attr("id") + " has stopped");
        }
    }
}
function adjustDashHeight() {
    if ( $("#com-dash").is(":visible") ) {
        $this = $("#com-dash");
    } else if ( $("#store-dash").is(":visible") ) {
        $this = $("#store-dash");
    } else {
        $this = $("#my-dash");
    }
    var newHeight = $this.outerHeight() + 150;
    $(".dash-container").css({
        height: newHeight
    });
}


















