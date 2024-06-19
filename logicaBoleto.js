//class boleto

class Boleto {
    constructor(id, origen, destino, fechaSalida, fechaLlegada, pasajeros, tipoViaje, categoriaAsientoIda, horarioSalidaIda, categoriaAsientoRegreso, horarioSalidaRegreso, precioTotal) {
        this.id = id;
        this.origen = origen;
        this.destino = destino;
        this.fechaSalida = fechaSalida;
        this.fechaLlegada = fechaLlegada;
        this.pasajeros = pasajeros;
        this.tipoViaje = tipoViaje;
        this.categoriaAsientoIda = categoriaAsientoIda;
        this.horarioSalidaIda = horarioSalidaIda;
        this.categoriaAsientoRegreso = categoriaAsientoRegreso;
        this.horarioSalidaRegreso = horarioSalidaRegreso;
        this.precioTotal = precioTotal;
    }
}

const preciosPorCategoria = {
    "semiCama": 50, // Precio en Bs
    "cama": 100, // Precio en Bs
    "leito": 150 // Precio en Bs
};

document.getElementById('oneWay').addEventListener('change', function () {
    document.getElementById('returnDateContainer').style.display = 'none';
    document.getElementById('returnTripOptions').style.display = 'none';
});

document.getElementById('roundTrip').addEventListener('change', function () {
    document.getElementById('returnDateContainer').style.display = 'block';
    document.getElementById('returnTripOptions').style.display = 'block';
});

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var origen = document.getElementById('from').value;
    var destino = document.getElementById('to').value;
    var fechaSalida = document.getElementById('departureDate').value;
    var fechaLlegada = document.getElementById('returnDate').value;
    var pasajeros = parseInt(document.getElementById('passengers').value);
    var tipoViaje = document.querySelector('input[name="tripType"]:checked').value;
    var categoriaAsientoIda = document.getElementById('categoriaAsientoIda').value;
    var horarioSalidaIda = document.getElementById('horarioSalidaIda').value;
    var categoriaAsientoRegreso = document.getElementById('categoriaAsientoRegreso').value;
    var horarioSalidaRegreso = document.getElementById('horarioSalidaRegreso').value;

    // Validaciones
    if (origen === destino) {
        alert('El origen y el destino no pueden ser iguales.');
        return;
    }

    if (pasajeros <= 0) {
        alert('El número de pasajeros debe ser mayor que cero.');
        return;
    }

    if (tipoViaje === 'roundTrip' && !fechaLlegada) {
        alert('Debe seleccionar una fecha de llegada para un viaje de ida y vuelta.');
        return;
    }

    // Obtener precios de los asientos
    var precioAsientoIda = 0;
    var precioAsientoRegreso = 0;

    // Calcular precio del asiento de ida si está seleccionado
    if (categoriaAsientoIda) {
        precioAsientoIda = preciosPorCategoria[categoriaAsientoIda];
        if (!precioAsientoIda) {
            alert('Debe seleccionar una categoría de asiento válida para el viaje de ida.');
            return;
        }
    } else {
        alert('Debe seleccionar una categoría de asiento para el viaje de ida.');
        return;
    }

    // Calcular precio del asiento de regreso si está seleccionado y es viaje redondo
    if (tipoViaje === 'roundTrip' && categoriaAsientoRegreso) {
        precioAsientoRegreso = preciosPorCategoria[categoriaAsientoRegreso];
        if (!precioAsientoRegreso) {
            alert('Debe seleccionar una categoría de asiento válida para el viaje de regreso.');
            return;
        }
    }

    // Calcular el precio total
    var precioTotal = (precioAsientoIda + precioAsientoRegreso) * pasajeros;


    // Validar que se obtengan los precios correctamente
    console.log("Precio Asiento Ida:", precioAsientoIda);
    console.log("Precio Asiento Regreso:", precioAsientoRegreso);

    // Crear un nuevo boleto
    var boletos = JSON.parse(localStorage.getItem('boletos')) || [];
    var id = boletos.length ? boletos[boletos.length - 1].id + 1 : 1; // Generar ID único

    var boleto = new Boleto(
        id,
        origen,
        destino,
        fechaSalida,
        tipoViaje === 'roundTrip' ? fechaLlegada : null,
        pasajeros,
        tipoViaje,
        categoriaAsientoIda,
        horarioSalidaIda,
        categoriaAsientoRegreso,
        horarioSalidaRegreso,
        precioTotal
    );

    // Almacenar temporalmente en un array
    boletos.push(boleto);
    localStorage.setItem('boletos', JSON.stringify(boletos));

    //Almacenar datos en localStorage (opcional, solo si es necesario almacenar estos datos individualmente)
    localStorage.setItem('origen', origen);
    localStorage.setItem('destino', destino);
    localStorage.setItem('fechaSalida', fechaSalida);
    localStorage.setItem('fechaLlegada', fechaLlegada);
    localStorage.setItem('pasajeros', pasajeros);
    localStorage.setItem('tipoViaje', tipoViaje);
    localStorage.setItem('categoriaAsientoIda', categoriaAsientoIda);
    localStorage.setItem('horarioSalidaIda', horarioSalidaIda);
    localStorage.setItem('categoriaAsientoRegreso', categoriaAsientoRegreso);
    localStorage.setItem('horarioSalidaRegreso', horarioSalidaRegreso);
    localStorage.setItem('precioTotal', precioTotal);

    mostrarResultados(origen, destino, fechaSalida, fechaLlegada, pasajeros, categoriaAsientoIda, horarioSalidaIda, categoriaAsientoRegreso, horarioSalidaRegreso);
});

