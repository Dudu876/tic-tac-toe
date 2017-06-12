var fm = require('./filesModule');

var winner = '';

const winRank = 2;
const loseRank = 1;
const tieRank = 1;

exports.handleMove = (move) => {
    fm.saveMove({ player: move.player, x: move.x, y: move.y });
}
exports.recordResult = (result) => {
    // if no winner (means tie) take the first player
    var curr_winner = result.winner || result.players[0];
    // if there is a winner, delete him from array to have the loser
    if (result.winner) {
        result.players.splice(result.players.indexOf(result.winner), 1);
    }
    var loser = result.winner ? result.players[0] : result.players[1];
    var tie = result.winner ? false : true;
    var r = {
        winner: curr_winner,
        loser,
        tie
    }
    fm.saveWinning(r);
}
exports.getRanks = () => {
    var ranks = {},
        result = [],
        r = {},
        stats = fm.getStats();

    // going over the stats the giving each player and ranking him according his results
    for (var stat of stats) {
        if (!ranks[stat.winner]) ranks[stat.winner] = { points: 0, games: 0 };
        if (!ranks[stat.loser]) ranks[stat.loser] = { points: 0, games: 0 };
        ranks[stat.winner].games++;
        ranks[stat.loser].games++;
        if (stat.tie) {
            ranks[stat.winner].points = ranks[stat.winner].points + tieRank || tieRank;
            ranks[stat.loser].points = ranks[stat.loser].points + tieRank || tieRank;
        } else {
            ranks[stat.loser].points = ranks[stat.loser].points + loseRank || loseRank;
            ranks[stat.winner].points = ranks[stat.winner].points + winRank || winRank;
        }
    }

    // creating the result list
    for (key of Object.keys(ranks)) {
        r = {
            player: key,
            points: ranks[key].points,
            games: ranks[key].games,
            rank: 0
        }
        result.push(r);
    }

    // sorting the result list for the ranking
    result = result.sort((a, b) => b.points - a.points);

    // seting the ranking
    result = result.map((a, i) => {
        a.rank = i + 1
        return a;
    });
    return result;
}
exports.checkwinner = (board) => {
    var i;
    for (i = 0; i < 3 && !winner; i++) {
        if (board[i][0] == board[i][1] && board[i][1] == board[i][2]) winner = board[i][0];
    }
    for (i = 0; i < 3 && !winner; i++) {
        if (board[0][i] == board[1][i] && board[1][i] == board[2][i]) winner = board[0][i];
    }
    if (board[0][0] == board[1][1] && board[1][1] == board[2][2]) winner = board[1][1];
    if (board[2][0] == board[1][1] && board[1][1] == board[0][2]) winner = board[1][1];

    if (winner) {
        console.log(`winner is ${winner}`);
        winner = '';
        return true;
    }
    return false;
}