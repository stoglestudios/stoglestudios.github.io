$(document).ready(function () {
    //remove existing videos
    $("#video").remove();
    if ( $(window).width() < $(document).width()*.95 ) {
        screenSizingWrong = true;
    } else {
        screenSizingWrong = false;
    }
    createVideoModal();
    $('.play-video').on('click', function (ev) {
        var videoID = $(this).data("youtube-id");
        var testingServer = window.location.href;
        //for testing:
        if ( testingServer.indexOf("h02-ektrn-app1") > -1 ) {
            videoID = "https://www.youtube.com/embed/e2dwwMHg7ZQ";
        }
        if (videoID.length > 0) {
            ev.preventDefault();
            $("#videoModal").show();
            $("#video").show();
            $("#videoBox").prepend("<iframe id='video' src='" + videoID + "?showinfo=1&autohide=1&rel=0&autoplay=1' frameborder='0' allowfullscreen></iframe>");
            sizeVideo();
            if (typeof teaserVideo === 'string') {
                setPointers();
                teaserVideo.pauseVideo();
            }
        }
    });
    $(".close-video, #videoModal").on("click", function () {
        $("#videoModal").hide();
        $("#video").remove();
        if (teaserVideo) {
            teaserVideo.pauseVideo();
        }
    });
    $(window).resize(function () {
        sizeVideo();
    });
});
function sizeVideo () {
    console.log("Window:\nwidth: " + $(window).width() + " & height: " + $(window).height() + "\n\n")
    console.log("Document:\nwidth: " + $(document).width() + " & height: " + $(document).height() + "\n\n-----------------------\n\n")
    var viewPortWidth = $(window).width();
    var viewPortHeight = $(window).height();
    if ( screenSizingWrong ) {
        // in case device computes window size wrong
        viewPortWidth = $(document).width();
    }
    var videoBoxPadding = parseInt($("#videoBox").css("padding-top"));
    var totalVideoPadding = videoBoxPadding * 2;
    var potentialWidth = .8 * viewPortWidth;
    var potentialHeight = .8 * viewPortHeight;
    var letterBoxFactor = 16 / 9;
    console.log("Pot-w: " + potentialWidth + "; Pot-h: " + potentialHeight + "; pad: " + videoBoxPadding);
    if ( potentialWidth > potentialHeight * letterBoxFactor ) {
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
// Movie Modal
function createVideoModal() {
    $("body").append("<div id='videoModal'></div>");
    $("#videoModal").css("height", $("html").css("height"));
    $("#videoModal").append("<div id='videoModalContainer'></div>");
    $("#videoModalContainer").css("height", $(window).height());
    $("#videoModalContainer").append("<span></span>");
    $("#videoModalContainer").append("<div id='videoBox'></div>");
    $("#videoBox").append("<a class='close-video'>Close (X)</a>");
    $("#videoModal").hide();
}