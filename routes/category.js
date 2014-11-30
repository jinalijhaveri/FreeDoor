
var mysql = require('mysql');
var dbCon = require('./dbConnection');

function postComment(req , res){
	var categoryId = req.param('categoryId');
	var offerId = req.param('offerId');
	var comment = req.body.comment;
	var userId = req.body.userId;
	var con = dbCon.getCon();
	
	var query = "insert into comment (commentDesc,lastUpdated,offerId,userId) values ('"+comment+"',"+'NOW()'+","+offerId+","+userId+")";
	console.log(query);
	con.query(query , function(err , rows){
		
		
		if(err){
			console.log("error is " + err);
		}
		//console.log(JSON.stringify(rows));
		//var temp = JSON.stringify(rows);
		var response = { commentId : rows.insertId  , comment : comment , userId : userId };
		//console.log("response is " + response);

		res.send(JSON.stringify(respose));
		//con.release();
	})

}

exports.postComment = postComment;



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

exports.updateProduct = function(req, res){
	var categoryId = req.params.categoryId;
	var productId = req.params.productId;
	var productName	= req.body.productName;
	var quantity = req.body.quantity;
	var expectedOffer = req.body.expectedOffer;
	var description = req.body.description;
	var expiryDate = req.body.expiryDate;
	var isValid = req.body.isValid;
	var newCategoryId = req.body.categoryId;
	dbConn.updateProduct(function(err,rows){
		console.log(rows);
		 res.send(rows);
	},productId,categoryId,productName,quantity,expectedOffer,description,expiryDate,isValid,newCategoryId);
	
};






mysql=require('mysql');


exports.createProducts=function(req,res){
	prodName=req.body.productName.replace("''","");
	//res.writeHead(200, {"Content-Type": "application/json"});
	var json=JSON.stringify({prodName:prodName,value:"1"});
	console.log(json)
	res.send(json);
}




exports.getProducts=function(req,res){
	
	var connection=mysql.createConnection({
		  host     : 'localhost',
		  user     : 'root',
		  password : 'jerrymouse',
		  port: '3306',
		  database: 'freedoor'
		});
	categoryId=req.param('categoryId');
	
	query="select * from product where categoryId="+categoryId;
	
	category="";
	
	connection.query(query,function(err,rows){
		categoryNameQuery="select categoryName from category where categoryId="+categoryId;
		connection.query(categoryNameQuery,function(err,categ){
			category=categ[0].categoryName;
			console.log(category);
			

			console.log(rows.length);
			responseJson="'{products':[";
			for(i=0;i<rows.length;i++){
				responseJson+="{'productId':'"
				responseJson+=rows[i].productId;
					responseJson+="',"
				responseJson+="'productName':'"
				responseJson+=rows[i].productName;
					responseJson+="',"
				responseJson+="'quantity':'"
					responseJson+=rows[i].quantity;
					responseJson+="',"
				responseJson+="'userId':'"
					responseJson+=rows[i].userId;
					responseJson+="',"
				responseJson+="'expectedOffer':'"
					responseJson+=rows[i].expectedOffer;
					responseJson+="',"
				responseJson+="'productDesc':'"
					responseJson+=rows[i].productDesc;
					responseJson+="',"
				responseJson+="'productExpiryDate':'"
					responseJson+=rows[i].productExpiryDate;
					responseJson+="',"
				responseJson+="'isValid':'"
					if(rows[i].isValid==0){
						responseJson+='0';
					}
					else{
						responseJson+='1';
					}
					responseJson+="',"
				responseJson+="'expectedOffcategoryIder':'"
					responseJson+=rows[i].categoryId;
					responseJson+="',"
				responseJson+="'lastUpdated':'"
					responseJson+=rows[i].lastUpdated;
					responseJson+="'}"
				
			}
			responseJson+="]}";
			
			
			res.render('productListing.ejs',{responseJson:responseJson,category:category});

			
		});
	});

	
}

