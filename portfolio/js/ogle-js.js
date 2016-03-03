$(document).ready(function () {
    $(".long-description").each(function(){
        $this = $(this);
        if ( $this.children("p").length > 1 ){
            $this.children("p").addClass("add-p");
            $this.children("p").first().addClass("first-p").removeClass("add-p").append("<button class='more-txt'>more</button>");
            $this.children("p").first().children(".more-txt").show().on("click", function(ev){
                $(this).hide();
                ev.preventDefault();
                $(this).parent().siblings(".add-p").show();
                //$(this).siblings(".hideable").css("display", "block");
            });
            $this.children("p").last().append("<button class='less-txt'>less</button>");
            $this.children(".add-p").hide();
            $this.children("p").last().children(".less-txt").on("click", function(ev){
                $(this).parent().hide();
                $(this).parent().siblings(".add-p").hide();
                ev.preventDefault();
                $(this).parent().siblings(".first-p").children(".more-txt").show();
//                if ($(window).width()<800) {
//                    $(this).parent().siblings(".first-p").children(".hideable").css("display", "none");
//                }
                $('html, body').animate({
                    scrollTop: $(this).parent().parent().offset().top
                }, 300);
            });
        }
    });
    $("*").each(function () {
        // For use developing, this section allows you to build HTML closer to what the Ogle view will look like for looping through data
        if ($(this).data("ogle-temp") && $(this).data("ogle-temp").length>1) {
            if ( !$(this).attr("id") ) {
                var createID = Math.floor(Math.random()*1000000);
                createID = "Ogle" + createID;
                $(this).attr("id", createID)
            }
            // If the value is a number, repeat the HTML element that number of time, else get and use JSON data to loop
            if ( isNaN( $(this).data("ogle-temp")*2) ) {
                var thisElementName = $(this).attr("id");
                var thisElement = "#" + thisElementName;
                var repeatedItem = $( "<" + $(this).prop("tagName") + " />" ).append( $( "#" + $(this).attr("id") ).clone() ).html();
                var allElementsArray = [];
                var allElementsString = "";            
                var Model;
                $.ajax({
                    "url": $.trim( $(this).data("ogle-temp") ),
                    "dataType" : "json",
                    "success": function ( data ) {
                        Model = data;
                        for (i=0; i<Model.length; i++) {
                            allElementsArray[i] = repeatedItem;
                            $.each(Model[i], function(key, value) {
                                allElementsArray[i] = allElementsArray[i].replace( "<%=" + key + "%>", value);
                                // just in case the Greater/Less Than symbols are parsed wrong (I'm looking at you mobile Safari)
                                allElementsArray[i] = allElementsArray[i].replace("&lt;%=" + key + "%&gt;", value);
                                allElementsArray[i] = allElementsArray[i].replace("{%=" + key + "%}", value);
                            });
                            allElementsString += allElementsArray[i];
                        }
                        $(thisElement).replaceWith( allElementsString );
                        $(thisElement).find("*").each( function () {
                            OgleFramework( $(this) );
                        });
                        $(thisElement).siblings().find("*").each( function () {
                            OgleFramework( $(this) );
                        });
                        for (j=0; j< Model.length;j++) {
                            $(thisElement).removeAttr("data-ogle-temp");
                            $(thisElement).attr("id", thisElementName + j);
                        }
                    }
                });
            } else {
                var thisElementName = $(this).attr("id");
                var repeatitions = Number( $(this).data("ogle-temp") );
                var thisElement = "#" + thisElementName;
                var repeatedItem = $( "<" + $(this).prop("tagName") + " />" ).append( $( "#" + $(this).attr("id") ).clone() ).html();
                var allElementsArray = [];
                var allElementsString = ""; 
                for (var k=0; k<repeatitions; k++ ) {
                    allElementsArray[k] = repeatedItem;
                    allElementsString += allElementsArray[k];
                }
                $(thisElement).replaceWith( allElementsString );
                $(thisElement).find("*").each( function () {
                    OgleFramework( $(this) );
                });
                $(thisElement).siblings().find("*").each( function () {
                    OgleFramework( $(this) );
                });
                for (l=0; l<repeatitions; l++) {
                    $(thisElement).removeAttr("data-ogle-temp");
                    $(thisElement).attr("id", thisElementName + l);
                }
            }
        } 
        //Run Framework on document
        OgleFramework( $(this) );
    });
    dynamicCSS += "</style>";
    $("head").append(dynamicCSS);
});

//Vars
var dynamicCSS = "<style>/*Dynamic CSS*/\n\n";
var psuedoClass = "";
var psuedoClasses = [":hover", ":first-child", ":last-child"];
classCount = 0;
classIDsArray = [];

