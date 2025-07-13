function toggleProveedor() {
    const proveedorSelect = document.getElementById('proveedor-asignado');
    const esProveedor = document.querySelector('input[name="asignacion"]:checked')?.value === "Proveedor";
    if (proveedorSelect) proveedorSelect.disabled = !esProveedor;
}

function ingresarReparacion() {
    alert("Reparación ingresada");
}

function cargarTablaReparaciones(idTabla) {
    const tablaCuerpo = document.getElementById(idTabla);
    if (!tablaCuerpo) return;

    const datosFicticios = [
        { numero: 1, cliente: "Juan Pérez", fecha: "2025-07-09", titulo: "Monitor LG", codigo: "MON123", serie: "SN001" },
        { numero: 2, cliente: "Empresa XYZ", fecha: "2025-07-08", titulo: "Notebook HP", codigo: "NB456", serie: "SN002" },
        { numero: 3, cliente: "Sistemas SRL", fecha: "2025-07-07", titulo: "Fuente ATX", codigo: "PSU789", serie: "SN003" },
    ];

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

function autocompletarRemito(selector, inputId) {
    document.querySelectorAll(selector).forEach(radio => {
        radio.addEventListener("change", (e) => {
            const campoRemito = document.getElementById(inputId);
            if (!campoRemito) return;
            campoRemito.value = e.target.value === "normal"
                ? "0002-00004567"
                : "9999-99008890";
        });
    });
}


document.addEventListener("DOMContentLoaded", () => {
    if (document.body.contains(document.getElementById("tabla-cuerpo"))) {
        cargarTablaReparaciones("tabla-cuerpo");
    }

    autocompletarRemito("input[name='tipoRemito']", "remito");

    const btnGenerar = document.getElementById("btn-generar");
    if (btnGenerar) {
        btnGenerar.addEventListener("click", () => {
            const proveedor = document.getElementById("proveedor-entrega")?.value;
            const remito = document.getElementById("remito")?.value;
            const checkboxes = Array.from(document.querySelectorAll(".marcar-checkbox"));
            const seleccionados = checkboxes.filter(cb => cb.checked);

            if (!proveedor || !remito || seleccionados.length === 0) {
                alert("Complete todos los campos y seleccione al menos un elemento.");
                return;
            }

            const numerosReparaciones = seleccionados.map(cb => {
                const fila = cb.closest("tr");
                return fila?.children[1]?.textContent.trim() || "";
            }).filter(n => n !== "");

            alert(
                `Se registró correctamente la entrega al proveedor.\n\n` +
                `Proveedor: ${proveedor}\n` +
                `Remito: ${remito}\n` +
                `Reparaciones entregadas: ${numerosReparaciones.join(", ")}`
            );
        });
    }
});
