const express = require('express');
var cors = require('cors');
const app = express();
const port = 4200;

var db = require("./database.js")
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is Alive')
})

app.get("/api/scores", (req, res, next) => {
    var sql = "select * from userscores order by numofsuccess desc"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

app.post("/api/user", (req, res, next) => {
    var errors=[]
    if (!req.body.name){
        errors.push("No name specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        numofsuccess: 0,
    }
    var sql ='INSERT INTO userscores (name, numofsuccess) VALUES (?,?)'
    var params =[data.name, data.numofsuccess]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

app.post("/api/increment/:id", (req, res, next) => {
    var sql = "select * from userscores where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        var sql =`UPDATE userscores SET numofsuccess=${row.numofsuccess +1} where id=${req.params.id}`
        db.run(sql , function (err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({
                "message": "success",
            })
        });
      });
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});