//Functions
function OgleFramework($this) {
    if ( $this.data("alert") && $this.data("alert").toString().length >0){
            var continueTo = $this.attr("href");
            var targetTo = $this.attr("target");
            var modalCode = "<div id='intersession'><span></span><div class='alertBox'><h1></h1><p></p><button class='cancel'>Cancel</button><button class='continue'>Continue</button></div></div>";
            $("body").append(modalCode);
            console.log("AlertBox Created");
            $("#intersession").css({
                position: "fixed",
                zIndex: "10101",
                left: "0",
                top:"0",
                width: "100%",
                height: "100%",
                maxHeight: "100vh",
                textAlign: "center",
                minHeight:"100%",
                backgroundColor: "black",
                backgroundColor: "rgba(0,0,0,.8)",
                display: "none"
            });
            $("#intersession span").css({
                display: "inline-block",
                height: "100%",
                maxHeight: "100vh",
                lineHeight: "100%",
                verticalAlign: "middle",
                width: "0"
            });
            $("#intersession button").css({
                padding: "5px 10px",
                margin: "20px 10px 0 10px"
            });
            $("#intersession .alertBox").css({
                display: "inline-block",
                margin: "auto",
                width: "90%",
                maxWidth: "450px",
                maxHeight: "90%",
                overflow: "auto",
                verticalAlign: "middle",
                backgroundImage: "linear-gradient(#fdfffc, #e5eec7)",
                color: "black",
                padding: "3%",
                
            });
            $(".alertBox h1").css({color: "#5a9245", padding: "10px 0 30px", textAlign: "left"}).text("Greetings");
            $(".alertBox p").css("text-align", "left").text("Thank you for your interest. This site is currently in flight. Please be aware that there may be bugs or incomplete functionality. That said, reviewing work in progress is arguably more important for understanding me and my workflow than completed projects are. I invite you to play around, view code, and leave feedback!");
            $this.on("click", function(ev) {
                console.log("AlertBox Button Clicked");
                ev.preventDefault();
                $("#intersession").css({
                    display: "inline-block"
                });
            });
            $("button.cancel").on("click", function(){
                console.log("Cancel");
                $(this).parent().parent().hide();
            });
            $("button.continue").on("click", function(){
                console.log("Continue to " + continueTo);
                window.open( continueTo, targetTo );
                $(this).parent().parent().hide();
            });
        }
    if ($this.data("scroll") && $this.data("scroll").length > 0) {
        var slideOffset = "0px";
        var scrollOffset = $this.data("scroll") + "";
        var scrollValues = scrollOffset.split(";");
        scrollOffset = scrollValues[0].replace("px", "");
        scrollOffset = parseInt(scrollOffset);
        if (scrollValues[1]) {
            if (scrollValues[1].length > 0) {
                slideOffset = scrollValues[1];
            }
        }
        var slideOffset = scrollValues[1];
        if (slideOffset.indexOf("px") < 0) {
            slideOffset += "px";
        }
        if ( $(document).scrollTop() < $this.offset().top - $(window).height() ) {
            $this.css({
                marginTop: slideOffset,
                opacity: 0
            }).show();
        }
        $(window).on("scroll", function () {
            var distanceFrom = $this.offset();
            var triggerPosition = distanceFrom.top - $(window).height() + scrollOffset;
            var windowOffset = $(document).scrollTop();
            var wholeHeight = $(document).height()-$(window).height();
            if (windowOffset < wholeHeight) {
                //console.log(windowOffset + " | " + wholeHeight );
                if (windowOffset > triggerPosition || windowOffset == 0 ) {
                    $this.stop().animate({
                        marginTop: "0px",
                        opacity: 1
                    }, 400);
                } else {
                    $this.stop().animate({
                        marginTop: slideOffset,
                        opacity: 0
                    }, 400);
                }
            }
        });
    }
    if ( $this.data("youtube") ) {
        var $ytvid = $this.data("youtube");
        console.log("youtube!");
    } else {
        var $ytvid = "";
    }
    if ( $this.data("vimeo") ) {
        var $vimvid = $this.data("vimeo").toString();
        console.log("vimeo!");
    } else {
        var $vimvid = "";
    }
    if ( $this.data("video-ratio") ) {
        var $ratio = $this.data("video-ratio").toString();
    } else {
        var $ratio = "16:9";
    }
    // <-- VIDEO MODAL CODE ------------------------------------------------------------ !>
    if ( $ytvid.length > 0 || $vimvid.length > 0 ) {
        if ( $("#videoModal").length < 1 ) {
            createVideoModal();
        }
        if ( $this.data("video-options") ) {
            videoOptions = stripOgleTags( $this.data("video-options"), true );
        }
        var videoSource = "youtube";
        if ( $vimvid.length>0 ) {
            videoSource = "vimeo";
            $vimeo_id = stripOgleTags( $vimvid, true );
        } else {
            $youtube_id = stripOgleTags( $ytvid, true );
        }
        //build iFrame string
        var videoIframe = '<iframe id="video" class="vid-test" src="';
        //attache click handler
        if ( videoSource == "vimeo") {
            videoIframe += 'https://player.vimeo.com/video/';
            videoIframe += $.trim( $vimeo_id ) + '?';
        } else {
            videoIframe += 'https://www.youtube.com/embed/';
            videoIframe += $.trim( $youtube_id ) + '?';
        }
        videoIframe += attachOptions( videoSource, videoOptions);
        videoIframe += '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
        $this.on("click", function(ev){
            ev.preventDefault();
            $("#videoModal").show();
            console.log("video link clicked");
            $("#videoBox").prepend(videoIframe);
            $("#videoBox").attr("data-ratio", $ratio);
            sizeVideo();
        });
    }
    $(window).resize(function () {
        sizeVideo();
    });
}
var youtubeDefaults = [
    "autoplay=1",
    "enablejsapi=1",
    "playerapiid=umplayer",
    "modestbranding=1",
    "rel=0",
    "showinfo=0",
    "disablekb=1",
    "autohide=1",
    "origin=" + window.location.href
]; 
var vimeoDefaults = [
    "autoplay=1",
    "badge=0",
    "byline=0",
    "color=FFF",
    "portrait=0",
    "title=0",
    "loop=0",
    "api=1",
    "player_id=ogplayer"
];
function attachOptions ( source, options ) {
    var videoQS = "";
    var customOptions = options.split("&");
    if ( source == "vimeo") {
        for (var i=0; i<customOptions.length; i++) {
            var paramName = customOptions[i].split("=")[0];
            // SEARCH through array and DELETE any that contain paramName
            for (var a=0; a<vimeoDefaults.length; a++) {
                if ( vimeoDefaults[a].indexOf(paramName) > -1 ) {
                    vimeoDefaults.splice(a, 1);
                }
            }
            // ADD items from 
            vimeoDefaults.push( customOptions[i] );
        }
        for ( var b=0; b<vimeoDefaults.length; b++) {
            videoQS += vimeoDefaults[b] + "&";
        }
        videoQS = videoQS.substring(0, videoQS.length - 1);
    } else {
        for (var j=0; j<customOptions.length; j++) {
            var paramName = customOptions[j].split("=")[0];
            // SEARCH through array and DELETE any that contain paramName
            for (var c=0; c<youtubeDefaults.length; c++) {
                if ( youtubeDefaults[c].indexOf(paramName) > -1 ) {
                    youtubeDefaults.splice(c, 1);
                }
            }
            // ADD items from 
            youtubeDefaults.push( customOptions[j] );
        }
        for ( var d=0; d<youtubeDefaults.length; d++) {
            videoQS += youtubeDefaults[d] + "&";
        }
        videoQS = videoQS.substring(0, videoQS.length - 1);
    }
    //console.log(videoQS);
    videoQS = videoQS.replace("&xyz=1", "");
    return videoQS;
}
function pseudoClassFinder(teststring, testid, pclass) {
    teststring = teststring.replace("&:", ":");
    teststring = teststring.replace(/;/g, ";\n  ");
    teststring = teststring.replace("{", " {\n  ");
    teststring = teststring.replace("  }", "}\n");
    if ( teststring.indexOf( pclass ) >= 0 ) {
        var testparts = teststring.split ( pclass );
        psuedoClass += "#" + testid + pclass + testparts[1];
        return testparts[0];
    } else {
        return teststring;
    }
}
function giveSectionsUniqueClasses ( self ) {
    $this = self;
    var fullPageName = document.location.href;
    fullPageName = fullPageName.replace("http://", "");
    fullPageName = fullPageName.replace("https://", "");
    fullPageName = fullPageName.replace("www.", "");
    fullPageName = fullPageName.replace(".com", "");
    fullPageName = fullPageName.split("#")[0];
    fullPageName = fullPageName.split("?")[0];
    fullPageName = fullPageName.split("&")[0];
    var pageNamesArray = fullPageName.split("/");
    var pageName = pageNamesArray[pageNamesArray.length-1];
    var pageExtension = pageName.split(".");
    if ( pageExtension.length > 0 ) {
        pageName = pageExtension[0];
    }
    if ( pageName.length < 1 ) {
        pageName = pageNamesArray[pageNamesArray.length-2];
    }
    if ( pageName.length < 1 ) {
        pageName = "home";
    }
    $this.addClass( pageName );
    var classID = pageName + "-" + $this.attr("id");
    $this.addClass( classID );
    if ( $( "." + classID ).length > 1 && $( "." + classID ).length < 3) {
        classIDsArray.push(classID);
    }
    var n = $("section").length;
    if ( classCount+1 == n ) {
        fixMultipleIDs ();
    }
    classCount++;
}
function fixMultipleIDs () {
    for (var i=0; i<classIDsArray.length; i++) {
        var c = $("." + classIDsArray[i]).length;
        var currentID = $( "." + classIDsArray[i] ).attr("id");
        for (var k=0; k<c; k++) {
            $("#" + currentID).attr("id", currentID + k );
        }
    }
}
function sizeVideo() {
    if ($("#video").length) {
        var viewPortWidth = $(window).width();
        var viewPortHeight = $(window).height();
        if (screenSizingWrong) {
            // in case device computes window size wrong
            viewPortWidth = $(document).width();
        }
        var videoBoxPadding = parseInt( $("#video").css("margin") );
        var totalVideoPadding = videoBoxPadding * 2;
        var potentialWidth = .8 * viewPortWidth;
        var potentialHeight = .8 * viewPortHeight;
        var letterBoxFactor = 16 / 9;
        
        if ($("#videoBox").data("ratio")) {
            var getRatio = $("#videoBox").data("ratio");
            var ratioNumbers = $("#videoBox").data("ratio").split(":");
            console.log(ratioNumbers[0] + " / " + ratioNumbers[1]);
            letterBoxFactor = parseInt(ratioNumbers[0]) / parseInt(ratioNumbers[1]);
        }
        // determine limiting factor: width or height
        if ( potentialWidth > potentialHeight * letterBoxFactor ) {
            // calculate width from height;
            $("#video").css( "width", ( ( potentialHeight - totalVideoPadding ) * letterBoxFactor ) + "px" );
            $("#video").css( "height", ( potentialHeight - totalVideoPadding ) + "px" );
            $("#videoBox").css( "width", potentialHeight * letterBoxFactor + "px" );
            $("#videoBox").css( "height", potentialHeight + "px" );
        } else {
            // calculate width from height;
            $("#video").css( "width", ( potentialWidth - totalVideoPadding ) + "px" );
            $("#video").css( "height", ( ( potentialWidth - totalVideoPadding ) / letterBoxFactor ) + "px" );
            $("#videoBox").css( "width", potentialWidth + "px" );
            $("#videoBox").css( "height", ( potentialWidth / letterBoxFactor ) + 10 + "px" );
        }
//        $("#videoBox").css( "padding-top", videoBoxPadding + "px" );
        $("#videoModalContainer").css( "height", viewPortHeight );
        $("#video").css( "max-width", "1920px" );
        $("#video").css( "max-height", "1080px" );
        $("#videoModal").css({
            "width": viewPortWidth,
            "min-height": $(document).height(),
            "height": $(window).height()
        });
    }
}
// Movie Modal
function createVideoModal() {
    if ($(window).width() < $(document).width() * .98) {
        screenSizingWrong = true;
    } else {
        screenSizingWrong = false;
    }
    $("body").append("<div id='videoModal'></div>");
    $("#videoModal").css("height", $("html").css("height"));
    $("#videoModal").append("<div id='videoModalContainer'></div>");
    $("#videoModalContainer").css("height", $(window).height());
    $("#videoModalContainer").append("<span></span>");
    $("#videoModalContainer").append("<div id='videoBox'></div>");
    $("#videoBox").append("<iframe id='video'>Close</iframe>");
    $("#videoBox").append("<a class='close-video'>Close</a>");
    $(".close-video").on("click", function () {
        $("#videoModal").hide();
        $("#video").remove();
    });
    $(document).on("click", "#videoModal", function () {
        $("#videoModal").hide();
        $("#video").remove();
    });
    $(document).keyup(function (e) {
        if (e.keyCode === 27) {
            $("#videoModal").hide();
            $("#video").remove();
        };
    });
    sizeVideo();
    $("#video").remove();
    $("#videoModal").hide();
    console.log("Video Modal Created");
}
function stripOgleTags(thestring, complete) {
    if (typeof thestring !== "undefined" && thestring.length > 0) {
        thestring = thestring.replace(/<%=/g, "");
        thestring = thestring.replace(/<%/g, "");
        thestring = thestring.replace(/%>/g, "");
        thestring = thestring.replace(/{%=/g, "");
        thestring = thestring.replace(/{%/g, "");
        thestring = thestring.replace(/%}/g, "");
        if (complete) {
            thestring = thestring.replace(/ /g, "");
        }
        return thestring;
    } else {
        return "";
    }
}
function createHeroSlick($target) {
    // ensure values exist
    var getDots = $target.data("dots") ? $target.data("dots").toString() : "";
    var getAuto = $target.data("auto") ? $target.data("auto").toString() : "";
    var getArrows = $target.data("arrows") ? $target.data("arrows").toString() : "";
    var getSpeed = $target.data("speed") ? $target.data("speed").toString() : "";
    var getFade = $target.data("fade") ? $target.data("fade").toString() : "";
    var getAdapt = $target.data("adapt") ? $target.data("adapt").toString() : "";
    var hasBreaks = $target.data("breaks") ? $target.data("breaks").toString() : "";

    var testTotal = getDots + getAuto + getArrows + getSpeed + getFade + getAdapt;

    if (hasBreaks.length > 0) {
        var hasManyDots = getDots.length > 0 ? getDots + ";false;false" : "";
        var hasManyAutos = getAuto.length > 0 ? getAuto + ";true;true" : "";
        var hasManyArrows = getArrows.length > 0 ? getArrows + ";false;false" : "";
        var hasSpeed = getSpeed.length > 0 ? getSpeed : "300";
        var hasManyFades = getFade.length > 0 ? getFade + ";false;false" : "";
        var hasManyAdapts = getAdapt.length > 0 ? getAdapt + ";false;false" : "";
        var breaks = hasBreaks.split(";");
        var hasDots = hasManyDots.length>0 ? [
            toBool(hasManyDots.split(";")[0]),
            toBool(hasManyDots.split(";")[1]),
            toBool(hasManyDots.split(";")[2])
        ] : [false,false,false];
        var hasAuto = hasManyAutos.length > 0 ? [
            toBool(hasManyAutos.split(";")[0]),
            toBool(hasManyAutos.split(";")[1]),
            toBool(hasManyAutos.split(";")[2])
        ] : [true,true,true];
        var hasArrows = hasManyArrows.length > 0 ? [
            toBool(hasManyArrows.split(";")[0]),
            toBool(hasManyArrows.split(";")[1]),
            toBool(hasManyArrows.split(";")[2])
        ] : [false,false,false];
        var hasFade = hasManyFades.length > 0 ? [
            toBool(hasManyFades.split(";")[0]),
            toBool(hasManyFades.split(";")[1]),
            toBool(hasManyFades.split(";")[2])
        ] : [false,false,false];
        var hasAdapt = hasManyAdapts.length > 0 ? [
            toBool(hasManyAdapts.split(";")[0]),
            toBool(hasManyAdapts.split(";")[1]),
            toBool(hasManyAdapts.split(";")[2])
        ] : [false,false,false];
        $target.slick({
            dots: hasDots[0],
            autoplay: hasAuto[0],
            arrows: hasArrows[0],
            speed: parseInt(hasSpeed),
            pauseOnHover: false,
            fade: hasFade[0],
            adaptiveHeight: hasAdapt[0],
            responsive: [
                {
                    breakpoint: 550,
                    settings: {
                        dots: hasDots[1],
                        autoplay: hasAuto[1],
                        arrows: hasArrows[1],
                        fade: hasFade[1],
                        adaptiveHeight: hasAdapt[1]
                    }
                },
                {
                    breakpoint: 950,
                    settings: {
                        dots: hasDots[2],
                        autoplay: hasAuto[2],
                        arrows: hasArrows[2],
                        fade: hasFade[2],
                        adaptiveHeight: hasAdapt[2]
                    }
                }
            ]
        });
    } else if (testTotal.length > 0) {
        var hasDots = getDots.length > 0 ? getDots : "false";
        var hasAuto = getAuto.length > 0 ? getAuto : "true";
        var hasArrows = getArrows.length > 0 ? getArrows : "false";
        var hasSpeed = getSpeed.length > 0 ? getSpeed : "300";
        var hasFade = getFade.length > 0 ? getFade : "false";
        var hasAdapt = getAdapt.length > 0 ? getAdapt : "false";
        $target.slick({
            dots: toBool(hasDots),
            autoplay: toBool(hasAuto),
            arrows: toBool(hasArrows),
            speed: parseInt(hasSpeed),
            pauseOnHover: false,
            fade: toBool(hasFade),
            adaptiveHeight: hasAdapt
        });
    }
}
function toBool(data) {
    if (data == "true" || data == true) {
        return true;
    } else {
        return false;
    }
}