var mysql=require('mysql');
var db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'calorie'
});
var registerModel={
    Dname:function (name,fn) {
        var sql='select * from users where u_name="'+name+'";';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    Duser:function (user,fn) {
        var sql='select * from users wh' + 'ere u_account="'+user+'";';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    Dsubmit:function (name,user,pass,phone,fn) {
        var sql='INSERT INTO users(u_name,u_account,u_pass,u_phone) VALUES("'+name+'","'+user+'","'+pass+'","'+phone+'");';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    }
}
module.exports=registerModel;