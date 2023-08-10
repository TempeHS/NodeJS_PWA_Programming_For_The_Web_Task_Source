const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('.database/dataSource.db');

let myString = "";
db.all("SELECT * FROM extension", function(err, rows) {
  rows.forEach(function (row) {
    // console.log(row.extID + ": " + row.name + ": " + row.hyperlink + ": " + row.about + ": " + row.image + ": " + row.language);  
    myString = myString + "{ 'extID':'" + row.extID + "','name':'" + row.name + "','hyperlink':'" + row.hyperlink + "','about':'" + row.about + "','image':'" + row.image + "','language':'" + row.language + "' }";
  });

   // console.log(myString);
  var fs = require('fs');
  fs.writeFile("public/data.json", myString, function(err) {
    if (err) {
        console.log(err);
    }
});
 });