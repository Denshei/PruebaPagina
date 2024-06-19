
//CARRUSEL

document.addEventListener("DOMContentLoaded", function () {
    let slider = document.querySelector('.slider');
    let slides = document.querySelectorAll('.slide');
    let slideWidth = slides[0].clientWidth;
    let currentIndex = 0;

    function nextSlide() {
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        updateSlider();
    }

    function updateSlider() {
        slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
    }

    setInterval(nextSlide, 5000); // Cambia de slide cada 3 segundos
});

//CAMBIO DE IMAGEN

function changeImage(service, element) {
    var isMobile = window.matchMedia("(max-width: 800px)").matches;
    if (isMobile) {
        var imageContainer = element.querySelector('.service-image-container');
        if (imageContainer.style.display === 'block') {
            imageContainer.style.display = 'none';
            return;
        }
        var image = document.createElement('img');
        switch (service) {
            case 'viaja':
                image.src = 'viajaConNosotros.jpg';
                break;
            case 'encomiendas':
                image.src = 'enviaConNosotros.jpg';
                break;
            case 'puerta':
                image.src = 'puertaPuerta.jpg';
                break;
            case 'delegaciones':
                image.src = 'delegaciones.png';
                break;
            default:
                image.src = 'https://st4.depositphotos.com/28636338/41412/v/450/depositphotos_414121816-stock-illustration-bus-icon-vector-illustration.jpg';
                break;
        }
        imageContainer.innerHTML = '';
        imageContainer.appendChild(image);
        imageContainer.style.display = 'block';
    } else {
        var image = document.getElementById('serviceImage').querySelector('img');
        switch (service) {
            case 'viaja':
                image.src = 'viajaConNosotros.jpg';
                break;
            case 'encomiendas':
                image.src = 'enviaConNosotros.jpg';
                break;
            case 'puerta':
                image.src = 'puertaPuerta.jpg';
                break;
            case 'delegaciones':
                image.src = 'delegaciones.png';
                break;
            default:
                image.src = 'https://st4.depositphotos.com/28636338/41412/v/450/depositphotos_414121816-stock-illustration-bus-icon-vector-illustration.jpg';
                break;
        }
    }
}

function resetImage() {
    var isMobile = window.matchMedia("(max-width: 800px)").matches;
    if (!isMobile) {
        var image = document.getElementById('serviceImage').querySelector('img');
        image.src = 'https://st4.depositphotos.com/28636338/41412/v/450/depositphotos_414121816-stock-illustration-bus-icon-vector-illustration.jpg';
    }
}


//script para la parte de destinos:

function toggleMenu() {
    var menuLinks = document.querySelector('.menu-links');
    menuLinks.classList.toggle('show');
}


function showInfo(destination, schedule) {
    var contextMenu = document.getElementById('context-menu');
    var overlayContext = document.getElementById('overlay-context');
    var contextTitle = document.getElementById('context-title');
    var contextInfo = document.getElementById('context-info');

    contextTitle.textContent = destination;
    contextInfo.innerHTML = ""; // Limpiar la información anterior

    var destinations = ['Cochabamba', 'Santa Cruz', 'Oruro']; // Lista de destinos
    var schedules = [
        '8:00 – 19:00 – 20:00 – 21:00 – 21:30',
        '9:00 – 11:00 – 13:00 – 15:00 – 17:00',
        '7:30 – 10:00 – 11:30 – 16:00 – 21:00 – 21:30 – 22:00 – 22:30'
    ];

    for (var i = 0; i < destinations.length; i++) {
        if (destinations[i] !== destination) {
            contextInfo.innerHTML += "<p>Salidas desde " + destination + " a " + destinations[i] + ":</p><p>" + schedules[i] + "</p>";
        }
    }

    contextMenu.style.display = 'block';
    overlayContext.style.display = 'block';
}

function closeContextMenu() {
    var contextMenu = document.getElementById('context-menu');
    var overlayContext = document.getElementById('overlay-context');
    contextMenu.style.display = 'none';
    overlayContext.style.display = 'none';
}

function closePopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'none';
}

