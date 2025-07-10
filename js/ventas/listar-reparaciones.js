document.addEventListener('DOMContentLoaded', () => {
    const mas = document.getElementById('btn-ver-mas');
    const filtrar = document.getElementById('btn-filtrar');
    const tabla = document.getElementById('tabla-reparaciones');

    if (tabla && mas && filtrar) {
        const filas = tabla.getElementsByTagName('tr');
        for (let i = 1; i < filas.length; i++) {
            filas[i].addEventListener('click', function () {
                const yaSeleccionada = this.classList.contains('fila-seleccionada');
                for (let j = 1; j < filas.length; j++) filas[j].classList.remove('fila-seleccionada');
                if (!yaSeleccionada) {
                    this.classList.add('fila-seleccionada');
                    mas.classList.remove('oculto');
                    filtrar.classList.add('oculto');
                } else {
                    mas.classList.add('oculto');
                    filtrar.classList.remove('oculto');
                }
            });
        }

        mas.addEventListener('click', () => {
            location.href = './listar-reparaciones.html';
        });
    }
});
