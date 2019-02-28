var mysql=require('mysql');

var db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'calorie'
});

var shoplistModel={
    getGoodsList:function (fn) {
        var sql=`SELECT *
        FROM
        (SELECT s_id,ss_price,s_name,s_type,s_uptime,s_showimg,s_salevolume,COUNT(sc_id) comment_sum
        FROM shop 
        LEFT JOIN shop_comment 
        USING (s_id) 
        LEFT JOIN shop_spec 
        USING (s_id) 
        GROUP BY sc_id
        ) shop_list
        GROUP BY s_id
        ORDER BY s_salevolume DESC`;
        // var sql='SELECT *,COUNT(sc_id) comment_sum FROM shop LEFT JOIN shop_comment USING (s_id) LEFT JOIN shop_spec USING (s_id) GROUP BY s_id ORDER BY s_salevolume DESC';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    getGoodsPrice:function (fn) {
        var sql=`SELECT *
        FROM
        (SELECT s_id,ss_price,s_name,s_type,s_uptime,s_showimg,s_salevolume,COUNT(sc_id) comment_sum
        FROM shop 
        LEFT JOIN shop_comment 
        USING (s_id) 
        LEFT JOIN shop_spec 
        USING (s_id) 
        GROUP BY sc_id
        ) shop_list
        GROUP BY s_id
        ORDER BY ss_price DESC`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    getGoodsTime:function (fn) {
        var sql=`SELECT *
        FROM
        (SELECT ss_inventory,s_id,ss_price,s_name,s_type,s_uptime,s_showimg,s_salevolume,COUNT(sc_id) comment_sum,SUM(ss_inventory) inventory,s_state
        FROM shop 
        LEFT JOIN shop_comment 
        USING (s_id) 
        LEFT JOIN shop_spec 
        USING (s_id) 
        GROUP BY sc_id
        ) shop_list
        GROUP BY s_id
        ORDER BY s_uptime DESC`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    getGoods:function (fn) {
        var sql=`SELECT *
        FROM
        (SELECT ss_inventory,s_id,ss_price,s_name,s_type,s_uptime,s_showimg,s_salevolume,SUM(ss_inventory) inventory,s_state
        FROM shop 
        LEFT JOIN shop_spec 
        USING (s_id) 
        GROUP BY s_id
        ) shop_list
        GROUP BY s_id
        ORDER BY s_uptime DESC`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    getGoodsType:function (type,fn) {
        var sql=`SELECT *
        FROM
        (SELECT s_id,ss_price,s_name,s_type,s_uptime,s_showimg,s_salevolume,COUNT(sc_id) comment_sum
        FROM shop 
        LEFT JOIN shop_comment 
        USING (s_id) 
        LEFT JOIN shop_spec 
        USING (s_id)
        WHERE s_type='${type}'
        GROUP BY sc_id
        ) shop_list
        GROUP BY s_id
        ORDER BY s_uptime DESC`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    getGoodsSearch:function (name,fn) {
        var sql=`SELECT *
        FROM
        (SELECT s_id,ss_price,s_name,s_type,s_uptime,s_showimg,s_salevolume,COUNT(sc_id) comment_sum
        FROM shop 
        LEFT JOIN shop_comment 
        USING (s_id) 
        LEFT JOIN shop_spec 
        USING (s_id)
        WHERE s_name
        LIKE '%${name}%'
        GROUP BY sc_id
        ) shop_list
        GROUP BY s_id
        ORDER BY s_uptime DESC`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    getGoodsDetail:function (id,fn) {
        var sql=`SELECT *
        FROM shop_detail
        WHERE s_id=${id}`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    getThisDetail:function (id,fn) {
        var sql=`SELECT *,COUNT(sc_id) comment_sum
        FROM shop
        LEFT JOIN shop_comment
        USING (s_id)
        LEFT JOIN shop_spec
        USING (s_id)
        WHERE s_id=${id}
        GROUP BY ss_color`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    getComment:function (id,fn) {
        var sql=`SELECT sc_id,sc_content,ss_color,sc_time,u_name
        FROM shop_comment
        LEFT JOIN users
        USING(u_id)
        LEFT JOIN shop_spec
        USING(ss_id)
        WHERE shop_comment.s_id=${id}`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    getCommentImg:function (id,fn) {
        var sql=`SELECT sc_id,sci_img
        FROM shop_comment
        LEFT JOIN shop_commentimg
        USING(sc_id)
        WHERE s_id=${id}`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    addCart:function (gid,uid,num,color,fn) {
        // console.log(gid,uid,num,color)
        var sql=`INSERT INTO shop_cart VALUES(NULL,'${gid}','${uid}','${num}','${color}');`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    getCart:function (uid,fn) {
        var sql=`SELECT sca_id,s_showimg,s_id,s_name,shop_cart.ss_color,ss_price,goods_num
        FROM shop_cart
        LEFT JOIN shop
        USING(s_id)
        LEFT JOIN shop_spec
        USING(s_id)
        WHERE ${uid}
        GROUP BY sca_id`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    addOrder:function (ofNum,uid,scaId,ofPrice,ofdate,fn) {

        for(let i=0;i<scaId.length;i++){
            // console.log(scaId[i].scaid,scaId[i].goodsNum)
            var sql=`INSERT INTO order_form VALUES(NULL,'${ofNum}','${uid}','${scaId[i].scaid}','${scaId[i].goodsNum}','${ofPrice}',DEFAULT,DEFAULT,'${ofdate}');`;
            console.log(`INSERT INTO order_form VALUES(NULL,'${ofNum}','${uid}','${scaId[i].scaid}','${scaId[i].goodsNum}','${ofPrice}',DEFAULT,DEFAULT,'${ofdate}')`)
            // var sql=`INSERT INTO order_form VALUES(NULL,'15471168220002',2,54,1,199,DEFAULT,DEFAULT,'2019-1-10 18:41:22')`;
            db.query(sql,function (err,data) {
                // if(i==scaId.length-1){
                fn(err,data);
                // }

            })
        }
    },
    getOrder:function (uid,ofNum,fn) {
        var sql=`SELECT sca_id,s_id,s_showimg,s_name,shop_cart.ss_color,ss_price,order_form.goods_num,of_num
        FROM shop_cart
        LEFT JOIN shop
        USING(s_id)
        LEFT JOIN shop_spec
        USING(s_id)
        LEFT JOIN order_form
        USING (sca_id)
        WHERE of_num=${ofNum}
        GROUP BY sca_id`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    getAddress:function (uid,fn) {
        var sql=`SELECT *
        FROM address
        WHERE u_id=${uid}`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    payOrder:function (ofNum,aId,fn) {
        var sql=`UPDATE order_form SET a_id=${aId} WHERE of_num=${ofNum}`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    addPay:function (ofNum,fn) {
        // console.log(22222222)
        var sql=`INSERT INTO pay_form VALUES(NULL,'${ofNum}',DEFAULT)`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    checkCol:function (goodsId,userId,fn) {
        // console.log(22222222)
        var sql=`SELECT *
        FROM shop_col
        WHERE s_id=${goodsId} AND u_id=${userId}`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    addCol:function (goodsId,userId,fn) {
        // console.log(22222222)
        var sql=`INSERT INTO shop_col VALUES(NULL,${goodsId},${userId})`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    delCol:function (goodsId,userId,fn) {
        // console.log(22222222)
        var sql=`DELETE 
        FROM shop_col
        WHERE s_id=${goodsId} AND u_id=${userId} `;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    seleCart:function (goodsId,userId,fn) {
        // console.log(22222222)
        var sql=`SELECT sca_id,goods_num,(goods_num*ss_price) totalPrice
        FROM shop_cart
        LEFT JOIN shop_spec
        USING (s_id)
        WHERE u_id=${userId}
        ORDER BY sca_id DESC 
        LIMIT 0,1`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    delCart:function (scaId,fn) {
        console.log(scaId,555555)
        console.log(scaId[0].scaId);
        for(var i=0;i<scaId.length;i++){
            // console.log(i)
            var sql=`DELETE FROM shop_cart WHERE sca_id=${scaId[i].scaId}`;
            console.log(i)
            console.log(sql)
            db.query(sql,function (err,data) {
                // if(i==scaId.length-1){
                    // console.log(i)
                    fn(err,data);
                // }
            })
        }
        
    },
    delInventory:function (scaId,fn) {
        // console.log(44444)
        for(var i=0;i<scaId.length;i++){
            var sql=`UPDATE shop_spec SET ss_inventory=ss_inventory-${scaId[i].goodsNum} WHERE s_id=${scaId[i].sId} AND ss_color='${scaId[i].sColor}'`;
            db.query(sql,function (err,data) {
                // if(i==scaId.length-1){
                    fn(err,data);
                // }
            })
        }
        
    },
    delSaleVolume:function (scaId,fn) {
        // console.log(55555)
        for(var i=0;i<scaId.length;i++){
            var sql=`UPDATE shop SET s_salevolume=s_salevolume+${scaId[i].goodsNum} WHERE s_id=${scaId[i].sId}`;
            db.query(sql,function (err,data) {
                // if(i==scaId.length-1){
                    fn(err,data);
                // }
            })
        }
        
    },
    noPay:function (ofNum,fn) {
        // console.log(22222222)
        var sql=`INSERT INTO nopay_form VALUES(NULL,'${ofNum}',DEFAULT)`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    delCartGoods:function (scaId,fn) {
        // console.log(22222222)
        var sql=`DELETE FROM shop_cart where sca_id='${scaId}'`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    getGoodsInfo:function (goodsid,fn) {
        // console.log(22222222)
        var sql=`SELECT *
        FROM shop
        LEFT JOIN shop_spec
        USING (s_id)
        WHERE s_id=${goodsid}`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    changeGoodsInfo:function (goodsInfo,fn) {
        // console.log(goodsInfo)
        if(goodsInfo[0].goodsstate=='已上架'){
            goodsInfo[0].goodsstate=1;
        }else if(goodsInfo[0].goodsstate=='已下架'){
            goodsInfo[0].goodsstate=0;
        }
        // console.log(goodsInfo[0].update,goodsInfo[0].goodsstate,goodsInfo[0].goodsid)
        var sql=`UPDATE shop
        SET s_uptime='${goodsInfo[0].update}',
            s_state=${goodsInfo[0].goodsstate}
        WHERE s_id=${goodsInfo[0].goodsid}`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    updateGoodsInfo:function (goodsInfo,fn) {
        // console.log(goodsInfo)
        for(let i=0;i<goodsInfo.length;i++){
            var sql=`UPDATE shop_spec
            SET ss_price=${goodsInfo[i].price},
                ss_inventory=${goodsInfo[i].inventory}
            WHERE s_id=${goodsInfo[i].goodsid} AND ss_color='${goodsInfo[i].goodsspec}'`;
            db.query(sql,function (err,data) {
                if(i==goodsInfo.length-1){
                    fn(err,data);
                }
            })
        }
        
    },
    addGoods:function (goods,fn) {
        var sql=`INSERT INTO shop VALUES(NULL,'${goods.goodsname}','${goods.goodstype}','${goods.goodsupdate}',DEFAULT,DEFAULT,DEFAULT)`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    checkGoods:function (fn) {
        var sql=`SELECT s_id
        FROM shop
        ORDER BY s_id DESC
        LIMIT 0,1`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    addGoodsSc:function (goods,goodsid,fn) {
        var sql=`INSERT INTO shop_comment VALUES(NULL,${goodsid},DEFAULT,DEFAULT,DEFAULT,DEFAULT,DEFAULT)`;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    addGoodsSpec:function (goods,goodsid,fn) {
        for(let i=0;i<goods.length;i++){
            var sql=`INSERT INTO shop_spec VALUES(NULL,${goodsid},DEFAULT,'${goods[i].goodsspec}',DEFAULT,DEFAULT,DEFAULT)`;
            db.query(sql,function (err,data) {
                if(i==goods.length-1){
                    fn(err,data);
                }
            })
        }
        
    },
    setGoodsShow:function (goods,fn) {
        var sql=`UPDATE shop
                SET s_showimg='${goods[0].goodsimg}'
                WHERE s_id=${goods[0].goodsid}`;
            db.query(sql,function (err,data) {
            
                    fn(err,data);
                
            })
    },
    addGoodsDetail:function (goods,fn) {
        for(let i=0;i<goods.length;i++){
            var sql=`UPDATE shop_detail
                SET sd_detailImg='${goods[i].goodsimg}'
                WHERE s_id=${goods[0].goodsid}`;
            db.query(sql,function (err,data) {
                if(i==goods.length-1){
                    fn(err,data);
                }
            })
        }
        
    },
    addGoodsShow:function (goods,fn) {
        for(let i=0;i<goods.length;i++){
            var sql=`INSERT INTO shop_detail VALUES(NULL,${goods[i].goodsid},'${goods[i].goodsimg}',DEFAULT)`;
            db.query(sql,function (err,data) {
                if(i==goods.length-1){
                    fn(err,data);
                }
            })
        }
        
    },
    getGoodsData:function (goods,fn) {
        
            var sql=`SELECT ss_color,ss_price,ss_inventory
            FROM shop_spec
            WHERE s_id=${goods.goodsid}`;
            db.query(sql,function (err,data) {
                    fn(err,data);
                
            })
        
        
    },
    addSpecImg:function (goods,fn) {
        
        for(let i=0;i<goods.length;i++){
            var sql=`UPDATE shop_spec
            SET ss_price=${goods[i].price},
            ss_inventory=${goods[i].inventory},
            ss_colorImg='${goods[i].img}'
            WHERE s_id=${goods[i].goodsid} AND ss_color='${goods[i].spec}'`;
            db.query(sql,function (err,data) {
                if(i==goods.length-1){
                    fn(err,data);
                }
            })
        }
    },
};

module.exports=shoplistModel;