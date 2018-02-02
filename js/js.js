console.log("tekst");

var map;
var fløyen = {lat: 60.396411, lng: 5.328570};
var akvariet = {lat: 60.399797, lng: 5.303410};
var bergen = {lat: 60.3913, lng: 5.3221};
var usf = {lat: 60.3956174, lng: 5.3088757};
var bryggen = {lat: 60.3975672, lng: 5.3245493};
var dns = {lat: 60.3926098, lng: 5.3197};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: bergen
  });

  var akverietM = new google.maps.Marker({
    position: akvariet,
    map: map
  });

  var fløyenM = new google.maps.Marker({
    position: fløyen,
    map: map
  });

  var usfM = new google.maps.Marker({
    position: usf,
    map: map
  });

  var bryggenM = new google.maps.Marker({
    position: bryggen,
    map: map
  });

  var dnsM = new google.maps.Marker({
    position: dns,
    map: map
  });
}

function akvarietZoom() {
  map.panTo(new google.maps.LatLng(akvariet));
  map.setZoom(16);
}

function fløyenZoom() {
  map.panTo(new google.maps.LatLng(fløyen));
  map.setZoom(20);
}

function usfZoom() {
  map.panTo(new google.maps.LatLng(usf));
  map.setZoom(17);
}

function bryggenZoom() {
  map.panTo(new google.maps.LatLng(bryggen));
  map.setZoom(17);
}

function dnsZoom() {
  map.panTo(new google.maps.LatLng(dns));
  map.setZoom(17);
}

function playVid() {
  var vid = document.getElementById('vid');
  vid.autoplay = true;
  vid.loop = true;
  vid.load();
}
