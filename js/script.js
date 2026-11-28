// (function () {
//   // Interactive Catalog Logic
//   const categoryButtons = document.querySelectorAll('.js-category-btn');
//   const categoryCards = document.querySelectorAll('.js-category-card');
//   const priceRangeInput = document.querySelector('.js-price-range');
//   const priceDisplay = document.querySelector('.js-price-display');
//   const favoritesToggle = document.querySelector('.js-favorites-toggle');
//   const sortSelect = document.querySelector('.js-sort-select');
//   const productGrid = document.querySelector('.js-product-grid');
//   const emptyState = document.querySelector('.js-empty-state');
//   const resetFiltersBtn = document.querySelector('.js-reset-filters');
//   const wishlistBadges = document.querySelectorAll('.js-wishlist-count');
//   const cartBadges = document.querySelectorAll('.js-cart-count');
//   const themeToggles = document.querySelectorAll('.js-theme-toggle');

//   let currentCategory = 'all';
//   let maxPrice = 250;
//   let onlyFavorites = false;
//   let favoritesList = new Set();
//   let cartTotal = 0;

//   function getProductCards() {
//     return Array.from(document.querySelectorAll('.js-product-grid > article'));
//   }

//   function applyFilters() {
//     const cards = getProductCards();
//     let visibleCount = 0;

//     cards.forEach((card) => {
//       const cat = card.getAttribute('data-category');
//       const price = parseFloat(card.getAttribute('data-price') || '0');
//       const id = card.getAttribute('data-id');

//       const matchesCat = currentCategory === 'all' || cat === currentCategory;
//       const matchesPrice = price <= maxPrice;
//       const matchesFav = !onlyFavorites || favoritesList.has(id);

//       if (matchesCat && matchesPrice && matchesFav) {
//         card.classList.remove('hidden');
//         visibleCount++;
//       } else {
//         card.classList.add('hidden');
//       }
//     });

//     if (visibleCount === 0) {
//       if (emptyState) emptyState.classList.remove('hidden');
//     } else {
//       if (emptyState) emptyState.classList.add('hidden');
//     }
//   }

//   function applySort(type) {
//     const cards = getProductCards();
//     cards.sort((a, b) => {
//       const priceA = parseFloat(a.getAttribute('data-price') || '0');
//       const priceB = parseFloat(b.getAttribute('data-price') || '0');
//       const nameA = a.getAttribute('data-name') || '';
//       const nameB = b.getAttribute('data-name') || '';

//       if (type === 'price-asc') return priceA - priceB;
//       if (type === 'price-desc') return priceB - priceA;
//       if (type === 'name-asc') return nameA.localeCompare(nameB);
//       return 0; // featured default
//     });

//     cards.forEach((card) => productGrid.appendChild(card));
//   }

//   // Category button switching
//   categoryButtons.forEach((btn) => {
//     btn.addEventListener('click', () => {
//       categoryButtons.forEach((b) => {
//         b.classList.remove('bg-primary', 'text-on-primary');
//         b.classList.add('bg-transparent', 'text-on-surface-variant', 'border', 'border-outline-variant/50');
//       });
//       btn.classList.add('bg-primary', 'text-on-primary');
//       btn.classList.remove('bg-transparent', 'text-on-surface-variant', 'border', 'border-outline-variant/50');

//       currentCategory = btn.getAttribute('data-cat') || 'all';
//       applyFilters();
//     });
//   });

//   // Category banner cards
//   categoryCards.forEach((card) => {
//     card.addEventListener('click', (e) => {
//       const cat = card.getAttribute('data-category');
//       if (cat) {
//         currentCategory = cat;
//         categoryButtons.forEach((b) => {
//           const bCat = b.getAttribute('data-cat');
//           if (bCat === cat) {
//             b.classList.add('bg-primary', 'text-on-primary');
//             b.classList.remove('bg-transparent', 'text-on-surface-variant', 'border');
//           } else {
//             b.classList.remove('bg-primary', 'text-on-primary');
//             b.classList.add('bg-transparent', 'text-on-surface-variant', 'border');
//           }
//         });
//         applyFilters();
//       }
//     });
//   });

//   // Price range slider
//   if (priceRangeInput) {
//     priceRangeInput.addEventListener('input', (e) => {
//       maxPrice = parseFloat(e.target.value);
//       if (priceDisplay) priceDisplay.textContent = '$' + maxPrice;
//       applyFilters();
//     });
//   }

//   // Favorites only toggle
//   if (favoritesToggle) {
//     favoritesToggle.addEventListener('change', (e) => {
//       onlyFavorites = e.target.checked;
//       applyFilters();
//     });
//   }

//   // Sort Dropdown
//   if (sortSelect) {
//     sortSelect.addEventListener('change', (e) => {
//       applySort(e.target.value);
//     });
//   }

//   // Reset filters
//   if (resetFiltersBtn) {
//     resetFiltersBtn.addEventListener('click', () => {
//       currentCategory = 'all';
//       maxPrice = 250;
//       onlyFavorites = false;
//       if (priceRangeInput) priceRangeInput.value = 250;
//       if (priceDisplay) priceDisplay.textContent = '$250';
//       if (favoritesToggle) favoritesToggle.checked = false;

//       categoryButtons.forEach((b) => {
//         if (b.getAttribute('data-cat') === 'all') {
//           b.classList.add('bg-primary', 'text-on-primary');
//           b.classList.remove('bg-transparent', 'text-on-surface-variant');
//         } else {
//           b.classList.remove('bg-primary', 'text-on-primary');
//           b.classList.add('bg-transparent', 'text-on-surface-variant');
//         }
//       });
//       applyFilters();
//     });
//   }

