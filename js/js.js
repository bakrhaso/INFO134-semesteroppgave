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

// Laste inn JSON filen med do-dataen, så kaller den populateMap som legger til markers på kartet
function loadJSON() {
  var request = new XMLHttpRequest();
  request.open("GET", "../data/dokart.json", true);
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
  for(var i = 1; i < jsonObj.length + 1; ++i) {
    newRow = table.insertRow(i);
    newCell = newRow.insertCell(-1);
    newCell.innerHTML = jsonObj[i - 1]["id"];
    newCell = newRow.insertCell(-1);
    newCell.innerHTML = jsonObj[i - 1]["adresse"];
    newCell = newRow.insertCell(-1);
    newCell.innerHTML = jsonObj[i - 1]["tid_hverdag"];
    newCell = newRow.insertCell(-1);
    newCell.innerHTML = jsonObj[i - 1]["tid_lordag"];
    newCell = newRow.insertCell(-1);
    newCell.innerHTML = jsonObj[i - 1]["tid_sondag"];
    newCell = newRow.insertCell(-1);
    newCell.innerHTML = jsonObj[i - 1]["herre"];
    newCell = newRow.insertCell(-1);
    newCell.innerHTML = jsonObj[i - 1]["dame"];
    newCell = newRow.insertCell(-1);
    newCell.innerHTML = jsonObj[i - 1]["rullestol"];
    newCell = newRow.insertCell(-1);
    newCell.innerHTML = jsonObj[i - 1]["pris"];
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

// Starter videoen på index.html, looper
function playVid() {
  var vid = document.getElementById('vid');
  vid.autoplay = true;
  vid.loop = true;
  vid.load();
}
