/**
 * New node file
 */

var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'welcome',
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

