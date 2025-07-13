document.addEventListener('DOMContentLoaded', () => {
    const tabla = document.getElementById('tabla-reparaciones');
    const formCotizacion = document.getElementById('form-cotizacion');

    const repuestosInput = document.getElementById('repuestos');
    const horasRealInput = document.getElementById('horas-trabajadas');
    const horasEstInput = document.getElementById('horas-estimadas');

    const comentariosInput = document.getElementById('comentarios');
    const plazoInput = document.getElementById('plazo');
    const monedaSelect = document.getElementById('moneda');
    const montoInput = document.getElementById('monto');

    const btnGuardar = document.getElementById('btn-guardar-cotizacion');
    const btnCancelar = document.getElementById('btn-cancelar-cotizacion');

    tabla.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('btn-seleccionar')) {
            const fila = e.target.closest('tr');

            // Obtener datos desde data-* attributes
            const repuestos = fila.dataset.repuestos || '';
            const horas = fila.dataset.horas || '';
            const horasEstimadas = fila.dataset.horasEstimadas || '';

            // Asignar a campos del formulario
            repuestosInput.value = repuestos;
            horasRealInput.value = horas;
            horasEstInput.value = horasEstimadas;

            // Mostrar formulario
            formCotizacion.classList.remove('oculto');
        }
    });

    btnCancelar.addEventListener('click', () => {
        formCotizacion.classList.add('oculto');
        limpiarFormulario();
    });

    btnGuardar.addEventListener('click', () => {
        const datos = {
            repuestos: repuestosInput.value,
            horas: horasRealInput.value,
            horasEstimadas: horasEstInput.value,
            comentarios: comentariosInput.value,
            plazo: plazoInput.value,
            moneda: monedaSelect.value,
            monto: montoInput.value
        };

        console.log('Cotización enviada:', datos);

        // Aquí podrías hacer un POST al backend con fetch()
        // fetch('/api/cotizar', { method: 'POST', body: JSON.stringify(datos), ... })

        alert('Cotización guardada correctamente');
        formCotizacion.classList.add('oculto');
        limpiarFormulario();
    });

    function limpiarFormulario() {
        comentariosInput.value = '';
        plazoInput.value = '';
        monedaSelect.selectedIndex = 0;
        montoInput.value = '';
    }
});
