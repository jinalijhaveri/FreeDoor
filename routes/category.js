
var mysql = require('mysql');
var dbCon = require('../model/dbConnection');
var categoryQuery = require('../model/categoryQueries');
var offerQuery = require('../model/offerQueries');
var Offer = require('../modelclasses/Offer');


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
	});

}

exports.postComment = postComment;



var dbConn = require('../model/dbConnection');
//var categoryQuery = require('../models/categoryQuery');


exports.getProductDetails = function(req, res){
	var categoryId = req.params.categoryId;
	var productId = req.params.productId;
	dbConn.getProductDetails(function(err,rows){
		console.log("rows"+rows);
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
	categoryQuery.getCategories(function(err,rows){
		var resposnse = {'categories' : rows};
		console.log(JSON.stringify(resposnse));

		 res.send(JSON.stringify(resposnse));
	});

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


}

exports.getOfferHistory= function(req, res){
	var offerId = req.params.offerId;
	
	dbConn.getOfferHistory(function(err,rows){
		if(rows.length == 0)
			res.send("Not found matching records.");
		else
		 res.send(rows);
	},offerId);

};



exports.addCategories = function(req, res){

	console.log('Inside: addCategories category.js');
	var categoryName = req.body.categoryName;

	categoryQuery.addCategories(function(err,rows){
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


mysql=require('mysql');


exports.createProducts=function(req,res){
	categoryId=req.param('categoryId');
	prodName=req.body.productName.replace("''","");
	quantity=req.body.quantity.replace("''","");
	userId=req.body.userId.replace("''","");
	expectedOffer=req.body.expectedOffer.replace("''","");
	productDesc=req.body.productDesc.replace("''","");
	productExpiryDate=req.body.productExpiryDate.replace("''","");
	isValid=req.body.isValid.replace("''","");
	categoryId=req.body.categoryId.replace("''","");
	lastUpdated=req.body.lastUpdated.replace("''","");
	
	dbCon.insertProduct(function(err,rows){
		console.log(rows);
		res.send(rows);
	},categoryId,quantity,userId,expectedOffer,productDesc,productExpiryDate,isValid,categoryId,lastUpdated);
	
	
	//res.writeHead(200, {"Content-Type": "application/json"});
	var json=JSON.stringify({prodName:prodName,value:"1"});
	console.log(json)
	res.send(json);
}




exports.getProducts=function(req,res){
	console.log("getrProducts called");
	
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



///Adding and retriving offer
/////

exports.addOffer = function (req , res){
	var categoryId = req.param('categoryId');
	var productId = req.param('productId');
	var off =  new Offer(req);
	
	offerQuery.addOffer(function(err,rows){
		if(err){
			console.log(err);
		}else{
			//console.log(JSON.stringify(rows));
			var resposnse = {offerId : rows.insertId,buyingQty : off.buyingQty,offeredDetails : off.offeredDetails,buyerStatus : off.buyerStatus
			,sellerStatus : off.sellerStatus,offerExpiry : off.offerExpiry,productId : off.productId,buyerId : off.buyerId };
			console.log("Inserted offer:  "+ JSON.stringify(resposnse));

			 res.send(JSON.stringify(resposnse));
		}
	},off);
}


