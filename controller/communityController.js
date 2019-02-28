/**
 * Created by Administrator on 2018/12/5.
 */
var mysql=require('mysql');
var communityModel=require('../model/communityModel.js');
var communityController={
    release:function (req,res) {
        communityModel.release(req.body.id,req.body.content,req.body.time,function (err,data) {
            if(err){
                console.log('数据库错误1'+err)
            }else{
                return 1;
            }
        },function (err,data1) {
            if(err){
                console.log('数据库错误2'+err)
            }else{
                var n=data1[0].p_id;
                communityModel.qq(req.body.name,n,function (err,datas) {
                    if(err){
                        console.log('数据库错误3'+err)
                    }else{
                       console.log('存表情完毕')
                    }
                });
                communityModel.img(req.body.img,n,function (err,datass) {
                    if(err){
                        console.log('数据库错误3'+err)
                    }else{
                        console.log('存图片完毕')
                    }
                });
                res.send({error:0,n:n,data:req.body.name,zan:0,discuss:0,collect:false,src:req.body.img,p_id:data1[0].p_id,u_id:req.body.id});
            }
        })
    },
    load:function (req,res) {
        communityModel.loadpush(function (err,data) {
            if(err){
                console.log('数据库错误1'+err)
            }else{
               communityModel.loadpushqq(function (err,datas) {
                   if(err){
                       console.log('数据库错误2'+err)
                   }else{
                       communityModel.loadpushimg(function (err,data1) {
                           if(err){
                               console.log('数据库错误3'+err)
                           }else{
                               var array=[];
                               for(var i=0;i<data.length;i++){
                                   var json={};
                                   json.p_id=data[i].p_id;
                                   json.p_content=data[i].p_content;
                                   json.u_id=data[i].u_id;
                                   json.p_zan=data[i].p_zan;
                                   json.p_discuss=data[i].p_discuss;
                                   json.p_collect=data[i].p_collect;
                                   json.p_relay=data[i].p_relay;
                                   json.p_time=data[i].p_time;
                                   json.look='';
                                   json.src='';
                                   for(var j=0;j<datas.length;j++){
                                       if(json.p_id==datas[j].p_id){
                                           if(json.look){
                                               json.look=json.look+'%'+datas[j].pi_qqimg;
                                           }else{
                                               json.look=json.look+datas[j].pi_qqimg;
                                           }
                                       }
                                   }
                                   for(var j=0;j<data1.length;j++){
                                       if(json.p_id==data1[j].p_id){
                                           if(json.src){
                                               json.src=json.src+'|'+data1[j].pi_img;
                                           }else{
                                               json.src=json.src+data1[j].pi_img;
                                           }
                                       }
                                   }
                                   array.push(json);
                               }
                               res.send(array);
                           }
                       })
                   }
               })
            }
        })
    },
    inload:function (req,res) {
        communityModel.inloaduser(req.body.u_id,function (err,data) {
            if(err){
                console.log('数据库错误1'+err)
            }else{
                communityModel.inloadp(req.body.p_id,function (err,datas) {
                    if(err){
                        console.log('数据库错误2'+err)
                    }else{
                        communityModel.qqsrc(req.body.p_id,function (err,data1) {
                            if(err){
                                console.log('数据库错误3'+err)
                            }else{
                                communityModel.imgsrc(req.body.p_id,function (err,data2) {
                                    if(err){
                                        console.log('数据库错误4'+err)
                                    }else{
                                        for(var i=0;i<datas.length;i++){
                                            var json={};
                                            json.p_id=datas[i].p_id;
                                            json.p_content=datas[i].p_content;
                                            json.u_id=datas[i].u_id;
                                            json.p_zan=datas[i].p_zan;
                                            json.p_discuss=datas[i].p_discuss;
                                            json.p_collect=datas[i].p_collect;
                                            json.p_relay=datas[i].p_relay;
                                            json.p_time=datas[i].p_time;
                                            json.look='';
                                            json.src='';
                                            json.head=data[i].u_img;
                                            json.name=data[i].u_name;
                                            for(var j=0;j<data1.length;j++){
                                                if(json.look){
                                                    json.look=json.look+'%'+data1[j].pi_qqimg;
                                                }else{
                                                    json.look=json.look+data1[j].pi_qqimg;
                                                }

                                            }
                                            for(var j=0;j<data2.length;j++){
                                                if(json.src){
                                                    json.src=json.src+'|'+data2[j].pi_img;
                                                }else{
                                                    json.src=json.src+data2[j].pi_img;
                                                }
                                            }
                                        }
                                        communityModel.dis(req.body.p_id,function (err,data3) {
                                            if(err){
                                                console.log('数据库错误5'+err)
                                            }else{
                                                // console.log(data3);
                                                res.send({json:json,dis:data3})
                                            }
                                        });

                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },
    discuss:function (req,res) {
        communityModel.discuss(req.body.u_id,req.body.p_id,req.body.name,req.body.content,req.body.time,function (err,data) {
            if(err){
                console.log('数据库错误'+err)
            }else{
                // res.send({u_id:req.body.u_id,p_id:req.body.p_id,name:req.body.name,content:req.body.content,time:req.body.time})
                return 1;
            }
        },function (err,data1){
            if(err){
                console.log('数据库错误1'+err)
            }else{
                communityModel.ui(req.body.u_id,function (err,data2) {
                    if(err){
                        console.log('数据库错误2'+err)
                    }else{
                        communityModel.update(req.body.p_id,function (err,data3) {
                            if(err){
                                console.log('数据库错误3'+err)
                            }else{
                                 res.send({u_id:req.body.u_id,p_id:req.body.p_id,name:req.body.name,content:req.body.content,time:req.body.time,d_id:data1[0].d_id,username:data2[0].u_name,u_img:data2[0].u_img});
                            }
                        });

                    }
                });
            }
        })
    },
    reply:function (req,res) {
        communityModel.ui(req.body.replyed_id,function (err,data2) {
            if(err){
                console.log('数据库错误'+err)
            }else{
                communityModel.reply(req.body.replyer_id,req.body.replyed_id,req.body.d_id,req.body.content,req.body.src,req.body.time,req.body.p_id,data2[0].u_name,req.body.new_name,data2[0].u_img,req.body.new_src,function (err,data) {
                    if(err){
                        console.log('数据库错误2'+err)
                    }else{
                        communityModel.update(req.body.p_id,function (err,data3) {
                            if(err){
                                console.log('数据库错误3'+err)
                            }else{
                                 res.send({replyedname:data2[0].u_name,replyer_id:req.body.replyer_id,replyed_id:req.body.replyed_id,d_id:req.body.d_id,content:req.body.content,src:req.body.src,time:req.body.time,p_id:req.body.p_id,r_id:data.insertId});
                            }
                        });

                    }
                });

            }
        })
    },
    reply1:function (req,res) {
        communityModel.ui(req.body.replyed_id,function (err,data2) {
            if(err){
                console.log('数据库错误'+err)
            }else{
                communityModel.reply(req.body.replyer_id,req.body.replyed_id,req.body.d_id,req.body.content,req.body.src,req.body.time,req.body.p_id,data2[0].u_name,req.body.new_name,data2[0].u_img,req.body.new_src,function (err,data) {
                    if(err){
                        console.log('数据库错误2'+err)
                    }else{
                        communityModel.update(req.body.p_id,function (err,data3) {
                            if(err){
                                console.log('数据库错误3'+err)
                            }else{
                                res.send({replyedname:data2[0].u_name,replyer_id:req.body.replyer_id,replyed_id:req.body.replyed_id,d_id:req.body.d_id,content:req.body.content,src:req.body.src,time:req.body.time,p_id:req.body.p_id,r_id:data.insertId});
                            }
                        });

                    }
                });

            }
        })
    },
    rep:function (req,res) {
       communityModel.rep(req.body.p_id,function (err,data) {
           if(err){
               console.log('数据库错误'+err)
           }else{
               res.send(data)
           }
       })
    },
    uname:function (req,res) {
        communityModel.ui(req.query.u_id,function (err,data) {
            if(err){
                console.log('数据库错误'+err)
            }else{
                res.send(data[0]);
            }
        })
    },
    collect:function (req,res) {
        communityModel.collect(req.body.u_id,req.body.p_id,function (err,data) {
            if(err){
                console.log('数据库错误'+err)
            }else{
                res.send({error:0})
            }
        })
    },
    zan:function (req,res) {
        communityModel.zan(req.body.u_id,req.body.p_id,function (err,data) {
            if(err){
                console.log('数据库错误'+err)
            }else{
                communityModel.upzan(req.body.p_id,function (err,data1) {
                    if(err){
                        console.log('数据库错误2'+err)
                    }else{
                        res.send({error:0})
                    }
                });
            }
        })
    },
    iscollect:function (req,res) {
        communityModel.iscollect(req.body.u_id,req.body.p_id,function (err,data) {
            if(err){
                console.log('数据库错误'+err)
            }else{
                if(data.length){
                    res.send({error:0})
                }else{
                    res.send({error:1})
                }
            }
        })
    },
    iszan:function (req,res) {
        communityModel.iszan(req.body.u_id,req.body.p_id,function (err,data) {
            if(err){
                console.log('数据库错误'+err)
            }else{
                if(data.length){
                    res.send({error:0})
                }else{
                    res.send({error:1})
                }
            }
        })
    },
    uncollect:function (req,res) {
        communityModel.uncollect(req.body.u_id,req.body.p_id,function (err,data) {
            if(err){
                console.log('数据库错误'+err)
            }else{
                res.send({error:0})
            }
        })
    },
    unzan:function (req,res) {
        communityModel.unzan(req.body.u_id,req.body.p_id,function (err,data) {
            if(err){
                console.log('数据库错误'+err)
            }else{
                communityModel.upzanc(req.body.p_id,function (err,data1) {
                    if(err){
                        console.log('数据库错误2'+err)
                    }else{
                        res.send({error:0})
                    }
                });
            }
        })
    },
    del:function (req,res) {
        communityModel.find(req.query.d_id,function (err,data) {
            if(err){
                console.log('数据库错误1'+err)
            }else{
                if(data.length){
                    communityModel.delr(req.query.d_id,function (err,data1) {
                        if(err){
                            console.log('数据库错误2'+err)
                        }else{
                            communityModel.deld(req.query.d_id,function (err,data2) {
                                if(err){
                                    console.log('数据库错误3'+err)
                                }else{
                                    communityModel.updis(req.query.p_id,data.length+1,function (err,data4) {
                                        if(err){
                                            console.log('数据库错误4'+err)
                                        }else{
                                            res.send({error:0,count:data.length+1});
                                        }
                                    });
                                }
                            })
                        }
                    })
                }else{
                    communityModel.deld(req.query.d_id,function (err,data3) {
                        if(err){
                            console.log('数据库错误3'+err)
                        }else{
                            communityModel.updis(req.query.p_id,data.length+1,function (err,data4) {
                                if(err){
                                    console.log('数据库错误4'+err)
                                }else{
                                    res.send({error:0,count:data.length+1});
                                }
                            });
                        }
                    })
                }
            }
        })
    },
    del2:function (req,res) {
        communityModel.delrpy(req.query.r_id,function (err,data) {
            if(err){
                console.log('数据库错误1'+err)
            }else{
                res.send({error:0,count:1})
            }
        })
    }
};
module.exports=communityController;
