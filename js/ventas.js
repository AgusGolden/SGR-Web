document.addEventListener('DOMContentLoaded', () => {
    // Variables generales no relacionadas a listar reparaciones
    // (Asumo que acá van las otras funcionalidades que tenías, por ejemplo:)

    // Inicializar Registrar Orden de Compra (segunda pantalla)
    function initRegistrarOrdenCompra() {
        const btnRegistrar = document.getElementById('btn-registrar-aprobaciones');
        const tablaEquipos = document.getElementById('tabla-equipos-pendientes');
        const btnCargarDoc = document.getElementById('btn-cargar-doc');
        const btnVerAdjunto = document.getElementById('btn-ver-adjunto');
        const inputFile = document.createElement('input');
        inputFile.type = 'file';
        inputFile.accept = '.pdf,.doc,.docx,.jpg,.png'; // Extensiones permitidas
        inputFile.style.display = 'none';
        document.body.appendChild(inputFile);

        let archivoAdjunto = null;

        if (!(btnRegistrar && tablaEquipos && btnCargarDoc && btnVerAdjunto)) return;

        btnCargarDoc.addEventListener('click', () => {
            inputFile.click();
        });

        inputFile.addEventListener('change', () => {
            if (inputFile.files.length > 0) {
                archivoAdjunto = inputFile.files[0];
                btnVerAdjunto.disabled = false;
                btnVerAdjunto.textContent = `Ver Adjunto (${archivoAdjunto.name})`;
            }
        });

        btnVerAdjunto.addEventListener('click', () => {
            if (archivoAdjunto) {
                alert(`Mostrar o descargar documento: ${archivoAdjunto.name}`);
            } else {
                alert('No hay documento cargado.');
            }
        });

        btnRegistrar.addEventListener('click', () => {
            const filas = tablaEquipos.querySelectorAll('tbody tr');
            const aprobados = [];

            let numOC = document.getElementById('num-oc').value.trim();
            if (numOC === '') {
                numOC = "Sin OC";
            }

            filas.forEach(fila => {
                const checkbox = fila.querySelector('input[type="checkbox"]');
                if (checkbox && checkbox.checked) {
                    const reparacion = fila.children[2].textContent.trim();
                    const cliente = fila.children[3].textContent.trim();
                    aprobados.push(`Reparación: ${reparacion} - Cliente: ${cliente}`);
                }
            });

            if (aprobados.length === 0) {
                alert('No seleccionaste ningún equipo para aprobar.');
                return;
            }

            alert(`Equipos aprobados:\n\n${aprobados.join('\n')}\nAsociados a la OC: ${numOC}`);

            document.getElementById('num-oc').value = '';
            archivoAdjunto = null;
            btnVerAdjunto.textContent = 'Ver Adjunto';
            btnVerAdjunto.disabled = true;
            tablaEquipos.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        });
    }

    // Filtro por cliente en tabla equipos
    const selectCliente = document.getElementById('cliente');
    const tablaEquipos = document.getElementById('tabla-equipos-pendientes');
    if (selectCliente && tablaEquipos) {
        selectCliente.addEventListener('change', () => {
            const clienteSeleccionado = selectCliente.value;
            const filas = tablaEquipos.querySelectorAll('tbody tr');

            filas.forEach(fila => {
                const clienteFila = fila.children[3].textContent.trim();
                fila.style.display = (clienteSeleccionado === '' || clienteFila === clienteSeleccionado) ? '' : 'none';
            });
        });
    }

    // Gestión de ítems en generación de factura
    const remitoItems = {
        'RMT-0001': [
            { item: 'Disco SSD', cantidad: 2, detalle: 'Disco de 480GB', iva: 21, precio: 20000 },
            { item: 'Monitor 27"', cantidad: 1, detalle: 'Reparación general', iva: 21, precio: 15000 }
        ],
        'RMT-0002': [
            { item: 'Fuente ATX', cantidad: 1, detalle: 'Fuente 600W', iva: 10.5, precio: 18000 }
        ]
    };

    const checkboxes = document.querySelectorAll('#tabla-remitos input[type="checkbox"]');
    const tablaItems = document.getElementById('tabla-items')?.querySelector('tbody');
    const subtotalInput = document.getElementById('subtotal');
    const ivaInput = document.getElementById('iva-total');
    const totalInput = document.getElementById('total');

    if (checkboxes.length && tablaItems && subtotalInput && ivaInput && totalInput) {
        checkboxes.forEach(cb => cb.addEventListener('change', actualizarTablaItems));

        function actualizarTablaItems() {
            tablaItems.innerHTML = '';
            let subtotal = 0;
            let ivaTotal = 0;

            checkboxes.forEach(cb => {
                if (cb.checked) {
                    const remito = cb.dataset.remito;
                    const items = remitoItems[remito] || [];

                    items.forEach(i => {
                        const fila = document.createElement('tr');
                        fila.innerHTML = `
                            <td>${i.item}</td>
                            <td>${i.cantidad}</td>
                            <td>${i.detalle}</td>
                            <td>${i.iva}</td>
                            <td>$${i.precio.toFixed(2)}</td>
                            <td>$${(i.cantidad * i.precio).toFixed(2)}</td>
                        `;
                        tablaItems.appendChild(fila);

                        const lineaSubtotal = i.precio * i.cantidad;
                        subtotal += lineaSubtotal;
                        ivaTotal += (lineaSubtotal * i.iva) / 100;
                    });
                }
            });

            subtotalInput.value = `$${subtotal.toFixed(2)}`;
            ivaInput.value = `$${ivaTotal.toFixed(2)}`;
            totalInput.value = `$${(subtotal + ivaTotal).toFixed(2)}`;
        }
    }

    // Botón generar factura
    const btnGenerarFactura = document.getElementById('btn-generar-factura');
    if (btnGenerarFactura) {
        btnGenerarFactura.addEventListener('click', () => {
            const cliente = document.getElementById('cliente')?.value;
            const seleccionados = Array.from(checkboxes).filter(cb => cb.checked);

            if (!cliente) {
                alert('Seleccioná un cliente antes de generar la factura.');
                return;
            }

            if (seleccionados.length === 0) {
                alert('Seleccioná al menos un remito para generar la factura.');
                return;
            }

            alert('Factura generada correctamente. (Simulación)');
        });
    }

    // Inicializar funcionalidades
    initRegistrarOrdenCompra();
});




