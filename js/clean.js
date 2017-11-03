// var showMarker = function () {
//   this.infoWindow = ko.observable(data.name);
//   this.imgSrc = ko.observable(data.imgSrc);
//   //this.imgAttribution = ko.observable();
//   this.nickname = ko.observableArray(data.nickname);
//   }
function Place(name) {
    this.name = name;
    this.marker = marker;
}

// viewModel
var ViewModel = function() {
    var self = this;
    this.names = ko.observableArray(markers);
    self.openWindow = function(location) {
        google.maps.event.trigger(location.marker, 'click');
    };
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
            var result = (item.name.toLowerCase().indexOf(filter) !== -1);
            item.marker.setVisible(result);
            return result;
        });
    }, this);// end of computed
    // this.myInput = ko.observable('');
    // console.log(this.myInput());
    // this.runWhenSomethingChanges = ko.computed(function() {
    //   console.log(this.myInput());
    //   this.search(this.myInput());
};
// end of viewModel

// A function to get the data from wikipedia
function getDataFromWiki(marker, infoWindow) {
    // ajax request to get info for current location
     var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
     var content;
     var title = markers.name;
     $.ajax({
         url: wikiURL,
         dataType: 'jsonp',
         timeout: 1000
     }).done(function(data) {
         marker.content = '<h3>' + marker.title + '</h3>' + '<p>' + data[2][0] + '<a href=' + data[3][0] + ' target="blank"> Wikipedia</a></p>';
         infoWindow.setContent(marker.content);
         infoWindow.open(map, marker);
     }).fail(function(jqXHR, textStatus) {
         alert("failed to get wikipedia resources");
     });
}

var map;
// Array of markers
var markers = [{
        coords: {
            lat: 25.3431103,
            lng: 49.6135413
        },
        content: '<h4>Panda</h4><h5>Supermarket</h5>',
        name: 'Panda'
    },
    {
        coords: {
            lat: 25.3420998,
            lng: 49.6139416
        },
        content: '<h4>Extra</h4>',
        name: 'Extra'
    },
    {
        coords: {
            lat: 25.334567,
            lng: 49.6240838
        },
        content: '<h4>King Faisal University</h4>',
        name: 'King Faisal University'
    },
    {
        coords: {
            lat: 25.3344367,
            lng: 49.6131729
        },
        content: '<h4>Little Wishes</h4>',
        name: 'Little Wishes'
    },
    {
        coords: {
            lat: 25.3315518,
            lng: 49.6151993
        },
        content: '<h4>Jarir Bookstore</h4>',
        name: 'Jarir Bookstore'
    }
];

// initialiing google map
function initMap() {
    // Map options
    var options = {
        title: markers.name,
        zoom: 15,
        center: {
            lat: 25.3373780,
            lng: 49.6137140
        }
        // animation: google.maps.Animation.DROP
    };

    // New map
    map = new google.maps.Map(document.getElementById('map'), options);

    console.log(markers);
    // Loop through markers
    for (var i = 0; i < markers.length; i++) {
        // Add marker
        addMarker(markers[i]);
    }
    ko.applyBindings(new ViewModel());

    // Add Marker Function
    function addMarker(props) {
        var marker = new google.maps.Marker({
            position: props.coords,
            title: props.name,
            map: map
        });
        ///this.names()[i].marker = marker;

        // Check content
        if (props.content) {
            var infoWindow = new google.maps.InfoWindow({
                content: props.content
            });
            marker.addListener('click', function() {
                var marker = this;
                getDataFromWiki(marker, infoWindow)
                this.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    marker.setAnimation(null);
                }, 1400);
            });
            props.marker = marker;
        } // if stat. closing
    } // addMarker func. closing
} // initMap func. closing

// Graceful failing of google maps
function googleError() {
  alert('Google Maps could not be loaded !');
}
