/* Menu Animation */

//SET INITIAL VARS
T_previous = -1;
T_current = 0;
isScrolling = false;
initialWindowPostion = null;
currentWindowPosition = null;
scrollUnequalizer = 0;
windowPositions = [];

$(document).ready(function(){
    menuIsBuilt = false;
    menuBtnHeight = $(".menu-btn").outerHeight();
    menuHeight = menuBtnHeight + $(".first.menu-spacer").outerHeight() + $(".last.menu-spacer").outerHeight() + $(".menu-list").outerHeight();
    menuPadding = menuHeight - menuBtnHeight;
    menuPadding = menuPadding*-1;
    imageCheck = 1;
    initialImage = $(".hamburger").css('background-image').replace(")", "").split("/img/");
    currentImage = initialImage;
    touchStartPosition = null;
    $(window).on("scroll", function ( event ) {
        if ( !menuIsBuilt ) {
            buildFloatingMenu();
            menuIsBuilt = true;
        }
        if ( initialWindowPostion == null ) {
            initialWindowPostion = $(document).scrollTop(); // <-- GET: CURRENT WINDOW POSTION;
        }
        if ( isScrolling == false ) {
            scrollTracking = setInterval( windowScrolling, 50 );
            isScrolling = true;
        }
        flashColors();
        closeOpenMenus();
    });
    $(document).on("mousewheel", function ( event ) {
        if ( event.originalEvent.wheelDelta < 0 ) {
            scrollUnequalizer = -5;
        } else if ( event.originalEvent.wheelDelta > 0 ) {
            scrollUnequalizer = 5;
        } else {
            scrollUnequalizer = 0;
        } 
    });

    $("#menu .menu-btn").on("click", function() {
        transitionHamburger( $(this).parent() );
    });
    $(".menu-options a").on("click", function() {
        transitionHamburger( $(this).parent().parent().parent().parent() );
    });
    $(".menu-list").on("click", function(){
        transitionHamburger( $(this).parent() );
    });
    $("#menu").css({
        height: menuBtnHeight +"px"
    });
    
    var menuCSS = "<style>";
    menuCSS += "nav#menu {\n  background-color: " + convertHexToRGBA( $("#menu").data("bg-color"), $("#menu").data("bg-opacity") ) + "\n}\n";
    menuCSS += "nav#menu a {\n  color: " + convertHexToRGBA( $("#menu").data("color"), "1" ) + "\n}\n";
    menuCSS += "nav#menu a:hover {\n  color: " + convertHexToRGBA( $("#menu").data("hover-color"), "1" ) + "\n}\n";
    
    menuCSS += "nav#menu a.current-page:hover {\n  cursor: default;\n}\n";
    
    menuCSS += "nav#menu a.current-page {\n  color: " + convertHexToRGBA( $("#menu").data("current-pg-color"), "1" ) + ";\n}\n";
    menuCSS += "nav#floating-menu {\n  background-color: " + convertHexToRGBA( $("#menu").data("float-bg-color"), $("#menu").data("float-bg-opacity") ) + ";\n}\n";
    menuCSS += "nav#floating-menu a {\n  color: " + convertHexToRGBA( $("#menu").data("float-color"), "1" ) + ";\n}\n";
    menuCSS += "nav#floating-menu a:hover {\n  color: " + convertHexToRGBA( $("#menu").data("float-hover-color"), "1" ) + ";\n}\n";
    menuCSS += "nav#floating-menu a:hover span {\n  color: " + convertHexToRGBA( $("#menu").data("float-hover-color"), "1" ) + ";\n}\n";
    menuCSS += "nav#floating-menu a.current-page {\n  color: " + convertHexToRGBA( $("#menu").data("float-current-color"), "1" ) + ";\n}\n";
    menuCSS += "nav#floating-menu a.current-page:hover {\n  cursor: default;\n}\n";
    menuCSS += "nav#floating-menu .menu-list span {\n  border-color: " + convertHexToRGBA( $("#menu").data("float-current-color"), "1" ) + ";\n}\n";
    menuCSS += "</style>";
    $("head").append( menuCSS );
});

