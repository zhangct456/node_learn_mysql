// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
    insert:'INSERT INTO user(id, name, password, gender, age, phone, email, address) VALUES(0,?,?,?,?,?,?,?)',
    update:'update user set name=?, password=?, gender=?, age=?, phone=?, email=?, address=?  where id=?',
    delete: 'delete from user where id=?',
    query: 'select * from user where 1=1'
};
 
module.exports = user;