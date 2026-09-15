# Auditoría técnica del sitio web Domus Fuego

**Proyecto:** Bosquejo de página web para restaurante premium de carnes
**Fecha de revisión:** 15 de septiembre de 2026
**Repositorio:** `https://github.com/KiddoMaki/Bosquejo`
**Alcance:** HTML, CSS, comportamiento responsive, accesibilidad básica, contenido y publicación

## 1. Objetivo de la auditoría

Evaluar la calidad estructural y visual del sitio web de Domus Fuego, con especial atención en la experiencia de navegación desde dispositivos móviles. La revisión busca identificar problemas concretos, documentar las correcciones realizadas y registrar los aspectos que todavía podrían mejorarse antes de considerar el sitio como una versión final de producción.

## 2. Metodología

La revisión se realizó mediante:

- inspección de la estructura semántica en `index.html`;
- revisión de estilos, breakpoints y distribución en `styles.css`;
- comprobación del comportamiento de la navegación en pantallas pequeñas y medianas;
- verificación de la carga del documento mediante un servidor HTTP local;
- validación de cambios con `git diff --check`;
- comprobación del estado de la rama `main` y su sincronización con el repositorio remoto.

La auditoría se centra en el estado actual del bosquejo. No sustituye una prueba completa en navegadores físicos, lectores de pantalla ni dispositivos reales.

## 3. Descripción técnica

El proyecto utiliza una arquitectura de página única compuesta por:

- `index.html`: contenido, estructura, navegación, formulario y referencias a imágenes;
- `styles.css`: sistema visual, distribución, colores y reglas responsive;
- `DFLOGO.png`: identidad gráfica utilizada en el encabezado y el pie de página;
- `AUDITORIA.md`: documentación de la revisión y de las correcciones aplicadas;
- `README.md`: descripción general del proyecto.

La página está organizada en las secciones `hero`, `essence`, `menu`, `reservas` y `contacto`. El sitio se sirve como una página estática y no utiliza un framework frontend.

## 4. Hallazgos y evaluación

### 4.1. Navegación móvil

**Severidad:** Alta
**Estado:** Corregido

En la primera versión, los elementos de navegación se comprimían y podían quedar visualmente centrados de forma incorrecta en pantallas pequeñas. Esto afectaba el acceso a las secciones principales y hacía que el encabezado ocupara más espacio del necesario.

**Causa identificada:** la distribución horizontal del encabezado no tenía una interacción específica para anchos reducidos.

**Corrección aplicada:**

- se incorporó un menú hamburguesa nativo mediante `<details>` y `<summary>`;
- el panel de enlaces permanece cerrado por defecto en móvil y se abre sin JavaScript;
- el control es operable con teclado y cambia a un icono de cierre al abrirse;
- el botón de reserva ocupa el ancho disponible;
- la marca y el logotipo se mantienen centrados;
- los controles conservan dimensiones estables para evitar saltos visuales.

### 4.2. Comportamiento del encabezado al desplazarse

**Severidad:** Media
**Estado:** Implementado como mejora opcional para móvil

El encabezado fijo resultaba demasiado invasivo al recorrer el contenido en un teléfono. Se solicitó que el encabezado se redujera o desapareciera al llegar a la sección “Nuestra esencia” y volviera a estar disponible al regresar hacia la parte superior.

**Implementación actual:**

- el comportamiento se activa mediante el breakpoint `max-width: 640px` del script inline;
- antes de entrar completamente en la sección, el encabezado puede reducir su altura;
- al continuar el desplazamiento, se oculta mediante una transformación CSS;
- en pantallas superiores a 640px se eliminan los estados móviles y la navegación permanece normal;
- el estado se calcula tomando como referencia la posición de la sección `#essence`.

**Observación técnica:** el layout responsive y la navegación siguen funcionando sin JavaScript. El ocultamiento dinámico del encabezado es una mejora opcional que sí depende del script inline; el archivo independiente `script.js` no se utiliza y fue eliminado para evitar duplicidad.

### 4.3. Diseño responsive general

**Severidad:** Media
**Estado:** Corregido en el alcance actual

La página cuenta con breakpoints para reorganizar los bloques principales. En pantallas menores, las columnas de esencia, menú, reservas y pie de página pasan a una sola columna. También se adaptan los botones, la galería y el formulario.

**Medidas aplicadas:**

- base mobile-first con `grid-template-columns: 1fr` y ampliación progresiva mediante `min-width: 768px` y `min-width: 1024px`;
- uso de CSS Grid para la macroestructura global y Flexbox para la alineación interna;
- menú hamburguesa y botones de ancho completo en móvil;
- formulario dividido en una sola columna cuando el espacio es limitado;
- galería adaptada para evitar desbordamientos;
- variables CSS para colores, tipografías y espaciados;
- soporte para `prefers-color-scheme: dark` y `prefers-reduced-motion: reduce`;
- navegación con ancho controlado para evitar que se salga de la pantalla.

### 4.4. Orientación horizontal en dispositivos móviles

**Severidad:** Media
**Estado:** Pendiente de ajuste

