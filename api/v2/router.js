//Exemplo de versionamento:

import express from "express";

const router = express.Router(); 

router.use("/hotels", function(req, res, next) {
    res.send("Hotels-api versão 2")
})

export default router;