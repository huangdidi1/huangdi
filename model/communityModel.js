/**
 * Created by Administrator on 2018/12/5.
 */
var mysql=require('mysql');
var communityModel={
    release:function f(id,content,time,fn,fnn){
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql1='INSERT INTO push VALUES(NULL,"'+content+'",'+id+',0,0,"false",0,"'+time+'");';
        var sql2='SELECT p_id FROM push WHERE u_id='+id+' ORDER BY p_id DESC LIMIT 0,1;';
        db.query(sql1,function (err,data) {
            if(fn(err,data)){
                db.query(sql2,function (err,data) {
                    fnn(err,data)
                })
            }
        })
    },
    qq:function f(name,id,fn) {
        console.log(name);
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        name=name.split('%');
        for(var i=0;i<name.length;i++){
            var sql='INSERT INTO qqimg VALUES(NULL,"'+id+'","'+name[i]+'");';
            db.query(sql,function (err,datas) {
                fn(err,datas)
            })
        }
    },
    img:function f(src,id,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        src=src.split('|');
        for(var i=0;i<src.length;i++){
            if(src[i]){
                var sql='INSERT INTO pushimg VALUES(NULL,"'+id+'","../images/push/'+src[i]+'");';
                db.query(sql,function (err,datass) {
                    fn(err,datass)
                })
            }else{
                var sql='INSERT INTO pushimg VALUES(NULL,"'+id+'","'+src[i]+'");';
                db.query(sql,function (err,datass) {
                    fn(err,datass)
                })
            }
        }
    },
    loadpush:function f(fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='SELECT * FROM push';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    loadpushqq:function f(fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='SELECT * FROM qqimg;';
        db.query(sql,function (err,datas) {
            fn(err,datas)
        })
    },
    loadpushimg:function f(fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='SELECT * FROM pushimg;';
        db.query(sql,function (err,data1) {
            fn(err,data1)
        })

    },
    inloaduser:function f(u_id,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='SELECT * FROM users WHERE u_id='+u_id+';';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    inloadp:function f(p_id,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='SELECT * FROM push WHERE p_id='+p_id+';';
        db.query(sql,function (err,datas) {
            fn(err,datas)
        })
    },
    qqsrc:function f(p_id,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='SELECT pi_qqimg FROM qqimg WHERE p_id='+p_id+';';
        db.query(sql,function (err,data1) {
            fn(err,data1)
        })
    },
    imgsrc:function f(p_id,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='SELECT pi_img FROM pushimg WHERE p_id='+p_id+';';
        db.query(sql,function (err,data2) {
            fn(err,data2)
        })
    },
    discuss:function f(u_id,p_id,name,content,time,fn,fnn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='INSERT INTO discuss VALUES(NULL,'+p_id+','+u_id+',"'+content+'","'+name+'","'+time+'");';
        var sql2='SELECT d_id FROM discuss WHERE u_id='+u_id+' ORDER BY d_id DESC LIMIT 0,1;';
        db.query(sql,function (err,data) {
            if(fn(err,data)){
                db.query(sql2,function (err,data1) {
                    fnn(err,data1)
                })
            }
        })
    },
    ui:function f(u_id,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='SELECT * FROM users WHERE u_id='+u_id+';';
        db.query(sql,function (err,data2) {
            fn(err,data2)
        })
    },
    reply:function f(r_newid,r_oldid,d_id,content,src,time,p_id,r_newname,r_oldname,r_oldsrc,r_newsrc,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='INSERT INTO reply VALUES(NULL,'+p_id+','+r_newid+','+r_oldid+','+d_id+',"'+src+'","'+time+'",NULL,"'+content+'","'+r_newname+'","'+r_oldname+'","'+r_newsrc+'","'+r_oldsrc+'")';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    update:function f(p_id,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='UPDATE push SET p_discuss=p_discuss+1 WHERE p_id='+p_id+';';
        db.query(sql,function (err,data3) {
            fn(err,data3)
        })
    },
    reply1:function f(r_newid,r_oldid,d_id,content,src,time,p_id,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='INSERT INTO reply VALUES(NULL,'+p_id+','+r_newid+','+r_oldid+','+d_id+',"'+src+'","'+time+'",NULL,"'+content+'","'+r_newname+'","'+r_oldname+'","'+r_newsrc+'","'+r_oldsrc+'")';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    dis:function f(p_id,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='SELECT * FROM discuss LEFT JOIN users USING(u_id) WHERE discuss.p_id='+p_id+';';
        db.query(sql,function (err,data3) {
            fn(err,data3)
        })
    },
    rep:function f(p_id,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='SELECT * FROM reply WHERE p_id='+p_id+';';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    collect:function f(u_id,p_id,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='INSERT INTO collect VALUES(NULL,'+u_id+','+p_id+');';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    zan:function f(u_id,p_id,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='INSERT INTO zan VALUES(NULL,'+u_id+','+p_id+');';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    iscollect:function f(u_id,p_id,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='SELECT * FROM collect WHERE p_id='+p_id+' AND u_id='+u_id+';';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    iszan:function f(u_id,p_id,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='SELECT * FROM zan WHERE p_id='+p_id+' AND u_id='+u_id+';';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    uncollect:function f(u_id,p_id,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='DELETE FROM collect WHERE p_id='+p_id+' AND u_id='+u_id+';';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    unzan:function f(u_id,p_id,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='DELETE FROM zan WHERE p_id='+p_id+' AND u_id='+u_id+';';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    upzan:function f(p_id,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='UPDATE push SET p_zan=p_zan+1 WHERE p_id='+p_id+';';
        db.query(sql,function (err,data3) {
            fn(err,data3)
        })
    },
    upzanc:function f(p_id,fn){
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='UPDATE push SET p_zan=p_zan-1 WHERE p_id='+p_id+';';
        db.query(sql,function (err,data3) {
            fn(err,data3)
        })
    },
    find:function f(d_id,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='SELECT * FROM reply WHERE d_id='+d_id+';';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    delr:function f(d_id,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='DELETE FROM reply WHERE d_id='+d_id+';';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    deld:function f(d_id,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='DELETE FROM discuss WHERE d_id='+d_id+';';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    updis:function f(p_id,n,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='UPDATE push SET p_discuss=p_discuss-'+n+' WHERE p_id='+p_id+';';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    delrpy:function f(r_id,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='DELETE FROM reply WHERE r_id='+r_id+';';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    }
};
module.exports=communityModel;