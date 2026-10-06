import { readCart, writeCart } from "./storage.js";

export function createCart() {
  let items = readCart().filter((item) => item && typeof item.id === "string" && Number.isInteger(item.quantity) && item.quantity > 0);
  const listeners = new Set();

  function notify() {
    writeCart(items);
    listeners.forEach((listener) => listener(items));
  }

  return {
    getItems() {
      return items.map((item) => ({ ...item }));
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    add(productId) {
      const existing = items.find((item) => item.id === productId);
      if (existing) {
        existing.quantity += 1;
      } else {
        items.push({ id: productId, quantity: 1 });
      }
      notify();
    },
    setQuantity(productId, quantity) {
      if (quantity < 1) {
        this.remove(productId);
        return;
      }
      const item = items.find((entry) => entry.id === productId);
      if (item) {
        item.quantity = quantity;
        notify();
      }
    },
    remove(productId) {
      items = items.filter((item) => item.id !== productId);
      notify();
    },
    clear() {
      items = [];
      notify();
    },
  };
}