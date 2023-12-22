const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('.database/dataSource.db');

let myString = '[\n';
db.all("SELECT * FROM extension", function(err, rows) {
  let myCounter = 0;
  rows.forEach(function (row) {
    // console.log(row.extID + ": " + row.name + ": " + row.hyperlink + ": " + row.about + ": " + row.image + ": " + row.language);  
    myString = myString + '{\n"extID":' + row.extID + ',\n"name":"' + row.name + '",\n"hyperlink":"' + row.hyperlink + '",\n"about":"' + row.about + '",\n"image":"' + row.image + '",\n"language":"' + row.language;
    myCounter++;
    if (myCounter == rows.length) {
      myString = myString + '"\n}\n';
    } else {
      myString = myString + '"\n},\n';
    }
  });

   // console.log(myString);
  var fs = require('fs');
  fs.writeFile("public/frontEndData.json", myString + "]", function(err) {
    if (err) {
        console.log(err);
    }
});
 });

 const express = require("express");
 const path = require("path");
 const app = express();
 app.use(express.static(path.join(__dirname, "public")));
 
 app.get("/", function (req, res) {
   res.sendFile(path.join(__dirname, "public/index.html"));
 });
 app.listen(8000, () => console.log("Server is running on Port 8000, visit http://localhost:8000/ or http://127.0.0.1:8000 to access your website") );
 