# Domus Fuego

Sitio responsive para restaurante con catálogo local de platos, carrito de compras y formularios de contacto y reserva. El catálogo es una demostración de pedido: no procesa pagos ni envía órdenes al restaurante.

## Estructura

```text
.
├── assets/
│   ├── DFLOGO.png       # Logotipo local
│   └── styles.css       # Estilos del catálogo; importa los estilos base existentes
├── data/
│   └── productos.json   # Productos, precios, imágenes y fecha de actualización
├── js/
│   ├── app.js           # Inicialización, navegación y validaciones
│   ├── cart.js          # Estado y operaciones del carrito
│   ├── repo.js          # Carga JSON y caché IndexedDB
│   ├── storage.js       # Adaptadores de almacenamiento web
│   └── view.js          # Renderizado de productos, filtros y carrito
├── index.html
└── styles.css           # Hoja de estilos base de la landing original
```

## Ejecución

Se necesita un servidor HTTP local porque los módulos ES y `fetch()` no cargan el JSON de forma fiable desde `file://`.

```bash
python3 -m http.server 8000
```

Abre `http://localhost:8000`.

## Publicación

El workflow de GitHub Actions despliega automáticamente la rama `main` en GitHub Pages. Cuando finalice la primera ejecución, el sitio estará disponible en `https://kiddomaki.github.io/Bosquejo/`.

## Explicación técnica

- `js/repo.js` obtiene `data/productos.json`, valida su estructura y guarda los productos y `updatedAt` en IndexedDB.
- `js/view.js` crea tarjetas reutilizables con imagen alternativa, descripción, precio y control para agregar al carrito; también presenta cantidades, eliminación y subtotales.
- `js/cart.js` mantiene el estado del pedido y lo persiste en `localStorage` para restaurarlo después de recargar.
- `js/storage.js` separa el almacenamiento: carrito y marca de actualización en `localStorage`, filtro de categoría durante la pestaña en `sessionStorage`, catálogo y fecha en IndexedDB.
- `data/productos.json` es la fuente editable del catálogo. Actualiza `updatedAt` al publicar cambios.

## Accesibilidad y persistencia

La interfaz conserva estructura semántica, navegación por teclado, foco visible, textos alternativos, controles con nombres accesibles y regiones de estado. El formulario de contacto valida nombre, correo y mensaje con expresiones regulares y reglas de longitud; expone los errores con `aria-invalid` y `aria-describedby`, y enfoca el primer campo incorrecto. Se respeta `prefers-reduced-motion`.

El carrito sobrevive recargas mediante `localStorage`; `sessionStorage` conserva el filtro mientras dura la pestaña; IndexedDB guarda una copia estructurada del catálogo y su fecha de actualización. La reserva y el contacto son demostraciones locales: muestran confirmación de validación, pero no transmiten datos.
