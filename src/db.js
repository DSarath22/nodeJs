const mysql=require('mysql');
const dbconfig=mysql.createConnection({
    host:'localhost',
    user:'sarath',
    password:'Passw0rd',
    database:"leave_management"
});
dbconfig.connect();

module.exports = dbconfig;
