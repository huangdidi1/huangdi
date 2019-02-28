/**
 * Created by Administrator on 2018/12/5.
 */
var express=require('express');
var communityController=require('../controller/communityController.js');
var myRoute=express.Router();
myRoute.route('/release').post(communityController.release);
myRoute.route('/load').post(communityController.load);
myRoute.route('/inload').post(communityController.inload);
myRoute.route('/discuss').post(communityController.discuss);
myRoute.route('/reply').post(communityController.reply);
myRoute.route('/reply1').post(communityController.reply1);
myRoute.route('/rep').post(communityController.rep);
myRoute.route('/uname').get(communityController.uname);
myRoute.route('/del').get(communityController.del);
myRoute.route('/del2').get(communityController.del2);
myRoute.route('/collect').post(communityController.collect);
myRoute.route('/zan').post(communityController.zan);
myRoute.route('/iscollect').post(communityController.iscollect);
myRoute.route('/iszan').post(communityController.iszan);
myRoute.route('/uncollect').post(communityController.uncollect);
myRoute.route('/unzan').post(communityController.unzan);
module.exports=myRoute;