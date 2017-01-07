
var locations = [
  {title: 'Central Park', location: {lat: 40.7828687, lng:-73.9675438}},
  {title: 'Empire State Building', location: {lat: 40.7484444, lng: -73.9878441}},
  {title: 'Statue of Liberty', location: {lat: 40.689251, lng: -74.044506}},
  {title: 'Metropolitan Museum of Art', location: {lat: 40.7794406, lng: -73.9654327}},
  {title: 'Madame Tussauds New York', location: {lat: 40.7564309, lng: -73.9910225}},
  {title: 'Rockefeller Center', location: {lat: 40.7587442, lng: -73.9808623}},
  {title: 'One World Trade Center', location: {lat: 40.7129987, lng: -74.0153496}},
  {title: 'Chrysler Building', location: {lat: 40.7516248, lng: -73.9776907}},
];


$(document).ready(function(){
	$('#nav-icon1').click(function(){
		$(this).toggleClass('open');
    $('.filter_menu').toggleClass('open');
	});
});

// var SearchViewModel = function () {
//   this.toggleHamburger = function () {
//     console.log("hoihoi");
//     document.getElementById("#nav-icon1").classList.toggle('open');
//     document.getElementById(".filter_menu").classList.toggle('open');
//   }
// }

var map;
var viewInfoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7432166, lng: -73.9936478},
      zoom: 13,
      disableDefaultUI: true
  });
  // ko.applyBindings(new SearchViewModel());
  viewInfoWindow = new google.maps.InfoWindow();
  initMarkers();
};


var marker;
var markers = [];

function initMarkers() {
  locations.forEach(function(location) {
    marker = new google.maps.Marker({
      title: location.title,
      position: location.location,
      map: map,
    });
    marker.addListener('click', function() {
    initInfoWindow(this, viewInfoWindow);
    });
    markers.push(marker);
  });
  showListings();
};

function showListings() {
  var bounds = new google.maps.LatLngBounds();
  // Extend the boundaries of the map for each marker and display the marker
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
    bounds.extend(markers[i].position);
  }
  map.fitBounds(bounds);
}

function initInfoWindow(marker, infowindow) {
  if (infowindow.marker != marker) {
      infowindow.marker = marker;
      infowindow.setContent("Loading...Please wait...");
      infowindow.open(map,marker);
    }
    var clientID = 'RR0XKD5EPNBKGVB115FMDX1VJP04OWS5DVCQF2MKXRC0B4O5';
    var clientSecret = 'YZHKWW5NO15P3XS5EGNTYU55YV1OCLXY51KGLXBBTOGRT21B';
    var lat = marker.position.lat();
    var lng = marker.position.lng();
    console.log(lng);
    var loc = lat +','+ lng;
    var url = 'https://api.foursquare.com/v2/venues/search?v=20161016&ll='+ loc +'&intent=checkin&client_id='+ clientID +'&client_secret='+ clientSecret;
    $.ajax({
      method: 'GET',
      url: url,
      dataType: 'jsonp',
      success: function (data) {
        var address = data.response.venues[0].location.address;
        var city = data.response.venues[0].location.city;
        infowindow.setContent('<div><h2>'+ marker.title +'</h2><br><span class="infoDetails">Address:</span> '+ address+'<br><span class="infoDetails">City:</span> '+city+'</div>');
        infowindow.open(map, marker);
      },
      error: function () {
        alert("ERROR!.Cannot Retrieve Data at this time");
      }
    });
}
