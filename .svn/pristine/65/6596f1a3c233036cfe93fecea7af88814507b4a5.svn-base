var registerModel=require('./../model/registerModel.js');

var registerCon={
    Dname:function (req,res) {
        registerModel.Dname(req.query.name,function (err,data) {
            if(err){
                console.log('数据库错误')
            }else{
                res.send({"data":data.length});
            }
        })
    },
    Duser:function (req,res) {
        registerModel.Duser(req.query.user,function (err,data) {
            if(err){
                console.log('数据库错误')
            }else{
                res.send({"data":data.length});
            }
        })
    },
    Dsubmit:function (req,res) {
        registerModel.Dsubmit(req.body.name,req.body.user,req.body.pass,req.body.phone,function (err,data) {
            if(err){
                console.log('数据库错误')
            }else{
                //req.session.Id=data.insertId;
                //req.session.name=req.body.name;
                //console.log(req.session.Id,req.session.name);
                res.send({"error":0,"id":data.insertId});
            }
        })
    }
}

module.exports=registerCon;