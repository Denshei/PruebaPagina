//clase BOLETO

class Boleto {
    constructor(id, origen, destino, fechaSalida, fechaLlegada = null, pasajeros, tipoViaje, asiento = null) {
        this.id = id; // nuevo identificador único
        this.origen = origen;
        this.destino = destino;
        this.fechaSalida = fechaSalida;
        this.fechaLlegada = fechaLlegada;
        this.pasajeros = pasajeros;
        this.tipoViaje = tipoViaje; // oneWay or roundTrip
        this.asiento = asiento; // nuevo atributo para el asiento
    }
}
//validacion de los formularios

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var origen = document.getElementById('from').value;
    var destino = document.getElementById('to').value;
    var fechaSalida = document.getElementById('departureDate').value;
    var fechaLlegada = document.getElementById('returnDate').value;
    var pasajeros = parseInt(document.getElementById('passengers').value);
    var tipoViaje = document.querySelector('input[name="tripType"]:checked').value;

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

    // Crear un nuevo boleto
    var boleto = new Boleto(origen, destino, fechaSalida, tipoViaje === 'roundTrip' ? fechaLlegada : null, pasajeros, tipoViaje);

    // Almacenar datos en localStorage
    localStorage.setItem('origen', origen);
    localStorage.setItem('destino', destino);
    localStorage.setItem('fechaSalida', fechaSalida);
    localStorage.setItem('fechaLlegada', fechaLlegada);
    localStorage.setItem('pasajeros', pasajeros);
    localStorage.setItem('tipoViaje', tipoViaje);

    // Almacenar temporalmente en un array
    var boletos = JSON.parse(localStorage.getItem('boletos')) || [];
    var id = boletos.length ? boletos[boletos.length - 1].id + 1 : 1; // Generar ID único
    var boleto = new Boleto(id, origen, destino, fechaSalida, tipoViaje === 'roundTrip' ? fechaLlegada : null, pasajeros, tipoViaje);
    boletos.push(boleto);
    localStorage.setItem('boletos', JSON.stringify(boletos));

    //redirigir a la pagina de mostrar boletos
    window.location.href = 'mostrarBoleto.html';
});

//uso de informacion en otras paginas

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

document.getElementById('roundTrip').addEventListener('change', function () {
    document.getElementById('returnDateContainer').style.display = 'block';
});
document.getElementById('oneWay').addEventListener('change', function () {
    document.getElementById('returnDateContainer').style.display = 'none';
});

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

// Validar fecha de retorno sea mayor a fecha de salida
document.getElementById('departureDate').addEventListener('change', function () {
    var departureDate = this.value;
    document.getElementById('returnDate').setAttribute('min', departureDate);
});