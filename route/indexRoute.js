var express=require('express');
var indexController=require('./../controller/indexController.js');


var myRoute=express.Router();

myRoute.route('/index').get(indexController.getName);
myRoute.route('/Invideo').get(indexController.getVideoMsg);
myRoute.route('/Inshop').get(indexController.getShopMsg);
myRoute.route('/getCommunityMsg').get(indexController.getCommunityMsg);
myRoute.route('/getOrderSum').get(indexController.getOrderSum);
myRoute.route('/getDaliOrder').get(indexController.getDaliOrder);
myRoute.route('/getMonthOrder').get(indexController.getMonthOrder);
myRoute.route('/getWeekOrder').get(indexController.getWeekOrder);
myRoute.route('/getYearOrder').get(indexController.getYearOrder);
myRoute.route('/getUserFang').get(indexController.getUserFang);









module.exports=myRoute;