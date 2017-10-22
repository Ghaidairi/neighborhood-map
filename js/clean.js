// var showMarker = function () {
//   this.infoWindow = ko.observable(data.name);
//   this.imgSrc = ko.observable(data.imgSrc);
//   //this.imgAttribution = ko.observable();
//   this.nickname = ko.observableArray(data.nickname);
//   }
function place(name) {
    this.name = name;
};

var obj = {
  names: ko.observableArray([new place('Panda'),
new place('Extra'),
new place('Sommar'),
new place('Little Wishes'),
new place('Code'),
new place('Jareer'),
new place('iPhone Center')])
};
ko.applyBindings(obj);

var map;
// Array of markers
var markers = [
  { coords:{lat:25.3431103,lng:49.6135413}, content:'<h1>Panda</h1><h4>Supermarket</h4>' },
  { coords:{lat:25.3420998,lng:49.6139416}, content:'<h1>Extra</h1>' },
  { coords:{lat:25.3340100,lng:49.6149448}, content:'<h1>Sommar Caffee</h1>' },
  { coords:{lat:25.3344367,lng:49.6131729}, content:'<h1>Little Wishes</h1>' },
  { coords:{lat:25.3278104,lng:49.6152120}, content:'<h1>Code Caffee and Resturant</h1>' },
  { coords:{lat:25.3350340,lng:49.6137941}, content:'<h1>iPhone Center</h1>' },
  { coords:{lat:25.3315518,lng:49.6151993}, content:'<h1>Jarir Bookstore</h1>' }
];
function initMap(){
  // Map options
  var options = {
    zoom:14,
    center:{lat:25.3373780,lng:49.6137140}
  }

  // New map
  map = new google.maps.Map(document.getElementById('map'), options);

  // Loop through markers
  for(var i = 0;i < markers.length;i++){
    // Add marker
    addMarker(markers[i]);
  }

  // Add Marker Function
  function addMarker(props){
    var marker = new google.maps.Marker({
      position:props.coords,
      map:map
    });

    // Check content
    if(props.content){
      var infoWindow = new google.maps.InfoWindow({
        content:props.content
      });
      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });
    } // if stat. closing
  } // addMarker func. closing
} // initMap func. closing
