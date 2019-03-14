// Keep calm... JavaScript on





// <======================= Firebase =======================>

// Setting up html for the word search
var firebaseSection = $("<section>").addClass("firebaseSection");
var searchHistoryHeader = $("<h6>").addClass("wordSearchHistoryHeader container").text("Previous Word Searches: ");
var searchHistoryArea = $("<ul>").addClass("wordSearchHistory");
var howmanywordssearched = $("<div>").addClass("firebaseWordCount");
$("#countBody").append(firebaseSection);
$(".firebaseSection").append(searchHistoryHeader);
$(".firebaseSection").append(searchHistoryArea);
$(".firebaseSection").append(howmanywordssearched);

// Initialize Firebase and change the values of the config values with your own Firebase config values.
var config = {
    apiKey: "AIzaSyBp9mMgv6puXZ6E6o8qepv16hybRG8B7QI",
    authDomain: "inspector-otter.firebaseapp.com",
    databaseURL: "https://inspector-otter.firebaseio.com",
    projectId: "inspector-otter",
    storageBucket: "inspector-otter.appspot.com",
    messagingSenderId: "349485035061"
};
firebase.initializeApp(config);

// Created a variable to reference the database
var database = firebase.database();

// Initial Variables (SET the first set IN FIREBASE FIRST)
var wordSearch = " ";


// <======================= SUBMIT BUTTON ======================>


