let productos = [];

/* const verDetalle = (productoId) => {
    const producto = productos.find(p => p.id === productoId);
    if (producto) {
        const urlDetalle = `producto${productoId}.html?nombre=${encodeURIComponent(producto.nombre)}`;
        window.location.href = urlDetalle;
    } else {
        console.log('Producto no encontrado.');
    }
}; */
const verDetalle = (productoId, nombreProducto) => {
    if (nombreProducto) {
        // Si se proporciona el nombre del producto, se trata de una búsqueda
        const urlDetalle = `producto${productoId}.html?nombre=${encodeURIComponent(nombreProducto)}`;
        window.location.href = urlDetalle;
    } else {
        // Si no se proporciona el nombre del producto, se trata de la página de detalles del producto
        const urlDetalle = `producto${productoId}.html`;
        window.location.href = urlDetalle;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const cargarProductos = () => {
        fetch('/crystaleyes.github.io/jsons/productos.json', {
            method: 'GET',
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => {
                productos = data;

                const productosDiv = document.getElementById('productos');
                productosDiv.innerHTML = '';

                data.forEach(producto => {
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

                    //Cambiar propiedad para algun producto en especifico

                    // if (producto.id === 2) { 
                    //     productoDiv.innerHTML = `
                    //         <div>
                    //             <img src="${producto.img1}">
                    //             <h2>${producto.nombre}</h2>
                    //             <p class="precio">$${producto.precio}</p>
                    //             <p>${producto.descripcion_larga}</p>
                    //             <center><button onclick="verDetalle(${producto.id})">Hola</button></center> <!-- Botón original -->
                    //         </div>
                    //     `;
                    // } else {
                    //     productoDiv.innerHTML = `
                    //         <div>
                    //             <img src="${producto.img1}">
                    //             <h2>${producto.nombre}</h2>
                    //             <p class="precio">$${producto.precio}</p>
                    //             <p>${producto.descripcion_larga}</p>
                    //             <center><button onclick="verDetalle(${producto.id})">Ver producto</button></center>
                    //         </div>
                    //     `;
                    // }

                    productosDiv.appendChild(productoDiv);
                });
            })
            .catch(error => console.error('Error al cargar el archivo JSON:', error));
    };
    // Función para ordenar los productos
    const ordenarProductos = () => {
        const selector = document.getElementById('ordenar');
        const criterio = selector.value;

        switch (criterio) {
            case 'precio_asc':
                productos.sort((a, b) => a.precio - b.precio);
                break;
            case 'precio_desc':
                productos.sort((a, b) => b.precio - a.precio);
                break;
            case 'nombre_asc':
                productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
            case 'nombre_desc':
                productos.sort((a, b) => b.nombre.localeCompare(a.nombre));
                break;
            default:
                break;
        }

        // Limpia y vuelve a renderizar los productos
        const productosDiv = document.getElementById('productos');
        productosDiv.innerHTML = '';

        productos.forEach(producto => {
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

            productosDiv.appendChild(productoDiv);
        });
    };

    // Event listener para el cambio en el selector de orden
    const selectorOrden = document.getElementById('ordenar');
    console.log('Evento de cambio de orden detectado.');

    selectorOrden.addEventListener('change', ordenarProductos);
    console.log('Iniciando carga de productos...');

    // Cargar los productos al inicio
    cargarProductos();

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
