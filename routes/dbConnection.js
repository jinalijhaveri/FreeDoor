var mysql = require('mysql');


function getCon(){
	var connection=mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : 'jerrymouse',
		  port: '3306',
		  database: 'freedoor'
	});
	return connection;
}
	

exports.getCon = getCon;