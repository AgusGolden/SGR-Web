document.addEventListener('DOMContentLoaded', () => {
    const tabla = document.getElementById('tabla-reparaciones');
    const btnVerMas = document.getElementById('btn-ver-mas');
    const btnFiltrar = document.getElementById('btn-filtrar');
    const btnVolver = document.getElementById('btn-volver');
    const btnModificar = document.getElementById('btn-modificar');
    const formulario = document.getElementById('formulario-detalle');
    const accionesForm = document.getElementById('acciones-form');
    const subtitulo = document.getElementById('subtitulo');
    let filaSeleccionada = null;

    // Descuento y adicional
    const tipoDescuento = document.getElementById('tipo-descuento');
    const inputDescuento = document.getElementById('input-descuento');
    const chkAdicionalFijo = document.getElementById('chk-adicional-fijo');
    const inputAdicionalFijo = document.getElementById('input-adicional-fijo');
    const chkAdicionalPorc = document.getElementById('chk-adicional-porc');
    const inputAdicionalPorc = document.getElementById('input-adicional-porcentaje');
    const radiosPorcentaje = document.querySelectorAll('input[name="tipo-porcentaje"]');

    tipoDescuento.addEventListener('change', () => {
        inputDescuento.disabled = tipoDescuento.value === '';
    });

    chkAdicionalFijo.addEventListener('change', () => {
        inputAdicionalFijo.disabled = !chkAdicionalFijo.checked;
    });

    chkAdicionalPorc.addEventListener('change', () => {
        inputAdicionalPorc.disabled = !chkAdicionalPorc.checked;
        radiosPorcentaje.forEach(r => r.disabled = !chkAdicionalPorc.checked);
    });

    if (tabla && btnVerMas && btnFiltrar) {
        const filas = tabla.getElementsByTagName('tr');

        for (let i = 1; i < filas.length; i++) {
            filas[i].addEventListener('click', function () {
                const yaSeleccionada = this.classList.contains('fila-seleccionada');

                for (let j = 1; j < filas.length; j++) {
                    filas[j].classList.remove('fila-seleccionada');
                }

                if (!yaSeleccionada) {
                    this.classList.add('fila-seleccionada');
                    filaSeleccionada = this;
                    btnVerMas.classList.remove('oculto');
                    btnFiltrar.classList.add('oculto');
                } else {
                    filaSeleccionada = null;
                    btnVerMas.classList.add('oculto');
                    btnFiltrar.classList.remove('oculto');
                }
            });
        }

        btnVerMas.addEventListener('click', () => {
            if (!filaSeleccionada) return;
            const celdas = filaSeleccionada.querySelectorAll('td');
            document.getElementById('input-fecha').value = celdas[0].textContent;
            document.getElementById('input-reparacion').value = celdas[1].textContent;
            document.getElementById('input-cliente').value = celdas[2].textContent;
            document.getElementById('input-proveedor').value = celdas[3].textContent;
            document.getElementById('input-titulo').value = celdas[4].textContent;
            document.getElementById('input-codigo').value = celdas[5].textContent;
            document.getElementById('input-serie').value = celdas[6].textContent;

            tabla.classList.add('oculto');
            subtitulo.classList.add('oculto');
            formulario.classList.remove('oculto');
            accionesForm.classList.remove('oculto');
            btnVerMas.classList.add('oculto');
        });

        btnVolver.addEventListener('click', () => {
            tabla.classList.remove('oculto');
            subtitulo.classList.remove('oculto');
            formulario.classList.add('oculto');
            accionesForm.classList.add('oculto');
            btnFiltrar.classList.remove('oculto');
        });

        btnModificar.addEventListener('click', () => {
            alert("Datos actualizados");
        });
    }
});