i = 1;
function buildFloatingMenu () {
    //Get HTML of Menu & Assign it new id: "floating-menu"
    var menuMarkup = $( "<" + $("#menu").prop("tagName") + " />" ).append( $( "#menu" ).clone().addClass("floating-menu") ).html();
    //Make copy of Permanant Top Menu and add it to the body
    $("body").append(menuMarkup);
    //give it new styles:
    $(".floating-menu").attr("id", "floating-menu");
    $("#floating-menu").css({
        top: "-" + menuBtnHeight + "px",
        height: menuBtnHeight + "px"
    });
    $("#floating-menu .menu-btn img").attr( "src", $("#menu .menu-btn img").data("alt-src") );
    $("#floating-menu .menu-btn").on("click", function() {
        transitionHamburger($(this).parent());
    });
    console.log("floating menu built");
}
function floatingMenuIn() {
    $("#floating-menu").stop().animate({
            top: "0"
        }, {
            duration: 200,
            easing: "easeInOutCubic"
    });
}
function floatingMenuOut() {
    $("#floating-menu").stop().animate({
            top: "-" + menuBtnHeight + "px"
        }, {
            duration: 200,
            easing: "easeInOutCubic"
    });
    var menuOpen = "-" + 16*5 + "px";
    var floatCurrent = $("#floating-menu").children("a").children(".hamburger").children("img").css("top");;
    if ( floatCurrent == menuOpen ) {
        transitionHamburger( $("#floating-menu") );
    }
}

