myApp.controller('managementCtrl', ['$scope', 'dataService', function($scope, dataService) {

    $scope.labels = [];
    $scope.data = [
        []
    ];

    // get all the rankings
    dataService.getRankings().then((res) => {
        var ranks = res.data;
        //save the ranking at the service for player's view
        dataService.setRanks(ranks);

        // prepare graph data
        for (var rank of ranks) {
            $scope.labels.push(rank.player);
            $scope.data[0].push(rank.points);
        }
    });

    $scope.delete = (player) => {
        var i = $scope.labels.indexOf(player);
        $scope.labels.splice(i, 1);
        $scope.data[0].splice(i, 1);
    }
}]);