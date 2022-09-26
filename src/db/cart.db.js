import { HttpException } from "../error.js";
import { ProductModel } from "../model/product.model.js";
import { UserModel } from "../model/user.model.js";

export async function getCart(userId) {
    const user = await UserModel.findOne({ _id: userId })
        .populate("cart.productId")
        .lean();

    return user.cart;
}

export async function addProductToCart(userId, productId) {
    const cartProduct = {
        productId: productId,
        createAt: Date.now(),
        updatedAt: Date.now(),
        qty: 1,
    };

    const product = await ProductModel.findOne({ _id: productId });

    if (!product) {
        throw new HttpException(404, "Product does not exist");
    }

    const user = await UserModel.findOneAndUpdate(
        { _id: userId, "cart.productId": { $nin: productId } },
        { $push: { cart: cartProduct } },
        { returnDocument: "after" }
    )
        .populate("cart.productId")
        .lean();

    if (!user) {
        throw new HttpException(
            400,
            "Provided product is already present in cart"
        );
    }

    return user.cart;
}

export async function removeProductFormCart(userId, productId) {
    const user = await UserModel.findOneAndUpdate(
        { _id: userId, "cart.productId": { $in: productId } },
        { $pull: { cart: { productId: productId } } },
        { returnDocument: "after" }
    )
        .populate("cart.productId")
        .lean();

    if (!user) {
        throw new HttpException(400, "Provided product is not present in cart");
    }

    return user.cart;
}

export async function changeQuantityOfCart(userId, productId, actionType) {
    let incrementor = actionType === "increment" ? 1 : -1;

    const user = await UserModel.findOne({
        _id: userId,
        "cart.productId": { $in: productId },
    });

    if (!user) {
        throw new HttpException(400, "Provided product is not present in cart");
    }

    const userProduct = user.cart.filter((cartProduct) => {
        return cartProduct.productId.toString() === productId;
    })[0];
    userProduct.qty += incrementor;

    await user.save();
    await user.populate("cart.productId");
    const updatedUser = user.toObject();
    return updatedUser.cart;
}
