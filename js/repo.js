const databaseName = "domus-fuego-catalog";
const databaseVersion = 1;

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB no está disponible en este navegador."));
      return;
    }

    const request = indexedDB.open(databaseName, databaseVersion);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains("products")) {
        database.createObjectStore("products", { keyPath: "id" });
      }
      if (!database.objectStoreNames.contains("metadata")) {
        database.createObjectStore("metadata", { keyPath: "key" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function cacheCatalog(catalog) {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(["products", "metadata"], "readwrite");
    const products = transaction.objectStore("products");
    products.clear();
    catalog.products.forEach((product) => products.put(product));
    transaction.objectStore("metadata").put({ key: "updatedAt", value: catalog.updatedAt });
    transaction.oncomplete = () => {
      database.close();
      resolve();
    };
    transaction.onerror = () => {
      database.close();
      reject(transaction.error);
    };
  });
}

async function readCachedCatalog() {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(["products", "metadata"], "readonly");
    const productsRequest = transaction.objectStore("products").getAll();
    const updatedRequest = transaction.objectStore("metadata").get("updatedAt");

    transaction.oncomplete = () => {
      database.close();
      if (productsRequest.result.length && updatedRequest.result?.value) {
        resolve({ products: productsRequest.result, updatedAt: updatedRequest.result.value });
      } else {
        reject(new Error("No hay un catálogo guardado en IndexedDB."));
      }
    };
    transaction.onerror = () => {
      database.close();
      reject(transaction.error);
    };
  });
}

export async function loadCatalog() {
  try {
    const response = await fetch(new URL("../data/productos.json", import.meta.url));
    if (!response.ok) {
      throw new Error(`No se pudo cargar el catálogo (HTTP ${response.status}).`);
    }

    const catalog = await response.json();
    if (!Array.isArray(catalog.products) || typeof catalog.updatedAt !== "string") {
      throw new Error("El archivo de productos no tiene el formato esperado.");
    }

    try {
      await cacheCatalog(catalog);
    } catch (error) {
      console.warn("No se pudo guardar la copia IndexedDB del catálogo.", error);
    }
    return catalog;
  } catch (error) {
    try {
      return await readCachedCatalog();
    } catch {
      throw error;
    }
  }
}