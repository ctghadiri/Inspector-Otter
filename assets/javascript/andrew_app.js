// {/* // Initialize Firebase */ }
// var config = {
//   apiKey: "AIzaSyD-HAGjErg3mdQnQq8VWDHbTnN85ynAilo",
//   authDomain: "projectone-51896.firebaseapp.com",
//   databaseURL: "https://projectone-51896.firebaseio.com",
//   projectId: "projectone-51896",
//   storageBucket: "projectone-51896.appspot.com",
//   messagingSenderId: "1060702068061"
// };
// firebase.initializeApp(config);

var database = firebase.database();

var word = $('<section>', { class: 'word' });

var searchButton = $("<button>").text("Search").addClass("searchButton")

$("#submitButton").on("click", function UrbanDictionary() {
$("tbody").text("")
var wordSearch = $("#theWord").val();
word.append(wordSearch);
$("tbody").append(word);
$("search").val("");

  var urbanDictionaryQuery = 'http://api.urbandictionary.com/v0/define?term=' + wordSearch;
  $.ajax({
    url: urbanDictionaryQuery,
    method: "GET",
    // dataType: 'json',
  }).then(function (response) {
    console.log(response);

    
    for (i = 0; i < 5; i++) {
      var wordDefinition = $('<section class="containerWordDefinition row"><p class="col-12">Definition:' + response.list[i].definition + '</p></section>');
      // var definition = list.definition;
    // wordDefinition.append("<row>");
    // wordDefinition.text(response.definition);
    $("tbody").append(wordDefinition);
    $("#EnterWord").val("")
  }});
})