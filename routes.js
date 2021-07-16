'use strict';

module.exports = function(app) {
    var jsonDB = require('./controller');

    app.route('/')
        .get(jsonDB.index);

    app.route('/showAllTrx')
        .get(jsonDB.showAllTrx);
}