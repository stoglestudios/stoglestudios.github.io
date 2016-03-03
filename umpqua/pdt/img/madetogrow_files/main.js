
// initialize namespace safely
var MadeToGrow = MadeToGrow || {};

$( document ).ready(function() {

    console.log( "ready!" );

    //Fix Product Headers
    fixProductHeaders();

    // DEV ONLY SETTING
    MadeToGrow.autoPlay = true;

    // initialize parallax things
    MadeToGrow.scrollers.init('main');

    /* START CAROUSEL CODE*/
    $('.tools-carousel').slick({
        dots: true,
        autoplay: false,
        arrows: false
    });

    $('.smallBiz-carousel').slick({
        dots: true,
        arrows: false,
        autoplay:true
    });

    $('.speaker-carousel').slick({
        dots: false,
        arrows: true,
        autoplay: true,
        fade: true,
        responsive: [
            {
                breakpoint: 550,
                settings: {
                    arrows: false,
                    dots: true,
                    fade:false,
                    autoplay:false,
                    adaptiveHeight: true
                }
            },
            {
            breakpoint: 950,
            settings: {
                arrows: true,
                fade:false,
                autoplay:false
                }
            }
         ]
    });

    $('.quotes-carousel').slick({
        dots: false
    });

    $('.location-carousel').slick({
        //Wanted to make this lazy load the images since they're big but this is causing a weird layout bug in ie
        //lazyLoad: 'ondemand'
    });

    // debugging the IE lazy load issue issue
    // $('.locationDiv img').on('load', function(){
    //     console.log('loaded this image:', this);
    //     console.log($(this).height())
    // });
    
    // short cut    
    var Mtg = MadeToGrow;

    // hide main video when escape is pressed
    $(document).keyup(function(e){
        if (e.keyCode === 27 && fullVideoIsPlaying){
            // toggleVideo({ mainVidDiv, fullVidDiv, mainVid, fullVid }
            MadeToGrow.videos.tryto.toggleVideo({
                mainVidDiv: heroMainDiv,
                fullVidDiv: fullVidElement,
                mainVid: teaserVideo,
                fullVid: fullVideo 
            });
        };
    });

    function setPointers(){
        // reset our references
        teaserVideo = MadeToGrow.videos.getPlayerById(teaserVideo);
        fullVideo = MadeToGrow.videos.getPlayerById(fullVideo);
    };

    createVideoModal();

    $('#play-video').on('click', function(ev) {

        ev.preventDefault();
        $("#videoModal").show();
        $("#video").show();
        $("#videoBox").prepend("<iframe id='video' height='100%' width='100%' src='" + videoTag + "?showinfo=1&autohide=1&rel=0&autoplay=1' frameborder='0' allowfullscreen></iframe>");
        //heroMainDiv.style.display = "none";
        //fullVidElement.style.display = "initial";

        if (typeof teaserVideo === 'string') {
            setPointers();
        };

        teaserVideo.pauseVideo();
        //fullVideo.seekTo(0);
        //fullVideo.playVideo();
        $("#video").player.playVideo();
        fullVideoIsPlaying = true;
    });
    $(window).resize(function () {
        var iframeWidth = $("#video").width();
        var videoBoxHeight = $("#videoBox").height();
        var iframeHeight = iframeWidth * (9 / 16);
        var iframeMaxHeight = iframeHeight + 32;
        $("#video").css("height", iframeHeight + "px");
        $("#video").css("max-height", videoBoxHeight + "px");
        $("#videoBox").css("height", videoBoxHeight + "px");
    });
    $("#videoModal a, #videoModal").on("click", function () {
        $("#videoModal").hide();
        $("#video").remove();
        //heroMainDiv.style.display = "initial";
        //fullVidElement.style.display = "none";

        teaserVideo.playVideo();
        //fullVideo.pauseVideo();
        fullVideoIsPlaying = false;
    });

    $("#subscribeSelect").on("click mouseover", function () {
        event.preventDefault();
        //event.stopPropagation();
        var paddingtop = parseInt($("#subscribeSelect a").css("padding-top"));
        var paddingBottom = parseInt($("#subscribeSelect a").css("padding-bottom"));
        var listHeight = $("#subscribeSelect a").height();
        var listLength = $("#subscribeSelect li").length;
        var listTotalHeight = (listHeight + paddingtop + paddingBottom) * listLength + "px";
        $("#subscribeSelect ul").show();
        $("#subscribeSelect ul").css("display", "inline-block")
        $("#subscribeSelect ul").stop().animate({ height: listTotalHeight }, 300);
    });
    $("#subscribeSelect").on("mouseout", function (event) {
        $("#subscribeSelect ul").stop().animate({ height: "0px" }, 300, function () {
            $("#subscribeSelect ul").hide();
        });
    });
    $(document).on("click", function (event) {
        var container = $("#subscribeSelect");
        if (!container.is(event.target) && container.has(event.target).length === 0) {
            $("#subscribeSelect ul").stop().animate({ height: "0px" }, 300, function () {
                $("#subscribeSelect ul").hide();
            });
        }
    });


});
// Movie Modal

