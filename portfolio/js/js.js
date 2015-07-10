

$(document).ready(function() {
    console.log("Ready");
    $(".unsubscribe").hide();
    $(".more").show();
    $(".more").on("click", function(event) {
        $(".unsubscribe").show();
        $(".more").hide();
        $(".less").show();
    });
    $(".less").on("click", function(event) {
        $(".unsubscribe").hide();
        $(".less").hide();
        $(".more").show();
    });
});
 