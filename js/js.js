console.log("tekst"); // Printer "tekst" i konsollen

var map; // Variabel for Google Maps kartet
var bergen = {lat: 60.3913, lng: 5.3221}; // Variabel for Bergens koordinater


// Initialiserer kartet
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: bergen
  });
  loadJSON();
}

// Laste inn JSON filen med do-dataen, sÃ¥ kaller den populateMap som legger til markers pÃ¥ kartet
function loadJSON() {
  var request = new XMLHttpRequest();
  request.open("GET", "../media/dokart.json", true);
  request.send(null)
  request.onreadystatechange = function() {
  if (request.readyState === 4 && request.status === 200) {
    var data = JSON.parse(request.responseText);
    console.log(data);
    populateMap(data);
    }
  }
}

// Legger til data in table
function populateTable(jsonObj) {
  var table = document.getElementById("doBord");
  var newRow, newCell;
  var array = ["id","adresse","tid_hverdag","tid_lordag","tid_sondag","herre","dame","rullestol","pris"];
  for(var i = 1; i < jsonObj.length + 1; ++i) {
    newRow = table.insertRow(i);
    for(var j = 0; j < array.length; ++j) {
      newCell = newRow.insertCell(-1);
      if(jsonObj[i - 1][array[j]] == "NULL" || jsonObj[i - 1][array[j]] == "") {
        newCell.innerHTML = "Nei";
      } else {
        newCell.innerHTML = jsonObj[i - 1][array[j]];
      }
    }
  }
}

// Legger til markers på kartet hvor det er toaletter
function populateMap(jsonObj) {
  for(var i = 0; i < jsonObj.length; ++i) {
    var position = {lat: +jsonObj[i]["latitude"], lng: +jsonObj[i]["longitude"]} // Koordinatene er strings i JSON, +'en gjør dem til nummer
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      label: jsonObj[i]["id"]
    });
  }
  populateTable(jsonObj);
}

// Starter videoen pÃ¥ index.html, looper
function playVid() {
  var vid = document.getElementById('vid');
  vid.autoplay = true;
  vid.loop = true;
  vid.load();
}
