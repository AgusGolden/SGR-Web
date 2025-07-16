document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos clave
    const tabla = document.getElementById('tabla-reparaciones');
    const filas = tabla?.getElementsByTagName('tr') || [];
    const subtitulo = document.getElementById('subtitulo-reparacion');
    const btnGenerar = document.getElementById('btn-repa-marcada');
    const btnConfirmar = document.getElementById('btn-confirmar');
    const btnCancelar = document.getElementById('btn-cancelar');
    const contenedor = document.getElementById('formulario-ppto');
    const fechaPresupuestoProveedor = document.getElementById('fecha-presupuesto-proveedor');
    
    let filaSeleccionada = null;

    // Inputs del formulario presupuesto
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

    // Función segura para parsear float
    function safeParse(valor) {
        const n = parseFloat(valor);
        return isNaN(n) ? 0 : n;
    }

    // Obtener cotización actual o 1 si no válida
    function getCotizacionActual() {
        const valor = safeParse(inputTipoCambio.value);
        return valor > 0 ? valor : 1;
    }

    // Función para calcular total según fórmula del presupuesto
    function calcularTotal() {
        const base = safeParse(importe.value);
        const cotizacion = getCotizacionActual();

        // Adicional fijo
        let adicionalFijo = chkAdicionalFijo.checked ? safeParse(inputAdicionalFijo.value) : 0;

        // Adicional porcentaje
        let adicionalPorcentaje = 0;
        if (chkAdicionalPorc.checked) {
            const tipo = [...tipoPorcentajeRadios].find(r => r.checked)?.value;
            const porc = safeParse(inputValorPorcentaje.value);
            if (tipo === 'importe') {
                adicionalPorcentaje = (base * porc) / 100;
            } else if (tipo === 'total') {
                adicionalPorcentaje = ((base + adicionalFijo) * porc) / 100;
            }
        }

        const subtotal = base + adicionalFijo + adicionalPorcentaje;

        // Descuento
        let descuento = 0;
        const tipoDesc = tipoDescuento.value;
        const valDesc = safeParse(valorDescuento.value);

        if (tipoDesc === 'porcentaje-importe') {
            descuento = (base * valDesc) / 100;
        } else if (tipoDesc === 'porcentaje-total') {
            descuento = (subtotal * valDesc) / 100;
        } else if (tipoDesc === 'valor') {
            descuento = valDesc;
        }

        // Que descuento no supere subtotal
        if (descuento > subtotal) descuento = subtotal;

        const totalFinal = Math.max(0, subtotal - descuento);

        // Mostrar en moneda local y extranjera según selección
        if (moneda.value === 'ARS') {
            totalARS.value = totalFinal.toFixed(2);
            totalUSD.value = (totalFinal / cotizacion).toFixed(2);
        } else {
            totalUSD.value = totalFinal.toFixed(2);
            totalARS.value = (totalFinal * cotizacion).toFixed(2);
        }
    }

    // Limpia el formulario de presupuesto (no los datos del equipo)
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

    // Validación mínima para que existan elementos clave
    if (!tabla || !btnGenerar || !btnConfirmar || !btnCancelar || !subtitulo || !contenedor) return;

    // Selección de fila en tabla reparaciones
    [...filas].forEach((fila, i) => {
        if (i === 0) return; // saltar header
        fila.addEventListener('click', () => {
            const yaSel = fila.classList.contains('fila-seleccionada');
            [...filas].forEach(f => f.classList.remove('fila-seleccionada'));
            filaSeleccionada = yaSel ? null : fila;
            fila.classList.toggle('fila-seleccionada', !yaSel);
            btnGenerar.disabled = !filaSeleccionada;
        });
    });

    // Botón Generar Presupuesto - cargar datos y mostrar formulario
    btnGenerar.addEventListener('click', () => {
        if (!filaSeleccionada) return;

        const celdas = filaSeleccionada.children;

        document.getElementById('nro-reparacion').value = celdas[1].textContent;
        document.getElementById('fecha-ingreso').value = celdas[0].textContent;
        document.getElementById('cliente').value = celdas[2].textContent;
        document.getElementById('titulo').value = celdas[4].textContent;
        document.getElementById('codigo').value = celdas[5].textContent;
        document.getElementById('serie').value = celdas[6].textContent;

        const hoy = new Date();
        const hoyStr = hoy.toISOString().split("T")[0];

        const ayer = new Date(hoy);
        ayer.setDate(hoy.getDate() - 1);
        const ayerStr = ayer.toISOString().split("T")[0];

        const antesDeAyer = new Date(hoy);
        antesDeAyer.setDate(hoy.getDate() - 2);
        const antesDeAyerStr = antesDeAyer.toISOString().split("T")[0];

        // Mostrar/ocultar campos de proveedor/diagnóstico según corresponda
        const proveedor = celdas[3].textContent.trim();
        const tieneProveedor = proveedor !== "-";

        document.getElementById('fieldset-proveedor').classList.toggle('oculto', !tieneProveedor);
        document.getElementById('fieldset-diagnostico').classList.toggle('oculto', tieneProveedor);

        if (tieneProveedor) {
            document.getElementById('proveedor-asignado').value = proveedor;
            document.getElementById('fecha-presupuesto').value = hoyStr;
            fechaPresupuestoProveedor.value = hoyStr;
            document.getElementById('diagnostico').value = '';
            document.getElementById('plazo').value = '';
        }
        else {
            document.getElementById('moneda-diagnostico').value = 'USD';
            document.getElementById('cotizacion-diagnostico').value = '1799.5';
            document.getElementById('fecha-diagnostico').value = antesDeAyerStr;
            document.getElementById('fecha-cotizacion').value = ayerStr;
            document.getElementById('fecha-presupuesto').value = hoyStr;
            document.getElementById('diagnostico').value = 'Pantalla dañada. Requiere reemplazo.';
            document.getElementById('plazo').value = '5';
        }

        subtitulo.classList.add('oculto');
        btnGenerar.classList.add('oculto');
        tabla.classList.add('oculto');
        contenedor.classList.remove('oculto');
        btnCancelar.classList.remove('oculto');
        btnConfirmar.classList.remove('oculto');

        limpiarFormulario();
        calcularTotal();
    });

    // Botón Cancelar - vuelve al estado inicial
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

    // Botón Confirmar - muestra resumen y resetea
    btnConfirmar.addEventListener('click', () => {
        const cliente = document.getElementById('cliente').value;
        const nroReparacion = document.getElementById('nro-reparacion').value;
        const fechaPresupuesto = document.getElementById('fecha-presupuesto').value || "-";
        const falla = document.getElementById('falla-informada').value || "-";
        const diagnostico = document.getElementById('diagnostico').value || "-";
        const plazo = document.getElementById('plazo').value || "-";
        const monedaVal = moneda.value;
        const descuentoVal = valorDescuento.value || "0";
        const totalARSVal = totalARS.value || "0";
        const totalUSDVal = totalUSD.value || "0";
        const tipoCambioVal = inputTipoCambio.value || "-";

        const mensaje = `Presupuesto cargado correctamente.

Valores a mostrar:
• Cliente: ${cliente}
• N° Reparación: ${nroReparacion}
• Fecha de Presupuesto: ${fechaPresupuesto}
• Falla Informada: ${falla}
• Diagnóstico: ${diagnostico}
• Plazo: ${plazo} días
• Moneda: ${monedaVal}
• Valor de Descuento: ${descuentoVal}
• Total ARS: $${totalARSVal}
• Total USD: $${totalUSDVal}
• Tipo de Cambio: ${tipoCambioVal}

VER PDF GENERADO`;

        alert(mensaje);
        btnCancelar.click();
    });

    // Mostrar u ocultar input valor descuento según tipo seleccionado
    tipoDescuento.addEventListener('change', () => {
        valorDescuento.classList.toggle('oculto', tipoDescuento.value === '');
        calcularTotal();
    });

    // Mostrar u ocultar input adicional fijo
    chkAdicionalFijo.addEventListener('change', () => {
        inputAdicionalFijo.classList.toggle('oculto', !chkAdicionalFijo.checked);
        calcularTotal();
    });

    // Mostrar u ocultar opciones y campo adicional porcentaje
    chkAdicionalPorc.addEventListener('change', () => {
        const visible = chkAdicionalPorc.checked;
        contenedorPorcentaje.classList.toggle('oculto', !visible);
        document.getElementById('input-valor-porcentaje').classList.toggle('oculto', !visible);
        calcularTotal();
    });

    // Eventos que disparan recalculo total al cambiar inputs clave
    const entradasReactivas = [
        importe, valorDescuento, inputAdicionalFijo,
        inputValorPorcentaje, moneda
    ];

    entradasReactivas.forEach(input => {
        if (!input) return;
        input.addEventListener('input', calcularTotal);
        input.addEventListener('change', calcularTotal);
    });

    importe.addEventListener('blur', calcularTotal);
    importe.addEventListener('keyup', calcularTotal);
    importe.addEventListener('paste', calcularTotal);

    tipoPorcentajeRadios.forEach(r => r.addEventListener('change', calcularTotal));

    // Inicialización visual
    if (tipoDescuento.value === '') valorDescuento.classList.add('oculto');
    else valorDescuento.classList.remove('oculto');

    const labelCambio = document.getElementById('label-tipo-cambio');
    const hoyStr = new Date().toLocaleDateString('es-AR');
    labelCambio.textContent = `Tipo de Cambio ${hoyStr}:`;

    inputTipoCambio.value = '1400'; // valor por defecto, cambiar si querés
    calcularTotal();
});