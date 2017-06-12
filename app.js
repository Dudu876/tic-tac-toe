var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fm = require('./modules/filesModule');
var gm = require('./modules/gameModule');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(path.join(__dirname, './')));

//routes
app.post('/api/move/', (req, res) => {
    gm.handleMove(req.body);
    if (gm.checkwinner(req.body.board)) res.json(req.body.player);
    else res.json(false);
});
app.post('/api/saveresult/', (req, res) => {
    gm.recordResult(req.body);
    res.sendStatus(200);
});
app.get('/api/users/', (req, res) => {
    res.json(fm.getUsers());
});
app.get('/api/userstats/:user', (req, res) => {
    res.json(fm.getUserStats(req.params.user));
});
app.get('/api/ranks', (req, res) => {
    res.json(gm.getRanks());
});
app.post('/api/league/', (req, res) => {
    fm.newLeague();
    res.sendStatus(200);
});

//default route
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log('Listening to port ' + port)
});