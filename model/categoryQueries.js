
var mysql = require('mysql2');
var debCon = require('./dbConnection');


exports.getCategories = function(callback){
	var query = 'select * from category';
	var connection = debCon.getCon();
	console.log('Inside: dbConnection.js');
	connection.query(query, function(err, rows) {
			//connection.release();
			callback(err, rows);
	});
			
};

exports.addCategories = function(callback,categoryName){
	var query = "INSERT INTO category (`categoryName`) VALUES('"+ categoryName +"');";
	var connection = debCon.getCon();
	console.log('Inside: dbConnection.js');
	connection.query(query, function(err, rows) {
			//connection.release();
			callback(err,rows);
	});
};
