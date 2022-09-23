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
