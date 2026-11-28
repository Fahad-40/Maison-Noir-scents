import { calculateTotals } from "./cartShared.js";
import { calculateSubtotal } from "./cartShared.js";
import { getCartItems } from "./cartShared.js";

let subTotalDisplay = document.querySelector(".js-checkout-subtotal");
let taxDisplay = document.querySelector(".js-checkout-tax");
let shippingDisplay = document.querySelector(".js-checkout-shipping");
let totalDisplay = document.querySelector(".js-checkout-total");
let checkoutItemsContainer = document.querySelector(".js-checkout-items");

function updateCheckoutUi() {
      let data = calculateTotals(calculateSubtotal());
    
    subTotalDisplay.textContent = `$${data.subtotal}`
    taxDisplay.textContent = `$${data.tax}`
    shippingDisplay.textContent = `$${data.shipping}`
    totalDisplay.textContent = `$${data.total}`
  
}

updateCheckoutUi();

function renderCheckoutItmes() {
    let cartCheckoutArray = getCartItems();

    checkoutItemsContainer.innerHTML = "";

    cartCheckoutArray.forEach(item => {
        checkoutItemsContainer.innerHTML +=`
        
           <div class="py-3.5 first:pt-0 flex items-center justify-between gap-3.5">
              <div class="flex items-center gap-3.5 min-w-0">
                <div class="w-14 h-14 shrink-0 overflow-hidden bg-surface-container-low dark:bg-zinc-900 border border-outline-variant/30 dark:border-zinc-800">
                  <img alt="Oud Nocturne Extrait" class="w-full h-full object-cover object-center" src="${item.image}">
                </div>
                <div class="min-w-0">
                  <h3 class="font-serif text-base font-normal text-primary dark:text-white truncate">Oud Nocturne Extrait</h3>
                  <div class="flex items-center gap-2 text-[11px] text-on-surface-variant dark:text-zinc-400 mt-0.5">
                    <span>50ml</span>
                    <span>•</span>
                    <span>Qty 1</span>
                  </div>
                </div>
              </div>
              <span class="text-sm font-medium text-primary dark:text-zinc-100 shrink-0">$195</span>
            </div>
        
        `;
    });
}