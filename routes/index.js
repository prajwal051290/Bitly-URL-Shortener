
/*
 * GET home page.
 */

var queryExec = require("./queryExecutor");
var ejs = require("ejs");
var crypto = require('crypto');

function index(req, res){

  res.render("index");
}


//This function logs user in facebook.

function login(req, res){
	
	var loginInfo, url, queryString;
	
	console.log("Inside Server's login function...");
	
	loginInfo = req.body;
	url = loginInfo.loginEmail;
		
	var encrypPassword = crypto.createHash('sha1').update(url).digest("hex"); // Encrption of Password
	
	//Check if the Email ID and Password exists in the system.
	
	queryString = "INSERT INTO url_link (long_url, short_url) VALUES ('" + loginInfo.loginEmail + "', '" + encrypPassword + "')";
	
	//queryString = "SELECT email_id FROM users WHERE email_id = '" + loginInfo.loginEmail + "' AND password = '" + loginInfo.loginPass + "'";  
	console.log("Login Query is: "+ queryString);
	
	queryExec.fetchData(function(err,results){
		if(err){
			throw err;
		}
		else 
		{
			console.log("URL Shortened succesfully");
		}	
	},queryString);
	
		
}

exports.index=index;
exports.login=login;