function transitionHamburger(self) {
    $(".menu-options a").each(function(){
        if ( $(this).attr("href") ) {
            var thisHREF = $(this).attr("href");
        } else {
            var thisHREF = "";
        }
        var currentURL = window.location.pathname.replace("index.html", "");
        thisHREF = thisHREF.replace("..", "");
        thisHREF = thisHREF.replace(/\//g,"");
        currentURL = currentURL.replace(/\//g,"");
        if ( thisHREF == currentURL ) {
            $(this).addClass("current-page");
            $(this).removeAttr("href");
            console.log( thisHREF + " == " + currentURL );
        } else {
            console.log( thisHREF + " != " + currentURL );
        }
    });
    $this = self;
    menuBtnHeight = $(".menu-btn").outerHeight();
    menuHeight = menuBtnHeight + $(".first.menu-spacer").outerHeight() + $(".last.menu-spacer").outerHeight() + $(".menu-list").outerHeight();
    var animateHamburger = setInterval(function(){
        $this.children("a").children(".hamburger").children("img").css("top", "-" + i*100 + "%");
        if (imageCheck) {
            if (i>4){
                window.clearInterval(animateHamburger);
                imageCheck = false;
            } else {
                i++;
            }
            $this.stop().animate(
                {
                    height: menuHeight + "px"
                    /*, marginBottom: menuPadding*/
                }, { 
                    duration: 120,
                    easing: "easeInOutCubic"
                });
        } else {
            if (i>9){
                i=1;
                window.clearInterval(animateHamburger);
                $this.children("a").children(".hamburger").children("img").css("top", "-" + i + "%");
                imageCheck = true;
            } else {
                i++;
            }
            $this.stop().animate(
                {
                    height: menuBtnHeight + "px"
                    /*, marginBottom: 0 */
                }, {
                    duration: 120,
                    easing: "easeOutBack"
                } );
        }
    }, 60);
}
function windowScrolling () {
    T_previous++;
    T_current++;
    if ( T_previous == 0 ) {
        windowPositions[0] = initialWindowPostion;
        windowPositions[1] = $(document).scrollTop();
    } else if ( T_previous > 0 ) {
        windowPositions[T_current] = $(document).scrollTop();

        if ( windowPositions[T_current] == windowPositions[T_previous]) {
            isScrolling = false;
            // STOP!!
            //end tracking
            clearInterval( scrollTracking );
            if ( $(document).scrollTop() > initialWindowPostion + scrollUnequalizer ) {
                floatingMenuOut();
                setColors();
            } else if ( $(document).scrollTop() < initialWindowPostion + scrollUnequalizer ) {
                if ( $(document).scrollTop() > $(window).height() ) {
                    floatingMenuIn();
                } else {
                    floatingMenuOut();
                }
                setOtherColors();
            }
            //reset all vars to intial values
            T_previous = -1;
            T_current = 0;
            isScrolling = false;
            initialWindowPostion = null;
            currentWindowPosition = null;
            windowPositions.length = 0;
        }
    }
}
function flashColors() {
    $(".filler").each( function() {
        if ( $(this).css("background-color") == "rgb(105, 105, 105)" || $(this).css("background-color") == "rgb(0, 100, 0)" || $(this).css("background-color") == "rgb(218, 112, 0)" ) { //grey or green or orange
            $(this).css("background-color", "rgb(0, 0, 139)" ); //blue
        } else if ( $(this).css("background-color") == "rgb(112, 128, 144)" || $(this).css("background-color") == "rgb(218, 165, 32)" || $(this).css("background-color") == "rgb(100, 0, 100)" ) { //periwinkle or goldenrod or purple
            $(this).css("background-color", "rgb(139, 0, 0)" ); //red
        } else if ( $(this).css("background-color") == "rgb(0, 0, 139)" ) { //blue or 
            $(this).css("background-color", "rgb(105, 105, 105)" ); //grey
        } else if ( $(this).css("background-color") == "rgb(139, 0, 0)" ) { //red
            $(this).css("background-color", "rgb(112, 128, 144)" ); //periwinkle
        }
    });
}
function setColors() {
    $(".filler").each( function() {
        if ( $(this).css("background-color") == "rgb(105, 105, 105)" || $(this).css("background-color") == "rgb(0, 0, 139)" ) { //grey or blue
            $(this).css("background-color", "rgb(218, 165, 32)" ); //goldenrod
        } else if ( $(this).css("background-color") == "rgb(139, 0, 0)" || $(this).css("background-color") == "rgb(112, 128, 144)" ) { //red or periwinkle
            $(this).css("background-color", "rgb(0, 100, 0)" ); //green
        }
    });
}
function setOtherColors() {
    $(".filler").each( function() {
        if ( $(this).css("background-color") == "rgb(105, 105, 105)" || $(this).css("background-color") == "rgb(0, 0, 139)" ) { //grey or blue
            $(this).css("background-color", "rgb(218, 112, 0)" ); //orange
        } else if ( $(this).css("background-color") == "rgb(139, 0, 0)" || $(this).css("background-color") == "rgb(112, 128, 144)" ) { //red or periwinkle
            $(this).css("background-color", "rgb(100, 0, 100)" ); //purple
        }
    });
}
function convertHexToRGBA (color, opacity) {
    if ( color.length == 7 ) {
        var patt = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/;
        var matches = patt.exec(color);
        var firstSet = parseInt(matches[1], 16);
        var secondSet = parseInt(matches[2], 16);
        var thirdSet = parseInt(matches[3], 16);
        var rgba = "rgba(" + firstSet + "," + secondSet + "," + thirdSet + "," + opacity + ");";
        return rgba;
    } else if ( color.length == 4 ) {
        var patt = /^#([\da-fA-F]{1})([\da-fA-F]{1})([\da-fA-F]{1})$/;
        var matches = patt.exec(color);
        var firstSet = parseInt(matches[1], 16);
        var secondSet = parseInt(matches[2], 16);
        var thirdSet = parseInt(matches[3], 16);
        var rgba = "rgba(" + Math.floor(firstSet*firstSet*1.13) + "," +  Math.floor(secondSet*secondSet*1.13) + "," +  Math.floor(thirdSet*thirdSet*1.13) + "," + opacity + ");";
        return rgba;
    } else {
        console.log("invalid color");
        return "rgba(0,0,0,1)";
    }
    console.log(rgba);
}
function closeOpenMenus() {
    var menuCurrent =  $("#menu").children("a").children(".hamburger").children("img").css("top");
    var menuOpen = "-" + 16*5 + "px";
    if ( menuCurrent == menuOpen ) {
        transitionHamburger( $("#menu") );
    }
}