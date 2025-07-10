document.addEventListener('DOMContentLoaded', () => {
    const tabla = document.getElementById('tabla-reparaciones');
    const filas = tabla ? tabla.getElementsByTagName('tr') : [];
    const subtitulo = document.getElementById('subtitulo-reparacion');
    const btnGenerar = document.getElementById('btn-repa-marcada');
    const btnConfirmar = document.getElementById('btn-confirmar');
    const btnCancelar = document.getElementById('btn-cancelar');
    const contenedor = document.querySelector('section.contenedor');
    const btnVerMas = document.getElementById('btn-ver-mas');
    const btnFiltrar = document.getElementById('btn-filtrar');
    let filaSeleccionada = null;

    function limpiarFormulario() {
        if (!contenedor) return;
        const campos = contenedor.querySelectorAll('input:not([readonly]), textarea');
        campos.forEach(c => c.value = '');
    }

    if (!tabla || !btnGenerar || !btnConfirmar || !btnCancelar || !subtitulo || !contenedor) return;

    for (let i = 1; i < filas.length; i++) {
        filas[i].addEventListener('click', function () {
            const yaSeleccionada = this.classList.contains('fila-seleccionada');
            for (let j = 1; j < filas.length; j++) filas[j].classList.remove('fila-seleccionada');
            if (!yaSeleccionada) {
                this.classList.add('fila-seleccionada');
                filaSeleccionada = this;
                btnGenerar.disabled = false;
                if (btnVerMas) btnVerMas.classList.remove('oculto');
                if (btnFiltrar) btnFiltrar.classList.add('oculto');
            } else {
                filaSeleccionada = null;
                if (btnVerMas) btnVerMas.classList.add('oculto');
                if (btnFiltrar) btnFiltrar.classList.remove('oculto');
                btnGenerar.disabled = true;
            }
        });
    }

    btnGenerar.addEventListener('click', () => {
        if (!filaSeleccionada) return alert('Seleccioná una reparación primero.');
        const celdas = filaSeleccionada.children;
        const inputs = contenedor.querySelectorAll('fieldset:first-of-type input');
        inputs[0].value = celdas[1].textContent;
        inputs[1].value = celdas[0].textContent;
        inputs[2].value = celdas[2].textContent;
        inputs[3].value = celdas[5].textContent;
        inputs[4].value = celdas[4].textContent;
        inputs[5].value = celdas[6].textContent;

        subtitulo.classList.add('oculto');
        btnGenerar.classList.add('oculto');
        tabla.classList.add('oculto');
        contenedor.classList.remove('oculto');
        btnCancelar.classList.remove('oculto');
        btnConfirmar.classList.remove('oculto');
    });

    btnCancelar.addEventListener('click', () => {
        subtitulo.classList.remove('oculto');
        contenedor.classList.add('oculto');
        tabla.classList.remove('oculto');
        btnGenerar.classList.remove('oculto');
        btnCancelar.classList.add('oculto');
        btnConfirmar.classList.add('oculto');
        if (filaSeleccionada) filaSeleccionada.classList.remove('fila-seleccionada');
        filaSeleccionada = null;
        btnGenerar.disabled = true;
        limpiarFormulario();
    });

    btnConfirmar.addEventListener('click', () => {
        alert('Presupuesto cargado correctamente.');
        btnCancelar.click();
    });

    if (btnVerMas) {
        btnVerMas.addEventListener('click', () => {
            location.href = './listar-reparaciones.html';
        });
    }
});
