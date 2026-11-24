import { productsData } from "./productData.js" ;
import { showToast } from "./toast.js" ;
import { getFavourites, saveFavorites } from "./favoritesStorage.js";
import { getCart, addToCart } from "./cart.js";
import { updateFavBadge } from "./script.js";

let productDetail = document.querySelector(".js-product-detail");
let relatedGrid = document.querySelector(".js-related-grid");
let selectedSize;
 let favorites = getFavourites();
let params = new URLSearchParams(window.location.search);
let productID = params.get("id");

renderRelatedProducts(productID)
function renderRelatedProducts(productID) {

  let product = productsData.find(product => product.id === productID);

  let productCategory = product.category;

  let filteredCategory = productsData.filter(product => product.category === productCategory);

// filteredCategory.slice(0 ,4);

relatedGrid.innerHTML = "";

filteredCategory.slice(0 ,4).forEach(product => {
 
    let isFav = favorites.includes(product.id);

    const favBtnClass = isFav
      ? "bg-surface/95 dark:bg-zinc-900/95 text-secondary dark:text-secondary-fixed-dim shadow-sm"
      : "bg-surface/85 dark:bg-zinc-900/85 hover:bg-surface dark:hover:bg-zinc-800 text-on-surface-variant dark:text-zinc-200";
    const fillValue = isFav ? 1 : 0;
relatedGrid.innerHTML += `

<article class="productCard group bg-surface-container-lowest dark:bg-[#161619] border border-outline-variant/40 dark:border-zinc-800 flex flex-col justify-between hover:border-secondary dark:hover:border-secondary-fixed-dim transition-colors" data-category="${product.category}" data-id="${product.id}" data-name="${product.name}" data-price="${product.startingPrice}">
  <div class="relative aspect-square overflow-hidden bg-surface-container-low dark:bg-zinc-900">
  <a href="product.html?id=${product.id}">   <img alt="${product.name}" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" src="${product.image}"></a>
     
          <button data-id="${product.id}" aria-label="Add to Wishlist" class="js-fav-btn absolute top-3 right-3 p-1.5 rounded-full transition-colors ${favBtnClass}" type="button">
            <span class="material-symbols-outlined text-[18px] leading-none block" style="font-variation-settings: 'FILL' ${fillValue};">favorite</span>
          </button>
    <div class="absolute bottom-0 inset-x-0 p-2 bg-surface/95 dark:bg-zinc-950/90 backdrop-blur-sm sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-300">
      <button data-id="${product.id}" class="js-quick-add w-full py-2 bg-primary dark:bg-zinc-100 text-on-primary dark:text-zinc-950 text-[11px] font-medium uppercase tracking-widest hover:opacity-90 transition-opacity" type="button">
        Quick Add • $${product.startingPrice}
      </button>
    </div>
  </div>
  <div class="p-4 flex flex-col flex-grow justify-between">
    <div>
      <div class="flex items-center justify-between gap-2 mb-1">
        <span class="text-[11px] font-medium uppercase tracking-widest text-secondary dark:text-secondary-fixed-dim">${product.concentration.split("•")[0].trim()}</span>
        <span class="text-[11px] text-on-surface-variant dark:text-zinc-400">${product.defaultSize}</span>
      </div>
      <h3 class="text-base sm:text-lg font-serif font-normal text-primary dark:text-white group-hover:text-secondary dark:group-hover:text-secondary-fixed-dim transition-colors">
        <a href="product.html?id=${product.id}">${product.name}</a>
      </h3>
      <p class="text-xs text-on-surface-variant dark:text-zinc-400 mt-1 line-clamp-1">${product.shortNotes}</p>
    </div>
    <div class="mt-4 pt-3 border-t border-outline-variant/20 dark:border-zinc-800 flex items-center justify-between">
      <span class="text-sm font-medium text-primary dark:text-zinc-100">$${product.startingPrice}</span>
      <a class="text-[11px] font-medium uppercase tracking-widest text-on-surface-variant dark:text-zinc-400 hover:text-secondary dark:hover:text-secondary-fixed-dim inline-flex items-center gap-1" href="product.html?id=${product.id}">
        Explore <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
      </a>
    </div>
  </div>
</article>

` 

})


}

let product = productsData.find(item => item.id === productID);

productDetail.addEventListener("click", (e) => {
  const btn = e.target.closest(".js-size-btn");
  if (!btn) return;

  selectedSize = btn.dataset.size;
  productDetail.querySelector(".js-size-group").innerHTML = getSizeButtonsHTML(product);
  productDetail.querySelector(".js-product-price").textContent = `$${product.sizes[selectedSize]}`;
});

if (product) {
   selectedSize = product.defaultSize;
  renderProductDetail(product)
}


