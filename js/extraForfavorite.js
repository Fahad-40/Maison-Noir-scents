export { getFavourites , saveFavorites , renderFeaturedCards } from "./fragrances.js";
import { addToCart } from "./cart.js";
import { showToast } from "./toast.js";


// export function saveFavorites() {
//   localStorage.setItem("favorites", JSON.stringify(favorites));
// }

// export function renderFeaturedCards(productsData) {

//   ProductGridContainer.innerHTML = "";


//   productsData.forEach(product => {
//     let isFav = favorites.includes(product.id);

//     const favBtnClass = isFav
//       ? "bg-surface/95 dark:bg-zinc-900/95 text-secondary dark:text-secondary-fixed-dim shadow-sm"
//       : "bg-surface/85 dark:bg-zinc-900/85 hover:bg-surface dark:hover:bg-zinc-800 text-on-surface-variant dark:text-zinc-200";
//     const fillValue = isFav ? 1 : 0;

//     ProductGridContainer.innerHTML += `

// <article class="productCard group bg-surface-container-lowest dark:bg-[#161619] border border-outline-variant/40 dark:border-zinc-800 flex flex-col justify-between hover:border-secondary dark:hover:border-secondary-fixed-dim transition-colors" data-category="${product.category}" data-id="${product.id}" data-name="${product.name}" data-price="${product.startingPrice}">
//   <div class="relative aspect-square overflow-hidden bg-surface-container-low dark:bg-zinc-900">
//   <a href="product.html?id=${product.id}">   <img alt="${product.name}" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" src="${product.image}"></a>
     
//           <button data-id="${product.id}" aria-label="Add to Wishlist" class="js-fav-btn absolute top-3 right-3 p-1.5 rounded-full transition-colors ${favBtnClass}" type="button">
//             <span class="material-symbols-outlined text-[18px] leading-none block" style="font-variation-settings: 'FILL' ${fillValue};">favorite</span>
//           </button>
//     <div class="absolute bottom-0 inset-x-0 p-2 bg-surface/95 dark:bg-zinc-950/90 backdrop-blur-sm sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-300">
//       <button data-id="${product.id}" class="js-quick-add w-full py-2 bg-primary dark:bg-zinc-100 text-on-primary dark:text-zinc-950 text-[11px] font-medium uppercase tracking-widest hover:opacity-90 transition-opacity" type="button">
//         Quick Add • $${product.startingPrice}
//       </button>
//     </div>
//   </div>
//   <div class="p-4 flex flex-col flex-grow justify-between">
//     <div>
//       <div class="flex items-center justify-between gap-2 mb-1">
//         <span class="text-[11px] font-medium uppercase tracking-widest text-secondary dark:text-secondary-fixed-dim">${product.concentration.split("•")[0].trim()}</span>
//         <span class="text-[11px] text-on-surface-variant dark:text-zinc-400">${product.defaultSize}</span>
//       </div>
//       <h3 class="text-base sm:text-lg font-serif font-normal text-primary dark:text-white group-hover:text-secondary dark:group-hover:text-secondary-fixed-dim transition-colors">
//         <a href="product.html?id=${product.id}">${product.name}</a>
//       </h3>
//       <p class="text-xs text-on-surface-variant dark:text-zinc-400 mt-1 line-clamp-1">${product.shortNotes}</p>
//     </div>
//     <div class="mt-4 pt-3 border-t border-outline-variant/20 dark:border-zinc-800 flex items-center justify-between">
//       <span class="text-sm font-medium text-primary dark:text-zinc-100">$${product.startingPrice}</span>
//       <a class="text-[11px] font-medium uppercase tracking-widest text-on-surface-variant dark:text-zinc-400 hover:text-secondary dark:hover:text-secondary-fixed-dim inline-flex items-center gap-1" href="product.html?id=${product.id}">
//         Explore <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
//       </a>
//     </div>
//   </div>
// </article>


// `;

//   })

// }

// export function getFavourites() {
//   return favorites;
// }