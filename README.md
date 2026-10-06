# Domus Fuego

Sitio web responsive para Domus Fuego, restaurante de parrilla, steakhouse y BBQ.

## Tecnologías

- HTML5 semántico
- CSS3, Bootstrap 5.3 y estilos propios
- JavaScript ES6 para navegación, validación de reservas y mensajes de estado

## Vista previa local

Abre `index.html` en un navegador o ejecuta un servidor local:

```bash
python3 -m http.server 8000
```

Visita `http://localhost:8000`.

## Funcionalidades

- Diseño adaptable a móviles, tabletas y escritorio, con etiquetas ARIA y controles accesibles por teclado.
- El botón **Menú** abre una vista exclusiva con las categorías y precios compartidos por el restaurante; **Volver al sitio** restaura la página principal.
- El formulario rechaza fechas anteriores al día actual y muestra una confirmación de solicitud con un enlace para llamar al **0983067670**.
- Contacto por correo: `domusfuego@gmail.com`.

## Alcance de las reservas

El formulario es una demostración de interfaz: no envía ni almacena reservas y no confirma disponibilidad. Para confirmar la solicitud, el cliente debe comunicarse con el restaurante por teléfono.
