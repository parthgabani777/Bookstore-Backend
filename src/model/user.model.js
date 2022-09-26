import mongoose, { Schema } from "mongoose";
import { HttpException } from "../error.js";

const passwordFormatValidator = async function (password) {
    return password.match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    );
};

const CartItemSchema = new mongoose.Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "product",
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    qty: { type: Number, min: [1, "can't decrease quantity further"] },
});

const WishlistItemSchema = new mongoose.Schema({
    productId: { type: Schema.Types.ObjectId, ref: "product" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "FirstName is Required"],
    },
    lastName: {
        type: String,
        cast: [true, "LastName can only be string"],
        required: [true, "LastName is Required"],
    },
    email: {
        type: String,
        cast: [false, "Email can only be string"],
        unique: [true],
        required: [true, "Email is Required"],
    },
    password: {
        type: String,
        cast: [false, "Password can only be string"],
        required: [true, "Password is Required"],
        validate: {
            validator: passwordFormatValidator,
            message: "Password Format is wrong",
        },
    },
    wishlist: [WishlistItemSchema],
    cart: [CartItemSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

UserSchema.post("save", (error, doc, next) => {
    if (error.name === "MongoServerError" && error.code === 11000) {
        console.log(error);
        next(new HttpException(409, "Email already exist"));
    } else {
        next();
    }
});

export const UserModel = mongoose.model("user", UserSchema);
