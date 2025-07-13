document.addEventListener("DOMContentLoaded", () => {
    const tabla = document.getElementById("tabla-presupuestos");
    const montoInput = document.getElementById("monto");
    const monedaSelect = document.getElementById("moneda");
    const nroOC = document.getElementById("nro-oc");
    const fechaOC = document.getElementById("fecha-oc");
    const btnGenerar = document.getElementById("btn-generar-oc");

    // Tipo de cambio fijo para ejemplo (1 USD = 1350 ARS)
    const tipoCambio = 1350;

    // Inicializar fecha y número de OC
    fechaOC.valueAsDate = new Date();
    nroOC.value = generarNumeroOC();

    // Delegar eventos a nivel tabla
    tabla.addEventListener("change", calcularTotal);
    monedaSelect.addEventListener("change", calcularTotal);

    function calcularTotal() {
        const seleccionados = tabla.querySelectorAll(".presupuesto-check:checked");
        let total = 0;
        const monedaFinal = monedaSelect.value;

        seleccionados.forEach(check => {
            const fila = check.closest("tr");
            const monto = parseFloat(fila.dataset.monto);
            const monedaOriginal = fila.dataset.moneda;

            if (monedaOriginal === monedaFinal) {
                total += monto;
            } else if (monedaOriginal === "USD" && monedaFinal === "ARS") {
                total += monto * tipoCambio;
            } else if (monedaOriginal === "ARS" && monedaFinal === "USD") {
                total += monto / tipoCambio;
            }
        });

        montoInput.value = total.toFixed(2);
    }

    function generarNumeroOC() {
        return "4500" + Math.floor(10000 + Math.random() * 90000).toString();
    }

    btnGenerar.addEventListener("click", () => {
        const seleccionados = tabla.querySelectorAll(".presupuesto-check:checked");
        if (seleccionados.length === 0) {
            alert("Debe seleccionar al menos un presupuesto.");
            return;
        }

        alert(`OC Nº${nroOC.value} generada exitosamente.\nTotal: ${monedaSelect.value} ${montoInput.value}`);
        // Aquí podrías enviar los datos a backend o continuar el flujo
    });
});
