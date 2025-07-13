// entrega-cliente.js

document.addEventListener("DOMContentLoaded", () => {
    cargarTablaReparaciones("tabla-cuerpo");
    autocompletarRemito('input[name="tipoRemito"]', "remito");

    const btnGenerar = document.getElementById("btn-generar");
    if (btnGenerar) {
        btnGenerar.addEventListener("click", () => {
            const cliente = document.getElementById("cliente")?.value;
            const remito = document.getElementById("remito")?.value;
            const checkboxes = Array.from(document.querySelectorAll(".marcar-checkbox"));
            const seleccionados = checkboxes.filter(cb => cb.checked);

            if (!cliente || !remito || seleccionados.length === 0) {
                alert("Complete todos los campos y seleccione al menos un elemento.");
                return;
            }

            const numerosReparaciones = seleccionados.map(cb => {
                const fila = cb.closest('tr');
                return fila?.children[1]?.textContent.trim() || '';
            }).filter(n => n !== '');

            alert(
                `Entrega registrada correctamente.\n\n` +
                `Cliente: ${cliente}\n` +
                `Remito: ${remito}\n` +
                `Reparaciones entregadas: ${numerosReparaciones.join(', ')}`
            );
        });
    }
});
