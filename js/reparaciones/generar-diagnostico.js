// generar-diagnostico.js

document.addEventListener('DOMContentLoaded', () => {
    const tabla = document.getElementById('tabla-reparaciones-pendientes');
    const botonesSeleccionar = tabla.querySelectorAll('.btn-seleccionar');
    const formDiagnostico = document.getElementById('form-diagnostico');

    const campoSintoma = document.getElementById('sintoma');
    const campoCausa = document.getElementById('causa');
    const campoDiagnostico = document.getElementById('diagnostico');
    const campoRepuestos = document.getElementById('repuestos');

    const btnGuardar = document.getElementById('btn-guardar-diagnostico');
    const btnCancelar = document.getElementById('btn-cancelar-diagnostico');

    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById("hoy").value = hoy;

    botonesSeleccionar.forEach(btn => {
        btn.addEventListener('click', () => {
            formDiagnostico.classList.remove('oculto');
            scrollToElement(formDiagnostico);
        });
    });

    btnCancelar.addEventListener('click', () => {
        formDiagnostico.classList.add('oculto');
        limpiarCampos();
    });

    btnGuardar.addEventListener('click', () => {
        if (
            campoCausa.value.trim() === '' ||
            campoDiagnostico.value.trim() === ''
        ) {
            alert('Por favor, completá todos los campos obligatorios del diagnóstico.');
            return;
        }

        alert('Diagnóstico técnico guardado correctamente. (Simulación)');
        formDiagnostico.classList.add('oculto');
        limpiarCampos();
    });

    function limpiarCampos() {
        campoSintoma.value = '';
        campoCausa.value = '';
        campoDiagnostico.value = '';
        campoRepuestos.value = '';
    }

    function scrollToElement(el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});
