var map;
var fløyen = {lat: 60.396411, lng: 5.328570};
var akvariet = {lat: 60.399797, lng: 5.303410};
var bergen = {lat: 60.3913, lng: 5.3221};

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
}

function akvarietZoom() {
  map.panTo(new google.maps.LatLng(60.399797, 5.303410));
  map.setZoom(16);
}

function fløyenZoom() {
  map.panTo(new google.maps.LatLng(60.396411, 5.328570));
  map.setZoom(20);
}

function playVid() {
  var vid = document.getElementById('vid');
  vid.autoplay = true;
  vid.loop = true;
  vid.load();
}
