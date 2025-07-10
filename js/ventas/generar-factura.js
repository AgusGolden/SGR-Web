document.addEventListener('DOMContentLoaded', () => {
    const remitoItems = {
        'RMT-0001': [
            { item: 'Disco SSD', cantidad: 2, detalle: 'Disco de 480GB', iva: 21, precio: 20000 },
            { item: 'Monitor 27"', cantidad: 1, detalle: 'Reparación general', iva: 21, precio: 15000 }
        ],
        'RMT-0002': [
            { item: 'Fuente ATX', cantidad: 1, detalle: 'Fuente 600W', iva: 10.5, precio: 18000 }
        ]
    };

    const checkboxes = document.querySelectorAll('#tabla-remitos input[type="checkbox"]');
    const tablaItems = document.getElementById('tabla-items').querySelector('tbody');
    const subtotalInput = document.getElementById('subtotal');
    const ivaInput = document.getElementById('iva-total');
    const totalInput = document.getElementById('total');
    const btnFactura = document.getElementById('btn-generar-factura');

    checkboxes.forEach(cb => cb.addEventListener('change', actualizarTablaItems));

    function actualizarTablaItems() {
        tablaItems.innerHTML = '';
        let subtotal = 0;
        let ivaTotal = 0;

        checkboxes.forEach(cb => {
            if (cb.checked) {
                const remito = cb.dataset.remito;
                const items = remitoItems[remito] || [];

                items.forEach(i => {
                    const fila = document.createElement('tr');
                    fila.innerHTML = `
                        <td>${i.item}</td>
                        <td>${i.cantidad}</td>
                        <td>${i.detalle}</td>
                        <td>${i.iva}</td>
                        <td>$${i.precio.toFixed(2)}</td>
                        <td>$${(i.cantidad * i.precio).toFixed(2)}</td>
                    `;
                    tablaItems.appendChild(fila);
                    const lineaSubtotal = i.precio * i.cantidad;
                    subtotal += lineaSubtotal;
                    ivaTotal += (lineaSubtotal * i.iva) / 100;
                });
            }
        });

        subtotalInput.value = `$${subtotal.toFixed(2)}`;
        ivaInput.value = `$${ivaTotal.toFixed(2)}`;
        totalInput.value = `$${(subtotal + ivaTotal).toFixed(2)}`;
    }

    btnFactura.addEventListener('click', () => {
        const cliente = document.getElementById('cliente').value;
        const seleccionados = Array.from(checkboxes).filter(cb => cb.checked);

        if (!cliente) return alert('Seleccioná un cliente antes de generar la factura.');
        if (seleccionados.length === 0) return alert('Seleccioná al menos un remito.');
        alert('Factura generada correctamente. (Simulación)');
    });
});
