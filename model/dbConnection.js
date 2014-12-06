/**
 * New node file
 */

var mysql = require('mysql2');
var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',

	password : 'jerrymouse',

	port : '3306',
	database : 'freedoor'
});

function getCon() {
	var connection = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'jerrymouse',
		port : '3306',
		database : 'freedoor'
	});
	return connection;
}

exports.getCon = getCon;

exports.getProductDetails = function(callback, productId, categoryId) {
	var query = 'select * from product where productId=' + productId
			+ ' and categoryId=' + categoryId;

	connection.query(query, function(err, rowss) {

		callback(err, rowss);
	});

}

exports.deleteProduct = function(callback, productId, categoryId) {
	var query = 'update product set isValid=0 where productId=' + productId
			+ ' and categoryId=' + categoryId;

	connection.query(query, function(err, rowss) {

		callback(err, rowss);
	});

}

exports.getCategories = function(callback) {
	var query = 'select * from category';
	console.log('Inside: dbConnection.js');
	connection.query(query, function(err, rowss) {
		connection.release();
		callback(err, rowss);
	});

}

exports.addCategories = function(callback, categoryName) {
	var query = "INSERT INTO category (`categoryId`,`categoryName`) VALUES(101,'"
			+ categoryName + "');";
	console.log('Inside: dbConnection.js');
	connection.query(query, function(err, rowss) {
		// connection.release();

		callback(err, rowss);
	});
}

exports.updateProduct = function(callback, productId, categoryId, productName,
		quantity, expectedOffer, description, expiryDate, isValid,
		newCategoryId) {
	var query = 'update product set productName="' + productName
			+ '" ,quantity=' + quantity + ' ,expectedOffer="' + expectedOffer
			+ '" ,productDesc="' + description + '"	,productExpiryDate="'
			+ expiryDate + '" ,isValid=' + isValid
			+ ' ,lastUpdated=now(),categoryId=' + newCategoryId
			+ ' where productId=' + productId + ' and categoryId=' + categoryId;
	console.log("Update Product Query : " + query);
	connection.query(query, function(err, rowss) {
		callback(err, rowss);
	});

}

exports.getOfferHistory = function(callback, offerId) {
	var query = 'select * from offerhistory where offerId=' + offerId;
	console.log("Get Offer History : " + query);
	connection.query(query, function(err, rowss) {
		callback(err, rowss);
	});

}

exports.insertProduct = function(callback, productName, quantity, userId,
		expectedOffer, productDesc, productExpiryDate, isValid, categoryId,
		lastUpdated) {

	var query = "INSERT INTO `freedoor`.`product` (`productName`, `quantity`, `userId`, `expectedOffer`, `productDesc`, `productExpiryDate`, `isValid`, `categoryId`,'lastUpdated') VALUES ('"
			+ productName
			+ "', '"
			+ quantity
			+ "', '"
			+ userId
			+ "', '"
			+ expectedOffer
			+ "', '"
			+ productDesc
			+ "', '"
			+ productExpiryDate
			+ "', '"
			+ isValid
			+ "', '"
			+ categoryId
			+ "', '"
			+ lastUpdated
			+ "')";
	connection.query(query, function(err, rowss) {
		callback(err, rowss);
	})
}