function renderProductDetail(product) {
  let isFav = favorites.includes(product.id);
  const favBtnClasses = isFav
    ? "border-secondary dark:border-secondary-fixed-dim text-secondary dark:text-secondary-fixed-dim bg-surface-container-low dark:bg-zinc-800/80"
    : "border-outline-variant/60 dark:border-zinc-700 bg-surface-container-lowest dark:bg-zinc-900 text-on-surface dark:text-zinc-200 hover:border-secondary dark:hover:border-secondary-fixed-dim hover:text-secondary dark:hover:text-secondary-fixed-dim";
  const fillValue = isFav ? 1 : 0;
  productDetail.innerHTML = `

<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start" data-id="${product.id}">
  <!-- Left Column: Studio Perfume Bottle Image -->
  <div class="lg:col-span-6">
    <div class="w-full max-w-[540px] mx-auto aspect-square overflow-hidden bg-surface-container-low dark:bg-zinc-900 border border-outline-variant/40 dark:border-zinc-800 relative">
      <img alt="${product.name}" class="js-product-img w-full h-full object-cover object-center" src="${product.image}">
      <div class="absolute bottom-3 left-3 bg-surface/90 dark:bg-zinc-950/85 backdrop-blur-md px-3 py-1 border border-outline-variant/40 dark:border-zinc-800">
        <span class="text-[11px] font-medium uppercase tracking-widest text-on-surface dark:text-zinc-200">${product.concentration || 'Extrait de Parfum • 30% Oil'}</span>
      </div>
    </div>
  </div>

  <!-- Right Column: Editorial Specifications & Purchase Controls -->
  <div class="lg:col-span-6 flex flex-col justify-center space-y-6">
    <!-- Brand, Category, Title & Price -->
    <div class="space-y-2 pb-5 border-b border-outline-variant/30 dark:border-zinc-800">
      <div class="flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-widest">
        <span class="js-product-brand text-secondary dark:text-secondary-fixed-dim">${product.brand}</span>
        <span class="text-outline-variant dark:text-zinc-700">•</span>
        <span class="js-product-category text-on-surface-variant dark:text-zinc-400">${product.category}</span>
      </div>
      <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pt-1">
        <h1 class="js-product-name font-serif text-3xl sm:text-4xl font-normal text-primary dark:text-white tracking-tight">
          ${product.name}
        </h1>
        <span class="js-product-price text-lg sm:text-xl font-medium text-primary dark:text-zinc-100 shrink-0">
          $${product.sizes[selectedSize]}
        </span>
      </div>
    </div>



    <!-- Fragrance Description -->
    <p class="js-product-desc text-sm text-on-surface-variant dark:text-zinc-400 leading-relaxed">
      ${product.description}
    </p>

    <!-- Olfactory Pyramid / Notes Breakdown -->
    <div class="border-y border-outline-variant/40 dark:border-zinc-800 divide-y divide-outline-variant/20 dark:divide-zinc-800/80">
      <div class="py-2.5 flex items-baseline gap-4">
        <span class="text-[11px] font-medium uppercase tracking-widest text-secondary dark:text-secondary-fixed-dim w-14 shrink-0">Top</span>
        <span class="js-notes-top font-serif text-base italic text-on-surface dark:text-zinc-100">${product.notes.top}</span>
      </div>
      <div class="py-2.5 flex items-baseline gap-4">
        <span class="text-[11px] font-medium uppercase tracking-widest text-secondary dark:text-secondary-fixed-dim w-14 shrink-0">Heart</span>
        <span class="js-notes-heart font-serif text-base italic text-on-surface dark:text-zinc-100">${product.notes.heart}</span>
      </div>
      <div class="py-2.5 flex items-baseline gap-4">
        <span class="text-[11px] font-medium uppercase tracking-widest text-secondary dark:text-secondary-fixed-dim w-14 shrink-0">Base</span>
        <span class="js-notes-base font-serif text-base italic text-on-surface dark:text-zinc-100">${product.notes.base}</span>
      </div>
    </div>

    <!-- Size Selector -->
    <div class="space-y-2.5">
      <div class="flex items-center justify-between">
        <span class="text-[11px] font-medium uppercase tracking-widest text-on-surface dark:text-zinc-200">Select Volume</span>
        <span class="text-[11px] text-on-surface-variant dark:text-zinc-400">Refillable Glass Flacon</span>
      </div>
      <div class="js-size-group grid grid-cols-3 gap-3" role="radiogroup" aria-label="Flacon Volume">
       
     ${getSizeButtonsHTML(product)}
      </div>
    </div>

    <!-- Action Row -->
    <div class="pt-1 flex items-center gap-3">
      <button data-id="${product.id}" class="js-add-to-cart flex-1 py-3.5 px-6 bg-primary dark:bg-zinc-100 text-on-primary dark:text-zinc-950 text-xs font-medium uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2" type="button">
        <span>Add to Cart</span>
      </button>
   <button data-id="${product.id}" aria-label="Save to Favorites" class="js-fav-btn py-3.5 px-4 border transition-colors flex items-center justify-center gap-2 ${favBtnClasses}" type="button">
      <span class="material-symbols-outlined text-[18px] leading-none" style="font-variation-settings: 'FILL' ${fillValue};">favorite</span>
      <span class="hidden sm:inline text-xs font-medium uppercase tracking-widest">${isFav ? "Favorited" : "Favorite"}</span>
    </button>
    </div>

    <!-- Understated Collapsible Atelier Details -->
    <div class="pt-2 border-t border-outline-variant/30 dark:border-zinc-800 divide-y divide-outline-variant/30 dark:divide-zinc-800">
      <details class="group py-3">
        <summary class="flex items-center justify-between cursor-pointer text-xs font-medium uppercase tracking-widest text-on-surface dark:text-zinc-200 hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors">
          <span>Formulation & Provenance</span>
          <span class="material-symbols-outlined text-[18px] text-on-surface-variant dark:text-zinc-400 group-open:rotate-180 transition-transform">expand_more</span>
        </summary>
        <p class="text-xs text-on-surface-variant dark:text-zinc-400 leading-relaxed pt-2.5">
          Compounded in Grasse using organic wheat alcohol and macerated for 12 weeks prior to cold filtration. Free from synthetic dyes and UV stabilizers.
        </p>
      </details>
      <details class="group py-3">
        <summary class="flex items-center justify-between cursor-pointer text-xs font-medium uppercase tracking-widest text-on-surface dark:text-zinc-200 hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors">
          <span>Complimentary Sampling & Delivery</span>
          <span class="material-symbols-outlined text-[18px] text-on-surface-variant dark:text-zinc-400 group-open:rotate-180 transition-transform">expand_more</span>
        </summary>
        <p class="text-xs text-on-surface-variant dark:text-zinc-400 leading-relaxed pt-2.5">
          Every full-size flacon arrives with a matching 2ml discovery vial so you may experience the scent on skin before unsealing the primary presentation box.
        </p>
      </details>
    </div>
  </div>
</div>


`

}

