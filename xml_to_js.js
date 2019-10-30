let fs = require("fs");
let convert = require('xml-js');

let xml = fs.readFileSync( './xml/DiaroBackup.xml', {encoding: 'utf-8'});

let result = convert.xml2json(xml, {compact: true, spaces: 4}); //resulted JSON, see data.json in generatedData to see it
let resultedJsObj = JSON.parse(result);
let entriesArr = resultedJsObj.data.table;

fs.writeFileSync("./generatedData/data.json", result, (err) => {
   if (err) throw err
   console.log("Not modified data saved at ./generatedData/data.json");
});

module.exports = entriesArr; //exporting entries only
