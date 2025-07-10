document.addEventListener('DOMContentLoaded', () => {
    const btnRegistrar = document.getElementById('btn-registrar-aprobaciones');
    const tablaEquipos = document.getElementById('tabla-equipos-pendientes');
    const btnCargarDoc = document.getElementById('btn-cargar-doc');
    const btnVerAdjunto = document.getElementById('btn-ver-adjunto');
    const selectCliente = document.getElementById('cliente');

    if (!(btnRegistrar && tablaEquipos && btnCargarDoc && btnVerAdjunto && selectCliente)) return;

    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = '.pdf,.doc,.docx,.jpg,.png';
    inputFile.style.display = 'none';
    document.body.appendChild(inputFile);

    let archivoAdjunto = null;

    btnCargarDoc.addEventListener('click', () => inputFile.click());

    inputFile.addEventListener('change', () => {
        if (inputFile.files.length > 0) {
            archivoAdjunto = inputFile.files[0];
            btnVerAdjunto.disabled = false;
            btnVerAdjunto.textContent = `Ver Adjunto (${archivoAdjunto.name})`;
        }
    });

    btnVerAdjunto.addEventListener('click', () => {
        alert(archivoAdjunto ? `Mostrar documento: ${archivoAdjunto.name}` : 'No hay documento cargado.');
    });

    selectCliente.addEventListener('change', () => {
        const clienteSeleccionado = selectCliente.value;
        const filas = tablaEquipos.querySelectorAll('tbody tr');

        filas.forEach(fila => {
            const clienteFila = fila.children[3].textContent.trim();
            fila.style.display = (clienteSeleccionado === '' || clienteFila === clienteSeleccionado) ? '' : 'none';
        });
    });

    btnRegistrar.addEventListener('click', () => {
        const filas = tablaEquipos.querySelectorAll('tbody tr');
        const aprobados = [];

        let numOC = document.getElementById('num-oc').value.trim();
        if (numOC === '') numOC = 'Sin OC';

        filas.forEach(fila => {
            const checkbox = fila.querySelector('input[type="checkbox"]');
            if (checkbox && checkbox.checked) {
                const reparacion = fila.children[2].textContent.trim();
                const cliente = fila.children[3].textContent.trim();
                aprobados.push(`Reparación: ${reparacion} - Cliente: ${cliente}`);
            }
        });

        if (aprobados.length === 0) return alert('No seleccionaste ningún equipo.');

        alert(`Equipos aprobados:\n\n${aprobados.join('\n')}\nAsociados a la OC: ${numOC}`);

        document.getElementById('num-oc').value = '';
        archivoAdjunto = null;
        btnVerAdjunto.textContent = 'Ver Adjunto';
        btnVerAdjunto.disabled = true;
        tablaEquipos.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
    });
});
