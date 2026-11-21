import { productsData } from "./productData.js";

let productDetail = document.querySelector(".js-product-detail");
let selectedSize;

let params = new URLSearchParams(window.location.search);
let productID = params.get("id");

let product = productsData.find(item => item.id === productID);

if (!product) {
    return;
}
else{
    selectedSize = product.defaultSize;
    renderProductDetail(product)
}

function renderProductDetail(product) {
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
          $${product.startingPrice}
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
       
      <button class="js-size-btn py-2.5 px-3 border border-outline-variant/50 dark:border-zinc-700 bg-transparent text-on-surface dark:text-zinc-300 hover:border-secondary dark:hover:border-secondary-fixed-dim transition-colors flex flex-col items-center justify-center gap-0.5" data-price="145" data-size="30ml" type="button">
          <span class="text-xs font-medium tracking-wider">30ml</span>
          <span class="text-[11px] text-on-surface-variant dark:text-zinc-400">$145</span>
        </button>
       
        <button aria-checked="true" class="js-size-btn py-2.5 px-3 border-2 border-secondary dark:border-secondary-fixed-dim bg-surface-container-lowest dark:bg-zinc-900 text-primary dark:text-white transition-colors flex flex-col items-center justify-center gap-0.5" data-price="${product.price}" data-size="${product.size}" type="button">
          <span class="text-xs font-semibold tracking-wider">${product.defaultSize}</span>
          <span class="text-[11px] text-secondary dark:text-secondary-fixed-dim font-medium">$${product.startingPrice

          }</span>
        </button>
        <button class="js-size-btn py-2.5 px-3 border border-outline-variant/50 dark:border-zinc-700 bg-transparent text-on-surface dark:text-zinc-300 hover:border-secondary dark:hover:border-secondary-fixed-dim transition-colors flex flex-col items-center justify-center gap-0.5" data-price="275" data-size="100ml" type="button">
          <span class="text-xs font-medium tracking-wider">100ml</span>
          <span class="text-[11px] text-on-surface-variant dark:text-zinc-400">$275</span>
        </button>
      </div>
    </div>

    <!-- Action Row -->
    <div class="pt-1 flex items-center gap-3">
      <button data-id="${product.id}" class="js-add-to-cart flex-1 py-3.5 px-6 bg-primary dark:bg-zinc-100 text-on-primary dark:text-zinc-950 text-xs font-medium uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2" type="button">
        <span>Add to Cart</span>
      </button>
      <button data-id="${product.id}" aria-label="Save to Favorites" class="js-toggle-favorite py-3.5 px-4 border border-outline-variant/60 dark:border-zinc-700 bg-surface-container-lowest dark:bg-zinc-900 text-on-surface dark:text-zinc-200 hover:border-secondary dark:hover:border-secondary-fixed-dim hover:text-secondary dark:hover:text-secondary-fixed-dim transition-colors flex items-center justify-center gap-2" type="button">
        <span class="material-symbols-outlined text-[18px] leading-none">favorite</span>
        <span class="hidden sm:inline text-xs font-medium uppercase tracking-widest">Favorite</span>
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


