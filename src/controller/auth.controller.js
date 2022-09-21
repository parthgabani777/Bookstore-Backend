import { addUser, getUserByEmail } from "../db/user.db.js";
import { responseDataSerialize } from "../serialize.js";
import { signUsernameToken } from "../jwt.js";
import { HttpException } from "../error.js";

export const signupController = async (req, res, next) => {
    try {
        const userSignupData = req.body;
        const user = await addUser(userSignupData);
        const token = signUsernameToken(user._id.toString());
        res.status(200).send(
            responseDataSerialize({ encodedToken: token, createdUser: user })
        );
    } catch (error) {
        next(error);
    }
};

export const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send();
        }
        const user = await getUserByEmail(email);

        if (user.password !== password) {
            throw new HttpException(401, "Password does not match.");
        }

        const token = signUsernameToken(user._id.toString());

        res.status(200).send(
            responseDataSerialize({ encodedToken: token, foundUser: user })
        );
    } catch (error) {
        next(error);
    }
};
