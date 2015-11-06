$(document).ready(function() {
    $("body>section").each(function(){
        giveSectionsUniqueClasses( $(this) );
    });
    // For use developing, this section allows you to build HTML closer to what the Ektron view will look like for looping through data
    $("*").each(function () {
        if ( $(this).data("ektron-temp") ) {
            if ( !$(this).attr("id") ) {
                var createID = Math.floor(Math.random()*1000000);
                createID = "Ektron" + createID;
                $(this).attr("id", createID)
            }
            // If the value is a number, repeat the HTML element that number of time, else get and use JSON data to loop
            if ( isNaN( $(this).data("ektron-temp")*2) ) {
                var thisElementName = $(this).attr("id");
                var thisElement = "#" + thisElementName;
                var repeatedItem = $( "<" + $(this).prop("tagName") + " />" ).append( $( "#" + $(this).attr("id") ).clone() ).html();
                var allElementsArray = [];
                var allElementsString = "";            
                var Model;
                $.ajax({
                    "url": $.trim( $(this).data("ektron-temp") ),
                    "dataType" : "json",
                    "success": function ( data ) {
                        Model = data;
                        for (i=0; i<Model.length; i++) {
                            allElementsArray[i] = repeatedItem;
                            $.each(Model[i], function(key, value) {
                                allElementsArray[i] = allElementsArray[i].replace( "<%=" + key + "%>", value);
                                // just in case the Greater/Less Than symbols are parsed wrong (I'm looking at you mobile Safari)
                                allElementsArray[i] = allElementsArray[i].replace( "&lt;%=" + key + "%&gt;", value);
                            });
                            allElementsString += allElementsArray[i];
                        }
                        $(thisElement).replaceWith( allElementsString );
                        $(thisElement).find("*").each( function () {
                            ektronFramework( $(this) );
                        });
                        $(thisElement).siblings().find("*").each( function () {
                            ektronFramework( $(this) );
                        });
                        for (j=0; j< Model.length;j++) {
                            $(thisElement).removeAttr("data-ektron-temp");
                            $(thisElement).attr("id", thisElementName + j);
                        }
                    }
                });
            } else {
                var thisElementName = $(this).attr("id");
                var repeatitions = Number( $(this).data("ektron-temp") );
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
                    ektronFramework( $(this) );
                });
                $(thisElement).siblings().find("*").each( function () {
                    ektronFramework( $(this) );
                });
                for (l=0; l<repeatitions; l++) {
                    $(thisElement).removeAttr("data-ektron-temp");
                    $(thisElement).attr("id", thisElementName + l);
                }
            }
        } 
        //Run Framework on document
        ektronFramework( $(this) );
    });
});

//Vars
var psuedoClass = "";
var psuedoClasses = [":hover", ":first-child", ":last-child"];
classCount = 0;
classIDsArray = [];

