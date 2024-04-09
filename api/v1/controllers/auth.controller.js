import bcrypt from "bcrypt";
import generateTokens from "../../utils/generateTokens.js";
import verifyRefreshToken from "../../utils/verifyRefreshToken.js";
import usersServices from "../services/users.services.js";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import { ADMIN } from "../models/users.model.js";
//import usersRepository from "../repositories/users.repository";

const myValidationResult = validationResult.withDefaults({
    formatter: (error) => error.msg,
});

const generateUserSafeCopy = (user) => {
    let _user = {...user};
    delete _user.password;
    return _user;
};

async function signup(req, res, next) {
    try {
        const validationErrors = myValidationResult(req);
if(!validationErrors.isEmpty()) {
    const error = new Error(JSON.stringify(validationErrors.array(), null, 2));
    error.statusCode = 400;
    throw error;
}
if(req.body.role === ADMIN && !req.verifiedAdmin) {
    const error = new Error("not authorired");
    error.code = 401;
    throw error;
}

let user = await usersServices.getUserByEmail(req.body.email);
if(user) {
    const error = new Error("User with given email already exist");
    error.code = 400;
    throw error;
}

const salt = await bcrypt.genSalt(Number(process.env.SALT));
const hashPassword = await bcrypt.hash(req.body.password, salt);

user = await usersServices.createUser({
    ...req.body,
    password: hashPassword,
});

res.status(201).send(generateUserSafeCopy(user.dataValues));
logger.info("POST /signup");
        
    } catch (err) {
        next(err);
    }
}

async function login(req,res, next) {
    try {
        const validationErrors = myValidationResult(req);
        if(!validationErrors.isEmpty()) {
            const error = new Error(JSON.stringify(validationErrors.array(), null, 2));
            error.statusCode = 400;
            throw error;
        }

        const user = await usersServices.getUserByEmail(req.body.email);
        const credentialErrors = null;
        if(!user) {
            credentialErrors.message = "Invalid email or password";
            credentialErrors.statusCode = 401;
        }
        const verifiedPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if(credentialErrors || verifiedPassword) {
            error.statusCode(credentialErrors.statusCode);
        }

        const { accessToken, refreshToken } = await generateTokens(user);

        await usersServices.updateRefreshToken(user.userId, refreshToken);
        res.status(200).json({
            error: false,
            accessToken,
            refreshToken,
            message: "Logged in sucessfully",
        })

    } catch (err) {
        next(err);
    }
}

async function refreshToken(req, res, next) {
    try {
        const validationErrors = myValidationResult(req);
        if(!validationErrors.isEmpty()) {
            const error = new Error(JSON.stringify(validationErrors.array(), null, 2));
            error.statusCode = 400;
            throw error;
        }
        verifyRefreshToken(req.body.refreshToken)
        .then(({ tokenDetails }) => {
            const payload = { id: tokenDetails.id, role: tokenDetails.role }
            const accessToken = jwt.sign( 
                payload,
                process.env.ACCESS_TOKEN_PRIVATE_KEY,
                { expiresIn: "14m"}
            );
            res.status(200).json({
                error: false,
                accessToken,
                message: "New access token created"
            })
            .catch((err) => {
                const error = new Error("Invalid Refresh Token" + err);
                error.statusCode = 400;
                throw error;
        })
    })
} catch (err) {
    next(err);
}
}

async function revokeRefreshToken(req, res, next) {
    try {
        const validationErrors = myValidationResult(req);
        if(!validationErrors.isEmpty()) {
            const error = new Error(JSON.stringify(validationErrors.array(), null, 2));
            error.statusCode = 400;
            throw error;
        }

        await usersServices.updateRefreshToken(req.query.id, "REVOKED");
        res.status(204). end();
    } catch (err) {
        next(err);
    }
}
export default {
    signup,
    login,
    refreshToken,
    revokeRefreshToken,
};