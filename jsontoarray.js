const fs = require('fs');
const inputjson = require("./7307.json");
const headFile = "./seter.json";


function jsarray(){
    const list1= Object.keys(inputjson);
    const list2 = []
   
    return list1;       
}

function getJson(key){
    const date = inputjson[key];
    const list2 = Object.keys(inputjson[key]);
    // console.log("key ::", key);
    // console.log("data ::", date);


    // const list2 = []
    // const values =[]
    // let headto;
    // for(let key of list1){
    //     let head;
    //     let headl3;
    //     head = Object.keys(inputjson[key]);
    //     list2.push(head);
    // }
    // console.log("list ::",JSON.stringify(list1));
    //console.log("list2 ::",JSON.stringify(list2), "\n", "\n");
    // for(let i=0; i<list1.length; i++){
    //     for(let keys of list2){
            
    //         for(j=0; j<keys.length;j++){
    //             if (inputjson[list1[i]][keys[j]] == undefined)
    //                 {
    //                     continue;
    //                 }
    //             else{
    //             console.log("keys list2 ::",list1[i], "::", keys[j]);
    //             console.log("values ::",JSON.stringify(inputjson[list1[i]][keys[j]]));
    //             }
    //         }
           
    //     }
        
    // }
    return date;
}

module.exports = {jsarray, getJson,};