Al girar un teléfono a orientación horizontal, el encabezado no se oculta al desplazarse como ocurre en orientación vertical. El problema se produce porque el script inline decide si está en modo móvil únicamente mediante `max-width: 640px`; al aumentar el ancho disponible por la rotación, esa condición puede dejar de cumplirse aunque el dispositivo siga siendo un teléfono.

**Impacto:** el comportamiento del encabezado cambia según la orientación del dispositivo y la navegación puede ocupar espacio adicional en la parte superior durante el desplazamiento horizontal.

**Recomendación:** sustituir la detección exclusiva por ancho por una condición que también contemple la orientación (`orientation: portrait` / `orientation: landscape`) o utilizar un breakpoint móvil más amplio. Después debe repetirse la prueba de scroll en ambas orientaciones y comprobar que el menú hamburguesa siga siendo accesible.

### 4.5. Jerarquía de marca y contenido

**Severidad:** Media
**Estado:** Corregido

El nombre del restaurante se conserva como el `h1` principal dentro del hero. El logotipo se utiliza en el encabezado y en el pie de página, sin reemplazar el título principal de la página.

Esta separación mejora la jerarquía semántica: el `h1` comunica el nombre del sitio a usuarios y motores de búsqueda, mientras que la imagen funciona como elemento de identidad visual.

### 4.6. Estructura semántica y accesibilidad básica

**Severidad:** Baja
**Estado:** Parcialmente implementado

La página utiliza elementos semánticos apropiados como `header`, `nav`, `main`, `section`, `article`, `form` y `footer`. Las imágenes principales tienen texto alternativo y la navegación cuenta con `aria-label`.

**Aspectos pendientes:**

- los campos del formulario no tienen atributos `required`;
- los mensajes de error y confirmación todavía no están implementados;
- el formulario utiliza `action="#"`, por lo que no procesa reservas reales;
- debe comprobarse el contraste final con una herramienta automática de accesibilidad;
- conviene probar navegación completa mediante teclado.

### 4.7. Formulario de reservas

**Severidad:** Media
**Estado:** Bosquejo visual

El formulario contiene nombre, fecha, hora y número de personas, por lo que cubre el flujo visual básico de una reserva. Sin embargo, actualmente funciona únicamente como demostración de interfaz.

**Limitaciones:**

- no existe una conexión con un servidor o servicio de reservas;
- no hay validación personalizada en el cliente;
- no se impide seleccionar fechas pasadas;
- no se muestra un resultado después del envío;
- los datos no se almacenan ni se envían a un destinatario real.

### 4.8. Rendimiento y recursos externos

**Severidad:** Media
**Estado:** Pendiente de optimización

La página utiliza imágenes alojadas en Unsplash y fuentes de Google Fonts. Estos recursos mejoran la presentación visual, pero dependen de conexiones externas y pueden aumentar el tiempo de carga.

**Recomendaciones:**

- comprimir y dimensionar las imágenes según el espacio donde se muestran;
- utilizar `loading="lazy"` en imágenes que aparecen después del hero;
- considerar una copia local de las imágenes para controlar disponibilidad y rendimiento;
- revisar el peso de las fuentes y cargar únicamente los pesos utilizados.

## 5. Pruebas realizadas

| Prueba | Resultado |
|---|---|
| Servidor HTTP local | Exitosa; el documento respondió con HTTP 200 |
| Validación de espacios y errores básicos del diff | Exitosa mediante `git diff --check` |
| Verificación de layout mobile-first | Base de una columna en `styles.css` |
| Verificación de breakpoints | `min-width: 768px` para tablet y `min-width: 1024px` para desktop |
| Verificación de accesibilidad CSS | Consultas de tema oscuro y movimiento reducido implementadas |
| Verificación de orientación horizontal | Limitación identificada: el script actual depende de `max-width: 640px` |
| Publicación en GitHub | Pendiente hasta validar y publicar este estado |

## 6. Riesgos y pendientes

Antes de utilizar el sitio como página de producción, se recomienda atender estos puntos:

1. probar la interfaz en teléfonos reales y en diferentes navegadores;
2. decidir si el ocultamiento dinámico de la navbar debe mantenerse con JavaScript o dejarse fija;
3. corregir y validar el comportamiento del encabezado al girar el teléfono a orientación horizontal;
4. conectar el formulario a un sistema real de reservas;
5. agregar validación, mensajes de estado y campos obligatorios;
6. optimizar imágenes y recursos externos;
7. ejecutar una revisión de accesibilidad con Lighthouse, axe o una herramienta equivalente.

## 7. Conclusión

El bosquejo cumple correctamente con la estructura visual solicitada para un restaurante premium de carnes y presenta una adaptación responsive funcional para el alcance actual. Los problemas principales de distribución de la navbar, ubicación de la marca y organización del contenido móvil fueron corregidos.

El proyecto debe considerarse una versión estática de demostración, no una solución de reservas lista para producción. La prioridad siguiente es definir el requisito definitivo sobre JavaScript y validar el comportamiento en dispositivos físicos antes de cerrar la implementación.
