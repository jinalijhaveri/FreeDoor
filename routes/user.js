
/*
 * GET users listing.
 */
 var dbCon = require('./dbConnection');


exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.createUser = function(req , res){
	var firstName = req.body.firstName;
	var lastName = req.body.lasttName;
	var emailid = req.body.emailid;
	var mobile = req.body.mobile;

	var con = dbCon.getCon();

	var query = "insert into user (firstName,lastName,emaiId,mobile) values ('"+firstName+"','"+lastName+"','"+emailid+"',"+mobile+")"
	
	con.query(query , function(err , rows){
		if(err){
			console.log("error is : " + err)
		}
		var respose = {userId : rows.insertId, firstName : firstName , lastName : lastName , emaiId : emailid , mobile : mobile };
		//console.log(" response is : " + respose);
		//console.log("json reply is " + JSON.stringify(respose));
		res.send(JSON.stringify(respose));
	})


}