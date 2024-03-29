import "./env.js";
import express from "express";
import cors from "cors";
import v1Router from "./api/v1/router.js"
import v2Router from "./api/v2/router.js"


const app = express(); //Cria a instância do express

app.use(express.json()); //Precisa passar esse middleware para ele ler arquivos json
app.use(cors()); //Faz o tratamento do cors; Essa não é a forma mais segura pq habilita o cors em todas as dependencias

app.use(function (req, res, next) {
    res.contentType("application/json"); //Seta o tipo
    next();
}); //Isso é um middleware que recebe uma requisição, gera uma resposta e vai pro next

//          URI
app.use("/api/v1", v1Router);
app.use("/api/v2", v2Router);

app.listen(3000, () => {
    console.log("API tá rodando na 3000");
    });