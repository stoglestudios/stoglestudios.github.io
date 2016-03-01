$(document).ready(function() {
    console.log("Ready");
    $(".lightroom").hide();
    $(".more").show();
    $(".less").show();
    $(".more").on("click", function(event) {
        $(this).parent().children(".lightroom").show();
        $(this).parent().siblings().children(".lightroom").hide();
        $(this).parent().siblings().children(".more").show();
        $(this).hide();
    });
    $(".less").on("click", function(event) {
        $(this).parent().parent().children(".lightroom").hide();
        $(this).parent().parent().children(".more").show();
    });
});