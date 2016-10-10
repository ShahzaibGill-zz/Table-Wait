'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

angular.module('myApp.services', [])
    .value('FIREBASE_URL', 'https://table-wait.firebaseio.com/')
    .factory('dataService', function($firebase, FIREBASE_URL) {
      var dataRef = new Firebase(FIREBASE_URL);
      var fireData = $firebase(dataRef);

      return fireData;
    })
    .factory('partyService', function(dataService){
      //var partiesRef = new Firebase(FIREBASE_URL + 'parties');
      //var parties= $firebase(partiesRef);
      var users = dataService.$child('users');

      var partyServiceObject = {
        saveParty: function(party, userId) {
          //parties.$add(party);
            users.$child(userId).$child('parties').$add(party);
        },
          getPartiesByUserId: function(userId){
              return users.$child(userId).$child('parties');
          }
      };

      return partyServiceObject;
    })
    .factory('textMessageService', function($firebase, partyService, dataService) {
      //var textMessageRef = new Firebase(FIREBASE_URL +'/textMessages');
      //var textMessages = $firebase(textMessageRef);
      var textMessages = dataService.$child('textMessages');

      var textMessageServicObject = {
        sendTextMessage: function(party, userId) {
          var newTextMessage = {
            phoneNumber: party.phone,
            size: party.size,
            name: party.name
          };
          textMessages.$add(newTextMessage);
          //party.notified = 'Yes';
          //partyService.parties.$save(party.$id);
            partyService.getPartiesByUserId(userId).$child(party.$id).$update({notified: 'Yes'});

        }
      };

      return textMessageServicObject;

      var newTextMessage = {
        phoneNumber: party.phone,
        size: party.size,
        name: party.name
      }

      textMessages.$add(newTextMessage);

      //Code here for notified
      party.notified = 'Yes';
      $scope.parties.$save(party.$id);
    })

    .factory('authService', function($firebaseSimpleLogin, $location, FIREBASE_URL, $rootScope){
      var authRef = new Firebase(FIREBASE_URL);
      var auth = $firebaseSimpleLogin(authRef);

      var authServiceObject = {
        register: function(user){
          auth.$createUser(user.email, user.password).then(function(data) {
            console.log(data);
           authServiceObject.login(user);
          });
        },
        login: function(user) {
          auth.$login('password', user).then(function (data) {
            console.log(data);
            // Redirect users to waitlist page
            $location.path('/waitlist');
          });
        },
        logout: function(){
          auth.$logout();
          // Redirect users to landing page
          $location.path('/');
            },
          getCurrentUser: function() {
              return auth.$getCurrentUser();

        }
      };

      $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
        //Save currentUser on rootScope.
        $rootScope.currentUser = user;
      });

      $rootScope.$on("$firebaseSimpleLogin:logout", function() {
        //Save currentUser on rootScope.
        $rootScope.currentUser = null;
      });


      return authServiceObject;
    })
    .factory('MenuService', function() {
      return {
        totalBill: 0
      };
    });
