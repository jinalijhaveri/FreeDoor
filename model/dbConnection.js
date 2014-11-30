/**
 * New node file
 */

var mysql = require('mysql');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'jerrymouse',
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

exports.updateProduct = function(callback,productId,categoryId,productName,quantity,expectedOffer,description,expiryDate,isValid,newCategoryId){
	var query = 'update product set productName="'+productName+'" ,quantity='+quantity+' ,expectedOffer="'+expectedOffer+'" ,productDesc="'+description+'"	,productExpiryDate="'+expiryDate+'" ,isValid='+isValid+' ,lastUpdated=now(),categoryId='+newCategoryId+' where productId='+productId+' and categoryId='+categoryId;
	console.log("Update Product Query : "+query);
	connection.query(query, function(err, rows) {
			
			callback(err, rows);
	});
			
}



