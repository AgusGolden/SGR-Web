function toggleProveedor() {
    const proveedorSelect = document.getElementById('proveedor-asignado');
    const esProveedor = document.querySelector('input[name="asignacion"]:checked')?.value === "Proveedor";
    if (proveedorSelect) proveedorSelect.disabled = !esProveedor;
}

function ingresarReparacion() {
    alert("Reparación ingresada");
}

document.addEventListener("DOMContentLoaded", () => {
    const tablaCuerpo = document.getElementById("tabla-cuerpo");

    // Datos ficticios comunes para todas las pantallas
    const datosFicticios = [
        { numero: 1, cliente: "Juan Pérez", fecha: "2025-07-09", titulo: "Monitor LG", codigo: "MON123", serie: "SN001" },
        { numero: 2, cliente: "Empresa XYZ", fecha: "2025-07-08", titulo: "Notebook HP", codigo: "NB456", serie: "SN002" },
        { numero: 3, cliente: "Sistemas SRL", fecha: "2025-07-07", titulo: "Fuente ATX", codigo: "PSU789", serie: "SN003" },
    ];

    // Carga de tabla si existe
    if (tablaCuerpo) {
        tablaCuerpo.innerHTML = "";
        datosFicticios.forEach(item => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td><input type="checkbox" class="marcar-checkbox"></td>
                <td>${item.numero}</td>
                <td>${item.cliente}</td>
                <td>${item.fecha}</td>
                <td>${item.titulo}</td>
                <td>${item.codigo}</td>
                <td>${item.serie}</td>
            `;
            tablaCuerpo.appendChild(fila);
        });
    }

    // Autocompletado del número de remito si existe
    document.querySelectorAll('input[name="tipoRemito"]').forEach(radio => {
        radio.addEventListener("change", (e) => {
            const campoRemito = document.getElementById("remito");
            if (!campoRemito) return;

            campoRemito.value = e.target.value === "normal"
                ? "0002-00004567"
                : "9999-99008890";
        });
    });

    // Lógica del botón generar entrega si existe
    const btnGenerar = document.getElementById("btn-generar");
    if (btnGenerar) {
        btnGenerar.addEventListener("click", () => {
            const proveedor = document.getElementById("proveedor-entrega")?.value
                           || document.getElementById("cliente-entrega")?.value
                           || document.getElementById("proveedor-asignado")?.value;

            const tipo = document.querySelector('input[name="tipoRemito"]:checked')?.value;
            const remito = document.getElementById("remito")?.value;
            const seleccionados = Array.from(document.querySelectorAll(".marcar-checkbox")).filter(cb => cb.checked);

            if (!proveedor || !tipo || !remito || seleccionados.length === 0) {
                alert("Complete todos los campos y seleccione al menos un elemento.");
                return;
            }

            alert(`Entrega generada para ${proveedor}\nTipo de Remito: ${tipo}\nRemito: ${remito}\nElementos seleccionados: ${seleccionados.length}\n\nVER REMITO GENERADO`);
        });
    }
});
