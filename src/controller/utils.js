export function flattenWishlist(wishlist) {
    return wishlist.map((wishlistProduct) => {
        const flattenWishlistProduct = {
            ...wishlistProduct,
            ...wishlistProduct.productId,
        };

        delete flattenWishlistProduct.productId;
        return flattenWishlistProduct;
    });
}

export function flattenCart(cart) {
    return cart.map((cartProduct) => {
        const flattenCartProduct = {
            ...cartProduct,
            ...cartProduct.productId,
        };

        delete flattenCartProduct.productId;
        return flattenCartProduct;
    });
}
