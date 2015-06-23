var times = [3,51,132,189,216];

$(document).ready(function() {
    console.log("Ready");
    
    var iframe = $('#movie')[0];
    var player = $f(iframe);
    var status = $('.status');
    
    $("#char-chp").on("click", function() {
        player.api("seekTo", times[0]);
        console.log("chapter 1");
    });
    $("#ed-chp").on("click", function() {
        console.log("chapter 2");
        player.api("seekTo", times[1]);
    });
    $("#info-chp").on("click", function() {
        console.log("chapter 3");
        player.api("seekTo", times[2]);
    });
    $("#stil-chp").on("click", function() {
        console.log("chapter 4");
        player.api("seekTo", times[3]);
    });
    
    player.addEvent("ready", videoReady);
    
    function videoReady() {
        console.log("Vimeo Ready");
        player.addEvent("finish ", function() {
            $("#char-chp").removeClass("current");
            $("#char-chp").siblings().removeClass("current");
        });
        player.addEvent("playProgress", function(data) {
            var timeNow = data.seconds;
            if (timeNow > times[0] && timeNow < times[1]) {
                //console.log("Chapter 1 Started");
                $("#char-chp").addClass("current");
                $("#char-chp").siblings().removeClass("current");
            } else if (timeNow > times[1] && timeNow < times[2]) {
                //console.log("Chapter 1 Started");
                $("#ed-chp").addClass("current");
                $("#ed-chp").siblings().removeClass("current");
            } else if (timeNow > times[2] && timeNow < times[3]) {
                //console.log("Chapter 1 Started");
                $("#info-chp").addClass("current");
                $("#info-chp").siblings().removeClass("current");
            } else if (timeNow > times[3] && timeNow < times[4]) {
                //console.log("Chapter 1 Started");
                $("#stil-chp").addClass("current");
                $("#stil-chp").siblings().removeClass("current");
            } else {
                $("#char-chp").removeClass("current");
                $("#char-chp").siblings().removeClass("current");
            }
        });
    };
});
