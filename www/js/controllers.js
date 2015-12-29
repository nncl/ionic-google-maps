angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, $compile, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);

  // Map

  ionic.Platform.ready(initialize)

   function initialize() {

    //  var myLatlng = new google.maps.LatLng(-23.698080,-46.656389);
     var myLatlng = new google.maps.LatLng($scope.chat.latitude, $scope.chat.longitude);

     var mapOptions = {
         center: myLatlng,
         zoom: 16,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       };

     var map = new google.maps.Map(document.getElementById("map"), mapOptions);

     //Marker + infowindow + angularjs compiled ng-click
     var contentString = "<div><a ng-click='clickTest()'>Clique aqui!</a></div>";
     var compiled = $compile(contentString)($scope);

     var infowindow = new google.maps.InfoWindow({
       content: compiled[0]
     });

     var marker = new google.maps.Marker({
         position: myLatlng,
         map: map,
         icon : new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + '80C103'),
         title: 'Title here'
     });

     google.maps.event.addListener(marker, 'click', function() {
       infowindow.open(map,marker);
     });

     $scope.map = map;
   }
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.call = function(value) {
    console.log(value);
  }
});
