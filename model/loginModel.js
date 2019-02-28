var mysql=require('mysql');
var db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'calorie'
});
var loginModel={
    Dphone:function (phone,fn) {
        var sql='select * from users where u_phone="'+phone+'";';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    Dlogin:function (user,pass,fn) {
        var sql='select * from users where u_account="'+user+'" and u_pass="'+pass+'";';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    }
}
module.exports=loginModel;