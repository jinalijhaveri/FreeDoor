
var mysql = require('mysql');
var dbCon = require('../model/dbConnection');
var categoryQuery = require('../model/categoryQueries');
var offerQuery = require('../model/offerQueries');
var Offer = require('../modelclasses/Offer');
var dbConn = require('../model/dbConnection');

exports.addOffer = function (req , res){
	console.log('Inside: addOffer offerService.js');
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
};

exports.getoffers = function(req, res){
	console.log('Inside: getoffers offerService.js');
	var productId = req.param('productId');
	offerQuery.getoffers(function(err,rows){
		var resposnse = {'offers' : rows};
		console.log(JSON.stringify(resposnse));

		 res.send(JSON.stringify(resposnse));
	},productId);
};


exports.updateOffer=function(req,res){
	console.log("inside put offer");
	var offerId =req.param('offerId');
	var buyingQty=req.body.buyingQty;
	var offeredDetails=req.body.offeredDetails;
	var buyerStatus=req.body.buyerStatus;
	var sellerStatus=req.body.sellerStatus;
	var offerExpiry=req.body.offerExpiry;
	
	var buyerId=req.body.buyerId;
	var lastModified=req.body.lastModified;
	
	var categoryId=req.param('categoryId');
	var productId=req.param('productId');
	dbConn.updateOffer(offerId,buyingQty,offeredDetails,buyerStatus,sellerStatus,offerExpiry,productId,buyerId,lastModified,categoryId,function(err,rows,CommentRows){
		if(err){
			console.log(err+" in ossrvc");
		}
		else{
			makeReply(rows,CommentRows,function(reply){
				res.send(reply);
			})
		}
	});
	
}

makeReply=function(rows,CommentRows,callback){
	reply1={ offerId : rows[0].offerId,  buyingQty : rows[0].buyingQty,  offeredDetails : rows[0].offeredDetails,  buyerStatus : rows[0].buyerStatus,  sellerStatus : rows[0].sellerStatus,  offerExpiry :rows[0].offerExpiry ,  productId : rows[0].productId,  buyerId:rows[0].buyerId ,  lastModified:rows[0].lastModified ,  comments : CommentRows};
		console.log("reply "+JSON.stringify(reply1));
	callback(JSON.stringify(reply1));
}

exports.deleteOffer=function(req,res){
	offerId=req.param('offerId');
	console.log("offerID "+offerId);
	dbConn.deleteOffer(offerId,function(err,rows){
		if(err){
			console.log(err);
		}else{
			console.log("success");
			res.send(rows);
		}
	})
}