// When submit button is clicked
$("#submitButton").on("click", function (event) {
    event.preventDefault();
    $("#webBody").empty();
    $("#urbanBody").empty();
    $("#theader").empty();
    $("#traBody").empty();
    $("#notStrong").empty();
    var wordSearch = $("#theWord").val().trim();
    console.log(wordSearch);
    console.log(theWord);


    // Display the word
    $("#theader").append("<br>" + "You searched the word: " + "<h1>" + wordSearch);



    //wordArray.push(wordSearchTerm)
    var newWord = {
        wordSearch: wordSearch,
        // LocationSearchTerm: LocationSearchTerm,
    }
    // Uploads the word onto the database
    database.ref().push(newWord);





    // <======================= Webster Dictionary ======================>

    queryURLwd = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + wordSearch + "?key=6f391cdf-76f7-4e3f-bfda-ef1e3db34d04"
    $.ajax({
        url: queryURLwd,
        method: "GET",
        type: JSON
    }).then(function (response) {
        if (typeof response[0] === "object") {
            console.log(response);
            var def = response[0].shortdef[0];
            var defRow = $("<tr>");
            var defData = $("<td>");
            defData.text("Official Definition: " + def);
            defRow.append(defData);
            $("#webBody").append(defRow);
            $("#webBody").append("<br>");
        }
        else {
            console.log(response)
            var nullResponse = "This is not a official word.";
            var nullRow = $("<tr>");
            var nullData = $("<td>");
            nullData.text(nullResponse);
            nullRow.append(nullData);
            $("#webBody").append(nullRow);
            $("#webBody").append("<br><hr>");
        }

    });






    // <======================= Webster Gif ======================>

    var ratingOne = "PG-13";
    var queryWebsterURL = "https://api.giphy.com/v1/gifs/search?q=" + wordSearch + "&rating=" + ratingOne + "&api_key=k6Uja7qOoPb0IxP4CrFv2IGnbSnJWYp3&limit=5"
    console.log(queryWebsterURL);

    $.ajax({
        url: queryWebsterURL,
        type: "GET",

    }).then(function (giphyW) {

        var resultW = giphyW.data;
        console.log(resultW[1]);
        console.log(resultW[1].images.original_still.url);

        var gifWebsterTR = $("<tr>");
        var gifWebsterTD = $("<td>");
        var gifWebsterImage = $("<img>");

        gifWebsterTD.html(gifWebsterImage);
        gifWebsterImage.attr("src", resultW[1].images.fixed_height.url);
        gifWebsterTR.append(gifWebsterTD);
        $("#notStrong").append(gifWebsterTR);
        $("#notStrong").append("<br><hr>");
    })

   





    // <======================= Urban Dictionary ======================>

    $(".urbanRow").empty();
    var wordSearch = $("#theWord").val().trim();

    var urbanDictionaryAppend = "<button class='btn btn-danger' id='noFilter' type='button' data-toggle='collapse' data-target='#collapseExample' aria-expanded='false' aria-controls='collapseExample'>Unofficial Definition</button><br><div class='collapse' id='collapseExample'></div><br><hr><br>";
    $("#urbanBody").append(urbanDictionaryAppend);

    var urbanDictionaryQuery = 'https://api.urbandictionary.com/v0/define?term=' + wordSearch;
    $.ajax({
        url: urbanDictionaryQuery,
        method: "GET",
    }).then(function (response) {
        console.log(response);

        $(".urbanRow").empty();
        $(".emojiRow").empty();

        for (i = 0; i < 1; i++) {
            var wordDefinition = 'Unofficial Definition: ' + response.list[i].definition;
            var thumbsUp = ' : ' + response.list[i].thumbs_up;
            console.log(thumbsUp);
            var tableRowOne = $("<tr>").addClass("urbanRow");
            var tableRowTwo = $("<tr>").addClass("emojiRow");
            var tableDataOne = $("<td>").text(wordDefinition);
            var tableDataTwo = $("<td>").html("👍" + thumbsUp);

            console.log(tableDataTwo);
            tableRowOne.append(tableDataOne);
            tableRowTwo.append(tableDataTwo);

            $("#collapseExample").append(tableRowOne, tableRowTwo);
        }
    });



    // <======================== Urban Gif ========================>

    var ratingTwo = "R";
    queryUrbanGifURL = "https://api.giphy.com/v1/gifs/search?q=" + wordSearch + "&rating=" + ratingTwo + "&api_key=WQglZzaDseLC1rFedrnkIA9dsPLoLx0W&limit=5"

    $.ajax({
        url: queryUrbanGifURL,
        type: "GET",
    }).then(function (giphyU) {

        var resultU = giphyU.data;
        console.log(resultU[0]);
        console.log(resultU[0].images.original_still.url);

        var newRow = $("<tr>");

        var gifUrbanT = $("<td>");
        var gifUrbanImage = $("<img>");

        gifUrbanT.html(gifUrbanImage)
        gifUrbanImage.attr("src", resultU[0].images.fixed_height.url);
        newRow.append(gifUrbanT)
        $(".urbanRow").append(newRow);

    });



    // <======================== Translator ========================>
    

    var translationButtonArea = $("<section>").addClass("translationbuttonsgohere");
    $("#traBody").append("<br>" + "<h5>" + "Translation: ");
    $("#traBody").append(translationButtonArea);


    var translationSearchResults = $("<section>").addClass("translationSearchResultsGoHere");
    $("#traBody").append(translationSearchResults);
    $("#traBody").append("<hr>");

    // translation buttons

    var russia = $("<button type=button class='btn btn-warning'>").html("Russian 🇷🇺").addClass("translatorButton").attr("id", "russian");
    var spanish = $("<button type=button class='btn btn-warning'>").text("Spanish 🇲🇽").addClass("translatorButton").attr("id", "spanish");
    var china = $("<button type=button class='btn btn-warning'>").text("Chinese 🇨🇳").addClass("translatorButton").attr("id", "chinese");

    // Divider
    var divider1 = $("<div>").addClass("divider")
    var divider2 = $("<div>").addClass("divider")

    $(".translationbuttonsgohere").append(spanish);
    $(".translationbuttonsgohere").append(divider1);
    $(".translationbuttonsgohere").append(china);
    $(".translationbuttonsgohere").append(divider2);
    $(".translationbuttonsgohere").append(russia);



    $("#russian").on("click", function displayRussianTranslation() {
        $(".translationSearchResultsGoHere").empty();

        var theWord = $("#theWord").val();
        console.log(theWord);
        var queryURLtr = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190311T181013Z.7646236f1129cccc.633ebcb5e824239bfef44988b54d495a6d98188f&text=" + theWord + "&lang=ru&[format=plain]$[options=1]";

        $.ajax({
            url: queryURLtr,
            method: "GET"
        }).then(function (russian) {
            console.log(russian);
            if (russian) {

                russian.text[0];
                $(".translationSearchResultsGoHere").append("<br>" + "<p>" + russian.text[0] + "</p>" + "<br>");

                console.log(russian.text[0])
            }
        })
    })

    $("#spanish").on("click", function displaySpanishTranslation() {
        $(".translationSearchResultsGoHere").empty();

        var theWord = $("#theWord").val();
        console.log(theWord);


        var queryURLes = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190311T181013Z.7646236f1129cccc.633ebcb5e824239bfef44988b54d495a6d98188f&text=" + theWord + "&lang=es&[format=plain]$[options=1]";

        $.ajax({
            url: queryURLes,
            method: "GET"
        }).then(function (spanish) {
            console.log(spanish);
            if (spanish) {
                spanish.text[0];
                $(".translationSearchResultsGoHere").append("<br>" + "<p>" + spanish.text[0] + "</p>" + "<br>");
                console.log(spanish.text[0])
            }
        })
    })

    $("#chinese").on("click", function displayChineseTranslation() {
        $(".translationSearchResultsGoHere").empty();

        var theWord = $("#theWord").val();
        console.log(theWord);

        var queryURLzh = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190311T181013Z.7646236f1129cccc.633ebcb5e824239bfef44988b54d495a6d98188f&text=" + theWord + "&lang=zh&[format=plain]$[options=1]";


        $.ajax({
            url: queryURLzh,
            method: "GET"
        }).then(function (chinese) {
            console.log(JSON.stringify(chinese));
            if (chinese) {
                var dataEntries = chinese.text[0];
                console.log(JSON.stringify(dataEntries));
                $(".translationSearchResultsGoHere").append("<br>" + "<p>" + dataEntries + "</p>" + "<br>");
                console.log(chinese.text[0]);


            }
        })

    })

});





