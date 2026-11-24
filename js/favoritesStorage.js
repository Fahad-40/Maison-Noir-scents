let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

export function getFavourites() {
  return favorites;
}

export function saveFavorites(updatedFavorites) {
  favorites = updatedFavorites;
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

