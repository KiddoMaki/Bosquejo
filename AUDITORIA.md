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
- comprobación del comportamiento de la navegación en pantallas pequeñas;
- verificación de la carga del documento mediante un servidor HTTP local;
- validación de cambios con `git diff --check`;
- comprobación de la publicación en la rama `main` del repositorio remoto.

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

**Causa identificada:** la distribución horizontal del encabezado no tenía una reorganización suficientemente controlada para anchos reducidos.

**Corrección aplicada:**

- se creó un layout vertical para el encabezado móvil;
- los enlaces se organizaron en una cuadrícula de dos columnas;
- el botón de reserva ocupa el ancho disponible;
- la marca y el logotipo se mantienen centrados;
- los controles conservan dimensiones estables para evitar saltos visuales.

### 4.2. Comportamiento del encabezado al desplazarse

**Severidad:** Media
**Estado:** Implementado únicamente para móvil

El encabezado fijo resultaba demasiado invasivo al recorrer el contenido en un teléfono. Se solicitó que el encabezado se redujera o desapareciera al llegar a la sección “Nuestra esencia” y volviera a estar disponible al regresar hacia la parte superior.

**Implementación actual:**

- el comportamiento se activa mediante el breakpoint `max-width: 640px`;
- antes de entrar completamente en la sección, el encabezado puede reducir su altura;
- al continuar el desplazamiento, se oculta mediante una transformación CSS;
- en pantallas superiores a 640px se eliminan los estados móviles y la navegación permanece normal;
- el estado se calcula tomando como referencia la posición de la sección `#essence`.

**Observación técnica:** este comportamiento depende de JavaScript para detectar el desplazamiento. Si el requisito definitivo del proyecto es funcionar sin JavaScript, debe sustituirse por una solución exclusivamente CSS o dejar el encabezado fijo sin ocultamiento dinámico.

### 4.3. Diseño responsive general

**Severidad:** Media
**Estado:** Corregido en el alcance actual

La página cuenta con breakpoints para reorganizar los bloques principales. En pantallas menores, las columnas de esencia, menú, reservas y pie de página pasan a una sola columna. También se adaptan los botones, la galería y el formulario.

**Medidas aplicadas:**

- uso de `grid-template-columns` para pasar de varias columnas a una;
- botones de ancho completo en móvil;
- formulario dividido en una sola columna cuando el espacio es limitado;
- galería adaptada para evitar desbordamientos;
- padding reducido en las secciones móviles;
- navegación con ancho controlado para evitar que se salga de la pantalla.

### 4.4. Jerarquía de marca y contenido

**Severidad:** Media
**Estado:** Corregido

El nombre del restaurante se conserva como el `h1` principal dentro del hero. El logotipo se utiliza en el encabezado y en el pie de página, sin reemplazar el título principal de la página.

Esta separación mejora la jerarquía semántica: el `h1` comunica el nombre del sitio a usuarios y motores de búsqueda, mientras que la imagen funciona como elemento de identidad visual.

### 4.5. Estructura semántica y accesibilidad básica

**Severidad:** Baja
**Estado:** Parcialmente implementado

La página utiliza elementos semánticos apropiados como `header`, `nav`, `main`, `section`, `article`, `form` y `footer`. Las imágenes principales tienen texto alternativo y la navegación cuenta con `aria-label`.

**Aspectos pendientes:**

- los campos del formulario no tienen atributos `required`;
- los mensajes de error y confirmación todavía no están implementados;
- el formulario utiliza `action="#"`, por lo que no procesa reservas reales;
- debe comprobarse el contraste final con una herramienta automática de accesibilidad;
- conviene probar navegación completa mediante teclado.

### 4.6. Formulario de reservas

**Severidad:** Media
**Estado:** Bosquejo visual

El formulario contiene nombre, fecha, hora y número de personas, por lo que cubre el flujo visual básico de una reserva. Sin embargo, actualmente funciona únicamente como demostración de interfaz.

**Limitaciones:**

- no existe una conexión con un servidor o servicio de reservas;
- no hay validación personalizada en el cliente;
- no se impide seleccionar fechas pasadas;
- no se muestra un resultado después del envío;
- los datos no se almacenan ni se envían a un destinatario real.

### 4.7. Rendimiento y recursos externos

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
| Verificación de breakpoint móvil | Implementada en `styles.css` para `max-width: 640px` |
| Verificación de estado desktop | El comportamiento móvil se limpia cuando la ventana supera 640px |
| Publicación en GitHub | Exitosa en la rama `main` |

## 6. Riesgos y pendientes

Antes de utilizar el sitio como página de producción, se recomienda atender estos puntos:

1. probar la interfaz en teléfonos reales y en diferentes navegadores;
2. decidir si el comportamiento de la navbar puede utilizar JavaScript o debe ser exclusivamente CSS;
3. conectar el formulario a un sistema real de reservas;
4. agregar validación, mensajes de estado y campos obligatorios;
5. optimizar imágenes y recursos externos;
6. ejecutar una revisión de accesibilidad con Lighthouse, axe o una herramienta equivalente.

## 7. Conclusión

El bosquejo cumple correctamente con la estructura visual solicitada para un restaurante premium de carnes y presenta una adaptación responsive funcional para el alcance actual. Los problemas principales de distribución de la navbar, ubicación de la marca y organización del contenido móvil fueron corregidos.

El proyecto debe considerarse una versión estática de demostración, no una solución de reservas lista para producción. La prioridad siguiente es definir el requisito definitivo sobre JavaScript y validar el comportamiento en dispositivos físicos antes de cerrar la implementación.
