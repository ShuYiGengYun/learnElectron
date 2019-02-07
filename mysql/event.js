const mysql = require('mysql');
const fs = require('fs');
let db = null;
let conn = null;

//  打开数据库;
function onClick_OpenDatabase() {
    conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'test',
        port: 3306,
    });
    const createTableSQL = `create table if not exists t_products(
                          id integer primary key auto_increment,
                          product_name varchar(100) not null,
                          price float not null  )`;
//    创建数据表;
    conn.query(createTableSQL, (error, result) => {
        if (error) throw error;
        const clearSQL = `delete from t_products`;
        conn.query(clearSQL, [], (error, result) => {
            console.log(`打开数据库成功`);
            button_create.disabled = true;
            button_insert.disabled = false;
        })
    })
}


// 创建数据库;
function onClick_CreateDatabase() {
    fs.exists('test.db', function (isExists) {
        if (isExists) {
            fs.unlinkSync('test.db');
        }
        db = new sqlite3.Database('test.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (erro) => {
            if (erro) throw erro;
            console.log(`连接数据库成功`);
            const createDatabaseSQL = `
                create table if not exists t_products (
                    id integer primary key autoincrement,
                    product_name varchar(100) not null,
                    price float not null
                )`;
            db.run(createDatabaseSQL, (erro) => {
                if (erro) throw erro;
                button_create.disabled = true;
                button_insert.disabled = false;
            });
        })
    })
}


// 插入记录;
function onClick_Insert() {
    if (!conn) return false;
    const insertSQL = 'insert into t_products(product_name,price) select "iPhone10",10000 union all select "Android手机",8888 union all select "特斯拉",888888;';
    conn.query(insertSQL, (error) => {
        if (error) throw error;
        console.log(`插入记录成功`);
        button_insert.disabled = true;
        button_query.disabled = false;
        button_update.disabled = false;
        button_delete.disabled = false;
    });
}

//  查询记录;
function onClick_Query() {
    if (!conn) return false;
    const querySQL = `select * from t_products`;
    conn.query(querySQL, (error, result) => {
        if (error) throw error;
        console.log(result);
    });
}

// 更新记录;
function onClick_Update() {
    if (!conn) return false;
    const updateSQL = `update t_products set price = 999999 WHERE id = 3`;
    conn.query(updateSQL, (error, result) => {
        if (error) throw error;
        console.log(`更新成功`);
    });
}

function onClick_Delete() {
    if (!conn) return false;
    const deleteSQL = `delete from t_products WHERE id = 3`;
    conn.query(deleteSQL, (error, result) => {
        console.log(`删除记录成功`);
    });
}

