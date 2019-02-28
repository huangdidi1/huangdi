//引入
var express=require('express');
var userCon=require('./../controller/userCon.js');

//定义的模块
var myRouter=express.Router();

myRouter.route('/Duserpage').get(userCon.Duserpage);
myRouter.route('/Duserbtn').get(userCon.Duserbtn);
myRouter.route('/Duserreset').get(userCon.Duserreset);
myRouter.route('/Dusersearch').get(userCon.Dusersearch);


//导出模块
module.exports=myRouter;