// document.addEventListener('DOMContentLoaded', () => {
//     // Variables Generar Presupuesto
//     const tabla = document.getElementById('tabla-reparaciones');
//     const filas = tabla ? tabla.getElementsByTagName('tr') : [];
//     const subtitulo = document.getElementById('subtitulo-reparacion');
//     const btnGenerar = document.getElementById('btn-repa-marcada');
//     const btnConfirmar = document.getElementById('btn-confirmar');
//     const btnCancelar = document.getElementById('btn-cancelar');
//     const contenedor = document.querySelector('section.contenedor');
//     const btnVerMas = document.getElementById('btn-ver-mas');
//     const btnFiltrar = document.getElementById('btn-filtrar');
//     let filaSeleccionada = null;

//     // Función auxiliar para limpiar campos de texto y textarea (excepto readonly)
//     function limpiarFormulario() {
//         if (!contenedor) return;
//         const campos = contenedor.querySelectorAll('input:not([readonly]), textarea');
//         campos.forEach(c => c.value = '');
//     }

//     // Inicializar Generar Presupuesto
//     function initGenerarPresupuesto() {
//         if (!tabla || !btnGenerar || !btnConfirmar || !btnCancelar || !subtitulo || !contenedor) return;

//         // Selección de fila en la tabla
//         for (let i = 1; i < filas.length; i++) {
//             filas[i].addEventListener('click', function () {
//                 const yaSeleccionada = this.classList.contains('fila-seleccionada');

//                 for (let j = 1; j < filas.length; j++) {
//                     filas[j].classList.remove('fila-seleccionada');
//                 }

//                 if (!yaSeleccionada) {
//                     this.classList.add('fila-seleccionada');
//                     filaSeleccionada = this;
//                     btnGenerar.disabled = false;
//                     if (btnVerMas) btnVerMas.classList.remove('oculto');
//                     if (btnFiltrar) btnFiltrar.classList.add('oculto');
//                 } else {
//                     filaSeleccionada = null;
//                     if (btnVerMas) btnVerMas.classList.add('oculto');
//                     if (btnFiltrar) btnFiltrar.classList.remove('oculto');
//                     btnGenerar.disabled = true;
//                 }
//             });
//         }

//         // Botón "Generar Presupuesto" principal
//         btnGenerar.addEventListener('click', () => {
//             if (!filaSeleccionada) {
//                 alert('Seleccioná una reparación primero.');
//                 return;
//             }

//             const celdas = filaSeleccionada.children;
//             const inputs = contenedor.querySelectorAll('fieldset:first-of-type input');

//             // Cargar datos
//             inputs[0].value = celdas[1].textContent; // Reparación
//             inputs[1].value = celdas[0].textContent; // Fecha
//             inputs[2].value = celdas[2].textContent; // Cliente
//             inputs[3].value = celdas[5].textContent; // Código
//             inputs[4].value = celdas[4].textContent; // Título
//             inputs[5].value = celdas[6].textContent; // Serie

