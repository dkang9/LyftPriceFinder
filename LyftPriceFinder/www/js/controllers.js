angular.module('lyftpricefinder.controllers', ['ionic'])

/*
Controller for the map page
*/
.controller('MapCtrl', function($scope) {

})

/*
Controller for the map page
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
Controller for the map page
*/
.controller('DirectionsCtrl', function($scope) {

})


/*
Controller for our tab bar
*/
.controller('TabsCtrl', function($scope) {

});

