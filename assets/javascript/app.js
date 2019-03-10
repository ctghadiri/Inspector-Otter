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