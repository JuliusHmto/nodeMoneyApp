"use strict";

module.exports = function (app) {
  var jsonDB = require("./transactions.controller");

  app.route("/").get(jsonDB.index);

  app.route("/showAllTrx").get(jsonDB.showAllTrx);

  app.route("/showTrx/:id").get(jsonDB.showTrx);

  app.route("/addTrx").post(jsonDB.addTrx);

  app.route("/editTrx").put(jsonDB.editTrx);

  app.route("/deleteTrx").delete(jsonDB.deleteTrx);

  app.route("/showCurMonthTrx").get(jsonDB.showCurMonthTrx);

  app.route("/showLastMonthTrx").get(jsonDB.showLastMonthTrx);
};
