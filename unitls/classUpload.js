
var multer=require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {//指定硬盘保存的路径和文件位置
        cb(null, './public/images/class/upload')
    },
    filename: function (req, file, cb) {//指定文件名和扩展名
        var arr=file.originalname.split('.');
        cb(null,arr[0]+'.'+arr[1])
    }
});
var classUpload= multer({ storage: storage});
module.exports=classUpload;

