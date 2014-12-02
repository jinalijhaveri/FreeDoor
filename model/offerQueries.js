
var mysql = require('mysql2');
var debCon = require('./dbConnection');

exports.addOffer = function(callback,Offer){
	console.log('Inside: OFFERqUERIES.js');
	var query = "INSERT INTO offer(`buyingQty`,`offeredDetails`,`buyerStatus`,`sellerStatus`,"+
		"`offerExpiry`,`productId`,`buyerId`,`lastModified`) VALUES (?,?,?,?,?,?,?,NOW());";
console.log("my query : "+ query);
	var connection = debCon.getCon();
	
	connection.query(query,[Offer.buyingQty,Offer.offeredDetails,Offer.buyerStatus,Offer.sellerStatus,Offer.offerExpiry,
		Offer.productId,Offer.buyerId], function(err, rows) {
			//connection.release();
			callback(err,rows);
	});
};


exports.getoffers = function(callback,productId){
	console.log('Inside getoffers : OFFERqUERIES.js');
	var query = 'select * from offer where productId = ?';
	var connection = debCon.getCon();
	
	connection.query(query,[productId], function(err, rows) {
			//connection.release();
			callback(err, rows);
	});
			
};