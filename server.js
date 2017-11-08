'use strict';

var express = require('express');
var app = express();
var data = require('./data.json');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/app'));

app.route('/data')
    .get(function(req, res) {
    res.send(data);
});

app.route('/')
    .get(function(req, res){
        res.sendFile('/', {root: __dirname + '/app'});
    });

app.get('/*', function(req, res) {
    res.status(404).send('404: There is no page here');
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});