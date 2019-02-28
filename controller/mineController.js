var mineModel=require('./../model/mineModel.js');
var mineCon={
    Pfirst:function(req,res){
        mineModel.Pfirst(req.query.id,function(err,data){
            if(err){
                console.log('数据库错误')
            }else{
                res.send({
                    "name":data[0].u_name,
                    "img":data[0].u_img
                })
            }
        })
    },
    Pimfor:function(req,res){
        mineModel.Pimfor(req.query.id,function(err,data){
            if(err){
                console.log('数据库错误')
            }else{
                res.send({
                    "name":data[0].u_name,
                    "account":data[0].u_account,
                    "pass":data[0].u_pass,
                    "phone":data[0].u_phone,
                    "mail":data[0].u_mail,
                    "sex":data[0].u_sex,
                    "img":data[0].u_img
                })
            }
        })
    },
    Psave:function(req,res){
        mineModel.Psave(req.query.name,req.query.pass,req.query.sex,req.query.phone,req.query.mail,req.query.id,function(err,data){

            if(err){
                console.log('数据库错误')
            }else{
                res.send({"error":0});
            }
        })
    },
    Porder:function(req,res){
        mineModel.Porder(req.query.id,function(err,data){
            if(err){
                console.log('数据库错误')
            }else{
                // console.log(goods,data);
                var goodsInfo = [];
                for(var i=0;i<data.length;i++){
                    goodsInfo.push(data[i]);
                }
                function removeDuplicatedItem(data) {
                    for(var i = 0; i < data.length-1; i++){
                        for(var j = i+1; j < data.length; j++){
                            if(data[i].of_num==data[j].of_num){
                                data.splice(j,1);
                                j--;
                            }
                        }
                    }
                    return data;
                }
                var orderInfo = removeDuplicatedItem(data);
                res.send({
                    "error":0,
                    "goodsInfo":goodsInfo,
                    "orderInfo":orderInfo
                })
            }
        })
    },
    Padress:function(req,res){
        mineModel.Padress(req.query.id,function(err,data){
            if(err){
                console.log('数据库错误')
            }else{
                res.send({
                    "error":0,
                    "data":data
                })
            }
        })
    },
    Paddadress:function(req,res){
        mineModel.Paddadress(req.query.id,req.query.province,req.query.detailed,req.query.name,req.query.phone,function(err,data){
            if(err){
                console.log('数据库错误')
            }else{
                res.send({
                    "error":0
                })
            }
        })
    },
    Pdropadress:function(req,res){
        mineModel.Pdropadress(req.query.id,function(err,data){
            if(err){
                console.log('数据库错误')
            }else{
                res.send({
                    "error":0
                })
            }
        })
    },
    Palteradress:function(req,res){
        mineModel.Palteradress(req.query.id,function(err,data){
            if(err){
                console.log('数据库错误')
            }else{
                res.send({
                    "error":0,
                    "data":data[0]
                })
            }
        })
    },
    Pensurealtreadress:function(req,res){
        mineModel.Pensurealtreadress(req.query.id,req.query.province,req.query.detailed,req.query.name,req.query.phone,function(err,data){
            if(err){
                console.log('数据库错误')
            }else{
                res.send({"error":0})
            }
        })
    },
    Pcollectpush:function(req,res){
        mineModel.Pcollectpush(req.query.id,function(err,data){
            if(err){
                console.log('数据库错误')
            }else{
                var arr=[];
                for(var i=0;i<data.length;i++){
                    arr.push(data[i].p_id);
                }
                var arr1=[];
                var arr2=[];
                var arr3=[];

                mineModel.Pcollectpushs(arr,function (err,datac) {
                    if(err){
                        console.log('数据库错误1'+err)
                    }else{
                        arr1.push(datac)
                    }

                });
                mineModel.Pcollectpushqq(arr,function (err,dataq) {
                    if(err){
                        console.log('数据库错误2'+err)
                    }else{
                        arr2.push(dataq);
                    }
                });
                mineModel.Pcollectpushimg(arr,function (err,datai) {
                    if(err){
                        console.log('数据库错误3'+err)
                    }else{
                        arr3.push(datai)
                    }
                });
                setTimeout(function () {
                    res.send({error:0,datac:arr1,dataq:arr2,datai:arr3})
                },30)
            }
        })
    },
    Pcollectvideo:function(req,res){
        mineModel.Pcollectvideoid(req.query.id,function(err,data){
          if(err){
              console.log(err)
          }else{
              var arr=[];
              for(var i=0;i<data.length;i++){
                  arr.push(data[i].Type3_id);
              }
              var arr1=[];
              mineModel.Pcollectvideo(arr,function (err,data1) {
                  if(err){
                      console.log('数据库错误1'+err)
                  }else{
                      arr1.push(data1)
                  }
              });
              setTimeout(function () {
                  res.send({error:0,data:arr1})
              },30)
          }
        });
    },
    Porderdetailed:function(req,res){
        mineModel.Porderdetailed(req.query.id,function(err,data){
            if(err){
                console.log('数据库错误')
            }else{
                res.send({
                    "error":0,
                    "data":data
                })
            }
        })
    },
    Pdroporder:function(req,res){
        console.log(req.query.num)
        mineModel.Pdroporder(req.query.num,function(err,data){
            if(err){
                console.log('数据库错误')
            }else{
                res.send({
                    "error":0
                })
            }
        })
    },
    /*支付*/
    Porderbuy:function(req,res){
        console.log(req.query.id)
        mineModel.Porderbuy(req.query.id,function(err,data){
            if(err){
                console.log('数据库错误')
            }else{
                mineModel.Porderbuy2(req.query.id,function(err,data1){
                    if(err){
                        console.log('数据库错误')
                    }else{
                        mineModel.Porderbuy3(req.query.id,function(err,data2){
                            if(err){
                                console.log('数据库错误')
                            }else{
                                res.send({error:0})
                            }
                        })
                    }
                })
            }
        })
    },
    Ppayorder:function(req,res){
        mineModel.Ppayorder(req.query.id,function(err,data){
            // console.log(req.query)
            if(err){
                console.log('数据库错误')
            }else{
                var goodsInfo1 = [];
                for(var i=0;i<data.length;i++){
                    goodsInfo1.push(data[i]);
                }
                function removeDuplicatedItem(data) {
                    for(var i = 0; i < data.length-1; i++){
                        for(var j = i+1; j < data.length; j++){
                            if(data[i].of_num==data[j].of_num){
                                data.splice(j,1);
                                j--;
                            }
                        }
                    }
                    return data;
                }
                var orderInfo1 = removeDuplicatedItem(data);
                // res.send({error:0});
                res.send({
                    "error":0,
                    "goodsInfo1":goodsInfo1,
                    "orderInfo1":orderInfo1
                });
            }
        })
    },
    addPayorder:function(req,res){
        mineModel.addPayorder(req.query.id,function(err,data) {
            if (err) {
                console.log('数据库错误');
            } else {
                mineModel.addPayorderSuc(req.query.id, function (err, data) {
                    if (err) {
                        console.log('数据库错误');
                    } else {
                        res.send({error:0})
                    }
                })
            }
        })
    },
    Pgetshop:function(req,res){
        mineModel.Pgetshop(req.query.id,function(err,data) {
            if (err) {
                console.log('数据库错误');
            } else {
                mineModel.PgetshopSuc(req.query.id, function (err, data) {
                    if (err) {
                        console.log('数据库错误');
                    } else {
                        res.send({error:0})
                    }
                })
            }
        })
    },
    Pcompleteorder:function(req,res){
        mineModel.Pcompleteorder(req.query.id,function(err,data){
            if(err){
                console.log('数据库错误')
            }else{

                var goodsInfo2 = [];
                for(var i=0;i<data.length;i++){
                    goodsInfo2.push(data[i]);
                }
                function removeDuplicatedItem(data) {
                    for(var i = 0; i < data.length-1; i++){
                        for(var j = i+1; j < data.length; j++){
                            if(data[i].of_num==data[j].of_num){
                                data.splice(j,1);
                                j--;
                            }
                        }
                    }
                    return data;
                }
                var orderInfo2 = removeDuplicatedItem(data);
                // res.send({error:0});
                res.send({
                    "error":0,
                    "goodsInfo2":goodsInfo2,
                    "orderInfo2":orderInfo2
                });
            }
        })
    },
    Pdelorder:function(req,res){
        mineModel.Pdelorder(req.query.id,function(err,data) {
            if (err) {
                console.log('数据库错误');
            }  else {
                res.send({error: 0})
            }
        })
    },
    Pphoto:function(req,res){
        mineModel.Pphoto(req.query.id,req.query.src,function(err,data){
            if(err){
                console.log('数据库错误')
            }else {
                res.send({"error":0});
            }
        })
    },

    Aorder:function(req,res){
        var datam = [];
        mineModel.Aorder1(req.query.id,function(err,data){
            if(err){
                console.log('Aorder1错误')
            }else{
                console.log('Aorder1数据库成功');
                for(var i=0;i<data.length;i++){
                    datam.push(data[i])
                }
            }
        });
        mineModel.Aorder2(req.query.id,function(err,data){
            if(err){
                console.log('Aorder2错误')
            }else{
                console.log('Aorder2数据库成功')
                for(var i=0;i<data.length;i++){
                    datam.push(data[i])
                }

            }
        });
        mineModel.Aorder3(req.query.id,function(err,data){
            if(err){
                console.log('Aorder3错误')
            }else{
                console.log('Aorder3数据库成功')
                for(var i=0;i<data.length;i++){
                    datam.push(data[i])
                }
                res.send({data:datam})
            }
        });
    },
    Aordernum:function(req,res){
        mineModel.Aordernum(function(err,data){
            if(err){
                console.log('数据库错误')
            }else{
                console.log(data)
                res.send({
                    "error":0,
                    "data":data
                })
            }
        })
    },
    Ashopdetail:function(req,res){
        mineModel.Ashopdetail(req.query.id,function(err,data){
            if(err){
                console.log('数据库错误')
            }else {

                res.send({"error":0,data:data});
            }
        })
    },
    Aaddressdetail:function(req,res){
        mineModel.Aaddressdetail(req.query.id,function(err,data){
            if(err){
                console.log('数据库错误')
            }else {

                res.send({"error":0,data:data});
            }
        })
    }


}
module.exports=mineCon;