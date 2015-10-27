/* Menu Animation */

$(document).ready(function(){
    menuIsBuilt = false;
    menuBtnHeight = $(".menu-btn").outerHeight();
    menuHeight = menuBtnHeight + $(".first.menu-spacer").outerHeight() + $(".last.menu-spacer").outerHeight() + $(".menu-list").outerHeight();
    menuPadding = menuHeight - menuBtnHeight;
    menuPadding = menuPadding*-1;
    $("#menu").css("height", menuBtnHeight +"px");
    imageCheck = 1;
    initialImage = $(".hamburger").css('background-image').replace(")", "").split("/img/");
    currentImage = initialImage;
    touchStartPosition = null;
    $(document).on("mousewheel", function ( event ) {
        $float = $("#floating-menu");
        if (!menuIsBuilt) {
            buildFloatingMenu ();
            menuIsBuilt = true;
        }
        var documentScroll = $(document).scrollTop();
        var windowHeight = $(window).height();
        if ( documentScroll > windowHeight && event.originalEvent.wheelDelta >= 0 ) {
            floatingMenuIn();
        } else {
            floatingMenuOut();
            $float.animate({height: menuBtnHeight + "px"}, 60);
            $float.children("a").children(".hamburger").css("background-position-y", "0%");
            imageCheck = true;
        }
    });
    $(document).on("DOMMouseScroll", function ( event ) {
        $float = $("#floating-menu");
        if (!menuIsBuilt) {
            buildFloatingMenu ();
            menuIsBuilt = true;
        }
        var documentScroll = $(document).scrollTop();
        var windowHeight = $(window).height();
        if ( documentScroll > windowHeight && event.originalEvent.wheelDelta >= 0 ) {
            floatingMenuIn();
        } else {
            floatingMenuOut();
            $float.animate({height: menuBtnHeight + "px"}, 60);
            $float.children("a").children(".hamburger").css("background-position-y", "0%");
            imageCheck = true;
        }
    });
    $(document).on("touchstart", function ( event ) {
        touchStartPosition = event.originalEvent.touches[0].clientY;
    });
    $(document).on("touchend", function ( event ) {
        var touchEndPosition = event.originalEvent.changedTouches[0].clientY;
        var documentScroll = $(document).scrollTop();
        var windowHeight = $(window).height();
        if (!menuIsBuilt) {
            buildFloatingMenu ();
            menuIsBuilt = true;
        }
        if ( touchEndPosition > touchStartPosition && documentScroll > windowHeight ) {
            floatingMenuIn();
        } else if ( touchEndPosition == touchStartPosition ) {
            console.log("just a click");
        } else {
            floatingMenuOut();
            var $float = $("#floating-menu");
            if ( $float.height() > menuBtnHeight ) {
                transitionHamburger( $float );
            }
        }
    });
    $("#menu .menu-btn").on("click", function() {
        transitionHamburger($(this).parent());
    });
});

i = 1;
function buildFloatingMenu () {
    //Get HTML of Menu & Assign it new id: "floating-menu"
    var menuMarkup = $( "<" + $("#menu").prop("tagName") + " />" ).append( $( "#menu" ).clone() ).html().replace("id=\"menu", "id=\"floating-menu");
    //Make copy of Permanant Top Menu and add it to the body
    $("body").append(menuMarkup);
    //give it new styles:
    $("#floating-menu").css({
        top: "-" + menuBtnHeight + "px"
    });
    $("#floating-menu .menu-btn").on("click", function() {
        transitionHamburger($(this).parent());
    });
//    $("#floating-menu .menu-btn").on("touch", function(evt) {
//        //evt.stopPropagation();
//        transitionHamburger($(this).parent());
//        console.log("Touched");
//    });
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
    })
}

function transitionHamburger(self) {
    $this = self;
    menuBtnHeight = $(".menu-btn").outerHeight();
    menuHeight = menuBtnHeight + $(".first.menu-spacer").outerHeight() + $(".last.menu-spacer").outerHeight() + $(".menu-list").outerHeight();
    var animateHamburger = setInterval(function(){
        $this.children("a").children(".hamburger").css("background-position-y", "-" + i*100 + "%");
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
                $this.children("a").children(".hamburger").css("background-position-y", "-" + i + "%");
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