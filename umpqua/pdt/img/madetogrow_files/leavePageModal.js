$(document).ready(function () {
    createLeaveUmpquaDialog();

    var comp = new RegExp(location.host);
    $('a').each(function () {
        var hrefContains = "";
        if ($(this).attr('href')) {
            hrefContains = $(this).attr('href').toLowerCase();
        }
        //if (hrefContains.indexOf("umpquabank.com") < 0) {
        if (hrefContains.indexOf("mortgage-application.net") > -1) {
            $(this).addClass('external-link');
        }
        if (hrefContains.indexOf("tel") == 0) {
            $(this).removeClass('external-link');
        } else if (hrefContains.indexOf("/") == 0) {
            $(this).removeClass('external-link');
        } else if (hrefContains.indexOf("@") > -1 ) {
            $(this).removeClass('external-link');
            $(this).attr("target", "_self");
        } else if (hrefContains.indexOf("#") == 0) {
            $(this).removeClass('external-link');
        } else if (hrefContains == "") {
            $(this).removeClass('external-link');
        }
    });


    $("a.external-link").on("click", function (event) {
    //$("#podcastDiv1 a.subscribeBtn, #footerLogoList a, a.logoSpacingFirst, a.podcast-link, a.external-link").on("click", function (event) {
        event.preventDefault();
        var linkOutside = $(this).attr("href");
        $(".leaveUmpquaModel").show();
        $(".dialogOK").attr("href", linkOutside);
    });
    $(".dialogCancel, .dialogOK").on("click", function () {
        $(".leaveUmpquaModel").hide();
    });
});
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
}