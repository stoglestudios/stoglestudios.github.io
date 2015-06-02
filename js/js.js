//Authored by Brandon Gaius Ogle

//Global Vars

// Search Products Function - Runs on seacrh button click

function searchProducts(evt) {
    // vars
    var $submit = $("form input:last-child");
    var $results = $("#results");
    var dataDir = "products/";
    var photoDir = dataDir + "images/";
    var childrensBooksDataURL = dataDir + "childrensbooks.json";
    var graphicNovelDataURL = dataDir + "graphicnovels.json";
    var merchandiseDataURL = dataDir + "merchandise.json";
    
    //start clean slate
    var numFound = 0; 
    var searchCompletes = 0;
    evt.preventDefault();
    $results.html( "" );
    $submit.prop("value", "Searching...");
    
    // grab search params, format into array
    var searchFor = $("input").val();
    var enteredTemp = searchFor.toLowerCase();
    var commaGl = /,/gi;
    var doubleSpace = /  /gi;
    enteredTemp = enteredTemp.replace(commaGl, " ");
    enteredTemp = enteredTemp.replace(doubleSpace, " ");
    var searchTerms = enteredTemp.split(" ");
    
    // grab catagory selection and format
    var searchInCat = $("select").val();
    var displayCat;
    if (!searchInCat) {
        searchInCat = "";
    }
    if (!searchFor) {
        searchFor = "";
    } 
    console.log("Submit Pressed with Params: " + searchTerms + " & " + searchInCat);
    
    // Build Found / No Matches Responses
    var displayResults = '<h1 id="NumOfMatches"></h1>';
    displayResults += '<p>You searched for <b>';
    if (searchFor != "" && searchFor != "all") {
        for (var i=0; i<searchTerms.length; i++) {
            displayResults += searchTerms[i] + ' ';
        }
    } else {
        displayResults += 'anything';
    }
    displayResults += '</b> in <b>';
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
        displayResults += displayCat + '</b>';
    } else {
        displayResults += 'any</b> catagory';
    }
    displayResults += '<br><br></p>';
    console.log(displayResults);
    $results.prepend(displayResults);
    
    if ( searchInCat === "graphicnovels" || searchInCat === "" || searchInCat === "all") {
        $.getJSON( graphicNovelDataURL, function ( response ) {
            var displayHTML = '<ul class="merchList" id="comics">';
            var stringSearch;
            $.each( response, function ( index, value ) {
                stringSearch = value.name + value.author + value.illustrator + value.series + value.description;
                stringSearch = stringSearch.toLowerCase();
                for (var i=0; i<searchTerms.length; i++) {
                    if ( searchFor === "" || stringSearch.indexOf( searchTerms[i] ) !== -1 ) {
                        numFound++;
                        displayHTML += '<li>';
                            if ( value.coverPhoto !== "" ) {
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
                    } //end if
                } // end for
            }); // end each
            displayHTML += '</ul>';
            $results.append( displayHTML );
            $("#comics .avail").click( function () {
                alert("This feature is currently unavaible. Sorry for the inconvience.");
            }); // end click()
            searchCompletes++;
            $submit.prop("value", "Submit");
            if (numFound !== 1) {
                $("#NumOfMatches").text( numFound + " Matches" );
            } else {
                $("#NumOfMatches").text( numFound + " Match" );
            }
        }); // end getJSON
    } //end If GN
    
    // Get Childrens Books Data
    if ( searchInCat === "childrensbooks" || searchInCat === "" || searchInCat === "all" ) {
        $.getJSON( childrensBooksDataURL, function ( response ) {
            var displayHTML = '<ul class="merchList" id="kids">';
            var stringSearch;
            $.each( response, function ( index, value ) {
                stringSearch = value.title + value.author + value.illustrator + value.description;
                stringSearch = stringSearch.toLowerCase();
                for (var i=0; i<searchTerms.length; i++) {
                    if ( searchFor === "" || stringSearch.indexOf( searchTerms[i] ) !== -1 ) {
                        numFound++;
                        displayHTML += '<li>';
                            if ( value.coverPhoto != "" ) {
                                displayHTML += '<img alt="' + value.title  + ' Cover Image" src="' + photoDir + value.coverPhoto + '">';
                            } else {
                                displayHTML += '<img alt="Cover Photo Unavailable" src="' + photoDir + 'ch-np.jpg">';
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
                            displayHTML += '<h1>' + value.title + '</h1>';
                            displayHTML += '<h3>Author: ' + value.author + '<br>Illustrations: ' + value.illustrator + '</h3>';
                            displayHTML += '<p>' + value.description + '</p>';
                        displayHTML += '</li>';
                    } //end if
                }//end for
            }); // end each
            displayHTML += '</ul>';
            $results.append( displayHTML );
            $("#kids .avail").click( function () {
                alert("This feature is currently unavaible. Sorry for the inconvience.");
            }); // end click()
            searchCompletes++;
            $submit.prop("value", "Submit");
            if (numFound !== 1) {
                $("#NumOfMatches").text( numFound + " Matches" );
            } else {
                $("#NumOfMatches").text( numFound + " Match" );
            }
        }); // end getJSON
    } 
    // Get Merchandise Data
    if ( searchInCat === "merchandise" || searchInCat === "" || searchInCat === "all" ) {
        $.getJSON( merchandiseDataURL, function ( response ) {
            var displayHTML = '<ul class="merchList" id="merch">';
            var stringSearch;
           $.each( response, function ( index, value ) {
                stringSearch = value.name + value.type + value.description;
                stringSearch = stringSearch.toLowerCase();
                for (var i=0; i<searchTerms.length; i++) {
                    if ( searchFor === "" || stringSearch.indexOf( searchTerms[i] ) !== -1 ) {
                        numFound++;
                        displayHTML += '<li>';
                            if ( value.coverPhoto != "" ) {
                                displayHTML += '<img alt="' + value.name  + ' Cover Image" src="' + photoDir + value.coverPhoto + '">';
                            } else {
                                displayHTML += '<img alt="Cover Photo Unavailable" src="' + photoDir + 'ch-np.jpg">';
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
                            displayHTML += '<h1>' + value.name + '</h1>';
                            displayHTML += '<h3>Product: ' + value.type + '</h3>';
                            displayHTML += '<p>' + value.description + '</p>';
                        displayHTML += '</li>';
                    } //end if
                }//end for
            }); // end each

            displayHTML += '</ul>';
            $results.append( displayHTML );
            $("#merch .avail").click( function () {
                alert("This feature is currently unavaible. Sorry for the inconvience.");
            }); // end click()
            searchCompletes++;
            $submit.prop("value", "Submit");
            if (numFound !== 1) {
                $("#NumOfMatches").text( numFound + " Matches" );
            } else {
                $("#NumOfMatches").text( numFound + " Match" );
            }
        }); // end getJSON
    } 
    
}

$( document ).ready( function () {
    console.log("page loaded");
    $("form").submit(searchProducts);
}); // end ready