document.addEventListener('DOMContentLoaded', () => {
    const tabla = document.getElementById('tabla-reparaciones');
    const filas = tabla?.getElementsByTagName('tr') || [];
    const subtitulo = document.getElementById('subtitulo-reparacion');
    const btnGenerar = document.getElementById('btn-repa-marcada');
    const btnConfirmar = document.getElementById('btn-confirmar');
    const btnCancelar = document.getElementById('btn-cancelar');
    const contenedor = document.getElementById('formulario-ppto');
    let filaSeleccionada = null;

    const importe = document.getElementById('importe-ppto');
    const tipoDescuento = document.getElementById('tipo-descuento');
    const valorDescuento = document.getElementById('valor-descuento');

    const chkAdicionalFijo = document.getElementById('chk-adicional-fijo');
    const inputAdicionalFijo = document.getElementById('input-adicional-fijo');

    const chkAdicionalPorc = document.getElementById('chk-adicional-porc');
    const contenedorPorcentaje = document.getElementById('contenedor-porcentaje');
    const inputValorPorcentaje = document.getElementById('valor-adicional-porcentaje');
    const tipoPorcentajeRadios = document.getElementsByName('tipo-porcentaje');

    const totalARS = document.getElementById('total-ars');
    const totalUSD = document.getElementById('total-usd');
    const moneda = document.getElementById('moneda-ppto');
    const inputTipoCambio = document.getElementById('tipo-cambio');

    function getCotizacionActual() {
        const valor = parseFloat(inputTipoCambio.value);
        return isNaN(valor) || valor <= 0 ? 1 : valor;
    }

    function safeParse(valor) {
        const n = parseFloat(valor);
        return isNaN(n) ? 0 : n;
    }

    function calcularTotal() {
        const base = safeParse(importe.value);

        const adicionalFijo = chkAdicionalFijo.checked ? safeParse(inputAdicionalFijo.value) : 0;

        let adicionalPorc = 0;
        const tipoPorcSeleccionado = [...tipoPorcentajeRadios].find(r => r.checked)?.value;
        const porc = safeParse(inputValorPorcentaje.value);

        if (chkAdicionalPorc.checked) {
            if (tipoPorcSeleccionado === 'importe') {
                adicionalPorc = (base * porc) / 100;
            } else if (tipoPorcSeleccionado === 'total') {
                adicionalPorc = ((base + adicionalFijo) * porc) / 100;
            }
        }

        const subtotal = base + adicionalFijo + adicionalPorc;

        let descuento = 0;
        const tipo = tipoDescuento.value;
        const val = safeParse(valorDescuento.value);

        if (tipo === 'porcentaje-importe') descuento = (base * val) / 100;
        else if (tipo === 'porcentaje-total') descuento = (subtotal * val) / 100;
        else if (tipo === 'valor') descuento = val;

        if (descuento > subtotal) descuento = subtotal;

        const totalFinal = Math.max(0, subtotal - descuento);

        const cotizacion = getCotizacionActual();

        if (moneda.value === 'ARS') {
            totalARS.value = totalFinal.toFixed(2);
            totalUSD.value = (totalFinal / cotizacion).toFixed(2);
        } else {
            totalUSD.value = totalFinal.toFixed(2);
            totalARS.value = (totalFinal * cotizacion).toFixed(2);
        }
    }

    function limpiarFormulario() {
        importe.value = '';
        tipoDescuento.value = '';
        valorDescuento.value = '';
        valorDescuento.classList.add('oculto');
        chkAdicionalFijo.checked = false;
        inputAdicionalFijo.value = '';
        inputAdicionalFijo.classList.add('oculto');
        chkAdicionalPorc.checked = false;
        contenedorPorcentaje.classList.add('oculto');
        inputValorPorcentaje.value = '';
        document.getElementById('input-valor-porcentaje').classList.add('oculto');
        tipoPorcentajeRadios.forEach(r => r.checked = false);
        totalARS.value = '';
        totalUSD.value = '';
    }

    if (!tabla || !btnGenerar || !btnConfirmar || !btnCancelar || !subtitulo || !contenedor) return;

    [...filas].forEach((fila, i) => {
        if (i === 0) return;
        fila.addEventListener('click', () => {
            const yaSel = fila.classList.contains('fila-seleccionada');
            [...filas].forEach(f => f.classList.remove('fila-seleccionada'));
            filaSeleccionada = yaSel ? null : fila;
            fila.classList.toggle('fila-seleccionada', !yaSel);
            btnGenerar.disabled = !filaSeleccionada;
        });
    });

    btnGenerar.addEventListener('click', () => {
        if (!filaSeleccionada) return;

        const celdas = filaSeleccionada.children;
        const inputsDatos = contenedor.querySelectorAll('fieldset:first-of-type input');

        inputsDatos[0].value = celdas[1].textContent;
        inputsDatos[1].value = celdas[0].textContent;
        inputsDatos[2].value = celdas[2].textContent;
        inputsDatos[3].value = celdas[4].textContent;
        inputsDatos[4].value = celdas[5].textContent;
        inputsDatos[5].value = celdas[6].textContent;

        subtitulo.classList.add('oculto');
        btnGenerar.classList.add('oculto');
        tabla.classList.add('oculto');
        contenedor.classList.remove('oculto');
        btnCancelar.classList.remove('oculto');
        btnConfirmar.classList.remove('oculto');

        limpiarFormulario();
        calcularTotal();
    });

    btnCancelar.addEventListener('click', () => {
        subtitulo.classList.remove('oculto');
        contenedor.classList.add('oculto');
        tabla.classList.remove('oculto');
        btnGenerar.classList.remove('oculto');
        btnCancelar.classList.add('oculto');
        btnConfirmar.classList.add('oculto');

        filaSeleccionada?.classList.remove('fila-seleccionada');
        filaSeleccionada = null;
        btnGenerar.disabled = true;

        limpiarFormulario();
    });

    btnConfirmar.addEventListener('click', () => {
        alert('Presupuesto cargado correctamente.');
        btnCancelar.click();
    });

    tipoDescuento.addEventListener('change', () => {
        if (tipoDescuento.value === '') {
            valorDescuento.classList.add('oculto');
            valorDescuento.value = '';
        } else {
            valorDescuento.classList.remove('oculto');
        }
        calcularTotal();
    });

    chkAdicionalFijo.addEventListener('change', () => {
        inputAdicionalFijo.classList.toggle('oculto', !chkAdicionalFijo.checked);
        calcularTotal();
    });

    chkAdicionalPorc.addEventListener('change', () => {
        contenedorPorcentaje.classList.toggle('oculto', !chkAdicionalPorc.checked);
        document.getElementById("input-valor-porcentaje").classList.toggle('oculto', !chkAdicionalPorc.checked);
        calcularTotal();
    });

    inputValorPorcentaje.addEventListener('input', calcularTotal);
    inputValorPorcentaje.addEventListener('change', calcularTotal);
    tipoPorcentajeRadios.forEach(radio => {
        radio.addEventListener('change', calcularTotal);
    });

    importe.addEventListener('input', calcularTotal);
    importe.addEventListener('change', calcularTotal);
    valorDescuento.addEventListener('input', calcularTotal);
    valorDescuento.addEventListener('change', calcularTotal);
    moneda.addEventListener('change', calcularTotal);

    if (tipoDescuento.value === '') {
        valorDescuento.classList.add('oculto');
    } else {
        valorDescuento.classList.remove('oculto');
    }

    const labelCambio = document.getElementById('label-tipo-cambio');
    const hoyStr = new Date().toLocaleDateString('es-AR');
    labelCambio.textContent = `Tipo de Cambio ${hoyStr}:`;

    inputTipoCambio.value = '1400';

    calcularTotal();
});
