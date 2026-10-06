const currency = new Intl.NumberFormat("es-EC", { style: "currency", currency: "USD" });

function makeButton(label, className, onClick, ariaLabel = label) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = label;
  button.setAttribute("aria-label", ariaLabel);
  button.addEventListener("click", onClick);
  return button;
}

export function renderProducts(products, container, onAdd) {
  container.replaceChildren();

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = document.createElement("img");
    image.className = "product-image";
    image.src = product.image;
    image.alt = product.imageAlt;
    image.loading = "lazy";

    const content = document.createElement("div");
    content.className = "product-content";

    const category = document.createElement("p");
    category.className = "product-category";
    category.textContent = product.category;

    const title = document.createElement("h3");
    title.textContent = product.name;

    const description = document.createElement("p");
    description.className = "product-description";
    description.textContent = product.description;

    const buyRow = document.createElement("div");
    buyRow.className = "product-buy-row";

    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = currency.format(product.price);

    const addButton = makeButton("Agregar", "btn btn-primary", () => onAdd(product.id), `Agregar ${product.name} al carrito`);
    buyRow.append(price, addButton);
    content.append(category, title, description, buyRow);
    card.append(image, content);
    container.append(card);
  });
}

export function renderCart(products, cart, elements) {
  const productsById = new Map(products.map((product) => [product.id, product]));
  const items = cart.getItems().filter((item) => productsById.has(item.id));
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + productsById.get(item.id).price * item.quantity, 0);

  elements.list.replaceChildren();
  items.forEach((item) => {
    const product = productsById.get(item.id);
    const line = document.createElement("li");
    line.className = "cart-line";

    const detail = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = product.name;
    const quantity = document.createElement("div");
    quantity.className = "cart-quantity";
    const decrease = makeButton("−", "", () => cart.setQuantity(item.id, item.quantity - 1), `Reducir ${product.name}`);
    const amount = document.createElement("span");
    amount.textContent = String(item.quantity);
    amount.setAttribute("aria-label", `${item.quantity} unidades`);
    const increase = makeButton("+", "", () => cart.setQuantity(item.id, item.quantity + 1), `Aumentar ${product.name}`);
    quantity.append(decrease, amount, increase);
    detail.append(title, quantity);

    const linePrice = document.createElement("span");
    linePrice.className = "cart-line-price";
    linePrice.textContent = currency.format(product.price * item.quantity);
    const remove = makeButton("Eliminar", "cart-remove", () => cart.remove(item.id), `Eliminar ${product.name} del carrito`);
    line.append(detail, linePrice, remove);
    elements.list.append(line);
  });

  elements.empty.hidden = items.length > 0;
  elements.list.hidden = items.length === 0;
  elements.count.textContent = `${count} ${count === 1 ? "artículo" : "artículos"}`;
  elements.subtotal.textContent = currency.format(subtotal);
  elements.total.textContent = currency.format(subtotal);
  elements.headerCount.textContent = String(count);
  elements.headerCount.setAttribute("aria-label", `${count} productos`);
  elements.clearButton.disabled = items.length === 0;
}

export function fillCategoryFilter(products, select, initialCategory, onChange) {
  const categories = [...new Set(products.map((product) => product.category))].sort((left, right) => left.localeCompare(right, "es"));
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    select.append(option);
  });

  select.value = categories.includes(initialCategory) ? initialCategory : "all";
  select.addEventListener("change", () => onChange(select.value));
}