//   // Wishlist Toggle
//   document.querySelectorAll('.js-fav-btn').forEach((btn) => {
//     btn.addEventListener('click', (e) => {
//       e.preventDefault();
//       e.stopPropagation();
//       const article = btn.closest('article');
//       const id = article ? article.getAttribute('data-id') : null;
//       const icon = btn.querySelector('.material-symbols-outlined');

//       if (id) {
//         if (favoritesList.has(id)) {
//           favoritesList.delete(id);
//           btn.classList.remove('text-error');
//           if (icon) icon.style.fontVariationSettings = "'FILL' 0";
//         } else {
//           favoritesList.add(id);
//           btn.classList.add('text-error');
//           if (icon) icon.style.fontVariationSettings = "'FILL' 1";
//         }
//         wishlistBadges.forEach((badge) => {
//           badge.textContent = favoritesList.size;
//         });
//         if (onlyFavorites) applyFilters();
//       }
//     });
//   });

//   // Quick Add to Cart
//   document.querySelectorAll('.js-quick-add').forEach((btn) => {
//     btn.addEventListener('click', (e) => {
//       e.preventDefault();
//       cartTotal++;
//       cartBadges.forEach((b) => (b.textContent = cartTotal));
//       const originalText = btn.innerHTML;
//       btn.innerHTML = 'Added ✓';
//       btn.classList.add('bg-secondary', 'text-on-secondary');
//       setTimeout(() => {
//         btn.innerHTML = originalText;
//         btn.classList.remove('bg-secondary', 'text-on-secondary');
//       }, 1200);
//     });
//   });

//   // Sample Request Micro-Interaction
//   const sampleBtn = document.querySelector('.js-request-sample');
//   if (sampleBtn) {
//     sampleBtn.addEventListener('click', () => {
//       cartTotal++;
//       cartBadges.forEach((b) => (b.textContent = cartTotal));
//       const orig = sampleBtn.textContent;
//       sampleBtn.textContent = 'Sample Added to Bag';
//       setTimeout(() => {
//         sampleBtn.textContent = orig;
//       }, 1400);
//     });
//   }

//   // Theme Toggle Handler
//   themeToggles.forEach((t) => {
//     t.addEventListener('click', () => {
//       document.documentElement.classList.toggle('dark');
//     });
//   });
// })();
import { getCart } from "./cart.js";
import { getFavourites } from "./favoritesStorage.js";
import { getCurrentUser } from "./authShared.js";
import { logOut } from "./authShared.js";
let html = document.querySelector(".html")
let ThemeToggleBtn = document.querySelector(".js-theme-toggle");
let NavDrawer = document.querySelector(".js-nav-drawer");
let menuToggle = document.querySelector(".js-menu-toggle");
let CartCount = document.querySelector(".js-cart-count");
let favCount = document.querySelector(".js-wishlist-count");
let logoutTrigger = document.querySelector(".js-logout-trigger");
let logoutModal = document.querySelector(".js-logout-modal");
let userInitials = document.querySelector(".js-user-initials");
let materialSymbolsOutlined = document.querySelector(".js-nav-fav-icon");
let screenMode = localStorage.getItem("screenModeLS") || "light";

// SCREEN MODE
function screenModeLS() {
  localStorage.setItem("screenModeLS", screenMode);
}
html.classList.add(screenMode);
ThemeToggleBtn.addEventListener("click", () => {
  console.log("theme clicked")
  if (screenMode === "light") {
    screenMode = "dark"
    html.classList.remove("light");
    html.classList.add("dark");
    screenModeLS()
  }

  else {
    screenMode = "light"
    html.classList.remove("dark");
    html.classList.add("light");
    screenModeLS()
  }
})



export function updateAuthUi() {
  let signOutBtnChecker = getCurrentUser()
  if (signOutBtnChecker === null) {
    logoutTrigger.classList.add("hidden")
  }
  else {
    logoutTrigger.classList.remove("hidden")

  }
}
updateAuthUi()

logoutTrigger.addEventListener("click", () => {
  logoutModal.classList.remove("hidden")

})

logoutModal.addEventListener("click", (e) => {
  if (e.target.closest(".js-logout-cancel")) {
    logoutModal.classList.add("hidden")
    return;
  }
  if (e.target.closest(".js-logout-confirm")) {
    logoutModal.classList.add("hidden");
    logOut();
    updateAuthUi()
  }

})


export function updateCartBadge() {
  let cartLength = getCart();
  CartCount.textContent = `${cartLength.length}`
}

let simpleFavClass = "material-symbols-outlined text-[18px]"
let coloredFavClass = "material-symbols-outlined text-[18px] icon-filled text-secondary dark:text-secondary-fixed-dim"


export function updateFavBadge() {
  let favLength = getFavourites();

  if (favLength.length > 0) {
    materialSymbolsOutlined.className = coloredFavClass;
    materialSymbolsOutlined.style.fontVariationSettings = "'FILL' 1";
  } else {
    materialSymbolsOutlined.className = simpleFavClass;
    materialSymbolsOutlined.style.fontVariationSettings = "'FILL' 0";
  }

  favCount.textContent = `${favLength.length}`
}
updateFavBadge()
updateCartBadge()

menuToggle.addEventListener("click", () => {
  NavDrawer.classList.remove("hidden")
})


NavDrawer.addEventListener("click", (e) => {

  if (e.target.closest(".material-symbols-outlined")) {
    NavDrawer.classList.add("hidden")
  }

  if (e.target !== NavDrawer) {
    NavDrawer.classList.add("hidden")
  }

})




