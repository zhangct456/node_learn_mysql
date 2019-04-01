var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('../util/userSqlMapping');
 
// 使用连接池，提升性能
var pool = mysql.createPool($conf.mysql);
 
module.exports = {
    userLogin: function (req, res, next) {
    	pool.getConnection(function(err,connection) {
    		var param = req.body;
    		var sql = $sql.query;
    		var queryData = [];
			sql += " and name=?";
			queryData.push(param.userName);
			sql += " and password=?";
			queryData.push(param.password);
			sql += " and permission<31";
			console.log(sql);
			console.log(queryData);
    		connection.query(sql, queryData, function(err, result){
    			if(result&&result.length!=0) {
                    result = {
                        code: 200,
                        msg: '查询成功',
                    }; 
                }else{
                	result = {
                		code: 500,
                		msg: '查询失败'
                	}
                }
                console.log("query :"+JSON.stringify(param));
                console.log("sql   :"+sql);
                console.log("data  :"+queryData);
                res.send(result);
                connection.release();
                console.log("close connection");
    		});
    	});
    },
    managerLogin: function (req, res, next) {
    	pool.getConnection(function(err,connection) {
    		var param = req.body;
    		var sql = $sql.query;
    		var queryData = [];
			sql += " and name=?";
			queryData.push(param.userName);
			sql += " and password=?";
			queryData.push(param.password);
			sql += " and permission=31";
			console.log(sql);
			console.log(queryData);
    		connection.query(sql, queryData, function(err, result){
    			if(result&&result.length!=0) {
                    result = {
                        code: 200,
                        msg: '查询成功',
                    }; 
                }else{
                	result = {
                		code: 500,
                		msg: '查询失败'
                	}
                }
                console.log("query :"+JSON.stringify(param));
                console.log("sql   :"+sql);
                console.log("data  :"+queryData);
                res.send(result);
                connection.release();
                console.log("close connection");
    		});
    	});
    }
};
