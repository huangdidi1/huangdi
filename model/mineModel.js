var mysql=require('mysql');
var db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'calorie'
});
var mineModel={
    Pfirst:function(id,fn){
        var sql= 'select * from users where u_id="'+id+'"';
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Pimfor:function(id,fn){
        var sql= 'select * from users where u_id="'+id+'"';
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Psave:function(name,pass,sex,phone,mail,id,fn){
        var sql= 'UPDATE users SET u_name="'+name+'",u_pass="'+pass+'",u_phone="'+phone+'",u_mail="'+mail+'",u_sex="'+sex+'" WHERE u_id="'+id+'";';
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Porder:function(id,fn){
        var sql=`SELECT of_num,s_name,order_form.goods_num AS os_num,ss_price,of_price
                FROM nopay_form
                LEFT JOIN order_form
                USING(of_num)
                LEFT JOIN shop_cart
                USING(sca_id)
                LEFT JOIN shop_spec
                USING(s_id)
                LEFT JOIN shop
                USING (s_id)
                WHERE order_form.u_id=2
                GROUP BY sca_id`;
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Padress:function(id,fn){
        var sql='select * from address where u_id="'+id+'"';
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Paddadress:function(id,province,detailed,name,phone,fn){
        var sql='INSERT INTO address(u_id,a_name,a_phone,a_province,a_detailed) VALUE ("'+id+'","'+name+'","'+phone+'","'+province+'","'+detailed+'")';
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Pdropadress:function(id,fn){
        var sql='DELETE FROM address WHERE a_id="'+id+'"';
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Palteradress:function(id,fn){
        var sql='select * from address where a_id="'+id+'"';
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Pensurealtreadress:function(id,province,detailed,name,phone,fn){
        var sql='UPDATE address SET a_name="'+name+'", a_province="'+province+'", a_detailed="'+detailed+'", a_phone="'+phone+'"  where a_id="'+id+'" ';
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Pcollectpush:function(id,fn){
        var sql='SELECT p_id FROM collect WHERE u_id='+id+'';
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Pcollectvideoid:function(id,fn){
        var sql='SELECT Type3_id FROM collect2 WHERE u_id='+id+'';
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Pcollectvideo:function(id,fn){
        for(var i=0;i<id.length;i++){
            var sql='SELECT * FROM classtype3 WHERE Type3_id='+id[i]+';';
            db.query(sql,function(err,data){
                fn(err,data);
            })
        }
    },
    Pcollectpushs:function(id,fn){
        for(var i=0;i<id.length;i++){
            var sql='SELECT p_content FROM push WHERE p_id='+id[i]+';';
            db.query(sql,function(err,data){
                fn(err,data);
            })
        }
    },
    Pcollectpushqq:function(id,fn){
        for(var i=0;i<id.length;i++){
            var sql='SELECT pi_qqimg FROM qqimg WHERE p_id='+id[i]+';';
            db.query(sql,function(err,data){
                fn(err,data);
            })
        }
    },
    Pcollectpushimg:function(id,fn){
        for(var i=0;i<id.length;i++){
            var sql='SELECT pi_img FROM pushimg WHERE p_id='+id[i]+'';
            db.query(sql,function(err,data){
                fn(err,data);
            })
        }
    },
    Pdroporder:function(num,fn){
        var sql='DELETE FROM nopay_form WHERE of_num="'+num+'"';
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Porderdetailed:function(id,fn){
        var sql=`SELECT u_id,u_name,u_phone,of_num,s_name,order_form.goods_num AS os_num,ss_price,of_price
            FROM nopay_form
            LEFT JOIN order_form
            USING(of_num)
            LEFT JOIN shop_cart
            USING(sca_id,u_id)
            LEFT JOIN shop_spec
            USING(s_id)
            LEFT JOIN shop
            USING (s_id)
            LEFT JOIN users
            USING(u_id)
            WHERE order_form.u_id=2
            GROUP BY sca_id`;
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Porderbuy:function(id,fn){
        var sql=`SELECT * FROM nopay_form WHERE of_num=${id};`;
        /*var sql=`INSERT pay_form VALUE p_id=${id} `;*/

        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Porderbuy2:function(id,fn){
        var sql=`INSERT INTO pay_form VALUES(NULL,"${id}")`;
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Porderbuy3:function(id,fn){

        var sql=`DELETE FROM nopay_form WHERE of_num=${id};`;
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Ppayorder:function(id,fn){
        var sql=`SELECT u_id,u_name,u_phone,of_num,s_name,order_form.goods_num AS os_num,ss_price,of_price
                FROM pay_form
                LEFT JOIN order_form
                USING(of_num)
                LEFT JOIN shop_cart
                USING(sca_id,u_id)
                LEFT JOIN shop_spec
                USING(s_id)
                LEFT JOIN shop
                USING (s_id)
                LEFT JOIN users
                USING(u_id)
                WHERE order_form.u_id=2
                GROUP BY sca_id`;
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    addPayorder:function(id,fn){
        var sql=`DELETE FROM nopay_form WHERE of_num='${id}'`;
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    addPayorderSuc:function(id,fn){
        // console.log(id)
        var sql=`INSERT INTO pay_form VALUES(NULL,${id},DEFAULT)`;
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Pgetshop:function(id,fn){
        var sql=`DELETE FROM pay_form WHERE of_num='${id}'`;
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    PgetshopSuc:function(id,fn){
        // console.log(id)
        var sql=`INSERT INTO complete_form VALUES(NULL,${id},DEFAULT)`;
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Pcompleteorder:function(id,fn){
        var sql=`SELECT u_id,u_name,u_phone,of_num,s_name,order_form.goods_num AS os_num,ss_price,of_price
                FROM complete_form
                LEFT JOIN order_form
                USING(of_num)
                LEFT JOIN shop_cart
                USING(sca_id,u_id)
                LEFT JOIN shop_spec
                USING(s_id)
                LEFT JOIN shop
                USING (s_id)
                LEFT JOIN users
                USING(u_id)
                WHERE order_form.u_id=2
                GROUP BY sca_id`;
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Pdelorder:function(id,fn){
        var sql=`DELETE FROM complete_form WHERE of_num='${id}'`;
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },

   /* Pgetshop:function(id,fn){
        var sql=`SELECT u_id,u_name,u_phone,of_num,s_name,order_form.goods_num AS os_num,ss_price,of_price
                FROM nopay_form
                LEFT JOIN order_form
                USING(of_num)
                LEFT JOIN shop_cart
                USING(sca_id,u_id)
                LEFT JOIN shop_spec
                USING(s_id)
                LEFT JOIN shop
                USING (s_id)
                LEFT JOIN users
                USING(u_id)
                WHERE order_form.u_id=2
                GROUP BY sca_id`;
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },*/
    Pphoto:function(id,src,fn){
        var sql='update users set u_img="'+src+'" where u_id="'+id+'"';
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },

    Aorder1:function(id,fn){
        var sql=`  SELECT * FROM (order_form INNER JOIN users ON order_form.u_id=users.u_id)
 INNER JOIN  nopay_form ON order_form.of_num=nopay_form.of_num`;
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Aorder2:function(id,fn){
        var sql=` SELECT * FROM (order_form INNER JOIN users ON order_form.u_id=users.u_id)
 INNER JOIN  pay_form ON order_form.of_num=pay_form.of_num`;
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Aorder3:function(id,fn){
        var sql=`SELECT * FROM (order_form INNER JOIN users ON order_form.u_id=users.u_id)
 INNER JOIN  complete_form ON order_form.of_num=complete_form.of_num`;
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Aordernum:function(fn){
    var sql = `SELECT COUNT(*) num FROM order_form;`;
    db.query(sql, function (err, data) {
        fn(err, data);
        })
    },
    Ashopdetail:function(id,fn){
        var sql=` SELECT *
 FROM order_form
 LEFT JOIN shop_cart
 USING(sca_id)
 LEFT JOIN shop_spec
 USING(s_id)
 LEFT JOIN shop
 USING (s_id)
 where of_id=${id};`;
        db.query(sql,function(err,data){
            fn(err,data);
        })
    },
    Aaddressdetail:function(id,fn){
        var sql=`SELECT * 
FROM order_form
LEFT JOIN address
USING(a_id)
 where of_id=${id};`;
        db.query(sql,function(err,data){
            fn(err,data);
        })
    }


};

module.exports=mineModel;