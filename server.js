const express = require("express")
const server = express()

const db = require('./db')

/* 
const ideas = [
    {
        img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
        title: 'Cursos de Programação',
        category: 'Estudo',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit',
        url: 'http://google.com',
    },

    {
        img: 'https://image.flaticon.com/icons/svg/2729/2729032.svg',
        title: 'Karaokê',
        category: 'Diversão em familia',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit',
        url: 'http://google.com',
    },

    {
        img: 'https://image.flaticon.com/icons/svg/2729/2729038.svg',
        title: 'Pintura',
        category: 'Criatividade',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit',
        url: 'http://google.com',
    },

    {
        img: 'https://image.flaticon.com/icons/svg/2729/2729048.svg',
        title: 'Recortes',
        category: 'Criatividade',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit',
        url: 'http://google.com',
    },
] */

server.use(express.static("public"))
server.use(express.urlencoded({extended: true}))

const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})

server.get("/", function (req, resp) {

    db.all(`select * from ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return  resp.send("Erro no danco de Dados")
        }

        const reversedIdeas = [...rows].reverse()

        let lastIdeas = []
        for (let idea of reversedIdeas) {
            if (lastIdeas.length < 2) {
                lastIdeas.push(idea)
            }
        }

        return resp.render("index.html", { ideas: lastIdeas })
    })

})

server.get("/ideias", function (req, resp) {
    db.all(`select * from ideas`, function (err, rows) {
        if (err) {
            console.log(err)
            return  resp.send("Erro no danco de Dados")
        }
        const reversedIdeas = [...rows].reverse()
    return resp.render("ideias.html", { ideas: reversedIdeas })
    })
})

server.post("/", function (req, resp) {
    const query = `
    insert into ideas(
        image,
        title,
        category,
        description,
        link
    ) values (?, ?, ?, ?, ?);
    `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function(err) {
        if (err) {
            console.log(err)
            return  resp.send("Erro no danco de Dados")
        }

        return resp.redirect("/ideias")
    }) 
})

server.listen(3000)