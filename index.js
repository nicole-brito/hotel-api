import "./env.js";
import express from "express";
import cors from "cors";
import logger from "./api/config/logger.js";
import v1Router from "./api/v1/router.js"
import v2Router from "./api/v2/router.js"

global.logger = logger;


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

app.use((err, req, res, next) => {
    logger.error(
        `${err.StatusCode} - ${err.message} - ${req.method} ${req.baseUrl}`
    );
    res
    .status(err.statusCode || 500)
    .send({error: err.message || "Algo deu errado :/"});
})

app.listen(3000, () => {
    console.log("API tá rodando na 3000");
    });