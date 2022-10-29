//JSON.parse() method parses a JSON string, constructing the JavaScript value or object described by the string. First param is the json string, 
//second param is a function that can be used to transform the results. The function takes two params, key and value. 
const fs=require('fs');
const prompt = require('prompt-sync')();
function listAllWeaveFiles(){
fs.readdir('./data', (err, files) => {
    if (err)
      console.log(err);
    else {
      console.log("Current directory filenames:");
      files.forEach(file => {
        console.log(typeof(file));
      })
    }
  })
}

function getObjectSyncFromJson(path){
    return JSON.parse(fs.readFileSync(path, 'utf8', (err, jsonString) => {
        if (err) console.log("File read failed:", err)
    }));
}
function writeObjectAsyncToJson(newObject){
let newObjString = JSON.stringify(newObject);
fs.writeFile(`./data/${newObject.name}.json`, newObjString , err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})
}
function convertToArrayIfNeeded(input)
{
    if(input.split(',').length>1){
        return input.split(',').map((item)=>{return item.trim()})
    }else{
        return input.trim();
    }
}
function newWeaveInformationCollection(){
    let newWeave = {};
    let template = getObjectSyncFromJson('./data/template.json');
    for (let key in template){
        if(typeof(template[key]) != 'object'){
        newWeave[key] = prompt(`${template[key]}: `);
        newWeave[key]=convertToArrayIfNeeded(newWeave[key]);
        }else{
            newWeave[key] = {};
            for(let subKey in template[key]){
                newWeave[key][subKey] = prompt(`${template[key][subKey]}: `);
                newWeave[key][subKey]=convertToArrayIfNeeded(newWeave[key][subKey]);
            }
        }
    }
    return newWeave;
}   
function addWeave(){
    let newWeave = newWeaveInformationCollection();
    writeObjectAsyncToJson(newWeave);
}
listAllWeaveFiles();
//addWeave();
