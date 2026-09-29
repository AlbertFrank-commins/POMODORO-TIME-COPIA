// --- 1. Referencias al DOM ---
const timeDisplay = document.getElementById('time');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const modeButtons = document.querySelectorAll('.mode-btn');

// --- 2. Estado de la Aplicación ---
let timerInterval = null;
let currentModeTime = 1500; // 25 min por defecto (en segundos)
let remainingTime = currentModeTime;
let isRunning = false;

// --- 3. Funciones de Renderizado y Formato ---
function updateDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSecs = seconds % 60;
  
  // padStart(2, '0') garantiza formato "05:09" en lugar de "5:9"
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSecs).padStart(2, '0')}`;
  
  timeDisplay.textContent = formattedTime;
  document.title = `${formattedTime} - Pomodoro`; // Muestra el tiempo en la pestaña del navegador
}

// --- 4. Lógica del Temporizador ---
function startTimer() {
  isRunning = true;
  startPauseBtn.textContent = 'Pausar';

  timerInterval = setInterval(() => {
    remainingTime--;
    updateDisplay(remainingTime);

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      isRunning = false;
      startPauseBtn.textContent = 'Iniciar';
      alert('¡Tiempo completado!'); // Aquí luego puedes reemplazar por un audio
      resetTimer();
    }
  }, 1000);
}

function pauseTimer() {
  isRunning = false;
  startPauseBtn.textContent = 'Iniciar';
  clearInterval(timerInterval);
}

function resetTimer() {
  pauseTimer();
  remainingTime = currentModeTime;
  updateDisplay(remainingTime);
}

function switchMode(button) {
  // Manejo de clase activa visual
  modeButtons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');

  // Actualizar tiempos
  currentModeTime = parseInt(button.dataset.time, 10);
  resetTimer();
}

// --- 5. Escuchadores de Eventos (Event Listeners) ---
startPauseBtn.addEventListener('click', () => {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});

resetBtn.addEventListener('click', resetTimer);

modeButtons.forEach(button => {
  button.addEventListener('click', (e) => switchMode(e.target));
});

// --- 6. Alternancia de Modo Claro / Oscuro ---
const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', () => {
  const isLight = document.body.getAttribute('data-theme') === 'light';
  if (isLight) {
    document.body.removeAttribute('data-theme');
    themeToggleBtn.textContent = '🌙';
  } else {
    document.body.setAttribute('data-theme', 'light');
    themeToggleBtn.textContent = '☀️';
  }
});
// Inicialización
updateDisplay(remainingTime);

