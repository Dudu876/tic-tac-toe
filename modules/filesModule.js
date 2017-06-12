var fs = require('fs');
var path = require('path');
var gm = require('./gameModule');

var filesDirPath = path.join(__dirname, '../datafiles');
var movesPath = path.join(__dirname, '../datafiles/moves.txt');
var statsPath = path.join(__dirname, '../datafiles/stats.txt');

var moves = [],
    stats = [],
    t_move = { _called: true },
    t_stat = { _called: true };

if (!fs.existsSync(filesDirPath)) {
    fs.mkdirSync(filesDirPath);
}

fs.readFile(movesPath, function(err, data) {
    if (err);
    else moves = JSON.parse(data.toString());
});

fs.readFile(statsPath, function(err, data) {
    if (err);
    else stats = JSON.parse(data.toString());
});

exports.saveMove = (move) => {
    moves.push(move);
    console.log(move);
    if (!t_move._called) clearTimeout(t_move);
    t_move = setTimeout(() => save(movesPath, JSON.stringify(moves)), 10000);
}

exports.saveWinning = (result) => {
    stats.push(result);
    console.log(result);
    if (!t_stat._called) clearTimeout(t_stat);
    t_stat = setTimeout(() => save(statsPath, JSON.stringify(stats)), 10000);
}

exports.getUsers = () => {
    var users = new Set();
    for (var stat of stats) {
        users.add(stat.winner);
        users.add(stat.loser);
    }
    return [...users];
}
exports.getUserStats = (user) => {
    var userStats = [];
    for (var stat of stats) {
        if (stat.winner == user || stat.loser == user)
            userStats.push(stat);
    }
    return userStats;
}
exports.getStats = () => {
    return stats;
}
exports.newLeague = () => {
    stats = [];
    save(statsPath, JSON.stringify(stats));
    console.log('reseting stats');
}

function save(filePath, data) {
    fs.writeFile(filePath, data, function(err) {
        if (err) {
            return console.error(err);
        }
    })
};