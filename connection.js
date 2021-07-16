var mysql = require('mysql');

//db connection
const conn = mysql.createConnection({
   host: 'localhost',
   port: '3307',
   user: 'root',
   password: '',
   database: 'dbmoneyapp'
});

conn.connect((err)=>{
    if(err) throw err;
    console.log('MySQL connected!');
});

module.exports = conn;