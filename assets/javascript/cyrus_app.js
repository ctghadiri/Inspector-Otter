$("#submitButton").on("click", function(){
    $("tbody").text("")


    var word = $("#theWord").val();
    queryURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + word + "?key=6f391cdf-76f7-4e3f-bfda-ef1e3db34d04"
    $.ajax({
        url: queryURL,
        method: "GET",
        type: JSON,
    }).then(function (response) {
        var def = response[0].shortdef[0];
        var defRow = $("<tr>");
        var defData = $("<td>");
        (defData).text(def);
        (defRow).append(defData);
        $("tbody").append(defRow);
    });
    for(var i = 0; i < response.length; i++){

    }

});
// "shortdef":[  
// meta.offensive
console.log(word)