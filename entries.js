let entriesArr = require('./xml_to_js.js');
//console.log(entriesArr);

let initilize = (elm) => {
    return {
        id : elm.uid._text,
        utc : elm.tz_offset._text,
        date : elm.date._text,
        title : elm.title._text,
        text : elm.text._text,
        weather_temperature : elm.weather_temperature._text,
        get mood () {
            let arr = ["No Mood","Awesome","Happy","Neutral","Bad","Awful"];
            return arr[elm.mood._text]
        }
    }
};
let textEntry = entriesArr.find((element) => element._attributes.name == "diaro_entries");
let entries = textEntry.r.map(initilize);
//console.log(entries[0].mood);
let attachEntry = entriesArr.find((element) => element._attributes.name == "diaro_attachments");
let imagesId = attachEntry.r.map(x => x.entry_uid._text);
//console.log(imagesId); 
imagesId.forEach( (x,i) => {
    let entry = entries.find((element) => element.id == x);
    if(entry.photo == undefined){
        entry.photo = [];
    }
    entry.photo.push("./xml/media/photo/" + attachEntry.r[i].filename._text);
    //console.log(entry);
});

let fs = require("fs");
fs.writeFile("./generatedData/entries.json", JSON.stringify(entries), (err) => {
    if (err) throw err
    console.log("modified entries data saved at ./generatedData/entries.json");
 });
module.exports = entries.reverse(); //Entries starting from the latest, see entries.json in generatedData folder to see it



