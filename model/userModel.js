var mysql=require('mysql');
var db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'calorie'
});
var userModel={
    Duserpage:function (page,fn) {
        var sql='select * from users;';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    Duserbtn:function (fn) {
        var sql='select count(*) num from users';
        db.query(sql,function (err,data) {
            fn(err,data);
        });
    },
    Duserreset:function (id,fn) {
        var sql='UPDATE users SET u_pass="88888888" WHERE u_id="'+id+'";';
        db.query(sql,function (err,data) {
            fn(err,data);
        });
    },
    Dusersearch:function (str,page,fn) {
        var sql='SELECT u_id,u_name,u_account,u_phone,u_sex,u_img as sum FROM users WHERE u_id LIKE "%'+str+'%" OR u_name LIKE "%'+str+'%" OR u_account LIKE "%'+str+'%" OR u_phone LIKE "%'+str+'%" OR u_sex LIKE "%'+str+'%";';
        db.query(sql,function (err,data) {
            fn(err,data);
        });
    }
}
module.exports=userModel;