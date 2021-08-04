const fs = require('fs');
const inputjson = require("./sample.json");
const headFile = "./seter.json";
function rightHead(){
const list1= Object.keys(inputjson);
const list2 = []
let headto;
for(let key of list1){
  let head;
  let headl3;
  for(let i=0; i < Object.keys(inputjson[key]).length; i++){
    head = key+"."+ Object.keys(inputjson[key])[i].toString();
    let level3=Object.keys(inputjson[key])[i];
    for(let l3 of Object.keys(inputjson[key][level3])){
      headl3 = head+"."+l3.toString();
      headto=headl3;
      list2.push(headl3)
      
    }
  }  
}
//console.log("list2 ::",JSON.stringify(list2));
//console.log("headFile ::", list2.toString().replace(new RegExp('"','g'), ""), Array.isArray(list2));

fs.writeFile(headFile, JSON.stringify(list2), err => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
  })
  return JSON.stringify(list2);
}
module.exports = rightHead;