function createVideoModal() {
    videoTag = $("#video").attr("src");
    // for testing
    //videoTag = "https://www.youtube.com/embed/e2dwwMHg7ZQ";
    $("#video").remove();
    $("body").append("<div id='videoModal'></div>");
    $("#videoModal").css("height", $("html").css("height"));
    $("#videoModal").append("<div id='videoModalContainer'></div>");
    $("#videoModalContainer").css("height", $(window).height());
    $("#videoModalContainer").append("<span></span>");
    $("#videoModalContainer").append("<div id='videoBox'></div>");
    //$("#videoBox").append("<iframe id='video' height='100%' width='100%' src='" + videoTag + "' frameborder='0' allowfullscreen></iframe>");
    $("#videoBox").append("<a>Close (X)</a>");
    $('#play-video').attr("href", videoTag + "?autoplay=1&rel=0");
}

// Main Global Vars
var heroMainDiv = document.getElementById("heroMainDiv");
var fullVidElement =  document.getElementById("video");
var iOS = /iPad|iPhone|iPod/.test( navigator.userAgent );
var mobile = /Mobi/i.test( navigator.userAgent );

// VideoId for Full IFRAME video
var fullVideo = "Scxs7L0vhZ4";
var fullVideoIsPlaying = false;
var teaserVideo = "9ZKwxVhSfI8";

// tests
MadeToGrow.isVideo = false;
MadeToGrow.isTeaser = false;

if(iOS || mobile)
{
    var backgroundHolder = document.getElementById("backgroundHolder");
    backgroundHolder.style.display = "none";

    MadeToGrow.isVideo = true;

} else {

    MadeToGrow.isVideo = true;
    MadeToGrow.isTeaser = true;

}

if (MadeToGrow.isVideo) {

    if (MadeToGrow.isTeaser) {
        var heroContent = document.getElementById("heroContent");
            heroContent.style.background = "none";
        // methods to embed and play the video are exposed in the videos.js file
        MadeToGrow.videos.init(teaserVideo, 'player', true, 'teaser', {
            'onReady': function(event){
                MadeToGrow.videos.resize();
                if (MadeToGrow.autoPlay) {
                    event.target.seekTo(0);
                    event.target.playVideo();
                };
            }
        });
        var backgroundHolder = document.getElementById("backgroundHolder");
            backgroundHolder.style.display = "initial";
    };

    MadeToGrow.videos.use(fullVideo, 'video', {
        'onStateChange': function(state){
            if (state.data === 0) {
                // toggleVideo({ mainVidDiv, fullVidDiv, mainVid, fullVid }
                MadeToGrow.videos.tryto.toggleVideo({
                    mainVidDiv: heroMainDiv,
                    fullVidDiv: fullVidElement,
                    mainVid: teaserVideo,
                    fullVid: fullVideo 
                });
                fullVideoIsPlaying = false;
            };
        }
    });    
};
function fixProductHeaders() {
    $("#productsSection .productSubHeader").each(function (index) {
        var prodHeadTxt = $(this).text().trim();
        $(this).replaceWith("<h3 class='productSubHeader'>" + prodHeadTxt + "<span></span></h3>");
    }); 
}