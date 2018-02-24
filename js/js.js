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

function loadJSON() {
  var request = new XMLHttpRequest();
  request.open("GET", "../data/dokart.json", true);
  request.send(null)
  request.onreadystatechange = function() {
  if ( request.readyState === 4 && request.status === 200 ) {
    var data = JSON.parse(request.responseText);
    console.log(data);
    populateMap(data);
    }
  }
}

function populateMap(jsonObj) {
  for(var i = 0; i < jsonObj.length; ++i) {
    console.log(typeof jsonObj[i]["latitude"])
    var position = {lat: +jsonObj[i]["latitude"], lng: +jsonObj[i]["longitude"]}
    var marker = new google.maps.Marker({
      position: position,
      map: map
    })
  }
}

// Starter videoen på index.html, looper
function playVid() {
  var vid = document.getElementById('vid');
  vid.autoplay = true;
  vid.loop = true;
  vid.load();
}
