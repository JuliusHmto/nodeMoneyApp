'use strict';

var response = require('./res');
var connection = require('./connection');

exports.index = function(req, res) {
    response.ok('App successfully runned!', res);
}

//show all transactions
exports.showAllTrx = function(req, res) {
    connection.query('SELECT * FROM transactions', function(err, rows, fields){
        if(err){
            console.log(err);
        } else {
            response.ok(rows, res);
        }
    });
};

//show transactions by id
exports.showTrx = function(req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM transactions WHERE id_trx = ?', [id], function(err,rows,fields){
        if(err){
            console.log(err);
        } else {
            response.ok(rows, res);
        }
    })
}