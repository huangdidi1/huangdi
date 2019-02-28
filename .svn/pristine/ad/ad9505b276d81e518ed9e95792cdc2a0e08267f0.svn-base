var passModel=require('./../model/passModel.js');

var passCon={
    Dnext:function (req,res) {
        passModel.Dnext(req.query.user,function (err,data) {
            if(err){
                console.log('数据库错误')
            }else{
                if(data.length){
                    res.send({
                        "error":0,
                        "phone":data[0].u_phone
                    });
                }else{
                    res.send({
                        "error":1
                    });
                }
            }
        })
    },
    Dreset:function (req,res) {
        passModel.Dreset(req.query.phone,req.query.pass,function (err,data) {
            if(err){
                console.log('数据库错误')
            }else{
                res.send({"error":0});
            }

        })
    }
}

module.exports=passCon;