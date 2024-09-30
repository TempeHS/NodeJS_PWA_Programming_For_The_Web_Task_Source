/* Python Implementation, comment out js implementaion below before running

    const spawn = require("child_process").spawn;
    // you can add arguments with spawn('python',["path/to/script.py", arg1, arg2, ...])
    const pythonProcess = spawn('python',["database_manager.py"]);

*/

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('.database/data_source.db');

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
 let bodyParser = require('body-parser');
 app.use(bodyParser.urlencoded({extended: false}));
 
 app.get("/", function (req, res) {
   res.sendFile(path.join(__dirname, "public/index.html"));
   res.sendFile(path.join(__dirname,'.public/add.html'));
 });
  
 app.post('/add.html', function(req,res){
  db.serialize(()=>{
    db.run('INSERT INTO contact_list(email,name) VALUES(?,?)', [req.body.email, req.body.name], function(err) {
      if (err) {
        return console.log(err.message);
      }
      res.send("Thank you "+req.body.name+" we have added your email "+req.body.email+" to our distribution list.");
    });
});
});

app.listen(80, () => console.log("Server is running on Port 80, visit http://localhost:80/ or http://127.0.0.1:80 to access your website") );