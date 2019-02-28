//引入
var express=require('express');
var registerCon=require('./../controller/registerCon.js');

//定义的模块
var myRouter=express.Router();

myRouter.route('/Dname').get(registerCon.Dname);
myRouter.route('/Duser').get(registerCon.Duser);
myRouter.route('/Dsubmit').post(registerCon.Dsubmit);

//导出模块
module.exports=myRouter;