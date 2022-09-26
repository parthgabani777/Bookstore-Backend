import jwt from "jsonwebtoken";

const LOCAL_SECRET_KEY = "no_secret";

export function signUsernameToken(userId) {
    return jwt.sign(
        { userId: userId },
        process.env.JWT_KEY || LOCAL_SECRET_KEY,
        { expiresIn: 86400 }
    );
}

export function verifyUsernameToken(authToken) {
    return jwt.verify(authToken, process.env.JWT_KEY || LOCAL_SECRET_KEY);
}
