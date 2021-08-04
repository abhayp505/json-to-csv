const { createReadStream, createWriteStream } = require('fs');
const fs = require('fs');
const { AsyncParser, transforms: { unwind }} = require('json2csv');
const header = require("./header");
const rightHead = require("./converter");
const list= rightHead();
// const fields = ['datasets', 'level0tops', 'dataRestrictions', 'hotswaps', 'configsForIkeys', 'pcodeAdServer',
// 'lvl0topToView', 'tarnData', 'zippeLevel0topsAttributeMap', 'outgoingData'];
let fields = []
fields=JSON.parse(list);

//console.log("list ::", fields, typeof fields);


const opts = { fields };
const transforms = [unwind({ paths: ['colors'] })];
transforms._transform = (chunk, _, done) => {
    const rows = chunk
      .toString()
      .replace(/("\w{1,}":)|[\r\n\s{[\]]/g, "")
      .replace(/},|}/g, "\n");

    done(null, rows);
  };

const inputPath = "./sample.json"
const outputPath = "./data.csv"
// Using the promise API
const input = createReadStream(inputPath, { encoding: 'utf8' });
const asyncParser = new AsyncParser(opts, transforms);
let csvdata;
let parsingProcessor = asyncParser.fromInput(input);

parsingProcessor.promise()
  .then(csv => console.error(csv))
  .catch(err => console.error(err));

// Using the promise API just to know when the process finnish
// but not actually load the CSV in memory
console.log("csvdata ::", csvdata);
const output = createWriteStream(outputPath, { encoding: 'utf8' });
//const asyncParser = new JSON2CSVAsyncParser(opts, transformOpts);
//output = output.toString().replace(new RegExp('{','g'), "");
parsingProcessor = asyncParser.toOutput(output);

parsingProcessor.promise(false).catch(err => console.error(err));