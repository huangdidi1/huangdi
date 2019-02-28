/**
 * Created by Administrator on 2018/12/6.
 */
var express=require('express');
var classController=require('./../controller/classController.js');

//定义的模块
var myRouter=express.Router();
//添加数据
myRouter.route('/addData').get(classController.addData);
//删除数据
myRouter.route('/dataDelete').get(classController.dataDelete);
//查询三表拼接的数据
myRouter.route('/classdata').get(classController.classdata);
// 获取三表拼接所有数据
myRouter.route('/classtypeAll').get(classController.classtypeAll);
// 获取三表拼接的条数
myRouter.route('/classtypeCount').get(classController.classtypeCount);



//1.classtype1页面加载时
myRouter.route('/classtype-onload1').get(classController.onload1);
myRouter.route('/classtype-onload2').get(classController.onload2);
//2.classtype1 点击动作分类/点击更多分类
myRouter.route('/classtype1-1').get(classController.type11);
//  classtype1 点击动作库
myRouter.route('/classtype1-2').get(classController.type12);
//2.classtype2 点击模块//3.classtype3 点击模块
myRouter.route('/classtype2').get(classController.type2);
//用id查表一的数据
myRouter.route('/type1data').get(classController.type1data);
//用id查表2的数据
myRouter.route('/type2data').get(classController.type2data);
//用id查表3的数据
myRouter.route('/type3data').get(classController.type3data);
//收藏
 myRouter.route('/collect').get(classController.collect);

//取消收藏
 myRouter.route('/nocollect').get(classController.nocollect);
//获取
myRouter.route('/selectcollect').get(classController.selectcollect);
//导出模块
module.exports=myRouter;