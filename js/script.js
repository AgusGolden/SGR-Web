// document.addEventListener('DOMContentLoaded', () => {
//     const menuLinks = document.querySelectorAll('.menu-nav a');
//     const submenuLinks = document.querySelectorAll('.submenu-nav a');

//     // Obtener el archivo actual (ej: listar-reparaciones.html)
//     const archivoActual = window.location.pathname.split('/').pop();

//     let seccionMenuPrincipal = null;

//     // Buscar y activar el enlace del submenu correspondiente al archivo actual
//     submenuLinks.forEach(link => {
//         const href = link.getAttribute('href'); // ej: "./ventas/listar-reparaciones.html"
//         const partesHref = href.split('/');     // ["." , "ventas", "listar-reparaciones.html"]
//         const archivoHref = partesHref[partesHref.length - 1];

//         if (archivoHref === archivoActual) {
//             link.classList.add('activo');

//             // Detectar la carpeta (sección) a la que pertenece el submenu (ej: "ventas")
//             if (partesHref.length >= 2) {
//                 seccionMenuPrincipal = partesHref[partesHref.length - 2]; // ej: "ventas"
//             }
//         }
//     });

//     // Activar el menú principal correspondiente a la sección detectada
//     if (seccionMenuPrincipal) {
//         menuLinks.forEach(link => {
//             const href = link.getAttribute('href'); // ej: "./ventas.html"
//             const archivoMenu = href.split('/').pop(); // ej: "ventas.html"
//             if (archivoMenu === `${seccionMenuPrincipal}.html`) {
//                 link.classList.add('activo');
//             }
//         });
//     } else {
//         // Si no hay submenú activo, activar el menú si coincide directamente con el archivo
//         const archivoMenuActual = window.location.pathname.split('/').pop();
//         menuLinks.forEach(link => {
//             const archivoHref = link.getAttribute('href').split('/').pop();
//             if (archivoHref === archivoMenuActual) {
//                 link.classList.add('activo');
//             }
//         });
//     }
// });
