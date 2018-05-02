console.log("tekst"); // Printer "tekst" i konsollen

var map; // Variabel for å referere til Google kartet
var response; // Variabel for datasett
var lekeplass; // Variabel for lekeplass, siden man trenge to datasett for til minfavorittlekeplass.html
var markers = []; // Google Map markers
var urlG = ""; // JSON URL
var geocoder;
var uibRom;

// Initialiserer kartet
function initMap() {
  var bergen = {lat: 60.3913, lng: 5.3221};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: bergen
  });
  geocoder = new google.maps.Geocoder();
}

// Laster inn JSON-fil basert på URL
function loadJSON(url, favoritt) {
  var request = new XMLHttpRequest();
  request.responseType = 'json';
  request.open('GET', url, true);
  request.onload = function() {
    if(favoritt == 1) {
      lekeplass = request.response["entries"];
    } else if(favoritt == 2) {
      uibRom = request.response["data"];
      uibStuff();
    } else {
      response = request.response["entries"];
      populateMap(response);
      populateList(response);
    }
  };
  request.send(null);
}

function uibStuff() {
  console.log(uibRom);
}

function search() {
  document.getElementById("hidden").style.display = 'block';
  document.getElementById("normalSearch").style.display = 'none';

  var toalettObj = {"herre":"","dame":"","stellerom":"","rullestol":"","pris":""}
  
  if(document.getElementById("male").checked) {
    toalettObj["herre"] = "1";
  }
  if(document.getElementById("female").checked) {
    toalettObj["dame"] = "1";
  }
  if(document.getElementById("pris") != null) {
    toalettObj["pris"] = document.getElementById("pris").value;
  }
  if(document.getElementById("stelle").checked) {
    toalettObj["stellerom"] = "1";
  }
  if(document.getElementById("pris") == "0") {
    toalettObj["pris"] = "0";
  }
  if(document.getElementById("rulle").checked) {
    toalettObj["rullestol"] = "1";
  }
  /*
  var today = new Date().getDay();
  var time = new Date().getHours();
  var minutt = new Date().getMinutes();
  if(element == "åpen") {

  } 
  */

  clearMarkers();
  clearList();

  var result = [];

  response.forEach(e => {
      if((toalettObj["herre"]     == e["herre"]     || toalettObj["herre"]     == "") && (toalettObj["dame"]      == e["dame"]      || toalettObj["dame"]      == "") &&
         (toalettObj["pris"]      >= e["pris"]      || toalettObj["pris"]      == "") && (toalettObj["stellerom"] == e["stellerom"] || toalettObj["stellerom"] == "") &&
         (toalettObj["rullestol"] == e["rullestol"] || toalettObj["rullestol"] == "")) {
           result.push(e);
         }
  })

  populateMap(result);
  populateList(result);

  console.log(toalettObj);
}

function quickSearch() {
  var query = document.getElementById('searchField').value.split(" ");
  var toalettObj = {"herre":"","dame":"","stellerom":"","rullestol":"","pris":""}
  
  query.forEach(element => {
    if(element == "kjønn:mann") {
      toalettObj["herre"] = "1";
    }
    if(element == "kjønn:kvinne") {
      toalettObj["dame"] = "1";
    }
    if(element.substring(0,4) == "pris") {
      toalettObj["pris"] = element.substring(5,7);
    }
    if(element == "stellerom") {
      toalettObj["stellerom"] = "1";
    }
    if(element == "gratis") {
      toalettObj["pris"] = "0";
    } 
    if(element == "rullestol") {
      toalettObj["rullestol"] = "1";
    }
    /*
    var today = new Date().getDay();
    var time = new Date().getHours();
    var minutt = new Date().getMinutes();
    if(element == "åpen") {

    } 
    */
  })

  clearMarkers();
  clearList();

  var result = [];

  response.forEach(e => {
      if((toalettObj["herre"]     == e["herre"]     || toalettObj["herre"]     == "") && (toalettObj["dame"]      == e["dame"]      || toalettObj["dame"]      == "") &&
         (toalettObj["pris"]      >= e["pris"]      || toalettObj["pris"]      == "") && (toalettObj["stellerom"] == e["stellerom"] || toalettObj["stellerom"] == "") &&
         (toalettObj["rullestol"] == e["rullestol"] || toalettObj["rullestol"] == "")) {
           result.push(e);
         }
  })

  populateMap(result);
  populateList(result);

  console.log(toalettObj);
}

function clearMarkers() {
  markers.forEach(element => {
    element.setMap(null);
  })
}

function clearList() {
  document.getElementById("list").innerHTML = "";
}

// Legger til Markers på Google kartet, bruker response fra loadJSON
function populateMap(objarr) {
  var i = 1;
  objarr.forEach(element => {
    var position = {lat: +element["latitude"], lng: +element["longitude"]};
    var marker = new google.maps.Marker({position: position, label: "" + i, map: map});
    markers.push(marker);
    ++i;
  });
}

// Legger til navn på lekeplass/toalett i liste, bruker response fra loadJSON
function populateList(objarr) {
  var toalettRegex = /dokart/;
  var lekeplassRegex = /lekeplass/;
  var list = document.getElementById("list");

  if(toalettRegex.test(urlG)) {
    objarr.forEach(element => {
      list.innerHTML += "<li>" + element["plassering"] + "</li>";
    });
  } else if(lekeplassRegex.test(urlG)) {
    objarr.forEach(element => {
      list.innerHTML += "<li>" + element["navn"] + "</li>";
    })
  }
}

// Laster inn kart og rett JSON url for hotspots.html
function initHotspots() {
  initMap();
  urlG = "https://hotell.difi.no/api/json/bergen/dokart";
  loadJSON(urlG, 0);
}

// Laster inn kart og rett JSON url for lekeplass.html
function initLekeplass() {
  initMap();
  urlG = "https://hotell.difi.no/api/json/bergen/lekeplasser";
  loadJSON(urlG, 0);
}

// Laster JSON til universitet.html
function initUni() {
  urlG = "https://tp.data.uib.no/KEYu5uwu3yge/ws/room/2.0/allrooms.php";
  loadJSON(urlG, 2);
}

// Last json til minfavorittlekeplass.html
function initFavoritt() {
  initMap();
  loadJSON("https://hotell.difi.no/api/json/bergen/dokart", 0);
  loadJSON("https://hotell.difi.no/api/json/bergen/lekeplasser", 1)
}