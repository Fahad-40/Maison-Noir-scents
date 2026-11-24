import { productsData } from "./productData.js";
import { updateCartBadge } from "./script.js";

let cartItemsDisplay = document.querySelector(".js-cart-items");
let emptyCart = document.querySelector(".js-empty-cart");
let cartHeaderCount = document.querySelector(".js-cart-header-count");
let cartSubtotal = document.querySelector(".js-cart-subtotal");
let cartTotal = document.querySelector(".js-cart-total");

// let ritualEnhancements = document.querySelector(".ritual-enhancements");
let subTotal;
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

console.log(cart)

function getCartItems() {
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

function renderCartItems() {
    if (!cartItemsDisplay) return;

    let cartArray = getCartItems();
    cartItemsDisplay.innerHTML = "";
    cartHeaderCount.textContent = `${cartArray.length} Creations Selected`;

    if (cartArray.length === 0) {
        emptyCart.classList.remove("hidden");
        return;
    }
    if (emptyCart) emptyCart.classList.add("hidden");
calculateSubtotal();
    cartArray.forEach(product => {
        cartItemsDisplay.innerHTML += `
            <article class="js-cart-item p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6" data-id="${product.id}" data-price="${product.price}" data-size="${product.size}">
              <div class="flex items-center gap-4 sm:gap-5">
                <a class="w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden bg-surface-container-low dark:bg-zinc-900 border border-outline-variant/30 dark:border-zinc-800" href="product.html?id=${product.id}">
                  <img alt="${product.name}" class="w-full h-full object-cover object-center" src="${product.image}">
                </a>

                <div class="space-y-1">
                  <span class="text-[11px] font-medium uppercase tracking-widest text-secondary dark:text-secondary-fixed-dim block">${product.brand}</span>
                  <h2 class="font-serif text-lg sm:text-xl font-normal text-primary dark:text-white leading-snug">
                    <a class="hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors" href="product.html?id=${product.id}">${product.name}</a>
                  </h2>
                  <div class="flex items-center gap-2.5 pt-0.5">
                    <span class="px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider bg-surface-container dark:bg-zinc-800 text-on-surface dark:text-zinc-300 border border-outline-variant/40 dark:border-zinc-700">
                      ${product.size}
                    </span>
                    <span class="text-xs text-on-surface-variant dark:text-zinc-400">$${product.price} each</span>
                  </div>
                </div>
              </div>

              <!-- Stepper, Line Total & Remove -->
              <div class="flex items-center justify-between sm:justify-end gap-5 sm:gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-outline-variant/20 dark:border-zinc-800/80">
                <div class="inline-flex items-center border border-outline-variant/50 dark:border-zinc-700 bg-surface dark:bg-zinc-900">
                  <button data-id="${product.id}" data-size="${product.size}" aria-label="Decrease quantity" class="js-qty-minus w-8 h-8 flex items-center justify-center text-on-surface-variant dark:text-zinc-400 hover:text-primary dark:hover:text-white transition-colors" type="button">
                    <span class="material-symbols-outlined text-[16px]">remove</span>
                  </button>
                  <span class="js-qty-val w-8 text-center text-xs font-medium text-primary dark:text-zinc-100 select-none">${product.quantity}</span>
                  <button data-id="${product.id}" data-size="${product.size}" aria-label="Increase quantity" class="js-qty-plus w-8 h-8 flex items-center justify-center text-on-surface-variant dark:text-zinc-400 hover:text-primary dark:hover:text-white transition-colors" type="button">
                    <span class="material-symbols-outlined text-[16px]">add</span>
                  </button>
                </div>

                <span class="js-item-total text-sm font-medium text-primary dark:text-zinc-100 min-w-[3.5rem] text-right">
                  $${product.price * product.quantity}
                </span>

                <button aria-label="Remove ${product.name} from bag" class="js-remove-item p-1.5 text-on-surface-variant dark:text-zinc-500 hover:text-error dark:hover:text-red-400 transition-colors" type="button">
                  <span class="material-symbols-outlined text-[18px] leading-none block">close</span>
                </button>
              </div>
            </article>
        `;
    });
}

renderCartItems();

if (cartItemsDisplay) {
    cartItemsDisplay.addEventListener("click" , (e) => {

if(e.target.closest(".js-qty-plus")) {
    let cartArray = getCart();
    let product = e.target.closest(".js-qty-plus");
    let productID = product.dataset.id;
    let productSize = product.dataset.size;

    let fullProduct = cartArray.find(product => product.productID === productID && product.size === productSize);
    fullProduct.quantity++;

saveCart()
renderCartItems();
updateCartBadge();
calculateSubtotal();
  }

  if (e.target.closest(".js-qty-minus")) {
        let cartArray = getCart();
    let product = e.target.closest(".js-qty-minus");
    let productID = product.dataset.id;
    let productSize = product.dataset.size;

 let fullProduct = cartArray.find(product => product.productID === productID && product.size === productSize);
    
 if (fullProduct.quantity === 1) {
    // cart = cart.filter(product => product.productID !== productID && product.size === productSize)
    cart = cart.filter(product => !(product.productID === productID && product.size === productSize));
    saveCart()
renderCartItems();
updateCartBadge();
calculateSubtotal();
 }
 else{
     fullProduct.quantity--;

 }

saveCart()
renderCartItems();

  }

})
}


function calculateSubtotal() {
    subTotal = getCartItems().reduce((total , item) => {
        return total + item.price * item.quantity
    } , 0)
cartSubtotal.textContent = `$${subTotal}`
cartTotal.textContent = `$${subTotal}`

}



// function quantityController(productId , productSize , productQuantity) {
    
// }

