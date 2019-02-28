var shoplistModel=require('../model/shoplistModel.js');

var shoplistController={
    getGoodsList:function (req,res) {
        ///add?content=xxxx
        //返回:{error:0,id:1}     //0 成功   1失败
        shoplistModel.getGoodsList(function (err,data) {
            if(err){
                console.log('数据库错误')
            }else{
                res.send({error:0,data:data})
            }
            // console.log(data.length);
        })
    },
    getGoodsPrice:function (req,res) {
        shoplistModel.getGoodsPrice(function (err,data) {
            if(err){
                console.log('数据库错误')
            }else{
                res.send({error:0,data:data})
            }
        })
    },
    getGoodsTime:function (req,res) {
        shoplistModel.getGoodsTime(function (err,data) {
            if(err){
                console.log('数据库错误')
            }else{
                res.send({error:0,data:data})
            }
        })
    },
    getGoods:function (req,res) {
        shoplistModel.getGoods(function (err,data) {
            if(err){
                console.log('数据库错误')
            }else{
                res.send({error:0,data:data})
            }
        })
    },
    getGoodsType:function (req,res) {
        shoplistModel.getGoodsType(req.query.goodsType,function (err,data) {
            console.log(req.query);
            if(err){
                console.log('数据库错误')
            }else{
                // console.log(data);
                res.send({error:0,data:data})
            }
        })
    },
    getGoodsSearch:function (req,res) {
        shoplistModel.getGoodsSearch(req.query.goodsSearch,function (err,data) {
            console.log(req.query);
            if(err){
                console.log('数据库错误')
            }else{
                // console.log(data);
                res.send({error:0,data:data})
            }
        })
    },
    getGoodsDetail:function (req,res) {
        shoplistModel.getGoodsDetail(req.query.goodsId,function (err,data) {
            console.log(req.query);
            if(err){
                console.log('数据库错误')
            }else{
                // console.log(data);
                var showImg=[];
                for(var i=0;i<data.length;i++){
                    if(data[i].sd_showImg!=null){
                        showImg.push(data[i].sd_showImg)
                    }
                }
                console.log(showImg);
                var detailImg=[];
                for(var i=0;i<data.length;i++){
                    if(data[i].sd_detailImg!=null){
                        detailImg.push(data[i].sd_detailImg)
                    }
                }
                console.log(detailImg);
                res.send({error:0,showImg:showImg,detailImg:detailImg})
            }
        })
    },
    getThisDetail:function (req,res) {
        shoplistModel.getThisDetail(req.query.goodsId,function (err,data) {
            console.log(req.query);
            if(err){
                console.log('数据库错误')
            }else{
                console.log(data);
                res.send({error:0,data:data});
            }
        })
    },
    getComment:function (req,res) {
        shoplistModel.getComment(req.query.goodsId,function (err,data) {
            console.log(req.query);
            if(err){
                console.log('数据库错误')
            }else{
                console.log(data);
                res.send({error:0,data:data});
            }
        })
    },
    getCommentImg:function (req,res) {
        shoplistModel.getCommentImg(req.query.goodsId,function (err,data) {
            console.log(req.query);
            if(err){
                console.log('数据库错误')
            }else{
                console.log(data);
                var commentImg=[];
                for(var i=0;i<data.length;i++){
                    if(data[i].sci_img!=null){
                        commentImg.push(data[i])
                    }
                }
                res.send({error:0,commentImg:commentImg});
            }
        })
    },
    addCart:function (req,res) {
        shoplistModel.addCart(req.query.goodsId,req.query.userId,req.query.goodsNum,req.query.goodsColor,function (err,data) {
            console.log(req.query);
            if(err){
                console.log('数据库错误')
            }else{
                console.log(data);
                res.send({error:0});
            }
        })
    },
    getCart:function (req,res) {
        shoplistModel.getCart(req.query.userId,function (err,data) {
            console.log(req.query);
            if(err){
                console.log('数据库错误')
            }else{
                console.log(data);
                res.send({error:0,data:data});
            }
        })
    },
    checkCol:function (req,res) {
        shoplistModel.checkCol(req.query.goodsId,req.query.userId,function(err,data){
            // console.log(req.query.scaId,3);
            if(err){
                console.log('数据库错误6')
            }else{
                res.send({data:data})
                // res.send({error:0});
            }
        });
    },
    addCol:function (req,res) {
        shoplistModel.addCol(req.query.goodsId,req.query.userId,function(err,data){
            // console.log(req.query.scaId,3);
            if(err){
                console.log('数据库错误6')
            }else{
                res.send({error:0})
                // res.send({error:0});
            }
        });
    },
    delCol:function (req,res) {
        shoplistModel.delCol(req.query.goodsId,req.query.userId,function(err,data){
            // console.log(req.query.scaId,3);
            if(err){
                console.log('数据库错误6')
            }else{
                res.send({error:0})
                // res.send({error:0});
            }
        });
    },
    seleCart:function (req,res) {
        shoplistModel.seleCart(req.query.goodsId,req.query.userId,function(err,data){
            // console.log(req.query.scaId,3);
            if(err){
                console.log('数据库错误6')
            }else{
                res.send({data:data})
                // res.send({error:0});
            }
        });
    },
    addOrder:function (req,res) {
        // console.log(req.query,req.query.scaId[0])
        shoplistModel.addOrder(req.query.ofNum,req.query.uid,req.query.scaId,req.query.totalPrice,req.query.dateTime,function (err,data) {
            // console.log(req.query);
            if(err){
                console.log('数据库错误')
            }else{
                // console.log(data);
                res.send({error:0});

            }
        })
    },
    getOrder:function (req,res) {
        shoplistModel.getOrder(req.query.uid,req.query.ofNum,function (err,data) {
            console.log(req.query);
            if(err){
                console.log('数据库错误')
            }else{
                console.log(data);
                res.send({error:0,data:data});
            }
        })
    },
    getAddress:function (req,res) {
        shoplistModel.getAddress(req.query.uid,function (err,data) {
            console.log(req.query);
            if(err){
                console.log('数据库错误')
            }else{
                console.log(data);
                res.send({error:0,data:data});
            }
        })
    },
    payOrder:function (req,res) {
        shoplistModel.payOrder(req.query.ofNum,req.query.aId,function (err,data) {
            if(err){
                console.log('数据库错误1')
            }else{
                // res.send({error:0});
                // console.log(1)
            }
        });
    },
    addPay:function (req,res) {
        shoplistModel.addPay(req.query.ofNum,function(err,data){
            // console.log(req.query.ofNum,2);
            if(err){
                console.log('数据库错误2')
            }else{
                // res.send({error:0});
                // console.log(2)
            }
            // console.log(3);
        });
    },
    delCart:function (req,res) {
        // console.log(9999);
        // console.log(req.query);
        shoplistModel.delCart(req.query.scaId,function(err,data){
            if(err){
                console.log('数据库错误3')
            }else{
                console.log(4);
                // res.send({error:0});
            }
            
        });
    },
    delInventory:function (req,res) {
        shoplistModel.delInventory(req.query.scaId,function(err,data){
            if(err){
                console.log('数据库错误4')
            }else{
                console.log(5);
                // res.send({error:0});
            }
            
        });
    },
    delSaleVolume:function (req,res) {
        shoplistModel.delSaleVolume(req.query.scaId,function(err,data){
            // console.log(req.query.scaId,3);
            if(err){
                console.log('数据库错误5')
            }else{
                console.log(6);
                // res.send({error:0});
            }
            
        });
    },
    noPay:function (req,res) {
        shoplistModel.noPay(req.query.ofNum,function(err,data){
            // console.log(req.query.scaId,3);
            if(err){
                console.log('数据库错误6')
            }else{
                console.log(6);
                // res.send({error:0});
            }
        });
    },
    delCartGoods:function (req,res) {
        shoplistModel.delCartGoods(req.query.scaId,function(err,data){
            // console.log(req.query.scaId,3);
            if(err){
                console.log('数据库错误7')
            }else{
                console.log(7);
                res.send({error:0});
            }
        });
    },
    getGoodsInfo:function (req,res) {
        shoplistModel.getGoodsInfo(req.body.goodsid,function(err,data){
            // console.log(req.query.scaId,3);
            if(err){
                console.log('数据库错误')
            }else{
                res.send({error:0,data:data});
            }
            
        });
    },
    changeGoodsInfo:function (req,res) {
        // console.log(req.body)
        shoplistModel.changeGoodsInfo(req.body,function(err,data){
            if(err){
                console.log('数据库错误')
            }else{
                shoplistModel.updateGoodsInfo(req.body,function(err,data){
                    if(err){
                        console.log('数据库错误')
                    }else{
                        // console.log(11)
                        res.send({error:0});
                    }
                });
            }
        });
        
    },
    addGoods:function (req,res) {
        // console.log(req.body)
        shoplistModel.addGoods(req.body[0],function(err,data){
            if(err){
                console.log('数据库错误1')
            }else{
                shoplistModel.checkGoods(function(err,data){
                    if(err){
                        console.log('数据库错误2')
                    }else{
                        // res.send({error:0});
                        res.send({error:0,data:data})
                    }
                });
            }
        });
        
    },
    addGoodsSpec:function (req,res) {
        // console.log(req.body)
        shoplistModel.addGoodsSpec(req.body.goods,req.body.goodsid,function(err,data){
            if(err){
                console.log('数据库错误')
            }else{
                shoplistModel.addGoodsSc(req.body.goods,req.body.goodsid,function(err,data){
                    if(err){
                        console.log('数据库错误')
                    }else{
                        // res.send({error:0});
                        res.send({error:0})
                    }
                });
            }
        });
    },
    addGoodsShow:function (req,res) {
        // console.log(req.body)
        shoplistModel.addGoodsShow(req.body,function(err,data){
            if(err){
                console.log('数据库错误4')
            }else{
                shoplistModel.setGoodsShow(req.body,function(err,data){
                    if(err){
                        console.log('数据库错误5')
                    }else{
                        res.send({error:0});
                    }
                });
            }
        });
        
    },
    addGoodsDetail:function (req,res) {
        // console.log(req.body)
        shoplistModel.addGoodsDetail(req.body,function(err,data){
            if(err){
                console.log('数据库错误6')
            }else{
                res.send({error:0});
            }
        });
        
    },
    getGoodsData:function (req,res) {
        // console.log(req.body)
        shoplistModel.getGoodsData(req.body,function(err,data){
            if(err){
                console.log('数据库错误7')
            }else{
                res.send({error:0,data:data});
            }
        });
        
    },
    addSpecImg:function (req,res) {
        // console.log(req.body)
        shoplistModel.addSpecImg(req.body,function(err,data){
            if(err){
                console.log('数据库错误8')
            }else{
                res.send({error:0});
            }
        });
        
    },
}

module.exports=shoplistController;