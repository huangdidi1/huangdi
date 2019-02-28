var indexModel=require('./../model/indexModel.js');

var indexController={

  getName:function(req,res){
       indexModel.getName(req.query.id,function(err,data){
        if(err){
          console.log(err)
          console.log('我错了')
        }else{
          res.send({error:0,name:data[0].u_name});
          // console.log({error:0,id:data.insertId})
             }
    })
  },
  getOrderSum:function(req,res){
    indexModel.getOrderSum(
      function(err,data){
        if(err){
          console.log(err)
        }else{
          
        // var  result = JSON.stringify(data);
        //   data = JSON.parse(result);
          // console.log(data[0].oPrice)
          // console.log(data[0].oSum)
          // console.log(data)
          // console.log(data[0].oSum)
          // console.log(data[0].oPrice)
          res.send({error:0,data:data[0]})
        }
      }
    )
  },
  getDaliOrder:function(req,res){
    indexModel.getDaliOrder(
      function(err,data){
        if(err){
          console.log(err)
        }else{
          
        // var  result = JSON.stringify(data);
        //   data = JSON.parse(result);
          // console.log(data[0].oPrice)
          // console.log(data[0].oSum)
          // console.log(data)
          // console.log(data[0].oSum)
          // console.log(data[0].oPrice)
          res.send({error:0,data:data})
        }
      }
    )
  },
  getWeekOrder:function(req,res){
    indexModel.getWeekOrder(
      function(err,data){
        if(err){
          console.log(err)
        }else{
          
        // 
          // console.log(data[0].oPrice)
          // console.log(data[0].oSum)
          // console.log(data)
          // console.log(data[0].oSum)
          // console.log(data[0].oPrice)
          res.send({error:0,data:data})
        }
      }
    )
  },
  getMonthOrder:function(req,res){
    indexModel.getMonthOrder(
      function(err,data){
        if(err){
          console.log(err)
        }else{
          
        // 
          // console.log(data[0].oPrice)
          // console.log(data[0].oSum)
          // console.log(data)
          // console.log(data[0].oSum)
          // console.log(data[0].oPrice)
          res.send({error:0,data:data})
        }
      }
    )
  },
  getYearOrder:function(req,res){
    indexModel.getYearOrder(
      function(err,data){
        if(err){
          console.log(err)
        }else{
          
        // 
          // console.log(data[0].oPrice)
          // console.log(data[0].oSum)
          // console.log(data)
          // console.log(data[0].oSum)
          // console.log(data[0].oPrice)
          res.send({error:0,data:data})
        }
      }
    )
  },
  getUserFang:function(req,res){
    indexModel.getUserFang(
      function(err,data){
        if(err){
          console.log(err)
        }else{
          
        // 
          // console.log(data[0].oPrice)
          // console.log(data[0].oSum)
          // console.log(data)
          // console.log(data[0].oSum)
          // console.log(data[0].oPrice)
          res.send({error:0,data:data})
        }
      }
    )
  },
 getVideoMsg:function(){},
  getShopMsg:function(){},
  getCommunityMsg:function(req,res){
        indexModel.getCommunityMsg(function(err,data){
          if(err){
            console.log(err)
          }else{
            // console.log(data[0].pi_img)
            
            res.send({error:0,data:data})
          }
        })
  }


  };

 






module.exports=indexController;