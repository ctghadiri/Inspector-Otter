
// ------------------------------TRANSLATOR API 

var translationButtonArea = $("<section>").addClass("translationbuttonsgohere")
$("#t2body").append(translationButtonArea)

var translationSearchResults = $("<section>").addClass("translationsearchresultsgohere")
$("#t2body").append(translationSearchResults)

// translation buttons

var russia = $("<button>").text("Russian").addClass("translatorButton").attr('id', "russian");
var spanish = $("<button>").text("Spanish").addClass("translatorButton").attr('id', "spanish");
var china = $("<button>").text("Chinese").addClass("translatorButton").attr('id', "chinese");

$(".translationbuttonsgohere").append(russia);
$(".translationbuttonsgohere").append(spanish);
$(".translationbuttonsgohere").append(china);



$("#russian").on("click", function displayRussianTranslation() {
    $(".translationsearchresultsgohere").empty();

    var theWord = $("#theWord").val();
    console.log(theWord);
    var queryURL = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190311T181013Z.7646236f1129cccc.633ebcb5e824239bfef44988b54d495a6d98188f&text=" + theWord + "&lang=ru&[format=plain]$[options=1]";
  
    // var queryURLes = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190311T181013Z.7646236f1129cccc.633ebcb5e824239bfef44988b54d495a6d98188f&text=" + theWord + "&lang=es&[format=plain]$[options=1]";
  
    // var queryURLzh = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190311T181013Z.7646236f1129cccc.633ebcb5e824239bfef44988b54d495a6d98188f&text=" + theWord + "&lang=zh&[format=plain]$[options=1]";

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    if(response) {
      
        response.text[0];
        $(".translationsearchresultsgohere").append("<p>" + response.text [0] + "</p>");

        console.log(response.text[0])
     }
  })
})

$("#spanish").on("click", function displaySpanishTranslation() {
  $(".translationsearchresultsgohere").empty();

  var theWord = $("#theWord").val();
  console.log(theWord);
  

  var queryURLes = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190311T181013Z.7646236f1129cccc.633ebcb5e824239bfef44988b54d495a6d98188f&text=" + theWord + "&lang=es&[format=plain]$[options=1]";

  $.ajax({
    url: queryURLes,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    if(response) {
       response.text[0];
       $(".translationsearchresultsgohere").append("<p>" + response.text [0] + "</p>");
       console.log(response.text[0])
    }
  })
})

$("#chinese").on("click", function displayChineseTranslation() {
  $(".translationsearchresultsgohere").empty();

  var theWord = $("#theWord").val();
  console.log(theWord);
  
  var queryURLzh = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190311T181013Z.7646236f1129cccc.633ebcb5e824239bfef44988b54d495a6d98188f&text=" + theWord + "&lang=zh&[format=plain]$[options=1]";


  $.ajax({
    url: queryURLzh,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    if(response) {
       var dataEntries = response.text[0];
       $(".translationsearchresultsgohere").append(dataEntries);
      //  $(".translationsearchresultsgohere").append(response.text[0]);
       console.log(response.text[0]);


    }
  })

})