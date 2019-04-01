var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('../util/userSqlMapping');
 
// 使用连接池，提升性能
var pool = mysql.createPool($conf.mysql);
 
// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code:'1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};
module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.body;
            // 建立连接，向表中插入值
            //name, gender, age, phone, email, graduate, major, address
            var sqlData = [
	            param.name,param.password,param.gender,param.age,param.phone,
	            param.email,param.address
            ]
            connection.query($sql.insert, sqlData, function(err, result) {
                if(result) {
                    result = {
                        code: 200,
                        msg:'增加成功'
                    }; 
                }else{
                	result = {
                		code: 500,
                		msg:'增加失败'
                	}
                }
                // 以json形式，把操作结果返回给前台页面
//              jsonWrite(res, result);
				console.log("insert:"+JSON.stringify(param));
                res.send(result);
                // 释放连接 
                connection.release();
                console.log("close connection")
            });
        });
    },
    delete: function (req, res, next) {
    	pool.getConnection(function(err,connection) {
    		var param = req.body;
    		connection.query($sql.delete, [param.id], function(err, result){
    			if(result) {
                    result = {
                        code: 200,
                        msg:'删除成功'
                    }; 
                }else{
                	result = {
                		code: 500,
                		msg:'删除失败'
                	}
                }
                console.log("delete:"+JSON.stringify(param));
                res.send(result);
                connection.release();
                console.log("close connection");
    		});
    	});
    },
    update: function (req, res, next) {
    	pool.getConnection(function(err,connection) {
    		var param = req.body;
    		var sqlData = [
	            param.name,param.password,param.gender,param.age,param.phone,
	            param.email,param.address,param.id
            ]
    		connection.query($sql.update, sqlData, function(err, result){
    			if(result) {
                    result = {
                        code: 200,
                        msg:'修改成功'
                    }; 
                }else{
                	result = {
                		code: 500,
                		msg:'修改失败'
                	}
                }
                console.log("update:"+JSON.stringify(param));
                res.send(result);
                connection.release();
                console.log("close connection");
    		});
    	});
    },
    query: function (req, res, next) {
    	pool.getConnection(function(err,connection) {
    		var param = req.body;
    		var sql = $sql.query;
    		var queryData = [];
			Object.keys(param).forEach(function (key) {
				var value = param[key];
				if(!(value === '')){
					if(typeof value == 'number'){
						sql += " and "+key+'=?';
						queryData.push(value);
					}
					if(typeof value == 'string'){
						sql += " and "+key+" like '%"+value+"%'";
					}
				}
			});
			console.log(sql);
			console.log(queryData);
    		connection.query(sql, queryData, function(err, result){
    			if(result) {
                    result = {
                        code: 200,
                        msg: '查询成功',
                        data: result
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
