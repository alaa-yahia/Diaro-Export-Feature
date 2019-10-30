let entries = require('./entries.js');
let fs = require("fs");

const createEntryHtml = (entry) => {
    let entryHtml = "<div class = 'container'>";
    if (entry.title){
        entryHtml = entryHtml + `<h3>${entry.title}</h3>`;
    }
    entryHtml += `
    <p>${new Date(parseInt(entry.date))}</p>
    <p class="entry">${entry.text}</p>
    <span><strong>Weather:</strong>${entry.weather_temperature}</span>
    <span><strong>My Mood:</strong>${entry.mood}</span>
    `;

    if (entry.photo) {
        entryHtml += entry.photo.map((path) => 
        `<img src=".${path}">`).join("");
    };
    entryHtml += "<hr></div>";
    return entryHtml;
};

const createHtml = (entries) => 
`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
        * {
            font-family: monospace;
            line-height: 2;
            margin: 5%;
            font-size: 16px;
            
        }
        .entry{
            white-space: pre-line;
            dir:auto
       
        }
        h3 {
            text-decoration: underline
        }
        img {
            width: 40%;
            height: 30%;
        }
        </style>
        <title>Diaro Entries</title>
    </head>
    <body>
      ${entries}
    </body>
</html>`;

const entriesHtml = entries.map(createEntryHtml).join("");
const html = createHtml(entriesHtml);

//create The HTML File
fs.writeFileSync("./generatedFiles/entries.html", html, (err) => {
    if (err) throw err
    console.log("HTML File saved at ./generatedFiles/entries.html");
 });

 //create The PDF File without images
if( process.argv.includes("-pdf") && !process.argv.includes("-img")) {
    const pdf = require('html-pdf');
    //let html = fs.readFileSync("./generatedFiles/entries.html", 'utf8');
    let options = { format: 'Letter' };
    
    pdf.create(html, options).toFile('./generatedFiles/entries_without_images.pdf', function(err) {
        if (err) return console.log(err);
        console.log("PDF File without images saved at ./generatedFiles/entries_without_images.pdf");
        });
};  

////create The PDF File with images
if( process.argv.includes("-pdf") && process.argv.includes("-img")) {
    const puppeteer = require('puppeteer');
    const path = require('path');
    (async () => {
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        headless: true,
        args: [
            '--auto-open-devtools-for-tabs',
            '--disable-dev-shm-usage'
        ]
    });
    const page = await browser.newPage();
    await page.goto(path.resolve('./generatedFiles/entries.html'), {waitUntil: 'networkidle2'});
    await page.pdf({path: './generatedFiles/entries_with_images.pdf', format: 'A4'});
    await browser.close();
    console.log("PDF File with images saved at ./generatedFiles/entries_with_images.pdf");
    })();
}