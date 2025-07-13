document.addEventListener("DOMContentLoaded", () => {
  const selectFactura = document.getElementById("select-factura");
  const fechaFactura = document.getElementById("fecha-factura");
  const importeFactura = document.getElementById("importe-factura");
  const saldoFactura = document.getElementById("saldo-factura");

  const fechaPago = document.getElementById("fecha-pago");
  const importePago = document.getElementById("importe-pago");
  const formaPago = document.getElementById("forma-pago");
  const form = document.getElementById("form-abonar-factura");

  // Establecer fecha de pago por defecto a hoy
  fechaPago.valueAsDate = new Date();

  // Actualizar datos de factura al seleccionar
  selectFactura.addEventListener("change", () => {
    const option = selectFactura.selectedOptions[0];
    if (!option || option.value === "") {
      fechaFactura.value = "";
      importeFactura.value = "";
      saldoFactura.value = "";
      importePago.value = "";
      return;
    }
    fechaFactura.value = option.dataset.fecha;
    importeFactura.value = option.dataset.importe;
    saldoFactura.value = option.dataset.saldo;
    importePago.value = option.dataset.saldo;
    importePago.max = option.dataset.saldo;
  });

  // Validar importe pagado
  importePago.addEventListener("input", () => {
    const maxPago = parseFloat(importePago.max);
    let valor = parseFloat(importePago.value);
    if (isNaN(valor) || valor < 0) {
      importePago.value = "";
      return;
    }
    if (valor > maxPago) {
      importePago.value = maxPago;
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!selectFactura.value) {
      alert("Seleccione una factura para abonar.");
      return;
    }
    if (!formaPago.value) {
      alert("Seleccione una forma de pago.");
      return;
    }
    if (!importePago.value || parseFloat(importePago.value) <= 0) {
      alert("Ingrese un importe válido para el pago.");
      return;
    }

    // Aquí iría la lógica para enviar los datos al backend o guardarlos
    alert(`Pago registrado para factura ${selectFactura.value} por $${importePago.value}`);

    // Opcional: resetear formulario
    form.reset();
    fechaPago.valueAsDate = new Date();
    fechaFactura.value = "";
    importeFactura.value = "";
    saldoFactura.value = "";
    importePago.max = "";
  });
});
