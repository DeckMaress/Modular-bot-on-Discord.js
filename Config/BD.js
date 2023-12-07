const mysql = require('mysql2');
module.exports = async function (sql) {
    const con = await mysql.createConnection({
        host: '',
        user: '',
        port: '',
        password: '',
        database: ''
    }).promise();
    const sqlget = await con.execute(sql);
    await con.end();
    return sqlget;
}