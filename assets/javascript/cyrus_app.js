$("#submitButton").on("click", function(event){
    event.preventDefault()
    $("tbody").text("")


    var word = $("#theWord").val();
    queryURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + word + "?key=6f391cdf-76f7-4e3f-bfda-ef1e3db34d04"
    $.ajax({
        url: queryURL,
        method: "GET",
        type: JSON,
    }).then(function (response) {
        if(typeof response[0] === "object"){
        console.log(response);
        var def = response[0].shortdef[0];
        var defRow = $("<tr>");
        var defData = $("<td>");
        defData.text("Webster Definition: " + def);
        defRow.append(defData);
        $("tbody").append(defRow);
        }
        else{
            console.log(response)
            var nullResponse = "This is not a formal word.";
            var nullRow = $("<tr>");
            var nullData = $("<td>");
            nullData.text(nullResponse);
            nullRow.append(nullData);
            $("tbody").append(nullRow);
        }
    });
});       

