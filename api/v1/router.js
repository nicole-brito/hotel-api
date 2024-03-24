//Configura a rota
import express from "express";
import hotelsRouter from "./routes/hotels.route.js"

const router = express.Router(); 

//Recebe uma requisição e encaminha para o próximo middleware

router.use("/hotels", hotelsRouter);


export default router;