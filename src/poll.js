import csv from 'csv-parser';
import { createReadStream } from 'fs';
const results = [];

export default function(path){
createReadStream(path)
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });
}
