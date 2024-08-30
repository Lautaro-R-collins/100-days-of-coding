// Inicialización de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let tiempoRestante;  

let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mensajeFinal = document.getElementById('mensaje-final');
let mostrarTiempo = document.getElementById('time');

// Arreglo para generar números aleatorios
let numbs = ["🦁", "🦁", "🦍", "🦍", "🦒", "🦒", "🐯", "🐯", "🐐", "🐐", "🦓", "🦓", "🐺", "🐺", "🦖", "🦖"];
numbs = numbs.sort(() => Math.random() - 0.5);

// Función principal para destapar tarjetas
function destapar(id) {
    if (temporizador === false) {
        contarTiempo(); // Iniciar el temporizador
        temporizador = true; // Marcar el temporizador como iniciado
    }

    tarjetasDestapadas++;
    if (tarjetasDestapadas == 1) {
        // Mostrar el primer resultado
        tarjeta1 = document.getElementById(id);
        primerResultado = numbs[id];
        tarjeta1.innerHTML = primerResultado;
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas == 2) {
        // Mostrar el segundo resultado
        tarjeta2 = document.getElementById(id);
        segundoResultado = numbs[id];
        tarjeta2.innerHTML = segundoResultado;
        tarjeta2.disabled = true;

        // Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        // Comprobar si hay coincidencia
        if (primerResultado == segundoResultado) {
            tarjetasDestapadas = 0;
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            // Comprobar si se han alcanzado 8 aciertos (juego completo)
            if (aciertos === 8) {
                // Finalizar el juego
                finalizarJuego();
            }
        } else {
            // No hay coincidencia, tapar de nuevo después de un tiempo
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 500);
        }
    }
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Resetear variables
    tarjetasDestapadas = 0;
    tarjeta1 = null;
    tarjeta2 = null;
    primerResultado = null;
    segundoResultado = null;
    movimientos = 0;
    aciertos = 0;
    temporizador = false;
    timer = 30;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
    mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
    mostrarTiempo.innerHTML = `Tiempo: ${timer}`;

    // Limpiar el temporizador
    clearInterval(tiempoRestante);

    // Ocultar el mensaje de victoria
    mensajeFinal.classList.add("oculto");

    // Resetear las tarjetas
    numbs = numbs.sort(() => Math.random() - 0.5);
    for (let i = 0; i < 16; i++) {
        let tarjeta = document.getElementById(i);
        tarjeta.innerHTML = '';
        tarjeta.disabled = false;
    }
}

// Función para el temporizador
function contarTiempo() {
    tiempoRestante = setInterval(() => {
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer}`;
        if (timer === 0) {
            // Finalizar el juego si el tiempo llega a cero
            finalizarJuego();
        }
    }, 1000);
}

// Función para finalizar el juego
function finalizarJuego() {
    // Detener el temporizador
    clearInterval(tiempoRestante);

    // Deshabilitar todas las tarjetas
    for (let i = 0; i < 16; i++) {
        let tarjeta = document.getElementById(i);
        tarjeta.disabled = true;
    }

    // Mostrar el mensaje de fin de juego
    mensajeFinal.classList.remove("oculto");
    mensajeFinal.innerHTML = `
    Movimientos: ${movimientos} - Aciertos: ${aciertos}
    <button id="boton-reiniciar" onclick="reiniciarJuego()">Reiniciar</button>
    `;
}
