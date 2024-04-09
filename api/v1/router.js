//Configura a rota
import express from "express";
import hotelsRouter from "./routes/hotels.route.js"
import usersRouter from "./routes/users.route.js"
import AuthController from "./controllers/auth.controller.js";

const router = express.Router(); 

//Recebe uma requisição e encaminha para o próximo middleware

router.use("/hotels", hotelsRouter);
router.use("/users", usersRouter);

router.post("/login", AuthController.login);
router.post("/signup", AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);
router.post("/revoke-refresh-token", AuthController.revokeRefreshToken);



export default router;