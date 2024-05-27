var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors=require("cors");
const multer=require("multer");

var app=Express();
app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200' // Altere para o seu domínio frontend
}));

var CONNECTIONSTRING="mongodb://localhost:27017"
var DATABASENAME = "mean-project"
var database;

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.listen(5038, ()=> {
    Mongoclient.connect(CONNECTIONSTRING,(error, client) => {
        database = client.db(DATABASENAME);
        console.log("Conectado com sucesso");
    })
})

app.post("/api/todoapp/GetNotes", (request,response)=> {
    const myCookie = request.cookies.user;

    database.collection("todoappcollection").find({ idUser: myCookie }).toArray((error, result)=> {
        console.log(result)

        if(error) {
            response.status(500).send("Erro ao buscar notas");
            return;
        }
        response.send(result);
    })
})

app.get("/api/todoapp/getCookie", (request, response) => {
    const myCookie = request.cookies.user;
    if (myCookie) {
        response.send("Value of 'myCookie': " + myCookie);
    } else {
        response.send("Cookie 'myCookie' not found");
    }
})

app.post("/api/todoapp/AddNotes", multer().none(),(request,response)=> {
    const idUser = request.cookies.user;
    console.log(idUser)
    database.collection("todoappcollection").count({},function(error, numOfDocs){
        database.collection("todoappcollection").insertOne({
            id:(numOfDocs+1).toString(),
            description:request.body.newNotes,
            idUser: idUser
        });
        response.json("Added Succesfully");
    })
})

app.delete("/api/todoapp/DeleteNotes", (request,response)=> {
    database.collection("todoappcollection").deleteOne({
        id:request.query.id
    });
    response.json("Delete Successfully");
})

app.post("/api/todoapp/cadastro", multer().none(), (request,response) => {
    const { username, password } = request.body

    database.collection("users").insertOne({ username: username, password: password})
    response.json("registrado com sucesso")
})

app.post("/api/todoapp/login", multer().none(), async (request, response) => {
    const { username, password } = request.body;

    const user = await database.collection("users").findOne({ username: username, password: password });

    console.log(user)

    if (!user) {
        return response.status(200).json("nome ou senha errada");
    }

    let options = {
        maxAge: 1000 * 60 * 15, // would expire after 15 minutes
        httpOnly: true, // The cookie only accessible by the web server
    }

    response.cookie('user', user._id, options);
    response.json("logado com sucesso")

})

