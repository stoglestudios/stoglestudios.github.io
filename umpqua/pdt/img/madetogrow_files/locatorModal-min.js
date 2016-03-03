/*
		Opens the location finder in a modal iframe when clicking the "find a location" link
*/

(function ($, window, document, undefined) {
    $('a.locationsIcon, a.locationsBtn, a.specialsCTA').not('[href^=mailto]').click(function (e) {
        e.preventDefault();
        var locatorMapLink = "https://www.umpquabank.com/locations/";
        if ( $(window).width() < 600 ) {
            locatorMapLink = "http://m.umpquabank.com/locations/search";
        }
        window.open(locatorMapLink, '_blank');
        //$('body').append('<iframe id="locator" src="/locations.html" scrolling="no"></iframe>');

        //var $closeButton = $('<a href="#" id="locator-close">x</a>');
        //$closeButton.insertBefore('#locator');
        //$closeButton.click(function(e) {
        //  e.preventDefault();
        //  $('#locator, #locator-close').remove();
        //})
    });
})(jQuery, this, this.document);