const { connectToDatabase } = require('./connect');

// Check if the table exits
connectToDatabase();
function createTableIfNotExists(connection) {
    return new Promise((resolve, reject) => {
        const query = `
        CREATE TABLE IF NOT EXISTS contact_info (
            id INT AUTO_INCREMENT PRIMARY KEY,
            url VARCHAR(255) NOT NULL,
            phone_number VARCHAR(20),
            email VARCHAR(255)
        )`;
        connection.query(query, error => {
            if (error) {
                reject(error);
            } else {
                console.log("table is created or already exits");
                resolve();
            };
        });
    });
};

//Inser Data on Data Base
async function insertData(connection, url, phoneNumber, email) {
    return new Promise((resolve, reject) => {
        const checkIfDataExits = "SELECT COUNT(*) AS count FROM contact_info WHERE url = ? AND (phone_number = ? OR email = ?)";
        connection.query(checkIfDataExits, [url, phoneNumber, email], (error, results) => {
            if (error) {
                reject(error);
                return;
            }
            const recordCount = results[0].count;

            if (recordCount > 0) {
                console.log(`Data already exits for ${url}`);
                resolve();
                return;
            }
    
            const insertDataQuery = "INSERT INTO contact_info (url, phone_number, email) VALUES (?, ?, ?)";
            connection.query(insertDataQuery, [url, phoneNumber, email], error => {
                if(error) {
                    reject(error);
                } else {
                    console.log(`Data is inserted for ${url}`);
                    resolve();
                };
            });

        });
    });
};

module.exports = {
    createTableIfNotExists,
    insertData
};