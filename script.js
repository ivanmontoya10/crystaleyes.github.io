// let productoRedirigir = null;

// const verDetalle = (productoJSON) => {
//     const producto = JSON.parse(decodeURIComponent(productoJSON));

//     if (producto.id === productoRedirigir.id) {
//         const urlDetalle = `detalle_producto.html?nombre=${encodeURIComponent(producto.nombre)}`;
//         window.location.href = urlDetalle;
//     } else {
//         console.log('Este producto no tiene redirección.');
//     }
// };

// document.addEventListener("DOMContentLoaded", () => {
//     fetch('productos.json', {
//         method: 'GET',
//         credentials: 'include'
//     })
//         .then(response => response.json())
//         .then(data => {
//             const mostrarProductos = () => {
//                 const productosDiv = document.getElementById('productos');
               
//                 productosDiv.innerHTML = '';

//                 data.forEach(producto => {
//                     const productoDiv = document.createElement('div');
//                     productoDiv.classList.add('producto-card');
                    
//                     if (producto.id === 1) {
//                         productoRedirigir = producto;
//                         productoDiv.classList.add('producto-card');
//                         productoDiv.innerHTML = `
//                             <div >
//                                 <img src="${producto.img1}" alt="${producto.nombre}" title="${producto.nombre}">
//                                 <h2>${producto.nombre}</h2>
//                                 <p class="precio">$${producto.precio}</p>
//                                 <p>${producto.descripcion_larga}</p>
//                                 <center><button onclick="verDetalle('${encodeURIComponent(JSON.stringify(producto))}')">Ver producto</button></center>
//                             </div>
//                         `;
//                     } else {
                        
//                         productoDiv.innerHTML = `
//                             <div>
//                                 <img src="${producto.img1}" alt="${producto.nombre}" title="${producto.nombre}">
//                                 <h2>${producto.nombre}</h2>
//                                 <p class="precio">$${producto.precio}</p>
//                                 <p>${producto.descripcion_larga}</p>
//                                 <center><button>Ver producto</button></center>
//                             </div>
//                         `;
//                     }

//                     productosDiv.appendChild(productoDiv);
//                 });
//             };

//             mostrarProductos();
//         })
//         .catch(error => console.error('Error al cargar el archivo JSON:', error));

//     const nav = document.querySelector("#nav");
//     const abrir = document.querySelector("#abrir");
//     const cerrar = document.querySelector("#cerrar");

//     abrir.addEventListener("click", () => {
//         nav.classList.add("visible");
//     });

//     cerrar.addEventListener("click", () => {
//         nav.classList.remove("visible");
//     });
// });

const nav = document.querySelector("#nav");
const abrir = document.querySelector("#abrir");
const cerrar = document.querySelector("#cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
});

// Ruta del archivo del encabezado
const headerURL = 'header.html';

// Cargar el contenido del encabezado
fetch(headerURL)
    .then(response => response.text())
    .then(html => {
        // Insertar el contenido del encabezado en el contenedor
        document.getElementById('header-container').innerHTML = html;
    })
    .catch(error => console.error('Error al cargar el encabezado:', error));

