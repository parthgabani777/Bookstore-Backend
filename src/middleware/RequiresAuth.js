import { HttpException } from "../error.js";
import { verifyUsernameToken } from "../jwt.js";

export const RequiresAuth = (req, res, next) => {
    try {
        const authToken = req.headers.authorization;
        if (!authToken) {
            throw new HttpException(409, "Authorization token is not set.");
        }
        const user = verifyUsernameToken(authToken);
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};
