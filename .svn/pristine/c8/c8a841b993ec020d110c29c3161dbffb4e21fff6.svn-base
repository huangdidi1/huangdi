//引入
var express=require('express');
var loginCon=require('./../controller/loginCon.js');

//定义的模块
var myRouter=express.Router();

myRouter.route('/Dphone').get(loginCon.Dphone);
myRouter.route('/Dlogin').post(loginCon.Dlogin);


//导出模块
module.exports=myRouter;