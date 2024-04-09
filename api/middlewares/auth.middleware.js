import jwt from "jsonwebtoken";

const jwtDataOptions = {
    secret: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    jwtExpiration: process.env.JWT_EXPIRATION,
    jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION,
};

const { TokenExpiredError } = jwt;
const catchError = (err, res ) => {
    if(err instanceof TokenExpiredError) {
        return res.status(401).send({ message: "Unauthorized. Access token expired" });
    }
    return res.sendStatus(401).send({ message: "Unauthorized" });
};

const verifyToken = (req, res, next) => {
    let token = req. headers["authorization"];
    if(!token) {
        return res.status(403).send({ message: "No token provided"})
    }

    jwt.verify(token?.split(" ")[1], jwtDataOptions.secret, (err, decoded) => {
        if(err) {
            return catchError(err, res);
        }
        req.user = decoded;
        next();
    });
};

const verifyAuthorization = (authorizedRoles) => (req, res, next) => {
    try {
        const user = req;
        if(!user || !user.role || !authorizedRoles.includes(user.role)) {
            res.status(403).json({ error: "Forbidden"});
        }
    } catch (error) {
        console.error("Error authorizing user: ", error);
        res
        .status(500)
        .json({ error: "An error occurred while authorizing the user"})
    }
};

export {
    verifyAuthorization,
    verifyToken,
}