exports.updateOffer = function(offerId, buyingQty, offeredDetails, buyerStatus,
		sellerStatus, offerExpiry, productId, buyerId, lastModified,
		categoryId, callback) {
	// var query="Update offer set buyingQty='"+buyingQty+"',
	// offeredDetails='"+offeredDetails+"', buyerStatus='"+buyerStatus+"',
	// sellerStatus='"+sellerStatus+"', offerExpiry='"+offerExpiry+"',
	// productId='"+productId+"',
	// buyerId='"+buyerId+"',lastModified='"+lastModified+"' where
	// offerId='"+offerId+"' "
	var query = "select * from offer where offerId=" + offerId;
	var buyQtybit = 1, offerDetailsbit = 1, buyerstatbit = 1, sellerstatbit = 1, offerexpirybit = 1, productidbit = 1, buyeridbit = 1, lastmodibit = 1, catidbit = 1;
	connection
			.query(
					query,
					function(err, rows) {
						if (err) {
							console.log(err);
						} else {
							//console.log(rows[0].offerId);
							var query1 = "Update offer set offerId=" + offerId;
							var added = 1;
							if (!err) {
								if (rows != null) {
									if (rows[0].offerExpiry == offerExpiry) {
										offerexpirybit = 0;
									} else {
										query1 += ", ";
										query1 += "offerExpiry=" + offerExpiry;
										added = 1;
										query2 = "insert into offerHistory (modified,lastModified,offerId) values ('offerExpiry changed from "
												+ rows[0].offerExpiry
												+ " to "
												+ offerExpiry
												+ "',NOW(),'"
												+ offerId + "')";
										connection.query(query2, function(err,
												rows) {
											if (err) {
												console.log(err
														+ " offerexpiry");
											}
										})
									}
									if (rows[0].buyingQty == buyingQty) {
										buyQtybit = 0;
									} else {
										query1 += ", ";
										query1 += "buyingQty='" + buyingQty
												+ "'";
										added = 1;
										query2 = "insert into offerHistory (modified,lastModified,offerId) values ('buyingQty changed from "
												+ rows[0].buyingQty
												+ " to "
												+ buyingQty
												+ "',NOW(),'"
												+ offerId + "')";
										connection.query(query2, function(err,
												rows) {
											if (err) {
												console.log(err + " buyqty");
											}
										})
									}
									if (rows[0].offeredDetails == offeredDetails) {
										offerDetailsbit = 0;
									} else {
										if (added == 1) {
											query1 += ", ";
										}
										query1 += "offeredDetails='"
												+ offeredDetails + "'";
										added = 1;
										query2 = "insert into offerHistory (modified,lastModified,offerId) values ('offeredDetails changed from "
												+ rows[0].offeredDetails
												+ " to "
												+ offeredDetails
												+ "',NOW(),'" + offerId + "')";
										connection.query(query2, function(err,
												rows) {
											if (err) {
												console.log(err + " dtls");
											}
										})
									}
									if (rows[0].buyerStatus == buyerStatus) {
										buyerstatbit = 0;
									} else {
										query1 += ", ";
										query1 += "buyerStatus='" + buyerStatus
												+ "'";
										added = 1;
										query2 = "insert into offerHistory (modified,lastModified,offerId) values ('buyerStatus changed from "
												+ rows[0].buyerStatus
												+ " to "
												+ buyerStatus
												+ "',NOW(),'"
												+ offerId + "')";
										connection.query(query2, function(err,
												rows) {
											if (err) {
												console.log(err + "buystat");
											}
										})
									}
									if (rows[0].sellerStatus == sellerStatus) {
										sellerstatbit = 0;
									} else {
										query1 += ", ";
										query1 += "sellerStatus='"
												+ sellerStatus + "'";
										added = 1;
										query2 = "insert into offerHistory (modified,lastModified,offerId) values ('sellerStatus changed from "
												+ rows[0].sellerStatus
												+ " to "
												+ buyingQty
												+ "',NOW(),'"
												+ offerId + "')";
										connection.query(query2, function(err,
												rows) {
											if (err) {
												console.log(err + " selstat");
											}
										})
									}
									if (rows[0].productId == productId) {
										productidbit = 0;
									} else {
										query1 += ", "
										query1 += "productId='" + productId
												+ "'";
										added = 1;
										query2 = "insert into offerHistory (modified,lastModified,offerId) values ('productId changed from "
												+ rows[0].productId
												+ " to "
												+ productId
												+ "',NOW(),'"
												+ offerId + "')";
										connection.query(query2, function(err,
												rows) {
											if (err) {
												console.log(err + " proId");
											}
										})
									}
									if (rows[0].buyerId == buyerId) {
										buyeridbit = 0;
									} else {
										query1 += ", "
										query1 += "buyerId='" + buyerId + "'";
										added = 1;
										query2 = "insert into offerHistory (modified,lastModified,offerId) values ('buyerId changed from "
												+ rows[0].buyerId
												+ " to "
												+ buyerId
												+ "',NOW(),'"
												+ offerId + "')";
										connection.query(query2, function(err,
												rows) {
											if (err) {
												console.log(err + " buyId");
											}
										})
									}

									query1 += ", ";
									query1 += "lastModified='" + lastModified
											+ "'";
									added = 1;

									/*
									 * if(rows[0].categoryId==categoryId){
									 * catidbit=0; }else{ query1+=", "
									 * query1+="categoryId='"+categoryId+"'";
									 * added=1; query2="insert into offerHistory
									 * (modified,lastModified,offerId) values
									 * ('categoryId changed from
									 * "+rows[0].categoryId+" to
									 * "+categoryId+"',NOW(),'"+offerId+"')";
									 * connection.query(query2,function(err,rows){
									 * if(err){ console.log(err); } }) }
									 */
									query1 += " where offerId=" + offerId;

									connection
											.query(
													query1,
													function(err, rows) {
														query = "select * from offer where offerId="
																+ offerId;
														connection
																.query(
																		query,
																		function(
																				err,
																				rows1) {

																			comment = "select * from comment where offerId="
																					+ offerId;
																			connection
																					.query(
																							comment,
																							function(
																									err,
																									CommentRows) {
																								// console.log(CommentRows);
																								console
																										.log("Responding")
																								callback(
																										err,
																										rows1,
																										CommentRows);
																							});
																		});
													})
								}
							}
						}
					})


}

exports.deleteOffer = function(offerId, callback) {
	console.log("Umm");
	deleteofferHistory = "delete from offerHistory where offerId="	+ offerId;
	connection.query(deleteofferHistory, function(err, rows) {
		if (err) {
			console.log(err);
		}
		if (!err) {
			query = "delete from offer where offerId=" + offerId;
			connection.query(query, function(err, rows) {
				console.log("here");
				callback(err, rows);
			});
		}
	});

}
