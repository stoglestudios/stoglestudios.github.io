//Authored by Brandon Gaius Ogle

// Search Products Functioon
function searchProducts(evt) {
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
    $results = $("#results");
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
                    displayHTML += '<img alt="' + value.coverPhoto + '" src="' + photoDir + value.coverPhoto + '">';
                    displayHTML += '<button ';
                    if ( value.avail && value.price ) {
                        displayHTML += 'class="avail"';
                        console.log("issue available!");
                    } else {
                        console.log("issue unavailable :-(");
                    }
                    displayHTML += '>';
                    if( value.price ) { 
                         displayHTML += '$' + value.price;
                    } else {
                        displayHTML += 'unavailable';
                    }
                    displayHTML += ' </button>';
                    displayHTML += '<h1>' + value.name + ' <i>(part ' + value.partNum + ' of ' + value.ofPart + ')</i></h1>';
                    displayHTML += '<h3>' + value.series + ' - Issue: ' + value.issue + '</h3>';
                    displayHTML += '<p>' + value.description + '</p>';
                displayHTML += '</li>';
            });
            displayHTML += '</ul>';
            $results.append( displayHTML );
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