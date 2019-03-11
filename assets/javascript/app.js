// Keep calm... JavaScript on

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBp9mMgv6puXZ6E6o8qepv16hybRG8B7QI",
    authDomain: "inspector-otter.firebaseapp.com",
    databaseURL: "https://inspector-otter.firebaseio.com",
    projectId: "inspector-otter",
    storageBucket: "inspector-otter.appspot.com",
    messagingSenderId: "349485035061"
};
firebase.initializeApp(config);

// Calling Firebase
var database = firebase.database();

// When submit button is clicked
$("#submitButton").on("click", function (event) {
    event.preventDefault();

    // Grab value from input box
    var theWord = $("#theWord").val().trim();

    // Creates local "temporary" object to hold word data
    var objWord = {
        word: word,
    };

    // Uploads objWord data to the database
    database.ref().push(objWord);

    // Write your code here



});

// Create Firebase event for adding objWord and a row in the html when a user adds an entry
database.ref().on("child_added", function (snapshot) {
    console.log(snapshot.val());

    
    // Write your code here and append your content to the DOM below


    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text("your input or functions here"),
    );

    // Append the new row to the table
    $("#tbody").append(newRow);

});


// <======================== This is the Zomato Section ========================>


//  Declaring variables for the Zomato Search forms and buttons
var zomatoSearchBox = $('<section>', { class: 'zomato' });
var locationSearch = "<form style='width: 200px;'><div class='form-group'><label for='InputLocation'>Find Cafes Near You!</label><input type='text' class='form-control' id='InputLocation' placeholder='Enter Location'><small class='form-text text-muted'>We'll never share your location with anyone else.</small></div></form>"
var goSocial = $("<button>").text("Go Social").addClass("socialButton")
var clearZomatoSearch = $("<button>").text("Clear Search").addClass("clearZomatoData").css({ margin: "10px" })

// Appending buttons, form and label to the Zomato search box section and appending to the body of the html 
zomatoSearchBox.append(locationSearch)
zomatoSearchBox.append(goSocial);
zomatoSearchBox.append(clearZomatoSearch);
zomatoSearchBox.css({ width: "50%", color: "pink", margin: "auto" });
$("body").append(zomatoSearchBox);

// When a user clicks on the search box, the following fuction is executed
$(".socialButton").on("click", function Zomato() {
    // Storing user input into a variable
    var locationInput = $("#InputLocation").val()
    // If the user clicks the search button without having input anything into the search bar then they will receive an alter to enter a location
    if (locationInput === '') {
        alert("Enter a location")
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
        $("body").append(zomatoData);
        zomatoData.css({ backgroundColor: '#84C0C6' })
        $(".cafediv").css({ color: "purple", margin: "10px"})
        $(".alignCenter").css({textAlign: "center"})
        $('.zomatoImage').css({ width: "200px", border: "3px ridge black" , marginLeft: "auto", marginRight: "auto", display: "block", marginBottom: "10px"})
        // Clears the search input bar so the user doesnt have to delete what they searched in order to start a new search
        $("#InputLocation").val("")
    });


})

// When the clear search button is pressed, the Zomato data is cleared
$(".clearZomatoData").on("click", function clearZomatoSearchData() {
    $(".zomatoData").empty()
})