// var showMarker = function () {
//   this.infoWindow = ko.observable(data.name);
//   this.imgSrc = ko.observable(data.imgSrc);
//   //this.imgAttribution = ko.observable();
//   this.nickname = ko.observableArray(data.nickname);
//   }
function Place(name) {
    this.name = name;
}

var viewModel = function(){
  this.names = ko.observableArray([new Place('Panda'),

new Place('Extra'),
new Place('Sommar'),
new Place('Little Wishes'),
new Place('Code'),
new Place('Jareer'),
new Place('iPhone Center')]),

this.myInput = ko.observable('');

// search function(value) {
//     // remove all the current places, which removes them from the view
//     //viewModel.names.removeAll();
//     console.log(value);
//     for(var x in this.names) {
//      if (typeof (this.names) != 'undefined') {if(this.names[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
//         this.names.push(this.names[x]);
//       }}
//     }
//   }
    this.filteredList = ko.computed(function() {
      var filter = this.myInput().toLowerCase();
        //console.log(filter);


          return ko.utils.arrayFilter(this.names(), function(item) {
             var result =(item.name.toLowerCase().indexOf(filter) !== -1) ;
             console.log(item);
              return result;
        });

    }, this);


// this.myInput = ko.observable('');
// console.log(this.myInput());
// this.runWhenSomethingChanges = ko.computed(function() {
//   console.log(this.myInput());
//   this.search(this.myInput());


  // https://opensoul.org/2011/06/23/live-search-with-knockoutjs/
  // Filtering an Array/ ko.utils.arrayFilter:
  // http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
  // to search for sub strings https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
  // to search for lower case https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase

};

ko.applyBindings(viewModel);

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
  };

  // New map
  map = new google.maps.Map(document.getElementById('map'), options);

  console.log(markers);
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

    this.names()[i].marker = marker;

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
