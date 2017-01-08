var locations = [
  {title: 'Central Park', location: {lat: 40.7828687, lng:-73.9675438}, type: 'park'},
  {title: 'Empire State Building', location: {lat: 40.7484444, lng: -73.9878441}, type: 'wonder'},
  {title: 'Statue of Liberty', location: {lat: 40.689251, lng: -74.044506}, type: 'museum'},
  {title: 'Metropolitan Museum of Art', location: {lat: 40.7794406, lng: -73.9654327}, type: 'museum'},
  {title: 'Madame Tussauds New York', location: {lat: 40.7564309, lng: -73.9910225}, type: 'museum'},
  {title: 'Rockefeller Center', location: {lat: 40.7587442, lng: -73.9808623}, type: 'wonder'},
  {title: 'One World Trade Center', location: {lat: 40.7129987, lng: -74.0153496}, type: 'wonder'},
  {title: 'Chrysler Building', location: {lat: 40.7516248, lng: -73.9776907}, type: 'wonder'},
  {title: 'Washington Square Park', location: {lat: 40.730888, lng:-73.997471}, type: 'park'},
  {title: 'The High Line', location: {lat: 40.747976, lng:-74.004722}, type: 'park'}
];
// var icons = {
//   park: {icons: 'icon/park.png'},
//   museum: {icons: 'icon/museum.png'}
// };


// $(document).ready(function(){
// 	$('#nav-icon1').click(function(){
// 		$(this).toggleClass('open');
//     $('.filter_menu').toggleClass('open');
// 	});
// });
var ViewModel = function () {
  var self = this;
  self.toggleHamburger = function () {
    $('#nav-icon1').toggleClass('open');
    $('.filter_menu').toggleClass('open');
  }

  var icons = {
    park: {icon: 'icon/park.png'},
    museum: {icon: 'icon/museum.png'},
    wonder: {icon: 'icon/wonder.png'}
  };

  // function initMarkers() {
    locations.forEach(function(location) {
      marker = new google.maps.Marker({
        title: location.title,
        position: location.location,
        map: map,
        icon: icons[location.type].icon
      });
      marker.addListener('click', function() {
      initInfoWindow(this, viewInfoWindow);
      });
      markers.push(marker);
      location.marker = marker;
    });
    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    markers.forEach(function (marker) {
      bounds.extend(marker.position);
    });
    // for (var i = 0; i < markers.length; i++) {
    //   // markers[i].setMap(map);
    //   bounds.extend(markers[i].position);
    // }
    map.fitBounds(bounds);
  // };
  this.openMarker = function () {
    initInfoWindow(this.marker, viewInfoWindow);
  }
  self.places = ko.observableArray(locations);
  self.title = ko.observable('');
  self.filterTerm = ko.observable('');
  // var term = self.filterTerm();
  self.filterFuntion = ko.computed(function () {
    return filterList = ko.utils.arrayFilter(self.places(), function (location) {
      if(location.title.toLowerCase().indexOf(self.filterTerm()) >= 0) {
        if (location.marker) {
            location.marker.setVisible(true);
        }
        return true;
      }
      else{
        location.marker.setVisible(false);
      }
    });
  });
};

var map;
var viewInfoWindow;
function initMap() {
  var styles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
];
  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7432166, lng: -73.9936478},
      zoom: 12,
      styles: styles,
      disableDefaultUI: true
  });
  ko.applyBindings(new ViewModel());
  viewInfoWindow = new google.maps.InfoWindow();
  // initMarkers();
};


var marker;
var markers = [];



// function showListings() {
//   var bounds = new google.maps.LatLngBounds();
//   // Extend the boundaries of the map for each marker and display the marker
//   for (var i = 0; i < markers.length; i++) {
//     markers[i].setMap(map);
//     bounds.extend(markers[i].position);
//   }
//   map.fitBounds(bounds);
// }

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
ko.applyBindings(new ViewModel());

function errorAlert() {
  alert('Error lodading data from google maps. Check your connection');
};
