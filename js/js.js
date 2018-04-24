console.log("tekst"); // Printer "tekst" i konsollen

// Initialiserer kartet
function initMap() {
  var bergen = {lat: 60.3913, lng: 5.3221};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: bergen
  });
}

// Laster inn JSON-fil basert på URL
function loadJSON(url) {
  var request = new XMLHttpRequest();
  request.responseType = 'json';
  request.open('GET', url, true);
  request.onload = function() {
    if (request.status === 200) {
      var response = request.response;
      console.log(response);
    }
  };
  request.send(null);
}

function populateMap(url) {
  var json = loadJSON(url);
  console.log("adasda");
  console.log(json);
}

// Starter videoen i index.html, looper
function playVid() {
  var vid = document.getElementById('vid');
  vid.autoplay = true;
  vid.loop = true;
  vid.load();
}

function initHotspots() {
  initMap();
  populateMap("https://hotell.difi.no/api/json/bergen/dokart");
}
