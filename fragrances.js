   (function () {
                // Selectors
                const searchInput = document.querySelector('.js-search-input');
                const categoryBtns = document.querySelectorAll('.js-category-btn');
                const accordSelect = document.querySelector('.js-filter-accord');
                const concentrationSelect = document.querySelector('.js-filter-concentration');
                const sortSelect = document.querySelector('.js-sort-select');
                const priceRange = document.querySelector('.js-price-range');
                const priceVal = document.querySelector('.js-price-val');
                const favToggle = document.querySelector('.js-favorites-toggle');
                const badgeFilters = document.querySelectorAll('.js-filter-badge');
                const productGrid = document.querySelector('.js-product-grid');
                const cards = Array.from(document.querySelectorAll('.js-product-grid article'));
                const emptyState = document.querySelector('.js-empty-state');
                const resultsCount = document.querySelector('.js-results-count');
                const resetBtns = document.querySelectorAll('.js-reset-filters, .js-reset-empty');

                // Local state for favorites demo
                const favorites = new Set();

                // Toggle Wishlist on Product Cards
                cards.forEach((card, idx) => {
                    const favBtn = card.querySelector('.js-card-fav-btn');
                    if (favBtn) {
                        favBtn.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const cardId = idx.toString();
                            const icon = favBtn.querySelector('.material-symbols-outlined');

                            if (favorites.has(cardId)) {
                                favorites.delete(cardId);
                                card.removeAttribute('data-favorited');
                                favBtn.classList.remove('bg-primary', 'text-on-primary');
                                favBtn.classList.add('text-on-surface-variant');
                                icon.style.fontVariationSettings = "'FILL' 0";
                            } else {
                                favorites.add(cardId);
                                card.setAttribute('data-favorited', 'true');
                                favBtn.classList.add('bg-primary', 'text-on-primary');
                                favBtn.classList.remove('text-on-surface-variant');
                                icon.style.fontVariationSettings = "'FILL' 1";
                            }

                            // Update header count if present
                            const headerFavCount = document.querySelector('.js-wishlist-count');
                            if (headerFavCount) {
                                headerFavCount.textContent = favorites.size;
                            }

                            if (favToggle.checked) {
                                filterAndSort();
                            }
                        });
                    }
                });

                // Active Category Filter handling
                let currentCategory = 'all';
                categoryBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        categoryBtns.forEach(b => {
                            b.classList.remove('bg-primary', 'text-on-primary');
                            b.classList.add('text-on-surface-variant');
                        });
                        btn.classList.add('bg-primary', 'text-on-primary');
                        btn.classList.remove('text-on-surface-variant');
                        currentCategory = btn.dataset.category;
                        filterAndSort();
                    });
                });

                // Filter Badges at the top
                badgeFilters.forEach(badge => {
                    badge.addEventListener('click', () => {
                        badgeFilters.forEach(b => b.classList.remove('bg-primary', 'text-on-primary'));
                        badge.classList.add('bg-primary', 'text-on-primary');
                        const badgeType = badge.dataset.type;
                        if (badgeType === 'all') {
                            concentrationSelect.value = 'all';
                        } else {
                            concentrationSelect.value = badgeType;
                        }
                        filterAndSort();
                    });
                });

                // Price Range update
                if (priceRange && priceVal) {
                    priceRange.addEventListener('input', () => {
                        priceVal.textContent = `$${priceRange.value}`;
                        filterAndSort();
                    });
                }

                // Main Filtering and Sorting function
                function filterAndSort() {
                    const query = (searchInput.value || '').trim().toLowerCase();
                    const maxPrice = parseInt(priceRange.value, 10);
                    const accord = accordSelect.value;
                    const concentration = concentrationSelect.value;
                    const favoritesOnly = favToggle.checked;

                    let visibleCount = 0;

                    cards.forEach(card => {
                        const name = (card.dataset.name || '').toLowerCase();
                        const text = card.textContent.toLowerCase();
                        const cardCategory = card.dataset.category || 'all';
                        const cardAccord = card.dataset.accord || '';
                        const cardConcentration = card.dataset.concentration || '';
                        const cardPrice = parseInt(card.dataset.price || '0', 10);
                        const isFavorited = card.hasAttribute('data-favorited');

                        // Checks
                        const matchesQuery = !query || name.includes(query) || text.includes(query);
                        const matchesCategory = currentCategory === 'all' || cardCategory === currentCategory;
                        const matchesAccord = accord === 'all' || cardAccord === accord;
                        const matchesConcentration = concentration === 'all' || cardConcentration === concentration;
                        const matchesPrice = cardPrice <= maxPrice;
                        const matchesFavorites = !favoritesOnly || isFavorited;

                        if (matchesQuery && matchesCategory && matchesAccord && matchesConcentration && matchesPrice && matchesFavorites) {
                            card.classList.remove('hidden');
                            visibleCount++;
                        } else {
                            card.classList.add('hidden');
                        }
                    });

                    // Sorting
                    const sortMode = sortSelect.value;
                    const sortedCards = [...cards].sort((a, b) => {
                        const priceA = parseInt(a.dataset.price || '0', 10);
                        const priceB = parseInt(b.dataset.price || '0', 10);
                        const nameA = a.dataset.name || '';
                        const nameB = b.dataset.name || '';

                        if (sortMode === 'price-asc') return priceA - priceB;
                        if (sortMode === 'price-desc') return priceB - priceA;
                        if (sortMode === 'name-asc') return nameA.localeCompare(nameB);
                        return 0; // Default curated order
                    });

                    sortedCards.forEach(c => productGrid.appendChild(c));

                    // Update counters & UI states
                    if (resultsCount) {
                        resultsCount.textContent = `Showing ${visibleCount} of 24 Masterpieces`;
                    }

                    if (visibleCount === 0) {
                        emptyState.classList.remove('hidden');
                        emptyState.classList.add('flex');
                    } else {
                        emptyState.classList.add('hidden');
                        emptyState.classList.remove('flex');
                    }
                }

                // Attach Event Listeners for Filters
                if (searchInput) searchInput.addEventListener('input', filterAndSort);
                if (accordSelect) accordSelect.addEventListener('change', filterAndSort);
                if (concentrationSelect) concentrationSelect.addEventListener('change', filterAndSort);
                if (sortSelect) sortSelect.addEventListener('change', filterAndSort);
                if (favToggle) favToggle.addEventListener('change', filterAndSort);

                // Reset Functionality
                resetBtns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        if (searchInput) searchInput.value = '';
                        if (accordSelect) accordSelect.value = 'all';
                        if (concentrationSelect) concentrationSelect.value = 'all';
                        if (sortSelect) sortSelect.value = 'featured';
                        if (priceRange) {
                            priceRange.value = 280;
                            priceVal.textContent = '$280';
                        }
                        if (favToggle) favToggle.checked = false;

                        currentCategory = 'all';
                        categoryBtns.forEach((b, idx) => {
                            if (idx === 0) {
                                b.classList.add('bg-primary', 'text-on-primary');
                                b.classList.remove('text-on-surface-variant');
                            } else {
                                b.classList.remove('bg-primary', 'text-on-primary');
                                b.classList.add('text-on-surface-variant');
                            }
                        });

                        badgeFilters.forEach((b, idx) => {
                            if (idx === 0) {
                                b.classList.add('bg-primary', 'text-on-primary');
                            } else {
                                b.classList.remove('bg-primary', 'text-on-primary');
                            }
                        });

                        filterAndSort();
                    });
                });

            })();