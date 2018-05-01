console.log("tekst"); // Printer "tekst" i konsollen

var map; // Variabel for å referere til Google kartet

// Initialiserer kartet
function initMap() {
  var bergen = {lat: 60.3913, lng: 5.3221};
  map = new google.maps.Map(document.getElementById('map'), {
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
      var response = request.response["entries"];
      populateMap(response);
      populateList(response, url);
    }
  };
  request.send(null);
}

// Legger til Markers på Google kartet, bruker response fra loadJSON
function populateMap(response) {
  var i = 1;
  response.forEach(element => {
    var position = {lat: +element["latitude"], lng: +element["longitude"]};
    var marker = new google.maps.Marker({position: position, label: "" + i, map: map});
    ++i;
  });
}

// Legger til navn på lekeplass/toalett i liste, bruker response fra loadJSON
function populateList(response, url) {
  var toalettRegex = /dokart/;
  var lekeplassRegex = /lekeplass/;
  var list = document.getElementById("list");

  if(toalettRegex.test(url)) {
    response.forEach(element => {
      list.innerHTML += "<li>" + element["plassering"] + "</li>";
    });
  } else if(lekeplassRegex.test(url)) {
    response.forEach(element => {
      list.innerHTML += "<li>" + element["navn"] + "</li>";
    })
  }
}

// Starter videoen i index.html, looper
function playVid() {
  var vid = document.getElementById('vid');
  vid.autoplay = true;
  vid.loop = true;
  vid.load();
}

// Laster inn kart og rett JSON url for hotspots.html
function initHotspots() {
  initMap();
  loadJSON("https://hotell.difi.no/api/json/bergen/dokart");
}

// Laster inn kart og rett JSON url for lekeplass.html
function initLekeplass() {
  initMap();
  loadJSON("https://hotell.difi.no/api/json/bergen/lekeplasser");
}