myApp.controller('playerCtrl', ['$scope', 'dataService', '$routeParams', function($scope, dataService, $routeParams) {
    // get the player from service ranks
    $scope.rank = dataService.getLocalRank($routeParams.player);
}]);