//             // Mostrar/ocultar
//             subtitulo.classList.add('oculto');
//             btnGenerar.classList.add('oculto');
//             tabla.classList.add('oculto');
//             contenedor.classList.remove('oculto');
//             btnCancelar.classList.remove('oculto');
//             btnConfirmar.classList.remove('oculto');
//         });

//         // Botón "Cancelar"
//         btnCancelar.addEventListener('click', () => {
//             subtitulo.classList.remove('oculto');
//             contenedor.classList.add('oculto');
//             tabla.classList.remove('oculto');
//             btnGenerar.classList.remove('oculto');
//             btnCancelar.classList.add('oculto');
//             btnConfirmar.classList.add('oculto');
//             if (filaSeleccionada) filaSeleccionada.classList.remove('fila-seleccionada');
//             filaSeleccionada = null;
//             btnGenerar.disabled = true;
//             limpiarFormulario();
//         });

//         // Botón "Generar Presupuesto" final
//         btnConfirmar.addEventListener('click', () => {
//             alert('Presupuesto cargado correctamente.');
//             subtitulo.classList.remove('oculto');
//             contenedor.classList.add('oculto');
//             tabla.classList.remove('oculto');
//             btnGenerar.classList.remove('oculto');
//             btnCancelar.classList.add('oculto');
//             btnConfirmar.classList.add('oculto');
//             if (filaSeleccionada) filaSeleccionada.classList.remove('fila-seleccionada');
//             filaSeleccionada = null;
//             btnGenerar.disabled = true;
//             limpiarFormulario();
//         });
//     }

//     // Inicializar botón Ver Más si existe
//     if (btnVerMas) {
//         btnVerMas.addEventListener('click', () => {
//             location.href = './listar-reparaciones.html';
//         });
//     }

//     // BLOQUE DE OTRA SECCIÓN (aislado)
//     const mas = document.getElementById('btn-ver-mas');
//     const filtrar = document.getElementById('btn-filtrar');
//     const tablaVerMas = document.getElementById('tabla-reparaciones');

//     if (tablaVerMas && mas && filtrar) {
//         const filasVerMas = tablaVerMas.getElementsByTagName('tr');

//         for (let i = 1; i < filasVerMas.length; i++) {
//             filasVerMas[i].addEventListener('click', function () {
//                 const yaSeleccionada = this.classList.contains('fila-seleccionada');

//                 for (let j = 1; j < filasVerMas.length; j++) {
//                     filasVerMas[j].classList.remove('fila-seleccionada');
//                 }

//                 if (!yaSeleccionada) {
//                     this.classList.add('fila-seleccionada');
//                     mas.classList.remove('oculto');
//                     filtrar.classList.add('oculto');
//                 } else {
//                     mas.classList.add('oculto');
//                     filtrar.classList.remove('oculto');
//                 }
//             });
//         }

//         mas.addEventListener('click', () => {
//             location.href = './listar-reparaciones.html';
//         });
//     }

//     // Inicializar Registrar Orden de Compra (segunda pantalla)
//     function initRegistrarOrdenCompra() {
//         const btnRegistrar = document.getElementById('btn-registrar-aprobaciones');
//         const tablaEquipos = document.getElementById('tabla-equipos-pendientes');
//         const btnCargarDoc = document.getElementById('btn-cargar-doc');
//         const btnVerAdjunto = document.getElementById('btn-ver-adjunto');
//         const inputFile = document.createElement('input');
//         inputFile.type = 'file';
//         inputFile.accept = '.pdf,.doc,.docx,.jpg,.png'; // Extensiones permitidas
//         inputFile.style.display = 'none';
//         document.body.appendChild(inputFile);

//         let archivoAdjunto = null;

//         if (!(btnRegistrar && tablaEquipos && btnCargarDoc && btnVerAdjunto)) return;

//         // Manejar cargar documento
//         btnCargarDoc.addEventListener('click', () => {
//             inputFile.click();
//         });

//         inputFile.addEventListener('change', () => {
//             if (inputFile.files.length > 0) {
//                 archivoAdjunto = inputFile.files[0];
//                 btnVerAdjunto.disabled = false;
//                 // Mostrar nombre archivo junto al botón, mejor UX que alert
//                 btnVerAdjunto.textContent = `Ver Adjunto (${archivoAdjunto.name})`;
//             }
//         });

//         // Manejar ver adjunto
//         btnVerAdjunto.addEventListener('click', () => {
//             if (archivoAdjunto) {
//                 alert(`Mostrar o descargar documento: ${archivoAdjunto.name}`);
//                 // Aquí podés implementar abrir en nueva pestaña o preview si lo subís a backend
//             } else {
//                 alert('No hay documento cargado.');
//             }
//         });

//         // Manejar registro de aprobaciones
//         btnRegistrar.addEventListener('click', () => {
//             const filas = tablaEquipos.querySelectorAll('tbody tr');
//             const aprobados = [];