//Functions
function ektronFramework( $this ) {
    if ( $this.data("ektron-text") && $this.data("ektron-text").length > 0 ) {
        var currentString = $this.data("ektron-text");
        currentString = currentString.replace("<%", "");
        currentString = currentString.replace("%>", "");
        currentString = $.trim( currentString );
        $this.children(".ektron-text").replaceWith(currentString);
        if ( !$this.html() ) {
            $this.html(currentString);
        }
    }
    if ( $this.data("ektron-attr") && $this.data("ektron-attr").indexOf("<%") < 0 && $this.data("ektron-attr").length > 0 ) {
        var thisAttributes = $this.data("ektron-attr").split("&&");
        for (var i=0; i<thisAttributes.length; i++) {
            thisAttr = $.trim(thisAttributes[i]).split("=="); 
            if ( thisAttr[0] && thisAttr[1] ) {
                thisAttr[0] = $.trim(thisAttr[0]) + "";
                if ( thisAttr[1].length > 0 ) {
                    $this.attr( thisAttr[0], $.trim( thisAttr[1] ) );
                }
            }
        }
    }
    if ( $this.data("ektron-css") ) {
        if ( !$this.attr("id") ) {
            var createID = Math.floor(Math.random()*1000000);
            createID = "Ektron" + createID;
            $this.attr("id", createID)
        }
        var styleTag = "<style>";
        var $data = $this.data("ektron-css");
        for (var i=0;i<psuedoClasses.length;i++) {
            var $data = pseudoClassFinder( $data, $this.attr("id"), psuedoClasses[i] );
        }
        var thisCsses = $data.split("&");
        for (var i=0; i<thisCsses.length; i++) {
            var thisStyleComplete = "";
            if ( thisCsses[i].indexOf("@") < 0 ) {
                thisCssS = $.trim(thisCsses[i]).split(";");
                for ( var j=0; j<thisCssS.length; j++) {
                    thisCss = $.trim(thisCssS[j]).split(":");
                    if ( thisCss[0] && thisCss[1] ) {
                        thisCss[0] = $.trim(thisCss[0]);
                        thisCss[1] = $.trim(thisCss[1]);
                        thisStyleComplete = thisCss[0] + ": " + thisCss[1] + ";";
                        styleTag += "#" + $this.attr("id") + " { ";
                        styleTag += thisStyleComplete + " }";
                    }
                }
            } else {
                var thisAtMedia = thisCsses[i].split("@");
                var thisCssesWithMedia = thisAtMedia[0].split(";");
                for ( var k=0; k<thisCssesWithMedia.length;k++ ) {
                    thisCssWithMedia = $.trim(thisCssesWithMedia[k]).split(":");
                    if ( thisCssWithMedia[0] && thisCssWithMedia[1] ) {
                        thisCssWithMedia[0] = $.trim(thisCssWithMedia[0]);
                        thisCssWithMedia[1] = $.trim(thisCssWithMedia[1]);
                        thisStyleComplete += thisCssWithMedia[0] + ": " + thisCssWithMedia[1] + ";"
                    }
                }
                if (thisAtMedia[1]) {
                    var thisStyle = thisAtMedia[1].split(":");
                    if ( thisStyle[0] && thisStyle[1] ) {
                        thisStyle[0] = $.trim(thisStyle[0]).toLowerCase();
                        thisStyle[1] = Number( $.trim(thisStyle[1]) );
                        if ( thisStyle[0] == "min" || thisStyle[0] == "max" ) {
                            styleTag += "@media (" +  thisStyle[0] + "-width: " + thisStyle[1] + "px) {";
                            styleTag += "#" + $this.attr("id") + " { ";
                            styleTag += thisStyleComplete + " } }";

                        }
                    }
                }
            }
        }
        styleTag += psuedoClass;
        styleTag += "</style>";
        $("head").append(styleTag);
    }
    // <-- ADD INTERSESSIONAL BUTTON CODE
    if ( $this.data("ektron-warning") ) {
        if ( !$(".leaveUmpquaModell").length ) {
            createLeaveUmpquaDialog();
        }
        $this.on("click", function (event) {
            event.preventDefault();
            var linkOutside = $this.attr("href");
            $(".leaveUmpquaModel").show();
            if ( $this.data("ektron-warning").length > 1 ) {
                $(".leaveModalBox").children("p").text( $this.data("ektron-warning") );
            }
            $(".dialogOK").attr("href", linkOutside);
            $(".windowModalContainer").css( "height", $(window).height() );
            $(".leaveModalBox").css( "width", $(window).width()*.8 );
        });
    }
    // <-- VIDEO MODAL CODE
    if ( $this.data("ektron-youtube") || $this.data("ektron-vimeo") ) {
        if ( !$("#videoModal").length ) {
            createVideoModal();
        }
        var videoOptions = '';
        if ( $this.data("ektron-options") ) {
            videoOptions = $this.data("ektron-options");
        }
        var videoSource = "youtube";
        if ( $this.data("ektron-vimeo") ) {
            videoSource = "vimeo";
        }
        //build iFrame string
        var videoIframe = '<iframe id="video" src="';
        //attache click handler
        if ( videoSource == "vimeo") {
            videoIframe += 'http://player.vimeo.com/video/';
            videoIframe += $this.data("ektron-vimeo") + '?';
            
        } else {
            videoIframe += 'http://www.youtube.com/embed/';
            videoIframe += $this.data("ektron-youtube") + '?';
        }
        videoIframe += attachOptions( videoSource, videoOptions);
        videoIframe += '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
        $this.on("click", function(){
            $("#videoModal").show();
            $("#videoBox").prepend(videoIframe);
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
    "modestbranding=0",
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
    "player_id=umplayer"
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
    return videoQS;
}
function createLeaveUmpquaDialog() {
    $("body").append("<div class='leaveUmpquaModel'></div>");
    var winHeight = $("html").height() + $(window).height()/2;
    $(".leaveUmpquaModel").css("height", winHeight );
    $(".leaveUmpquaModel").append("<div class='windowModalContainer'></div>");
    $(".windowModalContainer").css("height", $(window).height());
    $(".windowModalContainer").append("<span></span>");
    $(".windowModalContainer").append("<div class='leaveModalBox'></div>");
    $(".leaveModalBox").append("<h1>HELLO THERE!</h1>");
    $(".leaveModalBox").append("<p>By following this link, you will be leaving umpquabank.com. Click OK to continue or cancel to remain in umpquabank.com.</p>");
    $(".leaveModalBox").append("<a class='dialogCancel'>CANCEL</a>");
    $(".leaveModalBox").append("<a href='' class='dialogOK' target='_blank'>OK</a>");
    $(".leaveUmpquaModel").hide();
    console.log("Leave domain Modal Created");
    $(".dialogCancel, .dialogOK, .leaveUmpquaModel").on("click", function () {
        $(".leaveUmpquaModel").hide();
    });
}
function pseudoClassFinder(teststring, testid, pclass) {
    teststring = teststring.replace("&:", ":");
    if ( teststring.indexOf(pclass ) >= 0 ) {
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
        //var fullDomainArray = fullPageName.split("||");
        //var domainArray = fullDomainArray[1].split(".");
        //pageName = domainArray[domainArray.length-2];
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
    if ( $("#video").length ) {
        var viewPortWidth = $(window).width();
        var viewPortHeight = $(window).height();
        if (screenSizingWrong) {
            // in case device computes window size wrong
            viewPortWidth = $(document).width();
        }
        var videoBoxPadding = parseInt($("#videoBox").css("padding-top"));
        var totalVideoPadding = videoBoxPadding * 2;
        var potentialWidth = .8 * viewPortWidth;
        var potentialHeight = .8 * viewPortHeight;
        var letterBoxFactor = 16 / 9;
        // determine limiting factor: width or height
        if (potentialWidth > potentialHeight * letterBoxFactor) {
            // calculate width from height;
            $("#video").css("width", (potentialHeight - totalVideoPadding) * letterBoxFactor + "px");
            $("#video").css("height", potentialHeight - totalVideoPadding + "px");
            $("#videoBox").css("width", potentialHeight * letterBoxFactor + "px");
            $("#videoBox").css("height", potentialHeight + "px");
        } else {
            // calculate width from height;
            $("#video").css("width", (potentialWidth - totalVideoPadding) + "px");
            $("#video").css("height", (potentialWidth - totalVideoPadding) / letterBoxFactor + "px");
            $("#videoBox").css("width", potentialWidth + "px");
            $("#videoBox").css("height", potentialWidth / letterBoxFactor + "px");
        }
        $("#videoBox").css("padding-top", videoBoxPadding + "px");
        $("#videoModalContainer").css("height", viewPortHeight);
        $("#video").css("max-width", "1920px");
        $("#video").css("max-height", "1080px");
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
    $("#videoBox").append("<a class='close-video'>Close</a>");
    $(".close-video, #videoModal").on("click", function () {
        $("#videoModal").hide();
        $("#video").remove();
    });
    $("#videoModal").hide();
    console.log("Video Modal Created");
}



/*
vimeo:
<iframe 
    src="//player.vimeo.com/video/VIDEO_ID?autoplay=1&badge=0&byline=0&color=FFF&portrait=0&title=0&player_id=my-player" 
    frameborder="0"
    id="video"
    webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

youtube:
<iframe 
    src="http://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://current.com&controls="   
    frameborder="0"
    id="video"
    webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>


enablejsapi=1 allows to be controlled by JS
playerapiid=anyString
modestbranding=1
rel=0
showinfo=0
disablekb=1
autohide=1
*/




























