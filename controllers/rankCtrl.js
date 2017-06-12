myApp.controller('rankCtrl', ['$scope', 'dataService', function($scope, dataService) {
    $scope.ranks = [];

    // get all ranking from server
    dataService.getRankings().then((res) => {
        $scope.ranks = res.data;
    });
    // start new league season by deleting all games stats history
    $scope.newLeague = () => {
        dataService.newLeague();
        alert(`new league season started!`);
        $scope.ranks = [];
    }
}]);