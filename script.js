// ====== COUNTDOWN ======
const weddingDate = new Date("2025-12-27T00:00:00").getTime();
const countdownElement = document.getElementById("countdown");
let prevValues = { d: null, h: null, m: null, s: null };

function actualizarCountdown() {
  const now = Date.now();
  const distancia = weddingDate - now;

  if (distancia <= 0) {
    countdownElement.innerHTML = "<p>🎉 ¡Hoy es el gran día! 🎉</p>";
    clearInterval(timer);
    return;
  }

  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor(
    (distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000);
  const valores = { d: dias, h: horas, m: minutos, s: segundos };

  if (!countdownElement.children.length) {
    countdownElement.innerHTML = `
            <div><strong>${dias}</strong><span>Días</span></div>
            <div><strong>${horas}</strong><span>Horas</span></div>
            <div><strong>${minutos}</strong><span>Min</span></div>
            <div><strong>${segundos}</strong><span>Seg</span></div>
        `;
  } else {
    const bloques = countdownElement.querySelectorAll("div strong");
    ["d", "h", "m", "s"].forEach((key, i) => {
      if (valores[key] !== prevValues[key]) {
        bloques[i].textContent = valores[key];
        bloques[i].classList.remove("animate");
        void bloques[i].offsetWidth; // reinicia animación
        bloques[i].classList.add("animate");
      }
    });
  }
  prevValues = valores;
}
const timer = setInterval(actualizarCountdown, 1000);
actualizarCountdown();

// ====== FORMULARIO ======

function toggleSiNo(si, no, extraField = null) {
  const inputExtra = extraField?.querySelector("textarea, input");

  function actualizar() {
    if (si.checked) {
      no.checked = false;
      if (extraField) {
        extraField.style.display = "block";
        if (inputExtra) {
          inputExtra.disabled = false;
          inputExtra.setAttribute("required", "true");
        }
      }
    } else if (no.checked || !si.checked) {
      // Ocultamos y limpiamos
      if (extraField) {
        extraField.style.display = "none";
        if (inputExtra) {
          inputExtra.value = "";
          inputExtra.disabled = true;
          inputExtra.removeAttribute("required");
        }
      }
    }
  }

  si.addEventListener("change", actualizar);
  no.addEventListener("change", () => {
    si.checked = false;
    actualizar();
  });

  actualizar(); // Estado inicial
}

// --- Asistencia ---
const asistirSi = document.getElementById("asistir-si");
const asistirNo = document.getElementById("asistir-no");
const submitBtn = document.querySelector(
  '#form-asistencia button[type="submit"]'
);

// --- Autobús ---
toggleSiNo(
  document.getElementById("bus-si"),
  document.getElementById("bus-no")
);

// --- Alergias ---
toggleSiNo(
  document.getElementById("alergia-si"),
  document.getElementById("alergia-no"),
  document.getElementById("campo-alergia")
);

// --- Acompañantes ---
toggleSiNo(
  document.getElementById("acompanante-si"),
  document.getElementById("acompanante-no"),
  document.getElementById("campo-acompanantes")
);

function actualizarBoton() {
  if (asistirNo.checked) {
    submitBtn.disabled = true;
    submitBtn.style.backgroundColor = "#555"; // más oscuro
    submitBtn.style.cursor = "not-allowed";
    submitBtn.style.opacity = "0.7"; // se ve apagado
  } else {
    submitBtn.disabled = false;
    submitBtn.style.backgroundColor = ""; // vuelve al color por defecto
    submitBtn.style.cursor = "";
    submitBtn.style.opacity = "1";
  }
}

asistirSi.addEventListener("change", actualizarBoton);
asistirNo.addEventListener("change", actualizarBoton);

actualizarBoton(); // Estado inicial

// === Validación de teléfono ===
const telInput = document.getElementById("telefono");
const telError = document.getElementById("error-telefono");

telInput.addEventListener("input", () => {
  // Limitar solo a números
  telInput.value = telInput.value.replace(/\D/g, "");

  // Validar longitud
  if (telInput.value.length > 9) {
    telInput.value = telInput.value.slice(0, 9);
  }
});

const petalos = document.querySelector(".petalos");

function crearPetalo() {
  const petalo = document.createElement("span");
  const size = Math.random() * 15 + 10; // Tamaño entre 10 y 25px
  const left = Math.random() * window.innerWidth;
  const duracion = Math.random() * 5 + 5; // Entre 5 y 10s de caída

  petalo.style.width = `${size}px`;
  petalo.style.height = `${size * 0.6}px`; // Más achatado como pétalo
  petalo.style.left = `${left}px`;
  petalo.style.animationDuration = `${duracion}s`;

  petalos.appendChild(petalo);

  // Eliminar cuando termine para no saturar el DOM
  setTimeout(() => petalo.remove(), duracion * 1000);
}

// Crear pétalos cada 300-600ms (sutil)
setInterval(crearPetalo, 400);

const form = document.getElementById("miFormulario");
form.addEventListener("submit", function (event) {
  const grupos = [
    ["asistir-si", "asistir-no"],
    ["bus-si", "bus-no"],
    ["alergia-si", "alergia-no"],
    ["acompanante-si", "acompanante-no"],
  ];

  let valido = true;

  grupos.forEach(([siId, noId]) => {
    const si = document.getElementById(siId);
    const no = document.getElementById(noId);

    if (!si.checked && !no.checked) {
      valido = false;
      si.parentElement.style.outline = "2px solid red"; // Aviso visual
    } else {
      si.parentElement.style.outline = "none";
    }
  });

  if (!valido) {
    alert("Debes responder todas las preguntas de Sí/No.");
    event.preventDefault(); // Evita el envío
  }
});
