//Authored by Brandon Gaius Ogle

// Photo exists testing function
function photoExists(url) {
$('<img src="'+ url +'">').load(function() {
    return true;
    console.log("success! " + url);
}).bind('error', function() {
    return false;
    console.log("Fail :(" + url);
});
}

// Search Products Functioon
function searchProducts(evt) {
    $results = $("#results");
    evt.preventDefault();
    $results.html( "" );
    // grab search params, format / Set Vars
    var searchFor = $("input").val();
    var searchInCat = $("select").val();
    $results = $("#results");
    if(!searchInCat) {
        searchInCat = "";
    }
    if(!searchFor) {
        searchFor = "";
    }
    console.log("Submit Pressed with Params: " + searchFor + " & " + searchInCat);
    
    // Set vars/objs
    var displayResults;
    var dataDir = "products/";
    var photoDir = dataDir + "images/";
    var childrensBooksDataURL = dataDir + "childrensbooks.json";
    var graphicNovelDataURL = dataDir + "graphicnovels.json";
    var merchandiseDataURL = dataDir + "merchandise.json";
    // Get Graphic Novel Data
    
    if ( searchInCat === "graphicnovels" || searchInCat === "" ) {
        $.getJSON( graphicNovelDataURL, function ( response ) {
            var displayHTML = '<ul class="merchList">';
            $.each( response, function ( index, value ) {
                displayHTML += '<li>';
                    if ( photoExists( photoDir + value.coverPhoto ) ) {
                        displayHTML += '<img alt="' + value.series + ': ' + value.name + ', part ' + value.partNum + ' Cover Image" src="' + photoDir + value.coverPhoto + '">';
                    } else {
                        displayHTML += '<img alt="Cover Photo Unavailable" src="' + photoDir + 'h-np.jpg">';
                    }
                    displayHTML += '<button';
                    if ( value.avail && value.price ) {
                        displayHTML += ' class="avail"';
                        console.log("issue available!");
                    } else {
                        console.log("issue unavailable :-(");
                    }
                    displayHTML += '>';
                    if ( value.price ) { 
                         displayHTML += '$' + value.price;
                    } else {
                        displayHTML += 'unavailable';
                    }
                    displayHTML += ' </button>';
                    displayHTML += '<h1>' + value.name + '</h1><h3><i>(part ' + value.partNum + ' of ' + value.ofPart + ')</i></h3>';
                    displayHTML += '<h3>' + value.series + ' - Issue: ' + value.issue + '</h3>';
                    displayHTML += '<p>' + value.description + '</p>';
                displayHTML += '</li>';
            });
            displayHTML += '</ul>';
            $results.append( displayHTML );
            $(".avail").click( function () {
                alert("This feature is currently unavaible. Sorry for the inconvience.");
            });
        });
    }
    // Get Childrens Books Data

    // Get Merchandise Data
    
    // Build Found / No Matches Responses
    var displayNotFound = "<h1>No Matches</h1>";
    displayResults += "<p>";
    
    if (searchFor != "") {
        ifFor = " for <b>" + searchFor + "</b> ";
    } else {
        ifFor = " for <b>Anything</b>";
    }
    if (searchInCat != "") {
        ifCat = " in <b>" + searchInCat + "</b>";
    } else {
        ifCat = " in <b>Any</b> Catagory";
    }
    if ( searchFor != "" || searchInCat != "" ) {
        startResponce = "You Searched";
    } else {
        startResponce = "Try entering a Search Term and/or Selecting a Catagory";
    }
    displayNotFound += startResponce + ifFor + ifCat;
    displayNotFound += "<br><br></p>";
    $results.prepend(displayNotFound);
}

$( document ).ready( function () {
    console.log("page loaded");
    $("form").submit(searchProducts);
}); // end ready