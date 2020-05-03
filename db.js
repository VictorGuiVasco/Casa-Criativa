const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./web.db')

db.serialize(function() {
    //Create table
    db.run(`

        CREATE TABLE IF NOT EXISTS ideas(
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           image TEXT,
           title TEXT,
           category TEXT,
           description TEXT,
           link TEXT 
        );
    `)

    //into table
    
    /* const query = `
    insert into ideas(
        image,
        title,
        category,
        description,
        link
    ) values (?, ?, ?, ?, ?);
    `

    const values = [
        "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        'Cursos de Programação',
        'Estudo',
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit',
        'http://google.com',
    ]

    db.run(query, values, function(err) {
        if (err) return console.log(err)

        console.log(this)
    }) */
    
    //delete table
    /* db.run(`delete from ideas where id = ?`, [1], function(err) {
        if (err) return console.log(err)

        console.log("Deletado", this)
    }) */

    //list table

    /* db.all(`select * from ideas`, function(err, rows) {
        if (err) return console.log(err)

        console.log(rows)
    }) */

})

module.exports = db