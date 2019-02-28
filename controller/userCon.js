var userModel=require('./../model/userModel.js');

var userCon={
    Duserpage:function (req,res) {
        userModel.Duserpage(req.query.page,function (err,data) {
            if(err){
                console.log('数据库错误')
            }else{
                var arr=data.slice((req.query.page-1)*5,5*req.query.page);
                for(var i=0;i<arr.length;i++){
                    if(arr[i].u_img==null){
                        arr[i].u_img='./../../static/head.jpg'
                    }
                }
                res.send({"data":arr});
            }
        })
    },
    Duserbtn:function (req,res) {
        userModel.Duserbtn(function (err,data) {
            if(err){
                console.log('数据库错误')
            }else{
                res.send({long:Math.ceil(data[0].num/5)});
            }
        })
    },
    Duserreset:function (req,res) {
        userModel.Duserreset(req.query.id,function (err,data) {
            if(err){
                console.log('数据库错误')
            }else{

            }
        })
    },
    Dusersearch:function (req,res) {
        userModel.Dusersearch(req.query.str,req.query.page,function (err,data) {
            if(err){
                console.log('数据库错误')
            }else{
                var arr=data.slice((req.query.page-1)*5,5*req.query.page);
                for(var i=0;i<arr.length;i++){
                    if(arr[i].u_img==null){
                        arr[i].u_img='./../../static/head.jpg'
                    }
                }
                res.send({"data":arr,"long":Math.ceil(data.length/5)});
            }
        })
    }
}

module.exports=userCon;