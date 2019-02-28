var express=require('express');
var shoplistController=require('./../controller/shoplistController.js');

var myRouter=express.Router();


myRouter.route('/getGoodsList').get(shoplistController.getGoodsList);
myRouter.route('/getGoodsPrice').get(shoplistController.getGoodsPrice);
myRouter.route('/getGoodsTime').get(shoplistController.getGoodsTime);
myRouter.route('/getGoodsType').get(shoplistController.getGoodsType);
myRouter.route('/getGoodsSearch').get(shoplistController.getGoodsSearch);
myRouter.route('/getGoodsDetail').get(shoplistController.getGoodsDetail);
myRouter.route('/getThisDetail').get(shoplistController.getThisDetail);
myRouter.route('/getComment').get(shoplistController.getComment);
myRouter.route('/getCommentImg').get(shoplistController.getCommentImg);
myRouter.route('/addCart').get(shoplistController.addCart);
myRouter.route('/getCart').get(shoplistController.getCart);
myRouter.route('/addOrder').get(shoplistController.addOrder);
myRouter.route('/getOrder').get(shoplistController.getOrder);
myRouter.route('/getAddress').get(shoplistController.getAddress);
myRouter.route('/payOrder').get(shoplistController.payOrder);
myRouter.route('/addPay').get(shoplistController.addPay);
myRouter.route('/delCart').get(shoplistController.delCart);
myRouter.route('/delInventory').get(shoplistController.delInventory);
myRouter.route('/delSaleVolume').get(shoplistController.delSaleVolume);
myRouter.route('/noPay').get(shoplistController.noPay);
myRouter.route('/delCartGoods').get(shoplistController.delCartGoods);
myRouter.route('/getGoodsInfo').post(shoplistController.getGoodsInfo);
myRouter.route('/changeGoodsInfo').post(shoplistController.changeGoodsInfo);
myRouter.route('/addGoods').post(shoplistController.addGoods);
myRouter.route('/addGoodsSpec').post(shoplistController.addGoodsSpec);
myRouter.route('/addGoodsShow').post(shoplistController.addGoodsShow);
myRouter.route('/getGoods').get(shoplistController.getGoods);
myRouter.route('/addGoodsDetail').post(shoplistController.addGoodsDetail);
myRouter.route('/getGoodsData').post(shoplistController.getGoodsData);
myRouter.route('/addSpecImg').post(shoplistController.addSpecImg);
myRouter.route('/checkCol').get(shoplistController.checkCol);
myRouter.route('/addCol').get(shoplistController.addCol);
myRouter.route('/delCol').get(shoplistController.delCol);
myRouter.route('/seleCart').get(shoplistController.seleCart);
// myRouter.route('/upLoadImg').post(shoplistController.upLoadImg);


module.exports=myRouter;