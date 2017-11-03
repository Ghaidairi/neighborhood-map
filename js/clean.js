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

        // for() {
        //   marker.setMap(null);
        // }
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

    // ajax request to get info for current location
     var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + this.name + '&format=json&callback=wikiCallback';
     var content;
     $.ajax({
         url: wikiURL,
         dataType: 'jsonp',
         timeout: 1000
     }).done(function(data) {
         this.content += '<h3>' + this.name + '</h3>' + '<p>' + data[2][0] + '<a href=' + data[3][0] + ' target="blank"> Wikipedia</a></p>';
     }).fail(function(jqXHR, textStatus) {
         alert("failed to get wikipedia resources");
     });

     // A function to parse and display the Wikipedia info.
     var parseAjax = function(response) {
    // // Removing the temporary span in the View
    // if ($('#tempText').is(":visible")) $('#tempText').hide();
    // // Hiding the old Wikipedia info.
    // $('#wikipedia').hide();
    // Checking if the AJAX has a response
    if (response === "failed") {
      // If it failed, display an error message
      self.title("Cannot load Wikipedia data!");
    // If the AJAX is successful
    } else {
      // Displaying Wikipedia info. title
      self.title(response[0]);
      // Displaying Wikipedia info. synopsis (if any)
      self.content(response[2].length > 0 ? response[2] : 'No Description!');
      // Displaying Wikipedia info. links (if any)
      self.wikiLinks([]);
      response[1].forEach(function (link) {
        self.wikiLinks.push( {'link': link, 'url': 'https://en.wikipedia.org/wiki/' + link} );
      });
    }
    // Displaying the Wikipedia info. slowly
    $('#wikipedia').show('slow');
  };

};
// end of viewModel


var map;
var wikiLink;
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
            lat: 25.3340100,
            lng: 49.6149448
        },
        content: '<h4>Sommar Caffee</h4>',
        name: 'Sommer Caffee'
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
            lat: 25.3278104,
            lng: 49.6152120
        },
        content: '<h4>Code Caffee and Resturant</h4>',
        name: 'Code Caffee and Resturant'
    },
    {
        coords: {
            lat: 25.3350340,
            lng: 49.6137941
        },
        content: '<h4>iPhone Center</h4>',
        name: 'iPhone Center'
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
                infoWindow.open(map, marker);
                this.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    marker.setAnimation(null);
                }, 1400);
            });

            props.marker = marker;
        } // if stat. closing
    } // addMarker func. closing

} // initMap func. closing
