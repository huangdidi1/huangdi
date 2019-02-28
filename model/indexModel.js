var mysql=require('mysql');
var db=mysql.createConnection({
host:'localhost',
user:'root',
password:'root',
database:'calorie'
});

var indexModel={
   getName:function(id,fn){
	
      var sql='SELECT u_name FROM users WHERE u_id="'+id+'";';
       db.query(sql,function(err,data){
		  fn(err,data)
       })
   },

   getVideoMsg:function(){},
   getShopMsg:function(){
      
   },
   getOrderSum:function(fn){
      var sql='SELECT COUNT(of_num) AS oSum,SUM(of_total) AS oTotal FROM order_form';
      db.query(sql,function(err,data){
         fn(err,data)
         // console.log(data)
      })
   },
   getDaliOrder:function(fn){
     var sql= `SELECT 	s_type  AS daliType,of_price AS daliPrice,SUM(order_form.goods_num )AS daliNum  FROM 
     (order_form INNER JOIN shop_cart ON order_form.sca_id=shop_cart.sca_id) 
     INNER JOIN shop ON shop_cart.s_id=shop.s_id WHERE of_data>=DATE(NOW()) AND of_data<DATE_ADD(DATE(NOW()),INTERVAL 1 DAY) GROUP BY s_type`
     db.query(sql,function(err,data){
      fn(err,data)
      // console.log(data)
   })
   },
   getWeekOrder:function(fn){
     var sql= 'SELECT SUM(goods_num) as wNumber,of_price FROM order_form WHERE YEARWEEK(DATE_FORMAT(of_data,"%Y-%m-%d")) = YEARWEEK(NOW()) GROUP BY TO_DAYS(of_data) ASC;'
     db.query(sql,function(err,data){
      fn(err,data)
      
   })
   },
   getMonthOrder:function(fn){
      var sql= `SELECT temp.date,of_total,
      COALESCE(u.unmber,0) 'number' FROM(
      SELECT
      ADDDATE('2019-01-01', numlist.id) AS 'date'
      FROM
      (
      SELECT
      n1.i + n10.i * 10 + n100.i * 100 AS id
      FROM
      num n1
      CROSS JOIN num AS n10
      CROSS JOIN num AS n100
      ) AS numlist
      WHERE
      ADDDATE('2019-01-01', numlist.id) <= DATE_ADD('2019-01-01',INTERVAL 1 MONTH)) temp
   LEFT JOIN 
   (SELECT LEFT(of_data,10)AS udate,COUNT(of_data) unmber ,of_price ,of_total FROM order_form GROUP BY udate) u ON temp.date = u.udate 
   ORDER BY temp.date;`
      db.query(sql,function(err,data){
       fn(err,data)
       // console.log(data)
      //  console.log(data[0])
      //  console.log(data[0].goods_num)
    })
    },
    getYearOrder:function(fn){
      var sql= `SELECT temp.date,IF(of_total IS NULL , 0, of_total) of_total,
      COALESCE(u.unmber,0) 'number' FROM(
      SELECT
      ADDDATE('"%Y-%m"', numlist.id) AS 'date'
      FROM
      (
      SELECT
      n1.i + n10.i * 10 + n100.i * 100 AS id
      FROM
      num n1
      CROSS JOIN num AS n10
      CROSS JOIN num AS n100
      ) AS numlist
      WHERE
      ADDDATE('"%Y-%m"', numlist.id) <= DATE_ADD('"%Y-%m"',INTERVAL 1 YEAR)) temp
   LEFT JOIN 
   (SELECT LEFT(of_data,10)AS udate,COUNT(of_data) unmber ,of_price ,of_total FROM order_form GROUP BY udate) u ON temp.date = u.udate 
   GROUP BY temp.date;`
      db.query(sql,function(err,data){
       fn(err,data)
      //  console.log(data)
      //  console.log(data[0])
      //  console.log(data[0].goods_mun)
    })
    },
    getUserFang:function(fn){
      var sql= ' SELECT COUNT(u_id)AS Fang FROM users;'
      db.query(sql,function(err,data){
       fn(err,data)
       
    })
    },
   getCommunityMsg:function(fn){
      var sql='SELECT pi_img FROM pushimg LIMIT 0,6 ;';
      db.query(sql,function(err,data){
         fn(err,data)
      })
   }


}

   



module.exports=indexModel;