document.addEventListener('DOMContentLoaded', function () {
    var boletos = JSON.parse(localStorage.getItem('boletos')) || [];
    // Filtrar y mostrar boletos según sea necesario
    console.log(boletos);
});

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function toggleDivs() {
    var slideWrapper = document.querySelector('.slide-wrapper');
    currentSlide = (currentSlide + 1) % totalSlides;
    slideWrapper.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
}

setInterval(toggleDivs, 5000);

// Establecer fecha mínima para campos de fecha
const today = new Date().toISOString().split('T')[0];
document.getElementById('departureDate').setAttribute('min', today);
document.getElementById('returnDate').setAttribute('min', today);

// Interactividad del HTML
document.getElementById('to').addEventListener('change', function () {
    var fromSelect = document.getElementById('from');
    var selectedToOption = this.value;
    var optionsFrom = fromSelect.options;

    for (var i = 0; i < optionsFrom.length; i++) {
        if (optionsFrom[i].value === selectedToOption) {
            optionsFrom[i].disabled = true;
        } else {
            optionsFrom[i].disabled = false;
        }
    }
});

document.getElementById('from').addEventListener('change', function () {
    var toSelect = document.getElementById('to');
    var selectedFromOption = this.value;
    var optionsTo = toSelect.options;

    for (var i = 0; i < optionsTo.length; i++) {
        if (optionsTo[i].value === selectedFromOption) {
            optionsTo[i].disabled = true;
        } else {
            optionsTo[i].disabled = false;
        }
    }
});

// Validar que la fecha de retorno sea mayor a la fecha de salida
document.getElementById('departureDate').addEventListener('change', function () {
    var departureDate = this.value;
    document.getElementById('returnDate').setAttribute('min', departureDate);
});


// Mostrar resultado función:

function mostrarResultados(origen, destino, fechaSalida, fechaLlegada, pasajeros, categoriaAsientoIda, horarioSalidaIda, categoriaAsientoRegreso, horarioSalidaRegreso) {
    const boletos = JSON.parse(localStorage.getItem('boletos')) || [];
    const boletosFiltrados = boletos.filter(boleto => {
        return boleto.origen === origen &&
            boleto.destino === destino &&
            boleto.fechaSalida === fechaSalida &&
            (boleto.fechaLlegada === fechaLlegada || boleto.fechaLlegada === null) &&
            boleto.pasajeros >= pasajeros &&
            boleto.categoriaAsientoIda === categoriaAsientoIda &&
            boleto.horarioSalidaIda === horarioSalidaIda &&
            (boleto.categoriaAsientoRegreso === categoriaAsientoRegreso || !boleto.categoriaAsientoRegreso) &&
            (boleto.horarioSalidaRegreso === horarioSalidaRegreso || !boleto.horarioSalidaRegreso);
    });

    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    if (boletosFiltrados.length > 0) {
        // Obtener el último boleto filtrado
        const ultimoBoleto = boletosFiltrados[boletosFiltrados.length - 1];

        const boletoDiv = document.createElement('div');
        boletoDiv.classList.add('boleto');
        boletoDiv.innerHTML = `
<div class="contenedorPrincipalTextoReserva">
    <div class="contenedorTextoGeneradoReserva">
        <div class="textoGeneradoReserva">
            <p><strong>Origen:</strong></p>
            <p><strong>Destino:</strong></p>
            <p><strong>Fecha de Salida:</strong></p>
            ${ultimoBoleto.fechaLlegada ? '<p><strong>Fecha de Llegada:</strong></p>' : ''}
            <p><strong>Horario de Salida Ida:</strong></p>
            <p><strong>Categoría de Asiento Ida:</strong></p>
            ${ultimoBoleto.horarioSalidaRegreso ? '<p><strong>Horario de Salida Regreso:</strong></p>' : ''}
            ${ultimoBoleto.categoriaAsientoRegreso ? '<p><strong>Categoría de Asiento Regreso:</strong></p>' : ''}
            <p><strong>Número de Pasajeros:</strong></p>
            <p><strong>Precio Total:</strong></p>
        </div>
        <div class="textoGeneradoReserva">
            <p>${ultimoBoleto.origen}</p>
            <p>${ultimoBoleto.destino}</p>
            <p>${ultimoBoleto.fechaSalida}</p>
            ${ultimoBoleto.fechaLlegada ? `<p>${ultimoBoleto.fechaLlegada}</p>` : ''}
            <p>${ultimoBoleto.horarioSalidaIda}</p>
            <p>${ultimoBoleto.categoriaAsientoIda}</p>
            ${ultimoBoleto.horarioSalidaRegreso ? `<p>${ultimoBoleto.horarioSalidaRegreso}</p>` : ''}
            ${ultimoBoleto.categoriaAsientoRegreso ? `<p>${ultimoBoleto.categoriaAsientoRegreso}</p>` : ''}
            <p>${ultimoBoleto.pasajeros}</p>
            <p>${ultimoBoleto.precioTotal} Bs</p>
        </div>
    </div>
</div>
<div class="contenedorPieTextoGenerado">
    <div>
        <p>Confirme su selección y elija su asiento</p>
    </div>
    <div>
        <button onclick="seleccionarAsiento(${ultimoBoleto.id})">Seleccionar Asiento</button>
    </div>
    </div>
             `;

        resultsContainer.appendChild(boletoDiv);

        // Limpiar el localStorage y el array de boletos (quitar esto para limipar mas facilmente luego)
        //   localStorage.removeItem('boletos');

    } else {
        resultsContainer.innerHTML = '<p>No se encontraron boletos que coincidan con la búsqueda.</p>';
    }

    // Mostrar la ventana modal
    const modal = document.getElementById('resultsModal');
    modal.style.display = 'block';
}




function cerrarModal() {
    const modal = document.getElementById('resultsModal');
    modal.style.display = 'none';
}

// Evento para cerrar el modal al clicar la "x"
document.querySelector('.close').addEventListener('click', cerrarModal);


function seleccionarAsiento(boletoId) {
    // Guardar el ID del boleto seleccionado en localStorage
    localStorage.setItem('selectedBoletoId', boletoId);
    window.location.href = 'elegirAsiento.html';
}

// Cerrar la ventana modal al hacer clic fuera de ella
window.onclick = function (event) {
    const modal = document.getElementById('resultsModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
