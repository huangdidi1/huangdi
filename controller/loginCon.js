var loginModel=require('./../model/loginModel.js');

var loginCon={
    Dphone:function (req,res) {
        loginModel.Dphone(req.query.phone,function (err,data) {
            if(err){
                console.log('数据库错误')
            }else{
                res.send({"data":data.length});
            }
        })
    },
    Dlogin:function (req,res) {
        loginModel.Dlogin(req.body.user,req.body.pass,function (err,data) {
            if(err){
                console.log('数据库错误')
            }else{
                if(data.length){
                    //req.session.Id=data[0].u_id;
                    //req.session.name=data[0].u_name;
                    //console.log(req.session.Id,req.session.name);
                    res.send({"error":0,"id":data[0].u_id});
                }else{
                    res.send({"error":1});
                }
            }
        })
    }
}

module.exports=loginCon;