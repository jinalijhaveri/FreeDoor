var http = require.http;

function Offer(req){
	this.buyingQty  = req.body.buyingQty;
	this.offeredDetails  = req.body.offeredDetails;
	this.buyerStatus  = req.body.buyerStatus;
	this.sellerStatus  = req.body.sellerStatus;
	this.offerExpiry  = req.body.offerExpiry;
	this.productId  = req.body.productId;
	this.buyerId  = req.body.buyerId;
	//this.comments  = req.body.comments;
	
}

module.exports = Offer;