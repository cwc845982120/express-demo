var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var bodyParser = require('body-parser');
var app = express();

var server = new mongodb.Server('localhost',27017,{auto_reconnect:true});
var db = new mongodb.Db("express",server,{safe:false});
var resultLength = "";

//打开数据库连接
db.open(function(err,db){
    if(err){
        console.log(err);
        return false;
    }
    else
        console.log('MongoDB is connect!');
});

/* GET home page. */
router.get('/', function(req, res) {

        //连接到collection
        db.collection('cwc', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }else{
                res.render('index');
            }
        });
});
router.post('/userList', function(req, res) {
    // console.log(req.body);
    var userName = req.body.userName;
    var password = req.body.password;
    //连接到collection
    db.collection('cwc', function (err, collection) {
        if (err) {
            mongodb.close();
            return callback(err);//错误，返回 err 信息
        }else{
            var tmp = {"userName": userName,"password":password};
            collection.find(tmp).toArray(function (err, result) {
                // console.log(tmp);
                // console.log(result);
                resultLength = result.length;
                if(resultLength == 0){
                    res.json({success:false,result:result});
                }else{
                    res.json({success:true,result:result});
                }
            });
        }
    });
});

module.exports = router;
