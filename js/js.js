//Authored by Brandon Gaius Ogle

// Search Products Functioon
function searchProducts(evt) {
    evt.preventDefault();
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
    
    // Get Data
    $.getJSON( graphicNovelDataURL, function ( response ) {
		var displayHTML = '<ul class="merchList">';
		$.each( response, function ( index, value ) {
			displayHTML += '<li>';
            displayHTML += '<img src="' + photoDir + value.coverPhoto + '">';
            displayHTML += '<h1>' + value.name + '</h1>';
            displayHTML += '<h3>Issue: ' + value.issue + ' - part: ' + value.partNum + ' of ' + value.ofPart + '</h3>';
            displayHTML += '<p>' + value.description + '</p>';
			displayHTML += '</li>';
		});
		displayHTML += '</ul>';
		$("#div").html( displayHTML );
	});
    
    // Build No Matches Responses -> Currently Temp Output
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
    $results.html(displayNotFound);
}

$( document ).ready( function () {
    console.log("page loaded");
    $("form").submit(searchProducts);
}); // end ready