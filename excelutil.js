const fs = require('fs');
const xlsx = require('xlsx');
var json2xls = require('json2xls');
const {jsarray, getJson} = require("./jsontoarray");


function handle_sheet(){
    let work_book = xlsx.utils.book_new();
    const list= jsarray();
    // let data = {
    //     "carModel_in":{
    //        "drivemode":"automatic",
    //        "airbags":4,
    //        "backcamera":"present"
    //     },
    //     "price_in":{
    //        "automatic":30000,
    //        "manual":25000,
    //        "tax":18
    //     },
    //     "colors_in":[
    //        "blue",
    //        "green",
    //        "yellow"
    //     ]
    //  };
    let arr;
    for(let key of list){
        console.log("key ::", key);
        
        const data = getJson(key);
       //console.log("data ::", data, );


        arr = "["+JSON.stringify(data)+"]";

        let sheet = xlsx.utils.json_to_sheet(JSON.parse(arr));

        let keys = Object.keys(sheet);
        for(let i of keys){
            if (sheet[i]["t"] == undefined){
            let value = sheet[i];
            sheet[i]["v"]=JSON.stringify(value).replace(new RegExp('{','g'), "").replace(new RegExp('}','g'), "").replace(new RegExp('"','g'), "");
            sheet[i]["t"]="s";
            console.log("chabi ::", i);
            }
            
            //delete sheet[i]

        }
        console.log("sheet ::", sheet);
        




        let st = { 'A1': { 't': 's', 'v': 'carModel_in' },  'A2': { 't': 's', 'v': "{'drivemode': 'automatic', 'airbags': 4, 'backcamera': 'present'}" }, '!ref': 'A1:B2' };
        //console.log("sheet ::", sheet, " :: ", typeof sheet, " :: ", st);

        xlsx.utils.book_append_sheet(work_book,sheet, key.toString());
        xlsx.writeFile(work_book, "exceldata.xlsx");
        var xls = json2xls(data);
        //console.log("xls ::", xls);
        //fs.writeFileSync('exceldata.xlsx', xls, 'binary');
        

    }
    // var sheet = xlsx.utils.json_to_sheet(JSON.parse(arr));
    // console.log("key ::", sheet);
    // xlsx.utils.book_append_sheet(work_book,sheet, "main");
    // xlsx.writeFile(work_book, "exceldata.xlsx");
    // console.log("data ::", arr , JSON.parse(arr));
    

}

module.exports = handle_sheet;