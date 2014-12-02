
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