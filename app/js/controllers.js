'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('LandingPageController', [function(){
    }])

    .controller('WaitlistController', ['$scope', 'partyService', 'textMessageService','authService',function($scope, partyService, textMessageService, authService){
        // Bind user's parties to $scope.parties
        authService.getCurrentUser().then(function(user) {
          if (user) {
              $scope.parties = partyService.getPartiesByUserId(user.id);
          };
        })

        // Object to store data from waitlist form
        $scope.newParty = {name: '', phone:'', size:'', done: false, notified: 'No'};

        //Function to save newParty to waitlist
        $scope.saveParty = function() {
            partyService.saveParty($scope.newParty, $scope.currentUser.id);
            //Reset newParty variable
            $scope.newParty = {name: '', phone:'', size:'', done: false, notified: 'No'};

        };

        // Function to send SMS text message to a party
         $scope.sendTextMessage = function(party) {
          textMessageService.sendTextMessage(party, $scope.currentUser.id);
        };
    }])
    .controller('AuthController', ['$scope', 'authService',  function($scope, authService) {

        // Object bound to inputs on register and login pages
        $scope.user = { email: '', password: ''};

        // Method to register new user using authService (in services)
        $scope.register = function() {
            authService.register($scope.user);
        };

        // Method to log in user using authService (in services)
        $scope.login = function() {
            authService.login($scope.user);
        };

        // Method to log out user using authService (in services)
        $scope.logout = function() {
            authService.logout();
        };
}]);