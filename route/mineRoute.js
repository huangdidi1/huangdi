var express=require('express');
var mineCon=require('./../controller/mineController.js');

var myRouter=express.Router();
myRouter.route('/Pfirst').get(mineCon.Pfirst);
myRouter.route('/Pimfor').get(mineCon.Pimfor);
myRouter.route('/Psave').get(mineCon.Psave);
myRouter.route('/Porder').get(mineCon.Porder);
myRouter.route('/Padress').get(mineCon.Padress);
myRouter.route('/Paddadress').get(mineCon.Paddadress);
myRouter.route('/Pdropadress').get(mineCon.Pdropadress);
myRouter.route('/Palteradress').get(mineCon.Palteradress);
myRouter.route('/Pensurealtreadress').get(mineCon.Pensurealtreadress);
myRouter.route('/Pcollectpush').get(mineCon.Pcollectpush);
myRouter.route('/Pcollectvideo').get(mineCon.Pcollectvideo);
myRouter.route('/Porderdetailed').get(mineCon.Porderdetailed);
myRouter.route('/Pdroporder').get(mineCon.Pdroporder);
myRouter.route('/Porderbuy').get(mineCon.Porderbuy);
myRouter.route('/Ppayorder').get(mineCon.Ppayorder);
myRouter.route('/Pcompleteorder').get(mineCon.Pcompleteorder);
myRouter.route('/addPayorder').get(mineCon.addPayorder);
myRouter.route('/Pgetshop').get(mineCon.Pgetshop);
myRouter.route('/Pdelorder').get(mineCon.Pdelorder);
myRouter.route('/Pphoto').get(mineCon.Pphoto);



myRouter.route('/Aorder').get(mineCon.Aorder);
myRouter.route('/Aordernum').get(mineCon.Aordernum);
myRouter.route('/Ashopdetail').get(mineCon.Ashopdetail);
myRouter.route('/Aaddressdetail').get(mineCon.Aaddressdetail);


module.exports=myRouter;