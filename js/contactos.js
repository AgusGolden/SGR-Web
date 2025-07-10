let filaSeleccionada = null;

function limpiarFormulario() {
    document.querySelector('.formulario-contacto').reset();
    filaSeleccionada = null;

    document.querySelectorAll('.tabla tbody tr').forEach(fila =>
        fila.classList.remove('fila-seleccionada')
    );

    // Mostrar botones de agregar
    document.getElementById('acciones-agregar').style.display = 'flex';
    document.getElementById('acciones-modificar').style.display = 'none';
}

function seleccionarFila(fila) {
    if (filaSeleccionada === fila) {
        limpiarFormulario();
        return;
    }

    document.querySelectorAll('.tabla tbody tr').forEach(f =>
        f.classList.remove('fila-seleccionada')
    );
    fila.classList.add('fila-seleccionada');
    filaSeleccionada = fila;

    const celdas = fila.querySelectorAll('td');

    document.getElementById('nombre').value = celdas[0].textContent;
    document.getElementById('apellido').value = celdas[1].textContent;
    document.getElementById('telefono').value = celdas[2].textContent;
    document.getElementById('mail').value = celdas[3].textContent;
    document.getElementById('cargo').value = celdas[4].textContent;
    document.getElementById('nota').value = celdas[5].textContent;

    // Mostrar botones de modificar
    document.getElementById('acciones-agregar').style.display = 'none';
    document.getElementById('acciones-modificar').style.display = 'flex';
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.tabla tbody tr').forEach(fila => {
        fila.addEventListener('click', () => seleccionarFila(fila));
    });

    document.getElementById('form-contacto').addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Contacto agregado (simulado)');
        limpiarFormulario();
    });

    limpiarFormulario(); // Oculta botones de modificar y muestra agregar al iniciar
});
