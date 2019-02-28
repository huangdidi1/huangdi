/**
 * Created by Administrator on 2018/12/6.
 */
var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'calorie'
});
var classModel={
    addData:function (data1,fn) {
        //字符串转json
        var json=JSON.parse(data1);
        var sql="INSERT INTO classtype3 VALUES(NULL,'"+json.name+"',"+json.region2+",'"+json.src+"','1X16”','./../images/class/classtype3/1/4/1.mp4','    <li>&nbsp;双手用力抱紧膝盖紧贴腹部上提</li><li>&nbsp;提膝同时踮起脚尖</li>',' <li>&nbsp;抬腿时吸气，还原时呼气</li>',' <li>&nbsp;抬腿时，臀部有一定的牵拉感</li>',' <li>&nbsp;错误：腿部提起幅度过小</li><li>&nbsp;解决：适当增加提腿幅度，感觉到臀部有一定的牵拉感</li>','  <li>抱紧膝盖</li><li>将膝盖拉向胸口 </li><li>脚尖踮起</li></ul>','./../images/class/classtype3/1/4/2','./../images/class/classtype3/1/4/3','./../images/class/classtype3/1/4/4.png');";
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    dataDelete:function (id,fn) {
        var sql=' DELETE  FROM classtype3 WHERE Type3_id='+id+'';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    classdata:function (id,fn) {
        var sql='SELECT * FROM (classtype3 INNER JOIN classtype2 ON classtype3.Type2_id=classtype2.Type2_id) INNER JOIN classtype1 ON classtype2.Type1_id=classtype1.Type1_id  WHERE Type3_id='+id+''
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    classtypeCount:function (fn) {
        var sql='SELECT COUNT(*) num FROM (classtype3 INNER JOIN classtype2 ON classtype3.Type2_id=classtype2.Type2_id) INNER JOIN classtype1 ON classtype2.Type1_id=classtype1.Type1_id'
          db.query(sql,function (err,data) {
              fn(err,data)
          })
    },
    classtypeAll:function(fn){
        var sql='SELECT Type3_id,Type3_name,Type3_time,Type3_src,Type1_name FROM (classtype3 INNER JOIN classtype2 ON classtype3.Type2_id=classtype2.Type2_id) INNER JOIN classtype1 ON classtype2.Type1_id=classtype1.Type1_id'
         db.query(sql,function(err,data){
        fn(err,data);
    })
    },
    //classtype1页面加载时
    onload1:function (fn) {
            var sql = 'SELECT *,COUNT(Type2_id) num FROM classtype1 LEFT JOIN classtype2 USING (Type1_id) WHERE Type1_type=1 GROUP BY Type1_id';
            db.query(sql,function (err,data) {
                fn(err,data);

            })
        },
    onload2:function (fn) {
        var sql = 'SELECT * FROM classtype1 WHERE Type1_type=2';
        db.query(sql,function (err,data) {
            fn(err,data);

        })
    },
    //2.classtype1 点击动作分类/点击更多分类
    type11:function (id11,fn) {
            var sql = 'SELECT * FROM classtype2 WHERE Type1_id='+ id11 + '';
            db.query(sql,function (err,data) {
                fn(err,data);
            })
        },
    type12:function (id12,fn) {
            var sql = 'SELECT * FROM classtype3 WHERE Type2_id=' + id12 + '';
            db.query(sql,function (err,data) {
                fn(err,data);
            })
        }, 
    type2:function (id2,fn) {
            var sql = 'SELECT * FROM classtype3 WHERE Type2_id=' + id2 + '';
            db.query(sql,function (err,data) {
                fn(err,data);
            })
        },
    type1data:function (id,fn) {
        var sql = 'SELECT * FROM classtype1 WHERE Type1_id=' + id + '';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    type2data:function (id,fn) {
        var sql = 'SELECT * FROM classtype2 WHERE Type2_id=' + id + '';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    type3data:function (id,fn) {
        var sql = 'SELECT * FROM classtype3 WHERE Type3_id=' + id + '';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    collect:function (uid,cid,fn) {
            var sql='INSERT INTO collect2 VALUES(NULL,'+uid+','+cid+')';
            db.query(sql,function (err,data) {

                fn(err,data)
        })
    },
    nocollect:function (uid,cid,fn) {
            var sql='DELETE  FROM  collect2 WHERE u_id='+uid+' AND Type3_id='+cid+'';
          db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    selectcollect:function (uid,cid,fn) {
        var sql='SELECT * FROM  collect2 WHERE u_id='+uid+' AND Type3_id='+cid+'';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    }
};
module.exports=classModel;
