//引入
var express=require('express');
var passCon=require('./../controller/passCon.js');

//定义的模块
var myRouter=express.Router();

myRouter.route('/Dnext').get(passCon.Dnext);
myRouter.route('/Dreset').get(passCon.Dreset);


//导出模块
module.exports=myRouter;