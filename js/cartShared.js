import { productsData } from "./productData.js";
import { getCart } from "./cart.js";

const TAX_RATE = 0.05;
const SHIPPING_FEE = 15; // abhi tay karna hai


export function getCartItems() {
    return getCart()
        .map(item => {
            let product = productsData.find(product => product.id === item.productID);
            if (!product) return null;
            return {
                ...product,
                size: item.size,
                quantity: item.quantity,
                price: product.sizes[item.size]

            };
        }).filter(item => item !== null);
}

export function calculateSubtotal() {
const  subTotal = getCartItems().reduce((total , item) => {
        return total + item.price * item.quantity
    } , 0)

return subTotal;
}

export function calculateTotals(subtotal) {
    let cartItems = getCartItems().length;

  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  const shipping = SHIPPING_FEE * cartItems ;
  const total = subtotal + tax + shipping;
  return { subtotal, tax, shipping, total };
}


