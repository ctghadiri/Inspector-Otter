// $("#submitButton").on("click", function(event){
//     event.preventDefault()
//     $("tbody").text("")


//     var word = $("#theWord").val();
//     queryURL = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + word + "?key=6f391cdf-76f7-4e3f-bfda-ef1e3db34d04"
//     $.ajax({
//         url: queryURL,
//         method: "GET",
//         type: JSON,
//     }).then(function (response) {
//         if(typeof response[0] === "object"){
//         console.log(response);
//         var def = response[0].shortdef[0];
//         var defRow = $("<tr>");
//         var defData = $("<td>");
//         defData.text("Webster Definition: " + def);
//         defRow.append(defData);
//         $("tbody").append(defRow);
//         }
//         else{
//             console.log(response)
//             var nullResponse = "This is not a formal word.";
//             var nullRow = $("<tr>");
//             var nullData = $("<td>");
//             nullData.text(nullResponse);
//             nullRow.append(nullData);
//             $("tbody").append(nullRow);
//         }
//     });
// });       

$("#submitButton").on("click", function(event){
    event.preventDefault()
    $("tbody").text("");
    var word = $("#theWord").val();
    console.log(word);
    queryURL = "https://musixmatchcom-musixmatch.p.rapidapi.com/wsr/1.1/track.search?q_lyrics=" + word;
    $.ajax({
        url: queryURL,
        method: "GET",
        type: JSON,
        headers: {
            "X-RapidAPI-Key": "322296ad16msh79c37cf28b5c209p1c3e9ejsne0704d94a452",
            "cache-control": "no-cache"}
    }).then(function (response) {

        console.log(JSON.parse(response[i]));
        // for(var i = 0; i < 3; i++){
        //     var song = JSON.parse(response[i].album_name);
        //     var artist = JSON.parse(response[i].artist_name);
        //     console.log(song);
        //     console.log(artist);
        //     var songRow = $("<tr>");
        //     var songData = $("<td>");
        //     songData.text(artist + ": " + song);
        //     songRow.append(songData);
        //     $("#webBody").append("<br><hr><br>");
        //     $("#webBody").append(songRow);
        //     $("#webBody").append("<br><hr><br>");
        // };
    });
});       
