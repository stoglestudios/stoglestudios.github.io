//Authored by Brandon Gaius Ogle

//Global Vars

var dataDir = "products/";
var photoDir = dataDir + "images/";
var childrensBooksDataURL = dataDir + "childrensbooks.json";
var graphicNovelDataURL = dataDir + "graphicnovels.json";
var merchandiseDataURL = dataDir + "merchandise.json";

// gets image from db and ensure it matches color in selector
function getNewPhotoName (a, b) {
    var productColor = a;
    var productPhotoURL = b;
    var productPhotoArray = productPhotoURL.split("/");
    var photoIndex = productPhotoArray.length -1;
    var photoPrefix = productPhotoArray[photoIndex].split("_");
    var photoName = photoPrefix[0] + "_" + productColor.toLowerCase() + ".jpg";
    return photoName;
}
// render price button
function renderPriceButton (availibilty, price) {
    var priceHTML = '<button';
    if ( availibilty && price ) {
        priceHTML += ' class="avail"';
    }
    priceHTML += '>';
    if ( price ) { 
         priceHTML += '$' + price;
    } else {
        priceHTML += 'unavailable';
    }
    priceHTML += ' </button>';
    return priceHTML;
}
// render sizes dropdown selector
function renderSizesSelector (numOfSizes, sizesArray) {
    if (numOfSizes > 1) {
        var sizesHTML = '<select class="sizes">';
        sizesHTML += '<option value="choose-size" disabled selected>Size</option>';
        for (var i=0; i<numOfSizes; i++) {
            sizesHTML += '<option value="';
            sizesHTML += sizesArray[i];
            sizesHTML += '">';
            sizesHTML += sizesArray[i];
            sizesHTML += '</option>';                        
        }
        sizesHTML += '</select>';
        return sizesHTML;
    } else {
        return "";
    }
}
// render images function
function renderImage (imgFile, imgDir, altText, imgType, imgURL, imgDefault) {
    var imgHTML = '<img src="';
    if ( imgFile !== ""  ) {
        imgHTML += imgDir + imgURL;
    } else {
        imgHTML += imgDir + imgDefault;
    }
    imgHTML += '" alt="';
    if ( imgFile !== "" ) {
        imgHTML += altText;
    } else {
        imgHTML += imgType + ' Photo Unavailable';
    }
    imgHTML += '">';
    return imgHTML;
}
// render color dropdown selector
function renderColorSelector ( numOfColors, colorArray ) {
    if (numOfColors > 0) {
       var colorsHTML = '<select class="colors">';
       for (var i=0; i<numOfColors; i++) {
           colorsHTML += '<option value="';
           colorsHTML += colorArray[i];
           colorsHTML += '">';
           colorsHTML += colorArray[i];
           colorsHTML += '</option>';
       }
       colorsHTML += '</select>';
    }
    return colorsHTML;
}
// render product description
function renderProdDiscrimption( prodTitle, prodSubTitle, prodSubHeader, prodDiscription, itemISBN ) {
    var discriptionHTML = '<div class="discription">';
    discriptionHTML += '<h1>' + prodTitle + '</h1>';
    if (prodSubTitle) {
        discriptionHTML += '<h3>' + prodSubTitle + '</h3>';
    }
    if (prodSubHeader) {
        discriptionHTML += '<h3>' + prodSubHeader + '</h3>';
    }
    discriptionHTML += '<p>' + prodDiscription + '</p>';
    discriptionHTML += '<p id="isbn"><b>ISBN: </b><span>' + itemISBN + '</span></p>';
    discriptionHTML += '</div>';
    return discriptionHTML;
}
// create checkout string
function makeCheckout (itemPick, itemISBN, colorPick, sizePick) {
    var checkoutStringObj = {
        "item" : itemPick,
        "isbn" : itemISBN,
        "color": colorPick,
        "size" : sizePick
        
    };
    var returnString = "Are you sure you wish to add this to your Cart?\n\nProduct: " + checkoutStringObj.item;
    if (checkoutStringObj.isbn) {
        returnString += "\nISBN: " + checkoutStringObj.isbn;
    }
    if (checkoutStringObj.color) {
        returnString += "\nColor: " + checkoutStringObj.color;
    }
    if (checkoutStringObj.size) {
        returnString += "\nSize: " + checkoutStringObj.size;
    }
    returnString += "\n\nSorry, the Cart is currently under construction.";
    alert(returnString);
    return returnString;
}

