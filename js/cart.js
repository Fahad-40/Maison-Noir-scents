let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

export function getCart() {
    return cart;
}

export function addToCart(productID, size) {
    let existingItem = cart.find(item => item.productID === productID && item.size === size);

    if (existingItem) {
        existingItem.quantity++
        saveCart();
        return "updated";
    }
    cart.push({ productID, size, quantity: 1 });
    saveCart();
    return "added";


}