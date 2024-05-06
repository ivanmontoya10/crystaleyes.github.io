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

// const nav = document.querySelector("#nav");
// const abrir = document.querySelector("#abrir");
// const cerrar = document.querySelector("#cerrar");

// abrir.addEventListener("click", () => {
//     nav.classList.add("visible");
// });

// cerrar.addEventListener("click", () => {
//     nav.classList.remove("visible");
// });

// const headerURL = 'header.html';

// fetch(headerURL)
//     .then(response => response.text())
//     .then(html => {
//         document.getElementById('header-container').innerHTML = html;
//     })
//     .catch(error => console.error('Error al cargar el encabezado:', error));

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
});

let productosCargados = false; // Variable para verificar si los productos ya se cargaron
document.addEventListener("DOMContentLoaded", () => {
    // Verificar si los productos ya se cargaron antes
    if (!productosCargados) {
        // Obtener el parámetro de búsqueda de la URL
        const params = new URLSearchParams(window.location.search);
        const query = params.get('query');

        // Si hay una consulta de búsqueda, resaltar o mostrar primero el producto que coincide
        if (query) {
            fetch('productos.json')
                .then(response => response.json())
                .then(data => {
                    const productosCoincidentes = data.filter(producto => {
                        const nombreProducto = producto.nombre.toLowerCase().trim();
                        const queryLowerCase = query.toLowerCase().trim();
                        return nombreProducto.includes(queryLowerCase);
                    });
                    // Si se encontraron productos coincidentes
                    if (productosCoincidentes.length > 0) {
                        // Renderizamos los productos coincidentes
                        renderizarProductos(productosCoincidentes);
                    } else {
                        // Si no se encontraron productos, mostrar un mensaje de alerta
                        alert("No se encontraron productos que coincidan con la búsqueda.");
                    }
                })
                .catch(error => console.error('Error al procesar los datos JSON:', error));
        } else {
            // Si no hay consulta de búsqueda, simplemente cargar todos los productos
            cargarProductos();
        }
        productosCargados = true; // Marcar que los productos han sido cargados
    }
    // Event listener para el cambio en el selector de orden
    const selectorOrden = document.getElementById('ordenar');
    selectorOrden.addEventListener('change', () => {
        renderizarProductos(productos); // Llama a la función renderizarProductos con los productos actuales
    });
});

// Función para cargar todos los productos
const cargarProductos = () => {
    fetch('productos.json', {
        method: 'GET',
        credentials: 'include'
    })
        .then(response => response.json())
        .then(data => {
            renderizarProductos(data);
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
};

// Función para renderizar y ordenar los productos
const renderizarProductos = (productos) => {
    // Obtener el criterio de orden seleccionado
    const criterio = document.getElementById('ordenar').value;

    // Obtener el parámetro de búsqueda de la URL
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');

    // Filtrar los productos según la búsqueda si existe
    let productosFiltrados = productos;
    if (query) {
        productosFiltrados = productos.filter(producto => {
            const nombreProducto = producto.nombre.toLowerCase().trim();
            const queryLowerCase = query.toLowerCase().trim();
            return nombreProducto.includes(queryLowerCase);
        });
    }

    // Aplicar el filtro según el criterio seleccionado
    switch (criterio) {
        case 'precio_asc':
            productosFiltrados.sort((a, b) => a.precio - b.precio);
            break;
        case 'precio_desc':
            productosFiltrados.sort((a, b) => b.precio - a.precio);
            break;
        case 'nombre_asc':
            productosFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
            break;
        case 'nombre_desc':
            productosFiltrados.sort((a, b) => b.nombre.localeCompare(a.nombre));
            break;
        default:
            break;
    }

    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = '';

    productosFiltrados.forEach(producto => {
        const productoDiv = crearCardProducto(producto);
        productosDiv.appendChild(productoDiv);
    });
};

// Función para crear una tarjeta de producto
const crearCardProducto = (producto) => {
    const productoDiv = document.createElement('div');
    productoDiv.classList.add('producto-card');
    productoDiv.innerHTML = `
        <div>
            <img src="${producto.img1}">
            <h2>${producto.nombre}</h2>
            <p class="precio">$${producto.precio}</p>
            <p>${producto.descripcion_larga}</p>
            <center><button onclick="verDetalle(${producto.id})">Ver producto</button></center>
        </div>
    `;
    return productoDiv;
};
