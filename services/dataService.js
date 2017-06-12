let moveUrl = '/api/move/';
let saveUrl = '/api/saveresult/';
let usersUrl = '/api/users/';
let userStatsUrl = '/api/userstats/';
let rankUrl = '/api/ranks/';
let newLeagUrl = '/api/league/';
myApp.factory('dataService', ['$http', function($http) {
    var _ranks = [];

    return {
        getUsers: function() {
            return $http.get(usersUrl);
        },
        getUserStats: function(user) {
            return $http.get(userStatsUrl + user);
        },
        postMove: function(player, y, x, board) {
            return $http.post(moveUrl, { player, y, x, board });
        },
        postResult: function(result) {
            return $http.post(saveUrl, result);
        },
        getRankings: function() {
            return $http.get(rankUrl);
        },
        newLeague: function() {
            return $http.post(newLeagUrl);
        },
        finish: function() {
            return $http.post(saveUrl);
        },
        setRanks: function(ranks) {
            _ranks = ranks
        },
        getLocalRank: function(player) {
            return _ranks.filter(rank => rank.player == player)[0];
        }
    }
}]);