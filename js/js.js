console.log("tekst"); // Printer "tekst" i konsollen

var map; // Variabel for å referere til Google kartet
var response; // Variabel for datasett
var lekeplass; // Variabel for lekeplass, siden man trenge to datasett for til minfavorittlekeplass.html
var markers = []; // Google Map markers
var urlG = ""; // JSON URL
var uibRom; // Variabel for uib-rom arrayet

// Initialiserer kartet
function initMap() {
  var bergen = {lat: 60.3913, lng: 5.3221};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: bergen
  });
}

// Laster inn JSON-fil basert på URL
// Noen sider krever annerledes håndtering av JSONen, derfor bruker vi en variabel (favoritt, siden det begynte med minfavorittlekeplass.html)
// Variablen viser hvilken måte JSONen burde håndteres på.
function loadJSON(url, favoritt) {
  var request = new XMLHttpRequest();
  request.responseType = 'json';
  request.open('GET', url, true);
  request.onload = function() {
    if(favoritt == 1) {
      lekeplass = request.response["entries"];
    } else if(favoritt == 2) {
      uibRom = request.response["data"];
    } else {
      response = request.response["entries"];
      populateMap(response);
      populateList(response);
    }
  };
  request.send(null);
}

// Denne funksjonene tar imot to verdier som brukerene velger og viser alle rommene som er under det fakultet og som er av den rette romtypen
function finnRom() {
  var fakultet = document.getElementById("fak").value;
  var romtype = document.getElementById("rom").value;
  var liste = document.getElementById("list");
  clearList();

  uibRom.forEach(e => {
    if(e["areaname"].includes(fakultet) && e["typeid"] == romtype) {
      list.innerHTML += "<li>" + e["name"] + ", " + e["buildingname"] + ' <a href="' + e["roomurl"] + '">URL</a></li>';
    }
  });
}

// I skrivende stund fungerer det ikke å søke basert på når toalettet er åpent
// Brukeren kan søke basert på kjønn, pris, stellerom, og om man kan bruke rullestol
// Toalettene som passer kriteriene vises på kartet og på listen
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
}

// I skrivende stund fungerer det ikke å søke basert på når toalettet er åpent
// Brukeren kan søke basert på kjønn, pris, stellerom, og om man kan bruke rullestol
// Toalettene som passer kriteriene vises på kartet og på listen
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
}

// Fjerner markers fra kartet
function clearMarkers() {
  markers.forEach(element => {
    element.setMap(null);
  })
}

// Tømmer listen
function clearList() {
  document.getElementById("list").innerHTML = "";
}

// Legger til Markers på Google kartet, tar imot et array som må ha punktene "latitude" og "longitude"
function populateMap(objarr) {
  var i = 1;
  objarr.forEach(element => {
    var position = {lat: +element["latitude"], lng: +element["longitude"]};
    var marker = new google.maps.Marker({position: position, label: "" + i, map: map});
    markers.push(marker);
    ++i;
  });
}

// Legger til navn på lekeplass/toalett i liste. Bruker regex for å bestemme hvilket punkt fra arrayet som skal skrives
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

// Laster inn kart og rett JSON url for toaletter.html
function initToaletter() {
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
  setTimeout(function(){populateSelect();}, 1000);
}

// Denne funksjonen fyller Select-elementet "select" fra minfavorittlekeplass.html med en liste over lekeplasser
function populateSelect(){
  var select = document.getElementById("select");
  var id = 1;
  lekeplass.forEach(element => {
    select.innerHTML += '<option value= "' + id + '">' + element["navn"] + '</option>';
    id++;
  });
}

// Henter ut ID-en som blir satt som value av populateSelect()-funksjonen,
function getID() {
  var selector = document.getElementById('select');
  var value = selector[selector.selectedIndex].value;
  return value;
}

// Pytagoras setning, blir brukt for å regne ut hypotenusen mellom to koordinater
function pytagoras(a, b){
  return Math.sqrt((a * a) + (b * b));
}

// Denne funksjonen finner lekeplassen som samsvarer med Valuen fra id="select" og finner toalettet som er nærmest.
// Den tar så å representerer toalettet i id="closest".
function getClosest(){
  var id = getID();
  var body = document.getElementById("closest");
  var pos;
  var toCompare;
  var distanceShortest = 1;
  var distanceToCompare;
  var closest;

  lekeplass.forEach(element => {
    if(id == element["id"]){
      pos = {lat: element["latitude"], lng: element["longitude"]};
    }
  });
  response.forEach(element => {
    toCompare = {lat: element["latitude"], lng: element["longitude"]};
    distanceToCompare = pytagoras((pos.lat - toCompare.lat), (pos.lng - toCompare.lng));
    if(distanceToCompare < distanceShortest){
      distanceShortest = distanceToCompare;
      closest = element;
    }
  });

  body.innerHTML =  "<h4>" + closest.plassering + "</h4>" +
                      "<p> adresse: " + closest.adresse + "</p>" +
                    "<p> herre: " + isTrue(closest.herre) + "</p>" +
                    "<p> dame: " + isTrue(closest.dame) + "</p>" +
                    "<p> kun pissoar: " + isTrue(closest.pissoir_only) + "</p>" +
                    "<p> pris: " + isGratis(closest.pris) + "</p>" +
                    "<p> rullestol: " + isTrue(closest.rullestol) + "</p>" +
                    "<p> stellerom: " + isTrue(closest.stellerom) + "</p>" +
                    "<p> hverdag: " + isClosed(closest.tid_hverdag) + "</p>" +
                    "<p> lørdag: " + isClosed(closest.tid_lordag) + "</p>" +
                    "<p> søndag: " + isClosed(closest.tid_sondag) + "</p>";
}

// Denne funksjon tar en dag som parameter og returnerer "stengt", "døgnåpent", eller åpningstider
function isClosed(dag){
  if(dag == "NULL") {
    return "stengt";
  } else if(dag == "ALL"){
    return "døgnåpent"
  } else {
    return dag;
  }
}

// Denne funksjonen tar en pris som parameter og returnerer enten "gratis" eller pris i kroner
function isGratis(pris){
  if(pris == "NULL" || pris == "0"){
    return "gratis";
  } else {
    return pris + "kr";
  }
}

// Denne funksjonen tar en verdi fra JSON-ene, hvor true/false er representert som 1/0 eller "NULL", og returnerer "ja" eller "nei".
// Den blir brukt for å si om toaletter er Herre/Dame, kun pissoar, rullestol og stellerom
function isTrue(a){
  if(a == 1){
    return "ja";
  } else {
    return "nei";
  }
}
