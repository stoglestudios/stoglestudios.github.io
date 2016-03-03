$(document).ready(function () {
    //Add hero BG
    setMainHeroBG();
});

/* Set BG image */
function setMainHeroBG () {
    var largeBG = $("#heroContent").data("small-bg");
    var smallBG = $("#heroContent").data("large-bg");
    $("#heroContent").css("background-image", smallBG);
    console.log("large image: " + largeBG + "; \nsmall image: " + smallBG);
    var addedStyle = "<style type='text/css'>";
    addedStyle += "#heroContent { background: url(" + smallBG + ") no-repeat center center fixed black;}";
    addedStyle += "@media (min-width: 400px) { background-image: url(" + largeBG + "); }";
    addedStyle += "</style>";
    $("head").append(addedStyle);
}