require('dotenv').config();
const mysql = require('mysql2')

function connectToDatabase() {

    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    
    return new Promise((resolve, reject) => {
        connection.connect(error => {
            if (error) {
                reject(error)
            }
            else {
                console.log('Database Connected')
                resolve(connection);
            };
        });
    });
};

module.exports = {
    connectToDatabase
}


