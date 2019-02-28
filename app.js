var express=require('express');
var bodyParser=require('body-parser');
var release=require('./route/communityRoute.js');
var classRoute=require('./route/classRoute.js');
var multer=require('./unitls/upload.js');
var registerRoute=require('./route/registerRoute.js');
var loginRoute=require('./route/loginRoute.js');
var passRoute=require('./route/passRoute.js');
var serveFavicon=require('serve-favicon');
var shoplistRoute=require('./route/shoplistRoute.js');
var indexRoute=require('./route/indexRoute.js');
var loginSysterm=require('./route/loginSysterm.js');
var loginSystermModel=require('./model/loginSysterm.js');
var Usermanagement=require('./route/userRoute.js');
var classUpload=require('./unitls/classUpload.js');
var mine=require('./route/mineRoute.js');
var cors=require('cors');
var app=express();
var AV = require('leanengine');
app.use(cors({
    origin:['http://localhost:8080'],
    methods:['GET','POST'],
    alloweHeaders:['Content-Type','Authorization']
}));
app.use(serveFavicon(__dirname+'/public/images//shoppingmall/bitbug_favicon.ico'));
AV.init({
    appId: 'nN6SFCO9izixIRI1KYp4gADn-gzGzoHsz',
    appKey: '2VjTFBAwNjk0Cq3gGG8mvAgh',
    masterKey: 'I6B165IuDi1BOIMtKle61pdg'
});
app.use(AV.express());
app.get('/Dcode',function (req,res) {
    AV.Cloud.requestSmsCode({
        mobilePhoneNumber:req.query.phone,
        name: 'calorie',
        op: '欢迎您加入^_^',
        ttl: 10                     // 验证码有效时间为 10 分钟
    }).then(function(res){
        //调用成功
        res.send({"error":0})
    }, function(err){
        //调用失败
        res.send({"error":1})
    });
});
app.get('/Dregister',function (req,res) {
    AV.Cloud.verifySmsCode(req.query.code,req.query.phone).then(function(){
        //验证成功
        res.send({"error":0})
    }, function(err){
        //验证失败
        res.send({"error":1})
    });
});
app.post('/upload',multer.array('files',9),function (req,res) {
    res.send({error:0});
});
app.post('/uploads',multer.single('files'),function (req,res) {
    loginSystermModel.uploads(req.body.u_id,req.body.files,function (err,data) {
        if(err){
            console.log('数据库错误'+err)
        }else{
            res.send({error:0})
        }
    })
});
app.post('/uploadImg',multer.array('file'),function (req,res) {
    res.send({error:0});
});
app.post('/classUpload',classUpload.single('file'),function (req,res) {
    res.send({error:0});
});
app.use(express.static(__dirname+'/public'));
app.get('/',function (req,res) {
    res.redirect('/pages/login.html');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(release);//发布动态
app.use(classRoute);
app.use(registerRoute);
app.use(loginRoute);
app.use(passRoute);
app.use(shoplistRoute);
app.use(indexRoute);
app.use(loginSysterm);
app.use(Usermanagement);
app.use(mine);
app.listen(1015,function () {
    console.log('启动成功')
});