let productoRedirigir = null; // Variable para almacenar el producto que puede redirigir

// Función para redirigir al detalle del producto
const verDetalle = (productoJSON) => {
    const producto = JSON.parse(decodeURIComponent(productoJSON));

    if (producto.id === productoRedirigir.id) {
        // Redirigir al detalle del producto que puede redirigir
        const urlDetalle = `detalle_producto.html?nombre=${encodeURIComponent(producto.nombre)}`;
        window.location.href = urlDetalle;
    } else {
        console.log('Este producto no tiene redirección.');
        // Aquí puedes mostrar un mensaje o realizar otra acción para productos que no redirigen
    }
};

document.addEventListener("DOMContentLoaded", () => {
    // Cargar el archivo JSON de productos
    fetch('productos.json', {
        method: 'GET',
        credentials: 'include' // Habilitar el envío de credenciales
    })
        .then(response => response.json())
        .then(data => {
            // Función para mostrar los productos en la página
            const mostrarProductos = () => {
                const productosDiv = document.getElementById('productos');
               
                productosDiv.innerHTML = '';

                data.forEach(producto => {
                    const productoDiv = document.createElement('div');
                    productoDiv.classList.add('producto-card');
                    
                    // Verificar si el producto puede redirigir
                    if (producto.id === 1) {
                        productoRedirigir = producto;
                        productoDiv.classList.add('producto-card');
                        productoDiv.innerHTML = `
                            <div >
                                <img src="${producto.img1}" alt="${producto.nombre}" title="${producto.nombre}">
                                <h2>${producto.nombre}</h2>
                                <p class="precio">$${producto.precio}</p>
                                <p>${producto.descripcion_larga}</p>
                                <center><button onclick="verDetalle('${encodeURIComponent(JSON.stringify(producto))}')">Ver producto</button></center>
                            </div>
                        `;
                    } else {
                        
                        productoDiv.innerHTML = `
                            <div>
                                <img src="${producto.img1}" alt="${producto.nombre}" title="${producto.nombre}">
                                <h2>${producto.nombre}</h2>
                                <p class="precio">$${producto.precio}</p>
                                <p>${producto.descripcion_larga}</p>
                                <center><button>Ver producto</button></center>
                            </div>
                        `;
                    }

                    productosDiv.appendChild(productoDiv);
                });
            };

            // Llamar a la función para mostrar los productos
            mostrarProductos();
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));

    // Evento para abrir y cerrar el menú
    const nav = document.querySelector("#nav");
    const abrir = document.querySelector("#abrir");
    const cerrar = document.querySelector("#cerrar");

    abrir.addEventListener("click", () => {
        nav.classList.add("visible");
    });

    cerrar.addEventListener("click", () => {
        nav.classList.remove("visible");
    });
});
