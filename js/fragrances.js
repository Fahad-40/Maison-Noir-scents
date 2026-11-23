import { productsData } from "./productData.js";
import { addToCart } from "./cart.js";
import { showToast } from "./productDetail.js";

let ProductGridContainer = document.querySelector(".js-product-grid");
let filtersBox = document.querySelector(".filters-box");
let searchBox = document.querySelector(".js-search-input");
let priceRange = document.querySelector(".js-price-range");
let priceDisplay = document.querySelector(".js-price-display");
let sortSelect = document.querySelector(".js-sort-select");
let emptyState = document.querySelector(".js-empty-state");
let resetBtn = document.querySelector(".js-reset-filters");
let favToggleCheckbox = document.querySelector(".js-favorites-toggle");
let prevBtn = document.querySelector(".prevBtn");
let nextBtn = document.querySelector(".nextBtn");
let paginationDiv = document.querySelector(".pagination-div");
let currentPage = 1;
let perPage = 8;

paginationDiv.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-page]");
  if (!btn) return;

  const action = btn.dataset.page;

  if (action === "prev") {
    currentPage--;
  } else if (action === "next") {
    currentPage++;
  } else {
    currentPage = Number(action);
  }

  applyFilters();
});

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
function saveFavorites() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function renderFeaturedCards(productsData) {

  ProductGridContainer.innerHTML = "";


  productsData.forEach(product => {
    let isFav = favorites.includes(product.id);

    const favBtnClass = isFav
      ? "bg-surface/95 dark:bg-zinc-900/95 text-secondary dark:text-secondary-fixed-dim shadow-sm"
      : "bg-surface/85 dark:bg-zinc-900/85 hover:bg-surface dark:hover:bg-zinc-800 text-on-surface-variant dark:text-zinc-200";
    const fillValue = isFav ? 1 : 0;

    ProductGridContainer.innerHTML += `

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


`;

  })

}

ProductGridContainer.addEventListener("click", (e) => {
  let btn = e.target.closest(".js-quick-add");

  if (!btn) return;

  let product = productsData.find(item => item.id === btn.dataset.id);
  let result = addToCart(product.id, product.defaultSize);

  showToast(result === "updated" ? "Already in your cart, quantity increased" : "Added to your cart");

})

// renderFeaturedCards(productsData);

let currentSearch = "";
let showfavourites = false;
let categoryName = "all";

searchBox.addEventListener("input", (e) => {
  currentSearch = e.target.value.toLowerCase().trim();
  currentPage = 1;
  applyFilters();
})

filtersBox.addEventListener("click", (e) => {

  if (e.target.closest(".js-category-btn")) {
    let productCategoryBtn = e.target.closest(".js-category-btn");
    categoryName = productCategoryBtn.dataset.cat;
    applyFilters()
  }

  if (e.target.closest(".js-favorites-toggle")) {
    console.log("favourite btn clicked!")
    showfavourites = !showfavourites;
    applyFilters()
  }

})

function applyFilters() {

  let filteredArray = productsData;
  // FOR CATEGORY
  if (categoryName !== "all") {
    filteredArray = productsData.filter(product => product.category === categoryName);
    currentPage = 1;
  }

  // FOR FAVOURITES
  if (showfavourites === true) {
    filteredArray = filteredArray.filter(product => favorites.includes(product.id))
    currentPage = 1;
  }

  // FOR RANGE
  let maxPrice = Number(priceRange.value);
  filteredArray = filteredArray.filter(product => product.startingPrice <= maxPrice)

  // FOR SEARCH
  filteredArray = filteredArray.filter(product => product.name.toLowerCase().includes(currentSearch));

  // FOR SORT
  let sortValue = sortSelect.value;
  filteredArray = [...filteredArray]

  if (sortValue === "price-asc") {
    filteredArray.sort((a, b) => a.startingPrice - b.startingPrice);
  }
  else if (sortValue === "price-desc") {
    filteredArray.sort((a, b) => b.startingPrice - a.startingPrice);
  }
  else if (sortValue === "name-asc") {
    filteredArray.sort((a, b) => a.name.localeCompare(b.name));
  }

  let start = (currentPage - 1) * perPage;
  let end = start + perPage;

  let totalPages = Math.ceil(filteredArray.length / perPage);

prevBtn.disabled = currentPage === 1;
nextBtn.disabled = currentPage === totalPages;

  let paginatedResult = filteredArray.slice(start, end)

  if (filteredArray.length === 0) {
    ProductGridContainer.innerHTML = "";
    ProductGridContainer.classList.add("hidden");
    emptyState.classList.remove("hidden");
  }
  else {
    emptyState.classList.add("hidden");
    emptyState.classList.remove("flex");
    ProductGridContainer.classList.remove("hidden");
    renderFeaturedCards(paginatedResult);
  }
}

ProductGridContainer.addEventListener("click", (e) => {

  if (e.target.closest(".js-fav-btn")) {
    let product = e.target.closest(".js-fav-btn");
    let productID = product.dataset.id;

    if (favorites.includes(productID)) {
      favorites = favorites.filter(favId => favId !== productID);

    } else {
      favorites.push(productID);
    }

    saveFavorites();
    applyFilters();
  }

})

priceRange.addEventListener("input", () => {
  priceDisplay.textContent = `$${priceRange.value}`
  currentPage = 1;
  applyFilters();
})

sortSelect.addEventListener("change", () => {
  currentPage = 1; 
  applyFilters()
});

resetBtn.addEventListener("click", () => {

  currentSearch = "";
  showfavourites = false;
  categoryName = "all";
currentPage = 1;
  searchBox.value = "";
  favToggleCheckbox.checked = false;
  priceRange.value = priceRange.max;
  priceDisplay.textContent = `$${priceRange.max}`;
  sortSelect.value = "all";

  applyFilters();
});


applyFilters();