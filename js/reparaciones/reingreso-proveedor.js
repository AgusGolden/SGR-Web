// reingreso-proveedor.js

document.addEventListener("DOMContentLoaded", () => {
    cargarTablaReparaciones("tabla-cuerpo");

    const btnGenerar = document.getElementById("btn-generar");
    if (btnGenerar) {
        btnGenerar.addEventListener("click", () => {
            const proveedor = document.getElementById("proveedor-reingreso")?.value;
            const remito = document.getElementById("remito")?.value;
            const checkboxes = Array.from(document.querySelectorAll(".marcar-checkbox"));
            const seleccionados = checkboxes.filter(cb => cb.checked);

            if (!proveedor || !remito || seleccionados.length === 0) {
                alert("Complete todos los campos y seleccione al menos un elemento.");
                return;
            }

            const numerosReparaciones = seleccionados.map(cb => {
                const fila = cb.closest('tr');
                return fila?.children[1]?.textContent.trim() || '';
            }).filter(n => n !== '');

            alert(
                `Se registraron correctamente los reingresos.\n` +
                `Proveedor: ${proveedor}\n` +
                `Remito de reingreso: ${remito}\n\n` +
                `Reparaciones reingresadas: ${numerosReparaciones.join(', ')}`
            );
        });
    }
});