//             // Validar que haya número de OC
//             let numOC = document.getElementById('num-oc').value.trim();
//             if (numOC === '') {
//                 // alert('Por favor, ingresá un número de Orden de Compra antes de registrar aprobaciones.')
//                 numOC = "Sin OC";
//             }

//             filas.forEach(fila => {
//                 const checkbox = fila.querySelector('input[type="checkbox"]');
//                 if (checkbox && checkbox.checked) {
//                     const reparacion = fila.children[2].textContent.trim();
//                     const cliente = fila.children[3].textContent.trim();
//                     aprobados.push(`Reparación: ${reparacion} - Cliente: ${cliente}`);
//                 }
//             });

//             if (aprobados.length === 0) {
//                 alert('No seleccionaste ningún equipo para aprobar.');
//                 return;
//             }

//             // Simular envío o procesamiento
//             alert(`Equipos aprobados:\n\n${aprobados.join('\n')}\nAsociados a la OC: ${numOC}`);

//             // Limpiar después de aprobar
//             document.getElementById('num-oc').value = '';
//             archivoAdjunto = null;
//             btnVerAdjunto.textContent = 'Ver Adjunto';
//             btnVerAdjunto.disabled = true;
//             tablaEquipos.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
//         });
//     }
    
//     const selectCliente = document.getElementById('cliente');
//     const tablaEquipos = document.getElementById('tabla-equipos-pendientes');
//     selectCliente.addEventListener('change', () => {
//         const clienteSeleccionado = selectCliente.value;
//         const filas = tablaEquipos.querySelectorAll('tbody tr');

//         filas.forEach(fila => {
//             const clienteFila = fila.children[3].textContent.trim();

//             if (clienteSeleccionado === '' || clienteFila === clienteSeleccionado) {
//                 fila.style.display = '';
//             } else {
//                 fila.style.display = 'none';
//             }
//         });
//     });


//     // otra pantalla
//     const remitoItems = {
//         'RMT-0001': [
//         { item: 'Disco SSD', cantidad: 2, detalle: 'Disco de 480GB', iva: 21, precio: 20000 },
//         { item: 'Monitor 27"', cantidad: 1, detalle: 'Reparación general', iva: 21, precio: 15000 }
//         ],
//         'RMT-0002': [
//         { item: 'Fuente ATX', cantidad: 1, detalle: 'Fuente 600W', iva: 10.5, precio: 18000 }
//         ]
//     };

//     const checkboxes = document.querySelectorAll('#tabla-remitos input[type="checkbox"]');
//     const tablaItems = document.getElementById('tabla-items').querySelector('tbody');
//     const subtotalInput = document.getElementById('subtotal');
//     const ivaInput = document.getElementById('iva-total');
//     const totalInput = document.getElementById('total');

//     checkboxes.forEach(cb => {
//         cb.addEventListener('change', actualizarTablaItems);
//     });

//     function actualizarTablaItems() {
//         tablaItems.innerHTML = '';
//         let subtotal = 0;
//         let ivaTotal = 0;

//         checkboxes.forEach(cb => {
//         if (cb.checked) {
//             const remito = cb.dataset.remito;
//             const items = remitoItems[remito] || [];

//             items.forEach(i => {
//             const fila = document.createElement('tr');
//             fila.innerHTML = `
//                 <td>${i.item}</td>
//                 <td>${i.cantidad}</td>
//                 <td>${i.detalle}</td>
//                 <td>${i.iva}</td>
//                 <td>$${i.precio.toFixed(2)}</td>
//                 <td>$${(i.cantidad * i.precio).toFixed(2)}</td>
//             `;
//             tablaItems.appendChild(fila);

//             const lineaSubtotal = i.precio * i.cantidad;
//             subtotal += lineaSubtotal;
//             ivaTotal += (lineaSubtotal * i.iva) / 100;
//             });
//         }
//         });

//         subtotalInput.value = `$${subtotal.toFixed(2)}`;
//         ivaInput.value = `$${ivaTotal.toFixed(2)}`;
//         totalInput.value = `$${(subtotal + ivaTotal).toFixed(2)}`;
//     }

//     document.getElementById('btn-generar-factura').addEventListener('click', () => {
//         const cliente = document.getElementById('cliente').value;
//         const seleccionados = Array.from(checkboxes).filter(cb => cb.checked);

//         if (!cliente) {
//         alert('Seleccioná un cliente antes de generar la factura.');
//         return;
//         }

//         if (seleccionados.length === 0) {
//         alert('Seleccioná al menos un remito para generar la factura.');
//         return;
//         }

//         alert('Factura generada correctamente. (Simulación)');
//     });



//     // Inicializaciones
//     initGenerarPresupuesto();
//     initRegistrarOrdenCompra();
// });
