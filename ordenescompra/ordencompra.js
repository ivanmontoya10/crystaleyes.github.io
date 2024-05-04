document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost/crystaleyes/jsons/ordenes_compra.json', {
        method: 'GET',
        credentials: 'include'
    })
    .then(response => response.json())
    .then(ordenes => {
        const ordenesCompraDiv = document.getElementById('ordenes-compra');
        ordenesCompraDiv.innerHTML = '';

        ordenes.forEach(orden => {
            const ordenDiv = document.createElement('div');
            ordenDiv.classList.add('orden-compra-card');

            ordenDiv.innerHTML = `
                <div>
                    <h2>Orden #${orden.numero}</h2>
                    <p>Fecha: ${orden.fecha}</p>
                    <p>Productos:</p>
                    <ul>
                        ${orden.productos.map(producto => `<li>${producto.nombre} - ${producto.modelo}</li>`).join('')}
                    </ul>
                    <p>Total: $${orden.total}</p>
                </div>
            `;

            ordenesCompraDiv.appendChild(ordenDiv);
        });
    })
    .catch(error => console.error('Error al cargar el archivo JSON de órdenes de compra:', error));
});
