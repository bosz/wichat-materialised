/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('HomeCtrl', function($scope, $rootScope, $ionicLoading, $timeout, $stateParams, ionicMaterialInk) {
   $scope.$parent.clearFabs();
   $rootScope.display = false;
    $timeout(function() {
       $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
    $scope.search = function(){
    $ionicLoading.show({
      //template: ''
      });

      $timeout(function() {
     $ionicLoading.hide();
      $scope.modal.show();

      $state.go("app.chatlist");
    }, 6000);  }

})

.controller('ChatlistCtrl', function($scope ,$http, $rootScope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {

      $timeout(function() {

        $http.get('js/users.json').success(function(data){
      //get connected users
      $scope.users = data;

   });

    }, 6000);

    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');
    $rootScope.display = true;

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 1000);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
     ionicMaterialInk.displayEffect();
})

.controller('ChatCtrl', function($scope, $http, $rootScope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk){

     $timeout(function() {

    $http.get('js/users.json').success(function(data){
        $scope.users = data;
        $scope.whichUser = 2;
    });

    $scope.messages = [{
        name: "Banki Louis",
        message: "lorem ispum dollot",
        id:3,
         time: '02:30  20/05/2016',
        status: 1

    },{
        name: "Lee Roi",
        message: "lorem ispum dollot",
        id:1,
        time: '02:40  20/05/2016',
        status: 1
    },{
        name: "Mandize",
        message: "lorem ispum dollot",
        id:2,
         time: '02:22   20/05/2016',
        status: 0
    }];
    }, 900);

    $scope.sendMessage = function(){
        var message = $scope.newMessage;
        var time = new Date().getDay();
        var message ={
            name: "me",
            message: message,
            time: time,
            status: 0,
            id: 7
        }

        $scope.messages.push(message);

        $state.go('app.chat');

    }
     // Set Header
     console.log($scope.messages);
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');
    $rootScope.display = false;

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 1000);



})

.controller('ProfileCtrl', function($scope, $stateParams, $ionicLoading, $rootScope, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $rootScope.display = true

    $scope.saving = function(){
    $ionicLoading.show({
        template: 'Saviing Settings'
      });

      $timeout(function() {
     $ionicLoading.hide();
      $scope.modal.show();

      $state.go("app.chatlist");
    }, 1000);  }

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 6000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('MessageCtrl', function($scope, $http, $rootScope, $stateParams, $ionicActionSheet, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $http.get('js/users.json').success(function(data){
        $scope.users = data;
    })
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');
    $rootScope.display = true

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

     // Triggered on a button click, or some other target
    $scope.actionSheet = function() {

        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({

            destructiveText: 'Delete',
            cancelText: 'Cancel',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                return true;
            }
        });

        // For example's sake, hide the sheet after two seconds
        $timeout(function() {
            hideSheet();
        }, 10000);

    };
})

.controller('NotificationCtrl', function($scope, $http, $rootScope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
      $http.get('js/notification.json').success(function(data){
            $scope.infos = data;
      });

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);
    $rootScope.display = true


    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

.controller('HelpCtrl', function($scope, $http, $rootScope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {

    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);
    $rootScope.display = true;

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})


;