// <======================== Firebase History Call ========================>


// set count to 0
var count = 0;
// when a new word has been added to the database perform the following function
database.ref().on("child_added", function (childSnapshot) {
    // Increase the count by 1
    count++
    if (childSnapshot.val().wordSearch != '') {
        // Append the user input search word into a list on the DOM
        $(".wordSearchHistory").append("<li class='searchedWords'>" + childSnapshot.val().wordSearch + "</li>")
        var searchWord = childSnapshot.val().wordSearch;
        // var searchLocation = childSnapshot.val().LocationSearchTerm;
        // Clear the word count so only the latest count appears
        $(".firebaseWordCount").empty()
        $(".firebaseWordCount").append("<br>There have been " + count + " words searched.")
    }
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});



// For styling link to our jumble.js
$('h4').jumble([200, 160, 90], [230, 20, 130], true, false, 1000);







// <======================== This is the Zomato Section ========================>


//  Declaring variables for the Zomato Search forms and buttons
var zomatoSearchBox = $('<section>', { class: 'zomato' });
var locationSearch = "<form style='width: 350px;'><div class='form-group'><label for='InputLocation'>Grab a friend and use your new word at a cafe!</label><input type='text' class='form-control' id='InputLocation' placeholder='Enter Location'><small class='privacy' id='privacy'>Privacy information<span class='privacyText'>Your information is proected by the PRIVACY ACT OF 1974</span></small></div></form>"
var goSocial = $("<button type=button class='btn btn-light'>").text("Go Social").addClass("socialButton")
var clearZomatoSearch = $("<button type=button class='btn btn-light'>").text("Clear Search").addClass("clearZomatoData").css({ margin: "10px" })

// Appending buttons, form and label to the Zomato search box section and appending to the body of the html 
zomatoSearchBox.append(locationSearch)
zomatoSearchBox.append(goSocial);
zomatoSearchBox.append(clearZomatoSearch);
zomatoSearchBox.css({ color: "black", margin: "auto" });
$("#t2body").append(zomatoSearchBox);

