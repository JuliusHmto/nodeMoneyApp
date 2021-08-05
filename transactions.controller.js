"use strict";

var response = require("./res");
var connection = require("./connection");

exports.index = function (req, res) {
  response.ok("App successfully runned!", res);
};

//show all transactions
exports.showAllTrx = function (req, res) {
  connection.query(
    "SELECT transactions.id_transaction, transactions.trxId, DATE_FORMAT(months.month,'%M %Y') AS month, DATE_FORMAT(days.day,'%a %d') AS day, transactions.type, DATE_FORMAT(transactions.date,'%a %d-%m-%y') as date, transactions.category, transactions.amount, transactions.note from months JOIN days JOIN transactions WHERE months.id_month = days.id_month AND days.id_transaction = transactions.id_transaction ORDER BY transactions.id_transaction DESC",
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//show transactions by id
exports.showTrx = function (req, res) {
  let id = req.params.id;

  connection.query(
    "SELECT * FROM transactions WHERE trxId = ?",
    [id],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//add new transaction
exports.addTrx = function (req, res) {
  const { id_transaction, trxId, type, category, amount, note } = req.body;
  var date = new Date().toString();

  connection.query(
    "INSERT INTO transactions (id_transaction, trxId, date, type, category, amount, note) VALUES(?,?,?,?,?)",
    [id_transaction, trxId, date, type, category, amount, note],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        response.ok("Successfully added transaction!", res);
      }
    }
  );
};

//edit current transaction
exports.editTrx = function (req, res) {
  const { trxId, date, type, category, amount, note } = req.body;

  connection.query(
    "UPDATE transactions SET date=?, trxId=?, type=?, category=?, amount=?, note=? WHERE trxId=?",
    [date, type, category, amount, note, trxId],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        response.ok("Successfully edited transaction " + trxId, res);
      }
    }
  );
};

//delete transaction by id
exports.deleteTrx = function (req, res) {
  const { trxId } = req.body;

  connection.query(
    "DELETE FROM transactions WHERE trxId=?",
    [trxId],
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        response.ok("Successfully deleted transaction " + trxId, res);
      }
    }
  );
};

//show current month transactions
exports.showCurMonthTrx = function (req, res) {
  connection.query(
    "SELECT transactions.id_transaction, transactions.trxId, DATE_FORMAT(months.month,'%M %Y') AS month, DATE_FORMAT(days.day,'%a %d') AS day, transactions.type, DATE_FORMAT(transactions.date,'%a %d-%m-%y') as date, transactions.category, transactions.amount, transactions.note from months JOIN days JOIN transactions WHERE months.id_month = days.id_month AND days.id_transaction = transactions.id_transaction AND MONTH(months.month) = Month(NOW()) ORDER BY transactions.id_transaction DESC",
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        response.ok(rows, res);
      }
    }
  );
};

//show previous month transactions
exports.showLastMonthTrx = function (req, res) {
  connection.query(
    "SELECT transactions.id_transaction, transactions.trxId, DATE_FORMAT(months.month,'%M %Y') AS month, DATE_FORMAT(days.day,'%a %d') AS day, transactions.type, DATE_FORMAT(transactions.date,'%a %d-%m-%y') as date, transactions.category, transactions.amount, transactions.note from months JOIN days JOIN transactions WHERE months.id_month = days.id_month AND days.id_transaction = transactions.id_transaction AND MONTH(months.month) = MONTH(NOW() - INTERVAL 1 MONTH) ORDER BY transactions.id_transaction DESC",
    function (err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        response.ok(rows, res);
      }
    }
  );
};
