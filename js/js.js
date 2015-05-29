//Authored by Brandon Gaius Ogle

// Search Products Functioon
function searchProducts(evt) {
    var numFound = 0;
    var searchCompletes = 0;
    $results = $("#results");
    evt.preventDefault();
    $results.html( "" );
    $submit = $("form input:last-child");
    $submit.prop("value", "Searching...");
    // grab search params, format / Set Vars
    var searchFor = $("input").val();
    var searchInCat = $("select").val();
    var displayCat;
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
    
    // Build Found / No Matches Responses
    var displayNotFound = '<h1 id="NumOfMatches"></h1>';
    displayResults += "<p>";
    
    if (searchFor != "" && searchFor != "all") {
        ifFor = ' for <b>' + searchFor + '</b> ';
    } else {
        ifFor = " for <b>Anything</b>";
    }
    if (searchInCat != "") {
        if (searchInCat === "childrensbooks") {
            displayCat = "Children\'s Books";
        } else if (searchInCat === "graphicnovels") {
            displayCat = "Graphic Novels";
        } else if (searchInCat === "merchandise") {
            displayCat = "Merchandise";
        } else if ( searchInCat === "all" ) {
            displayCat = "All Catagories";
        }
        ifCat = ' in <b>' + displayCat + '</b>';
    } else {
        ifCat = ' in <b>Any</b> Catagory';
    }
    startResponce = 'You Searched';
    displayNotFound += startResponce + ifFor + ifCat;
    displayNotFound += '<br><br></p>';
    $results.prepend(displayNotFound);
    
    //start timer?
    /*
    function checkSearchProgress() {
        if ( searchCompletes > 0) {
            $submit.prop("value", "Submit");
            $("#numOfMatches").text( numFound + " Matches" );
            clearTimeout( progTimer );
            alert("Finished searching...");
        } else {
            alert("Still searching...");
        }
    }
    var progTimer = setTimeout( function () { checkSearchProgress() }, 200);
    */
    if ( searchInCat === "graphicnovels" || searchInCat === "" || searchInCat === "all") {
        $.getJSON( graphicNovelDataURL, function ( response ) {
            var displayHTML = '<ul class="merchList">';
            $.each( response, function ( index, value ) {
                numFound++;
                displayHTML += '<li>';
                    if ( value.coverPhoto != "" ) {
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
            }); // end click()
            searchCompletes++;
            $submit.prop("value", "Submit");
            $("#NumOfMatches").text( numFound + " Matches" );
        }); // end getJSON
    } //end If GN
    
    // Get Childrens Books Data
    if ( searchInCat === "childrensbooks" || searchInCat === "" || searchInCat === "all" ) {
        $.getJSON( childrensBooksDataURL, function ( response ) {
            //var displayHTML = '<ul class="merchList">';
            $.each( response, function ( index, value ) {
                numFound++;
            }); // end each
            $submit.prop("value", "Submit");
            $("#NumOfMatches").text( numFound + " Matches" );
        }); // end getJSON
    } 
    // Get Merchandise Data
    if ( searchInCat === "merchandise" || searchInCat === "" || searchInCat === "all" ) {
        $.getJSON( merchandiseDataURL, function ( response ) {
            //var displayHTML = '<ul class="merchList">';
            $.each( response, function ( index, value ) {
                numFound++;
            }); // end each
            $submit.prop("value", "Submit");
            $("#NumOfMatches").text( numFound + " Matches" );
        }); // end getJSON
    } 
    
}

$( document ).ready( function () {
    console.log("page loaded");
    $("form").submit(searchProducts);
}); // end ready