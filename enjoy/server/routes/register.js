var express = require('express');
var router = express.Router();
var Usermodel = require('../model/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/',function(req,res){
	var isrep = true;
	Usermodel.find({
		phone:req.body.phone
	},function(err,data){
		if(data.length === 0){
				Usermodel.create({
					phone:req.body.phone,
					password:req.body.pass
		},function(err,data){
				res.send(isrep)
		})
		}else{
			isrep = false;
			res.send(isrep);
		}
		
	})
	
})
module.exports = router;
