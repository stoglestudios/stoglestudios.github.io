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
                console.log( allElementsString );
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
    if ( $this.data("ektron-text") ) {
        var currentString = $this.data("ektron-text");
        currentString = currentString.replace("<%", "");
        currentString = currentString.replace("%>", "");
        currentString = $.trim( currentString );
        $this.children(".ektron-text").replaceWith(currentString);
        if ( !$this.html() ) {
            $this.html(currentString);
        }
    }
    if ( $this.data("ektron-attributes") && $this.data("ektron-attributes").indexOf("<%") < 0 ) {
        var thisAttributes = $this.data("ektron-attributes").split("&");
        for (var i=0; i<thisAttributes.length; i++) {
            thisAttr = $.trim(thisAttributes[i]).split("="); 
            if ( thisAttr[0] && thisAttr[1] ) {
                thisAttr[0] = $.trim(thisAttr[0]) + "";
                thisAttr[1] = $.trim(thisAttr[1].replace("%26", "&").replace("%3B","=")) + "";
                $this.attr(thisAttr[0], thisAttr[1]);
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
    fullPageName = fullPageName.replace("//", "||");
    var pageNamesArray = fullPageName.split("/");
    var pageName = pageNamesArray[pageNamesArray.length-1];
    var pageExtension = pageName.split(".");
    if ( pageExtension.length > 0 ) {
        pageName = pageExtension[0];
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





























