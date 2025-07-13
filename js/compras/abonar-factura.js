document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-abonar-factura');
    const fechaPago = document.getElementById('fecha-pago');
    const importePago = document.getElementById('importe-pago');

    let facturaSeleccionada = null;

    // Fecha por defecto
    fechaPago.valueAsDate = new Date();

    // Manejar selección de factura
    const filas = document.querySelectorAll('#tabla-facturas tbody tr');
    filas.forEach(fila => {
        const radio = fila.querySelector('input[type="radio"]');
        radio.addEventListener('change', () => {
            facturaSeleccionada = {
                nro: fila.dataset.nrofactura,
                proveedor: fila.dataset.proveedor,
                fecha: fila.dataset.fecha,
                total: parseFloat(fila.dataset.total)
            };

            importePago.value = facturaSeleccionada.total;
            importePago.max = facturaSeleccionada.total;
        });
    });

    // Validación de monto ingresado
    importePago.addEventListener('input', () => {
        const max = parseFloat(importePago.max);
        const valor = parseFloat(importePago.value);
        if (isNaN(valor) || valor < 0) {
            importePago.value = "";
        } else if (valor > max) {
            importePago.value = max;
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!facturaSeleccionada) {
            alert("Debe seleccionar una factura.");
            return;
        }

        if (!importePago.value || parseFloat(importePago.value) <= 0) {
            alert("Ingrese un importe válido.");
            return;
        }

        const pago = {
            factura: facturaSeleccionada.nro,
            proveedor: facturaSeleccionada.proveedor,
            fechaFactura: facturaSeleccionada.fecha,
            totalFactura: facturaSeleccionada.total,
            fechaPago: fechaPago.value,
            importe: parseFloat(importePago.value),
            observaciones: document.getElementById('observaciones-pago').value,
            archivo: document.getElementById('doc-pago').files[0]?.name || "Sin archivo"
        };

        console.log("Pago registrado:", pago);
        alert(`Pago registrado correctamente para la factura ${pago.factura}`);

        // Reset
        form.reset();
        facturaSeleccionada = null;
        fechaPago.valueAsDate = new Date();
        importePago.max = "";
    });
});
