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