var mysql=require('mysql');
var db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'calorie'
});
var passModel={
    Dnext:function (user,fn) {
        var sql='select * from users where u_account="'+user+'";';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    Dreset:function (phone,pass,fn) {
        var sql='UPDATE users SET u_pass="'+pass+'" WHERE u_phone="'+phone+'";';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    }
}
module.exports=passModel;