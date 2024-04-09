import jwt from "jsonwebtoken";
import UserService from "../v1/services/users.services.js"

const verifyRefreshToken = (refreshToken) => {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

    return new Promise((resolve, reject) => {
        jwt.verify(refreshToken, privateKey, async (err, tokenDetails) => {
            if(err) {
                return reject({ error: true, message: "Invalid Refresh Token"});
            }
            const user = await UserService.getUser(tokenDetails.id);
            if(user.refreshToken !== refreshToken) {
                return reject({ error: true, message: "This token has been revoked"});
            }
            resolve({
                tokenDetails,
                error: false,
                message: "Valid Refresh Token",
            });
        });
    });
};

export default verifyRefreshToken;