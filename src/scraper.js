const { default: puppeteer } = require("puppeteer");
const { insertData } = require('./querys');
const webSites = require('./webSites');

// Web Scraping 
async function webScraping(connection) {
    const browser = await puppeteer.launch({
        headless: false,
    });

    const page = await browser.newPage();
  
    for (const webSite of webSites) {
        console.log(`/********** init process ${webSite} **********/`);
        try {            
            await page.goto(webSite);
    
            const url = webSite;
    
            const phoneNumberData = await extractPhoneNumber(page);
            
            const emailData = await extractEmail(page);
    
            let phoneNumber = phoneNumberData.phoneNumber ? phoneNumberData.phoneNumber : null;

            let email = emailData.email ? emailData.email : null;

            await insertData(connection, url, phoneNumber, email);

            console.log(`${phoneNumberData.message} and ${emailData.message} at ${url}: phone: ${phoneNumberData.phoneNumber} email: ${emailData.email}`);

            console.log(`/********** process finished **********/`);

        } catch (error) {
            console.error(`Error to load ${webSite}: ${error}`);
            console.log(`/********** process finished **********/`);
            continue;
        }
        
    };
    
    await browser.close();
};

async function extractPhoneNumber(page) {
    const content = await page.content();

    const phoneValidation = /(\+\d{1,3}\s?)?((\(\d{1,3}\))|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}\b/g;

    const match = content.match(phoneValidation);
    
    if(match) {
        return { phoneNumber: match[0], message: 'Phone number found' }
    } else {
        return { phoneNumber: null, message: 'Phone number not found' }
    };
};


async function extractEmail(page){
    const content = await page.content();

    const emailValidation = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b(?!.*\.(?:png|jpg|jpeg|gif|bmp|svg|ico))/g;

    const match = content.match(emailValidation);

    if(match) {
        return { email: match[0], message: 'Email found' };
    } else {
        return { email: null, message: 'Email not found'};
    };
};

module.exports = {
    webScraping,
    extractPhoneNumber,
    extractEmail
};