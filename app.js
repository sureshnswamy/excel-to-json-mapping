'use strict';
var express = require('express'); 
var app = express(); 
var bodyParser = require('body-parser');
var multer = require('multer');
var xlsxtojson = require('convert-excel-to-json');
var jsonfile = require('jsonfile');

app.use(bodyParser.json());  

var storage = multer.diskStorage({ //multers disk storage settings
	destination: function (req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function (req, file, cb) {
		var monthNames = ['JAN', 'FEB', 'MAR', 'APR','MAY', 'JUN','JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
		var today = new Date();
		var dd = today.getDate();
		var mm = monthNames[today.getMonth()+1];
		var yyyy = today.getFullYear();
		var hh = today.getHours();
		var mn = today. getMinutes();
		var ss = (today.getSeconds()<10?'0':'') +today.getSeconds();
		today = dd +''+ mm +''+yyyy+''+hh+''+mn+''+ss;
		cb(null, file.fieldname + '-' + today + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
	}
});

var upload = multer({ //multer settings
	storage: storage,
	fileFilter : function(req, file, callback) { //file filter
		if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
			return callback(new Error('Wrong extension type'));
		}
		callback(null, true);
	}
}).single('file');

/** API path that will upload the files */
app.post('/upload', function(req, res) {
	var exceltojson;
	upload(req,res,function(err){
		if(err){
			res.json({error_code:1,err_desc:err});
			return;
		}
		/** Multer gives us file info in req.file object */
		if(!req.file){
			res.json({error_code:1,err_desc:'No file passed'});
			return;
		}
		exceltojson = xlsxtojson;
		//console.log('Here is the  ', req.file.path);
		//
		// XLSX to JSON >>>>>>>>>>>>>>>>
		// 
		var result = exceltojson({
			sourceFile: req.file.path,
		});
		//console.log('conversion successful check output.json');
		var file = 'output.json';
		//
		//use jsonfile module to store file onto db >>>
		//
		jsonfile.writeFile(file, result, function (err) {
			return err;//console.error(err)
		});
		res.json({ data: result});
	});
							
});
	
app.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

app.listen('3000', function(){
	console.log('running on 3000...');
});