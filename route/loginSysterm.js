/**
 * Created by Administrator on 2019/1/2.
 */
var express=require('express');
var loginSystermCon=require('../controller/loginSysterm.js');
var myRoute=express.Router();
myRoute.route('/loginSysterm').post(loginSystermCon.loginSysterm);
myRoute.route('/findUser').post(loginSystermCon.findUser);
myRoute.route('/setPass').post(loginSystermCon.setPass);
myRoute.route('/uploads').post(loginSystermCon.uploads);
module.exports=myRoute;