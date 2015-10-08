$(document).ready(function() {
    // For use developing, this section allows you to build HTML closer to what the Ektron view will look like for looping through data
    $("*").each(function () {
        if ( $(this).data("ektron-temp") ) {
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
                        });
                        allElementsString += allElementsArray[i];
                        
                    }
                    console.log( thisElement );
                    
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
        }
        //Run Framework on document
        ektronFramework( $(this) );
    });

    //Example Function
    repeatText( "#repeat" );
});

function repeatText( theTarget ) {
    var repeatCycleNumber = Number($(theTarget).data("ektron-repeat"));
    var theStartText = $(theTarget).text();
    var theText = theStartText;
    for (var i=0; i<repeatCycleNumber; i++) {
        theText += theStartText;
    }
    $(theTarget).text(theText);
}

function ektronFramework( $this ) {
    if ( $this.data("ektron-text") ) {
        var currentString = $.trim($this.data("ektron-text"));
        $this.children(".ektron-text").replaceWith(currentString);
        if ( !$this.html() ) {
            $this.html(currentString);
        }
    }
    if ( $this.data("ektron-attributes") ) {
        var thisAttributes = $this.data("ektron-attributes").split("&");
        for (var i=0; i<thisAttributes.length; i++) {
            thisAttr = $.trim(thisAttributes[i]).split("="); 
            if ( thisAttr[0] && thisAttr[1] ) {
                thisAttr[0] = $.trim(thisAttr[0]);
                thisAttr[1] = $.trim(thisAttr[1]);
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
        var thisCsses = $this.data("ektron-css").split("&");
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
        styleTag += "</style>";
        $("head").append(styleTag);
    }
}