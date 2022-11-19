var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Unable to open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE userscores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            numofsuccess integer
            )`,
        (err) => {
            if (err) {
                //table already created
                console.error(err.message)
            }
            // else{
            //     // Table just created, creating some rows
            //     var insert = 'INSERT INTO userscores (name, numofsuccess) VALUES (?,?)'
            //     db.run(insert, ["test1", 5])
            // }
        });  
    }
});


module.exports = db