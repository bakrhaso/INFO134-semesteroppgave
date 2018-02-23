console.log("tekst"); // Printer "tekst" i konsollen

var map; // Variabel for Google Maps
var bergen = {lat: 60.3913, lng: 5.3221}; // Variabel for Bergens koordinater

// Initialiserer kartet
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: bergen
  });
}

// Starter videoen på index.html, looper
function playVid() {
  var vid = document.getElementById('vid');
  vid.autoplay = true;
  vid.loop = true;
  vid.load();
}
