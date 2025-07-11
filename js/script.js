// script.js

// Selección única de fila en una tabla (general para todas)
function seleccionarUnicaFila(filas, onSeleccionar, onDeseleccionar) {
    filas.forEach(fila => {
        fila.addEventListener('click', () => {
            const yaSeleccionada = fila.classList.contains('fila-seleccionada');
            filas.forEach(f => f.classList.remove('fila-seleccionada'));
            if (!yaSeleccionada) {
                fila.classList.add('fila-seleccionada');
                if (onSeleccionar) onSeleccionar(fila);
            } else {
                if (onDeseleccionar) onDeseleccionar();
            }
        });
    });
}

// Mostrar mensaje de feedback en pantalla (exito o error)
function mostrarMensaje(texto, tipo = 'exito', duracion = 4000) {
    let contenedor = document.getElementById('mensaje-feedback');
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.id = 'mensaje-feedback';
        contenedor.classList.add('mensaje-feedback');
        document.body.prepend(contenedor);
    }
    contenedor.textContent = texto;
    contenedor.className = 'mensaje-feedback'; // reset clases
    contenedor.classList.add(tipo);
    contenedor.style.display = 'block';

    setTimeout(() => {
        contenedor.style.display = 'none';
    }, duracion);
}

// Limpiar campos input y textarea dentro de un contenedor (formulario o sección)
function limpiarCampos(contenedor) {
    if (!contenedor) return;
    const campos = contenedor.querySelectorAll('input:not([readonly]), textarea');
    campos.forEach(campo => campo.value = '');
}

// Scroll suave hacia un elemento
function scrollToElement(el) {
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Inicializar input file invisible y asociar con botón visible
function crearInputFile(btnCargar, aceptados = '') {
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.accept = aceptados;
    inputFile.style.display = 'none';
    document.body.appendChild(inputFile);

    btnCargar.addEventListener('click', () => inputFile.click());

    return inputFile;
}

// Activar/desactivar botones fácilmente
function activarBoton(boton, estado) {
    if (!boton) return;
    boton.disabled = !estado;
}

// Validar que todos los campos (ids) estén completos (no vacíos)
function validarCampos(obligatorios) {
    return obligatorios.every(id => {
        const campo = document.getElementById(id);
        return campo && campo.value.trim() !== '';
    });
}

// Limpiar selección de checkboxes en una tabla
function limpiarCheckboxes(tabla) {
    if (!tabla) return;
    tabla.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
}

// Inicializar selección de filas con activación/desactivación de botón
function initSeleccionFilas(tablaId, btnId, callbackOnSelect = null, callbackOnDeselect = null) {
    const tabla = document.getElementById(tablaId);
    const btn = document.getElementById(btnId);
    if (!tabla || !btn) return;

    const filas = [...tabla.querySelectorAll('tbody tr')];

    seleccionarUnicaFila(filas,
        fila => {
            activarBoton(btn, true);
            if (callbackOnSelect) callbackOnSelect(fila);
        },
        () => {
            activarBoton(btn, false);
            if (callbackOnDeselect) callbackOnDeselect();
        }
    );

    activarBoton(btn, false);
}

// Exportar funciones si usás módulos (opcional)
// export { seleccionarUnicaFila, mostrarMensaje, limpiarCampos, scrollToElement, crearInputFile, activarBoton, validarCampos, limpiarCheckboxes, initSeleccionFilas };