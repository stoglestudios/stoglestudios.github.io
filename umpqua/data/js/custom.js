$(document).ready(function() {
    //Example Function
    repeatText("#repeat");
});

function repeatText(theTarget) {
    var repeatCycleNumber = Number( $(theTarget).data("ektron-repeat") );
    var theStartText = $(theTarget).text();
    var theText = theStartText;
    for (var i=0; i<repeatCycleNumber; i++) {
        theText += theStartText;
    }
    $(theTarget).text(theText);
}