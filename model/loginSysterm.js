/**
 * Created by Administrator on 2019/1/2.
 */
var mysql=require('mysql');
var loginSysterm={
    loginSystermM:function (u_account,u_pass,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='SELECT * FROM userss WHERE u_account="'+u_account+'" AND u_pass="'+u_pass+'";';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    findUser:function (u_id,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='SELECT * FROM userss WHERE u_id='+u_id+';';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    setPass:function (u_id,oldpass,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='SELECT * FROM userss WHERE u_id='+u_id+' and u_pass="'+oldpass+'";';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    setNewPass:function (u_id,newpass,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='UPDATE userss SET u_pass="'+newpass+'" WHERE u_id='+u_id+'';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    uploads:function (u_id,img,fn) {
        var db=mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'calorie'
        });
        var sql='UPDATE userss SET u_img="'+img+'" WHERE u_id='+u_id+'';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    }
};
module.exports=loginSysterm;