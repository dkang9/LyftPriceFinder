angular.module('lyftpricefinder.controllers', ['ionic'])

/*
Controller for the map page
*/
.controller('MapCtrl', function($scope) {

function makeLyftAPICalls(start,end,radius) {
  //this token needs to be updated after authentication expires
  access_token = "gAAAAABX1IBbdgXV30khHMX5AGjIGdJYQoTcGZWYCvimbyysX7boysJshFGFdvmkEP01_glyy2w87ooD72qxqniFyVfnBEOHott2s6_q4DYtau1BHYBiHBaQIwFaf08IhkN0ubls6-rIDr1kc4O15dW_g_XipxjWcFWwJJtG80mVRF6mFV_fLDS235zUEZbwcfj4tH28kI2MLHibNKhLTQRNdLcYT_A25A==";
  var startAddress =  start.replace(" ","+")
  var endAddress = end.replace(" ","+")
  apiKey = "AIzaSyDoGtHRKWmO2BM8Pw9zpkrzv9UgxOxZxOM"
  geocodingStart = "https://maps.googleapis.com/maps/api/geocode/json?address=" + startAddress + "&key=" + apiKey
  geocodingEnd = "https://maps.googleapis.com/maps/api/geocode/json?address=" + endAddress + "&key=" + apiKey
  var startLat = geocodingStart["results"]["geometry"]["location"]["lat"]
  var startLong = geocodingStart["results"]["geometry"]["location"]["long"]
  var endLat = geocodingEnd["results"]["geometry"]["location"]["lat"]
  var endLong = geocodingEnd["results"]["geometry"]["location"]["long"]
  var numberOfPoints = 8;
    var degreesPerPoint = 360 / numberOfPoints;
    var currentAngle = 0;

    var estimates = [];
    var minFare = Number.MAX_VALUE;
    var minObj = {};

    for (var rad = .1; rad <= radius; rad += 0.1) {
    
      for(var i=0; i < numberOfPoints; i++) {
          var x2 = Math.cos(currentAngle) * rad;
          var y2 = Math.sin(currentAngle) * rad;

          var s_lat = startLat+x2;
          var s_lng = startLong+y2;

          xhr = new XMLHttpRequest();
      xhr.open("GET", "https://api.lyft.com/v1/cost?start_lat=" + (startLat+.01) + "&start_lng=" + startLong + "&end_lat=" + endLat + "&end_lng=" + endLong + "", false);
      xhr.setRequestHeader("Authorization", "Bearer " + access_token);
      xhr.send();
      var arr = JSON.parse(xhr.response).cost_estimates;
      var max = arr[arr.length-1].estimated_cost_cents_max;
      var min = arr[arr.length-1].estimated_cost_cents_min;
      var avgFare = (max*1.0 + min)/2;
      console.log(avgFare);

          var estimate = {
            "start_lat": s_lat, 
            "start_lng": s_lng, 
            "end_lat": endLat, 
            "end_lng": endLong, 
          "primetime_percentage": "0%", 
          "estimated_cost_cents": avgFare
        };
        estimates.push(estimate);

        if(avgFare < minFare) {
          minFare = avgFare;
          minObj = estimate;
        }

        currentAngle += degreesPerPoint;

      }
      currentAngle = 0;
  }

  var toRet = {
    "estimates": estimates,
    "minFare": minObj
  };
  console.log(toRet);
  return JSON.stringify(toRet);

}




})

/*
Controller for the heatmap page
*/
.controller('HeatMapCtrl', function($scope, $ionicLoading, $compile) {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });
 
        $scope.map = map;
})

/*
Controller for the directions page
*/
.controller('DirectionsCtrl', function($scope, $ionicLoading, $compile) {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });
 
        $scope.map = map;
})


/*
Controller for our tab bar
*/
.controller('TabsCtrl', function($scope) {

});

