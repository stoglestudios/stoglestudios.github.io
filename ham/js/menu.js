/* Menu Animation */

$(document).ready(function(){
    menuIsBuilt = false;
    menuBtnHeight = $(".menu-btn").outerHeight();
    menuHeight = menuBtnHeight + $(".first.menu-spacer").outerHeight() + $(".last.menu-spacer").outerHeight() + $(".menu-list").outerHeight();
    menuPadding = menuHeight - menuBtnHeight;
    menuPadding = menuPadding*-1;
    $("#menu").css("height", menuBtnHeight +"px");
    imageCheck = 0;
    initialImage = $(".hamburger").css('background-image').replace(")", "").split("/img/");
    bgImage = initialImage[1].split("1");
    currentImage = initialImage;
    touchStartPosition = null;
    $(document).on("mousewheel", function ( event ) {
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
        }
    });
    $(document).on("DOMMouseScroll", function ( event ) {
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
        }
    });
    $(document).on("touchstart", function ( event ) {
        touchStartPosition = event.originalEvent.touches[0].clientY;
        //alert("TouchStart");
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
        } else {
            floatingMenuOut();
        }
    });
    $("#menu").on("click", function() {
        transitionHamburger($(this));
    });
});

var i = 1;
function buildFloatingMenu () {
    //Get HTML of Menu & Assign it new id: "floating-menu"
    var menuMarkup = $( "<" + $("#menu").prop("tagName") + " />" ).append( $( "#menu" ).clone() ).html().replace("id=\"menu", "id=\"floating-menu");
    //Make copy of Permanant Top Menu and add it to the body
    $("body").append(menuMarkup);
    //give it new styles:
    $("#floating-menu").css({
        position: "fixed",
        width: "100%",
        top: "-" + menuBtnHeight + "px",
        backgroundColor: "lightblue"
    });
    $("#floating-menu").on("click", function() {
        transitionHamburger($(this));
    });
    $("#floating-menu").on("touch", function(evt) {
        evt.stopPropagation();
        transitionHamburger($(this));
    });
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
    if (currentImage == initialImage) {
        imageCheck = 1;
    }
    var animateHamburger = setInterval(function(){
        currentImage = bgImage[0] + i + bgImage[1];
        $this.children("a").children(".hamburger").css("background-image", "url(img/" + currentImage + ")");
        if (imageCheck) {                
            if (i>5){
                window.clearInterval(animateHamburger);
                imageCheck = 0;
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
            if (i>10){
                i=1;
                window.clearInterval(animateHamburger);
                $this.children("a").children(".hamburger").css("background-image", "url(img/" + bgImage[0] + 1 + bgImage[1] + ")");
                imageCheck = 1;
            } else {
                i++;
            }
            $this.stop().animate(
                {
                    height: menuBtnHeight + "px"
                    /*, marginBottom: 0 */
                }, {
                    duration: 120,
                    easing: "easeOutBack",
                } );
        }
    }, 60);
}