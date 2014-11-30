

var dbConn = require('../model/dbConnection');
//var categoryQuery = require('../models/categoryQuery');

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

exports.getCategories = function(req, res){
	console.log('Inside: getCategories category.js');
	dbConn.getCategories(function(err,rows){
		var resposnse = {'categories' : rows};
		console.log(JSON.stringify(resposnse));

		 res.send(JSON.stringify(resposnse));
	});
	
};


exports.addCategories = function(req, res){

	console.log('Inside: addCategories category.js');
	var categoryName = req.body.categoryName;

	dbConn.addCategories(function(err,rows){
		if(err){
			console.log(err);
		}else{
			console.log(JSON.stringify(rows));
			var resposnse = {categoryId : rows.insertId,categoryName : categoryName };
			console.log("Inserted Category:  "+ JSON.stringify(resposnse));

			 res.send(JSON.stringify(resposnse));
		}
	},categoryName);
	
};