// When a user clicks on the search box, the following fuction is executed
$(".socialButton").on("click", function Zomato() {
    // Storing user input into a variable
    var locationInput = $("#InputLocation").val()
    // If the user clicks the search button without having input anything into the search bar then they will receive an alter to enter a location
    if (locationInput === '') {
        console.log("Enter a location");
        return
    }
    // This Ajax call will be executed when the user clicks on the Zomato search button and has an input value in the search bar
    // This first Ajax call is using the location input from the user and the Zomato object returned is the user inputted location with certain properties
    $.ajax({
        url: 'https://developers.zomato.com/api/v2.1/locations?query=' + locationInput,
        method: "GET",
        dataType: 'json',
        headers: { 'user-key': 'eaa322b838b4bb4cd687845e1fc5ac1b' },
    }).then(function (response) {
        // The properties needed from the location object for the next call is the entity id and entity type that Zomato associates with a location. 
        // For example San Francisco has an entity ID of 360 and enity type of city. Not all locations have the same entity type of 'city'. 
        // For example New York City has an entity type of 'group'
        var cityNumber = response.location_suggestions[0].entity_id
        var entityType = response.location_suggestions[0].entity_type
        // This second call is to get the actual information we want to display on our DOM using information we retrieved from the first Ajax location call. 
        // This call is used to show resturants in a given location and filtered to show resturants with a category of 'cafe'.
        return $.ajax({
            url: 'https://developers.zomato.com/api/v2.1/search?entity_id=' + cityNumber + '&entity_type=' + entityType + '&count=10&establishment_type=1&sort=rating',
            dataType: 'json',
            headers: { 'user-key': 'eaa322b838b4bb4cd687845e1fc5ac1b' },
        });
    }).then(function (cafedata) {
        // Making sure the section where we put our ZomatoData is clear before each search result gets displayed
        $(".zomatoData").empty()
        var zomatoData = $('<section class="container zomatoData"><p class="col-12">It can be tough to make friends in a new city. Check out these nearby cafes where Mr. Otter frequently dines.</p></section>');
        var row = $('<div>', { class: 'row' });
        // Using a for loop to retrieve information from the object for each cafe
        for (i = 0; i < cafedata.restaurants.length; i++) {
            var restaurant = cafedata.restaurants[i].restaurant;
            // There were a lot of cafes which did not include an image url so included the if statement to filter out displaying information for cafes without an image    
            if (restaurant.thumb !== '') {
                // declaring the properties we would like to be displayed on the DOM
                var restaurantName = restaurant.name
                var cuisines = restaurant.cuisines
                var avgCost = restaurant.average_cost_for_two
                var restaurantAddress = restaurant.location.address
                var imageUrl = restaurant.thumb
                var websiteURL = restaurant.url
                // appending the object information into a row which is using bootstrap responsive columns
                row.append('<div class="col-12 col-sm-6 col-md-4 col-lg-3"><div class="cafediv"><p class="alignCenter"><b>' + restaurantName + '</b></p><img class="zomatoImage" src=' + imageUrl
                    + ' /><p> Type of Food: ' + cuisines + '</p><p> Average Cost for Two ' + avgCost + '</p><p>' + restaurantAddress + '</p>' + '<a href=' + websiteURL + '>Click Me</a> for more details</div></div>');
            }
        }

        // appending the Zomato information into the DOM and add styling to the section
        zomatoData.append(row);
        $("#t2body").append(zomatoData);
        zomatoData.css({ backgroundColor: '#00CED1', opacity: '.7' })
        $(".cafediv").css({ color: "purple", margin: "10px" })
        $(".alignCenter").css({ textAlign: "center" })
        $('.zomatoImage').css({ width: "200px", border: "3px ridge black", marginLeft: "auto", marginRight: "auto", display: "block", marginBottom: "10px" })
        // Clears the search input bar so the user doesnt have to delete what they searched in order to start a new search
        $("#InputLocation").val("")
    });
})

// When the clear search button is pressed, the Zomato data is cleared
$(".clearZomatoData").on("click", function clearZomatoSearchData() {
    $(".zomatoData").empty()
})