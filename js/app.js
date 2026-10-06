import { createCart } from "./cart.js";
import { loadCatalog } from "./repo.js";
import { readCategory, writeCategory, writeCatalogUpdatedAt } from "./storage.js";
import { fillCategoryFilter, renderCart, renderProducts } from "./view.js";

const cart = createCart();
const productGrid = document.querySelector("#productGrid");
const categoryFilter = document.querySelector("#categoryFilter");
const catalogMessage = document.querySelector("#catalogMessage");
const cartElements = {
  list: document.querySelector("#cartItems"),
  empty: document.querySelector("#emptyCart"),
  count: document.querySelector("#cartItemCount"),
  subtotal: document.querySelector("#cartSubtotal"),
  total: document.querySelector("#cartTotal"),
  headerCount: document.querySelector("#cartCount"),
  clearButton: document.querySelector("#clearCart"),
};

let products = [];
let menuOpener;

function renderCatalog() {
  const selectedCategory = categoryFilter.value;
  const visibleProducts = selectedCategory === "all"
    ? products
    : products.filter((product) => product.category === selectedCategory);
  renderProducts(visibleProducts, productGrid, (productId) => {
    cart.add(productId);
    catalogMessage.textContent = "Producto agregado al carrito.";
  });
  renderCart(products, cart, cartElements);
}

async function initializeCatalog() {
  try {
    const catalog = await loadCatalog();
    products = catalog.products;
    writeCatalogUpdatedAt(catalog.updatedAt);
    const updated = new Date(catalog.updatedAt);
    document.querySelector("#catalogUpdated").textContent = `Actualizado: ${updated.toLocaleString("es-EC", { dateStyle: "medium", timeStyle: "short" })}`;

    fillCategoryFilter(products, categoryFilter, readCategory(), (category) => {
      writeCategory(category);
      renderCatalog();
    });
    productGrid.setAttribute("aria-busy", "false");
    renderCatalog();
    cart.subscribe(renderCatalog);
  } catch (error) {
    productGrid.setAttribute("aria-busy", "false");
    catalogMessage.textContent = `${error.message} Ejecuta el proyecto desde un servidor local para cargar el archivo JSON.`;
  }
}

function closeMobileNavigation() {
  const navigation = document.querySelector("#mainNavigation");
  if (navigation.classList.contains("show")) {
    document.querySelector(".navbar-toggler").click();
  }
}

function showMenu(event) {
  menuOpener = event.currentTarget;
  document.querySelector("#landingView").hidden = true;
  document.querySelector("#menuView").hidden = false;
  document.querySelector("#contacto").hidden = true;
  document.querySelector("#menuNavButton").setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-view-active");
  closeMobileNavigation();
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.querySelector("#menuTitle").focus();
}

function showLanding() {
  document.querySelector("#menuView").hidden = true;
  document.querySelector("#landingView").hidden = false;
  document.querySelector("#contacto").hidden = false;
  document.querySelector("#menuNavButton").setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-view-active");
}

document.querySelectorAll("[data-open-menu]").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    showMenu(event);
  });
});

document.querySelectorAll("[data-close-menu]").forEach((button) => {
  button.addEventListener("click", () => {
    showLanding();
    document.querySelector("#inicio").scrollIntoView({ behavior: "smooth" });
    if (menuOpener instanceof HTMLElement && menuOpener.isConnected) {
      menuOpener.focus();
    }
  });
});

document.querySelector("#menuNavButton").addEventListener("click", showMenu);
document.querySelectorAll("[data-landing-link]").forEach((link) => {
  link.addEventListener("click", () => {
    showLanding();
    closeMobileNavigation();
  });
});
document.querySelector("#clearCart").addEventListener("click", () => cart.clear());

const reservationForm = document.querySelector("#reservationForm");
const reservationDate = document.querySelector("#reservationDate");
const reservationName = document.querySelector("#reservationName");
const reservationFeedback = document.querySelector("#reservationFeedback");

function updateMinimumReservationDate() {
  const today = new Date();
  reservationDate.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
}

updateMinimumReservationDate();
reservationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  updateMinimumReservationDate();
  const namePattern = /^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u;
  const customerName = reservationName.value.trim();

  if (!namePattern.test(customerName)) {
    reservationName.setCustomValidity("Ingresa un nombre válido.");
    reservationName.reportValidity();
    return;
  }
  reservationName.setCustomValidity("");
  if (reservationDate.value < reservationDate.min) {
    reservationDate.setCustomValidity("No se puede reservar en una fecha pasada.");
    reservationDate.reportValidity();
    return;
  }
  reservationDate.setCustomValidity("");
  const formData = new FormData(reservationForm);
  const date = new Date(`${reservationDate.value}T12:00:00`).toLocaleDateString("es-EC", { dateStyle: "long" });
  reservationFeedback.textContent = `Gracias, ${customerName}. Recibimos tu solicitud para el ${date} a las ${formData.get("hora")}. Confirma disponibilidad al 0983067670.`;
  reservationFeedback.hidden = false;
});

const contactForm = document.querySelector("#contactForm");
const contactFields = [
  {
    input: document.querySelector("#contactName"),
    error: document.querySelector("#contactNameError"),
    validate: (value) => /^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u.test(value.trim()),
  },
  {
    input: document.querySelector("#contactEmail"),
    error: document.querySelector("#contactEmailError"),
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()),
  },
  {
    input: document.querySelector("#contactMessage"),
    error: document.querySelector("#contactMessageError"),
    validate: (value) => value.trim().length >= 10,
  },
];

contactFields.forEach(({ input, error }) => {
  input.addEventListener("input", () => {
    input.removeAttribute("aria-invalid");
    error.hidden = true;
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let firstInvalidField;

  contactFields.forEach(({ input, error, validate }) => {
    const isValid = validate(input.value);
    input.setAttribute("aria-invalid", String(!isValid));
    error.hidden = isValid;
    if (!isValid && !firstInvalidField) {
      firstInvalidField = input;
    }
  });

  if (firstInvalidField) {
    firstInvalidField.focus();
    document.querySelector("#contactFeedback").textContent = "Revisa los campos marcados antes de continuar.";
    return;
  }

  document.querySelector("#contactFeedback").textContent = "Datos validados. Este bosquejo no envía mensajes todavía.";
  contactForm.reset();
  contactFields.forEach(({ input }) => input.removeAttribute("aria-invalid"));
});

initializeCatalog();