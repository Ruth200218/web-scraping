const { connectToDatabase } = require('./src/connect');
const { createTableIfNotExists } = require('./src/querys');
const { webScraping } = require('./src/scraper');


async function main() {
    try {
        const connection =  await connectToDatabase();
    
        await createTableIfNotExists(connection);
    
        await webScraping(connection);
    
        console.log("Web Scraping Successfully");

        connection.end();

        process.exit(0);
    } catch (error) {
        console.error('error to execute', error);
        process.exit(1);
    };
};

main();
