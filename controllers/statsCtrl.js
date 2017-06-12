myApp.controller('statsCtrl', ['$scope', 'dataService', function($scope, dataService) {
    // get all users
    dataService.getUsers().then((res) => {
        $scope.users = res.data;
    })

    // get user stats
    $scope.update = () => {
        dataService.getUserStats($scope.selectedUser).then((res) => {
            $scope.userStats = res.data
        })
    }
}]);