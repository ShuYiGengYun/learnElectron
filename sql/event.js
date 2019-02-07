const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
let db = null;

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
    if (!db) return false;
    const insertSQL = 'insert into t_products(product_name,price) select "iPhone10",10000 union all select "Android手机",8888 union all select "特斯拉",888888;';
    db.run(insertSQL, (error) => {
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
    if (!db) return false;
    const querySQL = `select * from t_products`;
    db.all(querySQL, [], (error, rows) => {
        if (error) throw error;
        console.log(rows);
    });
}

// 更新记录;
function onClick_Update() {
    if (!db) return false;
    const updateSQL = `update t_products set price = 999999 WHERE id = 3`;
    db.run(updateSQL, (error) => {
        if (error) throw error;
        console.log(`更新数据库成功`);
    });
}

function onClick_Delete() {
    if (!db) return false;
    const deleteSQL = `delete from t_products WHERE id = 3`;
    db.run(deleteSQL, (error) => {
        if (error) throw error;
        console.log(`删除成功`);
    });
}

