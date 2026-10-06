const CART_KEY = "domus-fuego-cart";
const CATEGORY_KEY = "domus-fuego-category";
const UPDATED_KEY = "domus-fuego-catalog-updated";

export function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function writeCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function readCategory() {
  return sessionStorage.getItem(CATEGORY_KEY) || "all";
}

export function writeCategory(category) {
  sessionStorage.setItem(CATEGORY_KEY, category);
}

export function writeCatalogUpdatedAt(updatedAt) {
  localStorage.setItem(UPDATED_KEY, updatedAt);
}