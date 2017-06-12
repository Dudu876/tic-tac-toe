angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
    // home page
        .when('/', {
            templateUrl: 'views/game.html',
            controller: 'mainCtrl'
        })
        .when('/userstats', {
            templateUrl: 'views/userstats.html',
            controller: 'statsCtrl'
        })
        .when('/rank', {
            templateUrl: 'views/rank.html',
            controller: 'rankCtrl'
        })
        .when('/management', {
            templateUrl: 'views/management.html',
            controller: 'managementCtrl'
        })
        .when('/players/:player', {
            templateUrl: 'views/player.html',
            controller: 'playerCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);

}]);