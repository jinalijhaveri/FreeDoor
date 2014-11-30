

var dbConn = require('../model/dbConnection');

exports.getProductDetails = function(req, res){
	var categoryId = req.params.categoryId;
	var productId = req.params.productId;
	dbConn.getProductDetails(function(err,rows){
		console.log(rows);
		if(rows.length == 0)
			res.send("Not found matching records.");
		else
		 res.send(rows);
	},productId,categoryId);
	
};

exports.deleteProduct = function(req, res){
	var categoryId = req.params.categoryId;
	var productId = req.params.productId;
	dbConn.deleteProduct(function(err,rows){
		console.log(rows);
		 res.send(rows);
	},productId,categoryId);
	
};