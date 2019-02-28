/**
 * Created by Administrator on 2018/12/6.
 */
var classModel=require('../model/classModel.js');
var classController={
    addData:function (req,res) {
        classModel.addData(req.query.Data,function (err,data) {
            if(err){
                console.log(err)
            }else {
                res.send({error:0,data:data})
            }
        })
    },
    dataDelete:function (req,res) {
      classModel.dataDelete(req.query.id,function (err,data) {
          if(err){
              console.log('四阶段数据库3')
          }else {
                  res.send({error:0,data:data})
          }
      })
    },
    classdata:function (req,res) {
        classModel.classdata(req.query.id,function (err,data) {
            if(err){
                console.log('四阶段数据库2')
            }else {
                if(data.length){

                    res.send({error:0,data:data})
                }else {
                    // console.log('没有数据');
                    res.send({error:1})
                }
            }
        })
    },
    classtypeCount:function (req,res) {
        classModel.classtypeCount(function (err,data) {
            if(err){
                console.log('四阶段数据库1')
            }else {
                if(data.length){
                    res.send({error:0,data:Math.ceil(data[0].num/4)})
                }else {
                    // console.log('没有数据');
                    res.send({error:1})
                }
            }
        })
    },
    classtypeAll:function(req,res){
        classModel.classtypeAll(function(err,data){
            if(err){
                    console.log('四阶段数据库2')
                }else {
                    if(data.length){

                    // var arr=data.slice((req.query.page-1)*4,req.query.page*4);

                        res.send({error:0,data:data})
                    }else {
                        // console.log('没有数据');
                        res.send({error:1})
                    }
        }})
    },
    onload1:function (req,res) {
     classModel.onload1(function (err,data) {
   if(err){
       console.log('数据库1错误')
   }else {
        if(data.length){

         res.send({error:0,data:data})
        }else {
            // console.log('没有数据');
            res.send({error:1,data:data})
        }

   }
     })

    },
    onload2:function (req,res) {
        classModel.onload2(function (err,data) {
            if(err){
                console.log('数据库2错误')
            }else {
                if(data.length){
                    res.send({error:0,data:data})
                }else {
                    // console.log('没有数据');
                    res.send({error:1,data:data})
                }
            }
        })
    },
    type11:function (req,res) {
        classModel.type11(req.query.id,function (err,data) {
            // res.render('classtype2',{data1:});
            if(err){
                console.log('数据库3错误')
            }else {
                if(data.length){
                    res.send({error:0,data:data})
                }else {
                    // console.log('没有数据');
                    res.send({error:1,data:data})
                }
            }
        })
    },
    type12:function (req,res) {
        classModel.type12(req.query.id,function (err,data) {
            if(err){
                console.log('数据库4错误')
            }else {
                if(data.length){
                    res.send({error:0,data:data})
                }else {
                    // console.log('没有数据');
                    res.send({error:1,data:data})
                }
            }
        })
    },
    type2:function (req,res) {
        classModel.type2(req.query.id,function (err,data) {
            if(err){
                console.log('数据库5错误')
            }else {
                if(data.length){
                    // console.log(data);
                    res.send({error:0,data:data})
                }else {
                    console.log('没有数据');
                    res.send({error:1,data:data})
                }
            }
        })
    },
    type1data:function (req,res) {
        classModel.type1data(req.query.id,function (err,data) {
            if(err){
                console.log('数据库6错误')
            }else {
                if(data.length){
                    res.send({error:0,data:data})
                }else {
                    // console.log('没有数据');
                    res.send({error:1,data:data})
                }
            }
        })
    },
    type2data:function (req,res) {
        classModel.type2data(req.query.id,function (err,data) {
            if(err){
                console.log('数据库7错误')
            }else {
                if(data.length){
                    res.send({error:0,data:data})
                }else {
                    // console.log('没有数据');
                    res.send({error:1,data:data})
                }
            }
        })
    },
    type3data:function (req,res) {
       classModel.type3data(req.query.id,function (err,data) {
           if(err){
               console.log('数据库8错误')
           }else {
               if(data.length){
                   res.send({error:0,data:data})
               }else {
                   // console.log('没有数据');
                   res.send({error:1,data:data})
               }
           }
       })
    },
    collect:function (req,res) {
        classModel.collect(req.query.uid,req.query.cid,function (err,data) {
            if(err){
                console.log('数据库9错误')
            }else {
                if(data.length){
                    res.send({error:0,data:data})
                }else {
                    // console.log('没有数据');
                    res.send({error:1,data:data})
                }
            }
        })
    },
    nocollect:function (req,res) {

        classModel.nocollect(req.query.uid,req.query.cid,function (err,data) {
            if(err){
                console.log('数据库10错误')
            }else {
                if(data.length){
                    res.send({error:0,data:data})
                }else {
                    // console.log('没有数据');
                    res.send({error:1,data:data})
                }
            }
        })
    },
    selectcollect:function (req,res) {
        classModel.selectcollect(req.query.uid,req.query.cid,function (err,data) {
            if(err){
                console.log(err)
            }else {
                if(data.length){
                    res.send({error:0,data:data})
                }else {
                    // console.log('没有数据');
                    res.send({error:1,data:data})
                }
            }
        })
    }
};

module.exports=classController;