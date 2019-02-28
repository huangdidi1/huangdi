/**
 * Created by Administrator on 2019/1/2.
 */
var loginSystermModel=require('../model/loginSysterm.js');
var loginSystermCon={
    loginSysterm:function (req,res) {
        loginSystermModel.loginSystermM(req.body.users,req.body.pass,function (err,data) {
            if(err){
                console.log('数据库错误'+err)
            }else{
                res.send({error:0,data:data})
            }
        })
    },
    findUser:function (req,res) {
        loginSystermModel.findUser(req.body.u_id,function (err,data) {
            if(err){
                console.log('数据库错误'+err)
            }else{
                res.send({error:0,data:data})
            }
        })
    },
    uploads:function (req,res) {
        loginSystermModel.uploads(req.body.u_id,req.body.img,function (err,data) {
            if(err){
                console.log('数据库错误'+err)
            }else{
                res.send({error:0,data:data})
            }
        })
    },
    setPass:function (req,res) {
        loginSystermModel.setPass(req.body.u_id,req.body.oldpass,function (err,data) {
            if(err){
                console.log('数据库错误'+err)
            }else{
                if(data.length){
                    loginSystermModel.setNewPass(req.body.u_id,req.body.newpass,function (err,data1) {
                        if(err){
                            console.log('数据库错误'+err)
                        }else{
                            if(data1.changedRows){
                                res.send({error:0})
                            }else{
                                res.send({error:2})
                            }
                        }
                    })
                }else{
                    res.send({error:1})
                }

            }
        })
    }
};
module.exports=loginSystermCon;