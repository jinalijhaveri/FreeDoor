/**
 * New node file
 */

var mysql = require('mysql2');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '1202',
	port : '3306',
	database : 'freedoor'
});

exports.getProductDetails = function(callback,productId,categoryId){
	var query = 'select * from product where productId='+productId+' and categoryId='+categoryId;
	
	connection.query(query, function(err, rows) {
			
			callback(err, rows);
	});
			
}

exports.deleteProduct = function(callback,productId,categoryId){
	var query = 'update product set isValid=0 where productId='+productId+' and categoryId='+categoryId;
	
	connection.query(query, function(err, rows) {
			
			callback(err, rows);
	});
			
}

exports.getCategories = function(callback){
	var query = 'select * from category';
	console.log('Inside: dbConnection.js');
	connection.query(query, function(err, rows) {
			connection.release();
			callback(err, rows);
	});
			
}

exports.addCategories = function(callback,categoryName){
	var query = "INSERT INTO category (`categoryId`,`categoryName`) VALUES(101,'"+ categoryName +"');";
	console.log('Inside: dbConnection.js');
	connection.query(query, function(err, rows) {
			//connection.release();
			callback(err, rows);
	});
			
}

