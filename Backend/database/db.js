const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'dev_user', 
    database: 'my_dev_db',
    password: 'password', 
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


// mysql -u dev_user -p my_dev_db

// const pool = mysql.createPool({
//         host: 'sql6.freesqldatabase.com',
//         port:'3306',
//         user: 'sql6684025', 
//         database: 'sql6684025',
//         password: 'Z6VDf7xCmJ', 
//         waitForConnections: true,
//         connectionLimit: 10,
//         queueLimit: 0
//     });
    

module.exports = pool ;
