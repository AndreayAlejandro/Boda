const weddingDate = new Date("2025-08-30T00:00:00").getTime();
const countdownElement = document.getElementById("countdown");

// Estado previo para saber qué cambió
let prevValues = { d: null, h: null, m: null, s: null };

function actualizarCountdown() {
    const now = new Date().getTime();
    const distancia = weddingDate - now;

    if (distancia <= 0) {
        countdownElement.innerHTML = "<p>🎉 ¡Hoy es el gran día! 🎉</p>";
        clearInterval(timer);
        return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    const valores = { d: dias, h: horas, m: minutos, s: segundos };

    // Generar HTML si es la primera vez
    if (!countdownElement.children.length) {
        countdownElement.innerHTML = `
            <div><strong>${dias}</strong><span>Días</span></div>
            <div><strong>${horas}</strong><span>Horas</span></div>
            <div><strong>${minutos}</strong><span>Min</span></div>
            <div><strong>${segundos}</strong><span>Seg</span></div>
        `;
    } else {
        // Actualizar solo los valores que cambian
        const bloques = countdownElement.querySelectorAll("div strong");
        const keys = ["d", "h", "m", "s"];

        keys.forEach((key, i) => {
            if (valores[key] !== prevValues[key]) {
                bloques[i].textContent = valores[key];
                bloques[i].classList.remove("animate");
                void bloques[i].offsetWidth; // Reinicia animación
                bloques[i].classList.add("animate");
            }
        });
    }

    prevValues = valores;
}

const timer = setInterval(actualizarCountdown, 1000);
actualizarCountdown();
