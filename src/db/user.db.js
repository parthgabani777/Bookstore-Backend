import { HttpException } from "../error.js";
import { UserModel } from "../model/user.model.js";

export async function getAllUsers() {
    const users = await UserModel.find();
    return users;
}

export async function getUserByEmail(email) {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
        throw new HttpException(404, "Email doest not exist");
    }
    return user;
}

export async function getUserByUserId(userId) {
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
        throw new HttpException(404, "UserId doest not exist");
    }
    return user;
}

export async function addUser(userData) {
    let user = new UserModel({
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    user = await user.save();
    return user;
}
