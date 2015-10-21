/* Menu Animation */

$(document).ready(function(){
    i = 1;
    menuBtnHeight = $("#menu-btn").outerHeight();
    menuHeight = menuBtnHeight + $(".first.menu-spacer").outerHeight() + $(".last.menu-spacer").outerHeight() + $("#menu-options").outerHeight();
    menuPadding = menuHeight - menuBtnHeight;
    $("#menu").css("height", menuBtnHeight +"px");
    imageCheck = 0;
    initialImage = $("#hamburger").css('background-image').replace(")", "").split("/img/");
    bgImage = initialImage[1].split("1");
    currentImage = initialImage;
    $("#menu").on("click", function() {
        transitionHamburger();
    });
    
    
    
});


function transitionHamburger() {
    if (currentImage == initialImage) {
        imageCheck = 1;
    }
    menuHeight = menuBtnHeight + $(".first.menu-spacer").outerHeight() + $(".last.menu-spacer").outerHeight() + $("#menu-options").outerHeight();
    menuPadding = menuHeight - menuBtnHeight;
    $("#menu").css("height", menuBtnHeight +"px");
    var animateHamburger = setInterval(function(){
        currentImage = bgImage[0] + i + bgImage[1];
        console.log(i + " | " + currentImage + " | " + imageCheck);
        $("#hamburger").css("background-image", "url(img/" + currentImage + ")");
        if (imageCheck) {                
            if (i>5){
                window.clearInterval(animateHamburger);
                imageCheck = 0;
            } else {
                i++;
            }
            $("#menu").stop().animate(
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
                $("#hamburger").css("background-image", "url(img/" + bgImage[0] + 1 + bgImage[1] + ")");
                imageCheck = 1;
            } else {
                i++;
            }
            $("#menu").stop().animate(
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