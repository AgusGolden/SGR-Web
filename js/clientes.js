let filaSeleccionada = null;

function limpiarFormulario() {
    document.querySelectorAll('input[type="text"]').forEach(input => input.value = '');
    document.querySelectorAll('select').forEach(select => select.value = '');
    document.getElementById('btn-guardar').classList.add('oculto');
    document.getElementById('btn-deshabilitar').classList.add('oculto');
    document.getElementById('btn-contactos').classList.add('oculto');
    document.getElementById('btn-alta').classList.remove('oculto');
}

function seleccionarFila(fila) {
    if (filaSeleccionada === fila) {
        fila.classList.remove('fila-seleccionada');
        filaSeleccionada = null;
        limpiarFormulario();
        return;
    }

    document.querySelectorAll('.tabla-clientes tr').forEach(f => f.classList.remove('fila-seleccionada'));
    fila.classList.add('fila-seleccionada');
    filaSeleccionada = fila;

    const celdas = fila.getElementsByTagName('td');
    const tipo = celdas[1].innerText;
    const nombreEmpresa = celdas[2].innerText;
    const razonSocial = celdas[3].innerText;
    const doc = celdas[4].innerText;
    const direccion = celdas[5].innerText;
    const localidad = celdas[6].innerText;
    const cp = celdas[7].innerText;
    const provincia = celdas[8].innerText;

    filtrarTabla(tipo);

    const seccion = tipo === 'Empresarial' ? 'empresarial' :
                    tipo === 'Individual' ? 'individual' :
                    'proveedor';

    const contenedor = document.getElementById(seccion);
    contenedor.querySelector('.campo-id').value = celdas[0].innerText;
    contenedor.querySelector('.campo-tipo').value = tipo;

    if (tipo === 'Empresarial') {
        contenedor.querySelector('.campo-empresa').value = nombreEmpresa;
        contenedor.querySelector('.campo-razon').value = razonSocial;
        contenedor.querySelector('.campo-doc').value = doc;
        contenedor.querySelector('.campo-direccion').value = direccion;
        contenedor.querySelector('.campo-localidad').value = localidad;
        contenedor.querySelector('.campo-cp').value = cp;
        contenedor.querySelector('.campo-provincia').value = provincia;
    } else if (tipo === 'Individual') {
        let partes = nombreEmpresa.split(' ');
        contenedor.querySelector('.campo-nombre').value = partes[0] || '';
        contenedor.querySelector('.campo-apellido').value = partes[1] || '';
        contenedor.querySelector('.campo-doc').value = doc;
        contenedor.querySelector('.campo-direccion').value = direccion;
        contenedor.querySelector('.campo-localidad').value = localidad;
        contenedor.querySelector('.campo-cp').value = cp;
        contenedor.querySelector('.campo-provincia').value = provincia;
    } else if (tipo === 'Proveedor') {
        contenedor.querySelector('.campo-empresa').value = nombreEmpresa;
        contenedor.querySelector('.campo-razon').value = razonSocial;
        contenedor.querySelector('.campo-doc').value = doc;
        contenedor.querySelector('.campo-direccion').value = direccion;
        contenedor.querySelector('.campo-localidad').value = localidad;
        contenedor.querySelector('.campo-cp').value = cp;
        contenedor.querySelector('.campo-provincia').value = provincia;
    }

    document.getElementById('btn-guardar').classList.remove('oculto');
    document.getElementById('btn-deshabilitar').classList.remove('oculto');
    document.getElementById('btn-contactos').classList.remove('oculto');
    document.getElementById('btn-alta').classList.add('oculto');
}

function filtrarTabla(tipoSeleccionado) {
    limpiarFormulario();

    const filas = document.querySelectorAll("#tabla-clientes tbody tr");
    filas.forEach(fila => {
        fila.style.display = fila.dataset.tipo === tipoSeleccionado ? '' : 'none';
    });

    document.getElementById('empresarial').style.display = tipoSeleccionado === 'Empresarial' ? 'flex' : 'none';
    document.getElementById('individual').style.display = tipoSeleccionado === 'Individual' ? 'flex' : 'none';
    document.getElementById('proveedor').style.display = tipoSeleccionado === 'Proveedor' ? 'flex' : 'none';

    document.getElementById('titulo-datos').textContent = `Datos del ${tipoSeleccionado}`;

    if (!filaSeleccionada) {
        limpiarFormulario();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tipoInicial = document.querySelector('select[name="tipo"]')?.value || 'Empresarial';
    filtrarTabla(tipoInicial);
});
