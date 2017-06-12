myApp.controller('mainCtrl', ['$scope', '$location', 'dataService', function($scope, $location, dataService) {

    $scope.players = ['', ''];
    const mark = ['X', 'O'];
    let winner = '';

    // get the players names
    while (!$scope.players[0] || !$scope.players[1]) {
        if (!$scope.players[0]) $scope.players[0] = prompt("First player name: ", "Dudu");
        if (!$scope.players[1]) $scope.players[1] = prompt("Second player name: ", "Ariel");
    }
    $scope.move = (y, x) => {
        //enable move only if no winner yet and the cell is empty
        if ($scope.board[y][x] == '' && !winner) {
            $scope.board[y][x] = mark[$scope.turn % 2];

            // update server with the move, and get if there is a winner
            dataService.postMove($scope.players[$scope.turn % 2], y, x, $scope.board).then((res) => {
                // winner = $scope.players[mark.indexOf(res.data)]; 
                winner = res.data;
                if (winner) {
                    alert(`${winner} is the winner!`);
                    gameOver();
                } else if (!winner && $scope.turn == 9) {
                    alert('its a tie');
                    gameOver();
                }
            }).then((res) => {});
            $scope.turn++;
        }
    }

    const gameOver = () => {
        dataService.postResult({
            winner,
            players: $scope.players
        });
    }

    $scope.reset = () => start();

    // init function
    const start = () => {
        $scope.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];

        $scope.turn = 0;
        winner = '';
    }
    start();

}]);