// Search Products Function - Runs on seacrh button click
function searchProducts(evt) {
    var $submit = $("form input:last-child");
    var $results = $("#results");
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
    //format display results for catagory
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
    // BUILD outputs - get Graphic Novel data
    if ( searchInCat === "graphicnovels" || searchInCat === "" || searchInCat === "all") {
        $.getJSON( graphicNovelDataURL, function ( response ) {
            var displayHTML = '<ul class="merchList" id="comics">';
            var stringSearch;
            $.each( response, function ( index, value ) {
                stringSearch = value.name + value.author + value.illustrator + value.isbn;
                stringSearch += value.series + value.description;
                stringSearch = stringSearch.toLowerCase();
                for (var i=0; i<searchTerms.length; i++) {
                    if ( searchFor === "" || stringSearch.indexOf( searchTerms[i] ) !== -1 ) {
                        numFound++;
                        displayHTML += '<li>';
                        // render image
                        var altImgText = value.series + ": " + value.name;
                        altImgText += ", part " + value.partNum + " Cover Image";
                        displayHTML += renderImage (
                            value.coverPhoto, photoDir, 
                            altImgText, "Cover", 
                            value.coverPhoto, "h-np.jpg"
                        );
                        // render price
                        displayHTML += '<div class="shop-options">';
                        displayHTML += renderPriceButton (value.avail, value.price );
                        displayHTML += '</div>';
                        // render discription
                        displayHTML += renderProdDiscrimption(
                            value.name,
                            '<i>(part ' + value.partNum + ' of ' + value.ofPart + ')</i>',
                            value.series + ' - Issue: ' + value.issue, 
                            value.description,
                            value.isbn
                        );
                        displayHTML += '</li>';
                    } //end if
                } // end for
            }); // end each
            displayHTML += '</ul>';
            //append results
            $results.append( displayHTML );
            // update data/search button/matches display
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
                stringSearch = value.title + value.author + value.illustrator + value.description + value.isbn;
                stringSearch = stringSearch.toLowerCase();
                for (var i=0; i<searchTerms.length; i++) {
                    if ( searchFor === "" || stringSearch.indexOf( searchTerms[i] ) !== -1 ) {
                        numFound++;
                        displayHTML += '<li>';
                        //render image
                        var altImgText = value.title + " Cover Image";
                        displayHTML += renderImage (
                            value.coverPhoto, photoDir, 
                            altImgText, "Cover", 
                            value.coverPhoto, "cb-np.jpg"
                        );
                        // render price
                        displayHTML += '<div class="shop-options">';
                        displayHTML += renderPriceButton (value.avail, value.price );
                        displayHTML += '</div>';
                        // render discription
                        displayHTML += renderProdDiscrimption(
                            value.title,
                            false,
                            "Author: " + value.author + " - Illsutrator: " + value.illustrator, 
                            value.description,
                            value.isbn
                        );
                        displayHTML += '</li>';
                    } //end if
                }//end for
            }); // end each
            displayHTML += '</ul>';
            $results.append( displayHTML );
            // update info/search button/matches
            searchCompletes++;
            $submit.prop("value", "Submit");
            if (numFound !== 1) {
                $("#NumOfMatches").text( numFound + " Matches" );
            } else {
                $("#NumOfMatches").text( numFound + " Match" );
            }
        }); // end getJSON
    } // end Kids Bks
    // Get Merchandise Data
    if ( searchInCat === "merchandise" || searchInCat === "" || searchInCat === "all" ) {
        $.getJSON( merchandiseDataURL, function ( response ) {
            var displayHTML = '<ul class="merchList" id="merch">';
            var stringSearch;
            $.each( response, function ( index, value ) {
                stringSearch = value.name + value.type + value.description + value.isbn;
                stringSearch = stringSearch.toLowerCase();
                // ensure photo color matches color select default
                var initPhotoURL = getNewPhotoName( 
                    value.colors[0], 
                    value.productPhoto
                );
                for (var i=0; i<searchTerms.length; i++) {
                    if ( searchFor === "" || stringSearch.indexOf( searchTerms[i] ) !== -1 ) {
                        numFound++;
                        displayHTML += '<li>';
                        // render price 
                        displayHTML += '<div class="shop-options">';
                        displayHTML += renderPriceButton (value.avail, value.price );
                        // render sizes select
                        displayHTML += renderSizesSelector( value.sizes.length, value.sizes);
                        // render color selector
                        displayHTML += renderColorSelector( value.colors.length, value.colors );
                        displayHTML += '</div>';
                        // render image
                        var altImgText = value.title + " Product Image";
                        displayHTML += renderImage (
                            value.productPhoto, photoDir, 
                            altImgText, "Product", 
                            initPhotoURL, "m-np.jpg"
                        );
                        // render discription
                        displayHTML += renderProdDiscrimption(
                            value.name,
                            false,
                            "Product: " + value.type, 
                            value.description,
                            value.isbn
                        );
                        displayHTML += '</li>'; // close li item
                    } //end if
                }//end for
            }); // end each
            displayHTML += '</ul>';
            $results.append( displayHTML );
            // update info/search button/matches
            searchCompletes++;
            $submit.prop("value", "Submit");
            if (numFound !== 1) {
                $("#NumOfMatches").text( numFound + " Matches" );
            } else {
                $("#NumOfMatches").text( numFound + " Match" );
            }
        }); // end getJSON
    } // end Merch
} // end on search click
// doc ready scripts
$( document ).ready( function () {
    console.log("page loaded");
    $("#lightbox").hide();
    $("form").submit(searchProducts);
    $(".default-shop-img").click(function() {
        $("input[type=text]").val("24682957003");
        $("form").submit();
    });
    // bind dynamic button actions
    $("body").on("click", ".avail", function () {
        var getItem = $(this).parent().parent().children(".discription").children("h1").text();
        var getColor = $(this).parent().parent().children(".shop-options").children(".colors").val();
        var getSize = $(this).parent().parent().children(".shop-options").children(".sizes").val();
        var getISBN = $(this).parent().parent().children(".discription").children("#isbn").children("span").text();
        makeCheckout (getItem, getISBN, getColor, getSize);
    }).on("change", ".sizes", function () {
        console.log( "Size: " + $(this).val() );
    }).on("change", ".colors", function () {
        $(this).parent().parent().children("img").css( "background-color", $(this).val() );
        var newPhotoURL = getNewPhotoName( 
            $(this).val(), 
            $(this).parent().parent().children("img").attr( "src")
        );
        $(this).parent().parent().children("img").attr( "src", photoDir + newPhotoURL);
    }).on("click", "img", function() {
        var imgLink = $(this).attr("src");
        $("#lightbox").show();
        $("#lightbox img").attr("src", imgLink);
    }).on("click", "#lightbox", function() {
        $("#lightbox").hide();
    });
}); // end ready