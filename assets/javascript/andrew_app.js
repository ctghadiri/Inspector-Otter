
$(".urbanRow").empty();
// Takes in user input with ID tag #theWord from HTML
var wordSearch = $("#theWord").val().trim();

var urbanDictionaryAppend = "<button class='btn btn-primary' id='noFilter' type='button' data-toggle='collapse' data-target='#collapseExample' aria-expanded='false' aria-controls='collapseExample'>Unofficial Definition</button><br><div class='collapse' id='collapseExample'></div><br><hr><br>";
$("#urbanBody").append(urbanDictionaryAppend);

// Defines Urban Dictionary URL, which in this case is just the API Link + user input, which we have defined above as "wordSearch"
var urbanDictionaryQuery = 'http://api.urbandictionary.com/v0/define?term={' + wordSearch + '}'
// AJAX Call and for loop
$.ajax({
  url: urbanDictionaryQuery,
  method: "GET",
}).then(function (response) {
  console.log(response);
  // Clears out the class "urbanRow", which was added onto a table row for the definition
  $(".urbanRow").empty();
  // Clears out the class "emojiRow", which was added onto a table row for the emoji and # of "thumbs up" that each definition has received on UrbanDictionary website
  $(".emojiRow").empty();
  // For loop, which defines the definition and how it will be showed on the page. In order to draw the definition, we go down the list of "response", then "list", and definition
  for (i = 0; i < 1; i++) {
    var wordDefinition = 'Unofficial Definition: ' + response.list[i].definition;
    // Goes down API info list (response.list.thumbs_up) to obtain the # of times the user input term has been given a thumbs up on Urban Dictionary
    var thumbsUp = ' : ' + response.list[i].thumbs_up;
    console.log(thumbsUp);
    // Creating a table row for the definition and for the thumbs up emoji + thumbs up count
    // The two rows will append under ID "#collapseExample", which is the "unofficial definition" button on the page
    var tableRowOne = $("<tr>").addClass("urbanRow");
    var tableRowTwo = $("<tr>").addClass("emojiRow");
    // Table data; first one displays the variable wordDefinition in text
    var tableDataOne = $("<td>").text(wordDefinition);
    // Displays emoji and thumbsUp variable
    var tableDataTwo = $("<td>").html("👍" + thumbsUp);

    console.log(tableDataTwo);
    // The first row appends the data from var tableDataOne, and RowTwo appends data from var tableDataTwo
    tableRowOne.append(tableDataOne);
    tableRowTwo.append(tableDataTwo);
    // tableRowOne and tableRowTwo append after the "unofficial definition" button
    $("#collapseExample").append(tableRowOne, tableRowTwo);
  }
});