function getSizeButtonsHTML(product) {
  return Object.entries(product.sizes)
    .map(([size, price]) => {

      let isSelected = size === selectedSize;

      return `
        <button class="js-size-btn py-2.5 px-3 transition-colors flex flex-col items-center justify-center gap-0.5 ${isSelected
          ? "border-2 border-secondary dark:border-secondary-fixed-dim bg-surface-container-lowest dark:bg-zinc-900 text-primary dark:text-white"
          : "border border-outline-variant/50 dark:border-zinc-700 bg-transparent text-on-surface dark:text-zinc-300 hover:border-secondary dark:hover:border-secondary-fixed-dim"
        }" data-size="${size}" aria-checked="${isSelected}" type="button">
          <span class="text-xs tracking-wider ${isSelected ? "font-semibold" : "font-medium"}">${size}</span>
          <span class="text-[11px] ${isSelected
          ? "text-secondary dark:text-secondary-fixed-dim font-medium"
          : "text-on-surface-variant dark:text-zinc-400"
        }">$${price}</span>
        </button>`;
    })
    .join("");
}

productDetail.addEventListener("click" , (e) => {
  if (e.target.closest(".js-add-to-cart")) {
     let btn = e.target.closest(".js-add-to-cart");
  if (!btn) return;

 const result = addToCart(btn.dataset.id, selectedSize);
 if (result === "updated") {
  showToast("Already in your cart, quantity increased");
} else {
  showToast("Added to your cart");
}

  }
 
  if (e.target.closest(".js-fav-btn")) {
    console.log("fav clicked product detail")
        let productClicked = e.target.closest(".js-fav-btn");
        let productID = productClicked.dataset.id;
    
        if (favorites.includes(productID)) {
          favorites = favorites.filter(favId => favId !== productID);
    
        } else {
         favorites = [...favorites, productID];
        }
    
        saveFavorites(favorites);
        updateFavBadge();
        renderProductDetail(product);
       renderRelatedProducts(productID)
      }



})

// for quick add , favorites
  relatedGrid.addEventListener("click", (e) => {

    if (e.target.closest(".js-fav-btn")) {
        let product = e.target.closest(".js-fav-btn");
        let productID = product.dataset.id;
    
        if (favorites.includes(productID)) {
          favorites = favorites.filter(favId => favId !== productID);
    
        } else {
         favorites = [...favorites, productID];
        }
    
        saveFavorites(favorites);
        updateFavBadge();
       renderRelatedProducts(productID)
      }

    if (e.target.closest(".js-quick-add")) {
      let btn = e.target.closest(".js-quick-add");
      let product = productsData.find(item => item.id === btn.dataset.id);
      if (product) {
        let result = addToCart(product.id, product.defaultSize);
        showToast(result === "updated" ? "Already in your cart, quantity increased" : "Added to your cart");
      }

      updateFavBadge()
    }

  });
