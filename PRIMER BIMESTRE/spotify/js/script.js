// ========================================
// VARIABLES GLOBALES
// ========================================
const playPauseBtn = document.querySelector('.play-pause-btn');
const playButtons = document.querySelectorAll('.play-button');
const likeBtn = document.querySelector('.like-btn');
const progressBar = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress-filled');
const volumeBar = document.querySelector('.volume-bar');
const volumeFilled = document.querySelector('.volume-filled');
const currentTimeEl = document.querySelector('.current-time');
const totalTimeEl = document.querySelector('.total-time');

let isPlaying = false;
let currentProgress = 0;
let currentVolume = 70;

// ========================================
// REPRODUCTOR - PLAY/PAUSE
// ========================================
playPauseBtn.addEventListener('click', togglePlayPause);

function togglePlayPause() {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        startProgress();
    } else {
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        stopProgress();
    }
}

// ========================================
// BOTONES DE REPRODUCCIÓN EN TARJETAS
// ========================================
playButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Actualizar información de la canción
        const card = button.closest('.playlist-card');
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;
        
        document.querySelector('.song-info h4').textContent = title;
        document.querySelector('.song-info p').textContent = description;
        
        // Iniciar reproducción
        if (!isPlaying) {
            togglePlayPause();
        }
        
        // Reset progress
        currentProgress = 0;
        updateProgress();
    });
});

// ========================================
// BOTÓN LIKE
// ========================================
likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('liked');
    
    if (likeBtn.classList.contains('liked')) {
        likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    } else {
        likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    }
});

// ========================================
// BARRA DE PROGRESO
// ========================================
let progressInterval;

function startProgress() {
    progressInterval = setInterval(() => {
        currentProgress += 0.5;
        
        if (currentProgress >= 100) {
            currentProgress = 0;
            togglePlayPause();
        }
        
        updateProgress();
    }, 1000);
}

function stopProgress() {
    clearInterval(progressInterval);
}

function updateProgress() {
    progressFilled.style.width = currentProgress + '%';
    
    // Actualizar tiempo actual (simulado)
    const totalSeconds = 225; // 3:45
    const currentSeconds = Math.floor((currentProgress / 100) * totalSeconds);
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    
    currentTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    currentProgress = percent;
    updateProgress();
});

// ========================================
// CONTROL DE VOLUMEN
// ========================================
volumeBar.addEventListener('click', (e) => {
    const rect = volumeBar.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    currentVolume = percent;
    volumeFilled.style.width = currentVolume + '%';
});

// ========================================
// EFECTOS HOVER EN TARJETAS
// ========================================
const playlistCards = document.querySelectorAll('.playlist-card, .playlist-card-horizontal');

playlistCards.forEach(card => {
    card.addEventListener('click', () => {
        // Efecto visual al hacer clic
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 100);
    });
});

// ========================================
// NAVEGACIÓN (BOTONES ATRÁS/ADELANTE)
// ========================================
const navButtons = document.querySelectorAll('.nav-btn');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Efecto visual
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);
    });
});

// ========================================
// SIDEBAR - NAVEGACIÓN ACTIVA
// ========================================
const navLinks = document.querySelectorAll('.main-nav a, .library a, .playlists a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Remover clase active de todos
        document.querySelectorAll('.main-nav li').forEach(li => {
            li.classList.remove('active');
        });
        
        // Agregar clase active al padre del link clickeado
        if (link.closest('.main-nav')) {
            link.parentElement.classList.add('active');
        }
    });
});

// ========================================
// CONTROLES DE REPRODUCCIÓN ADICIONALES
// ========================================
const shuffleBtn = document.querySelector('.fa-shuffle').parentElement;
const repeatBtn = document.querySelector('.fa-repeat').parentElement;
const prevBtn = document.querySelector('.fa-backward-step').parentElement;
const nextBtn = document.querySelector('.fa-forward-step').parentElement;

let isShuffled = false;
let isRepeating = false;

shuffleBtn.addEventListener('click', () => {
    isShuffled = !isShuffled;
    shuffleBtn.style.color = isShuffled ? 'var(--spotify-green)' : 'var(--text-gray)';
});

repeatBtn.addEventListener('click', () => {
    isRepeating = !isRepeating;
    repeatBtn.style.color = isRepeating ? 'var(--spotify-green)' : 'var(--text-gray)';
});

prevBtn.addEventListener('click', () => {
    currentProgress = 0;
    updateProgress();
});

nextBtn.addEventListener('click', () => {
    // Simular cambio de canción
    currentProgress = 0;
    updateProgress();
    
    if (!isPlaying) {
        togglePlayPause();
    }
});

// ========================================
// SALUDO DINÁMICO SEGÚN HORA
// ========================================
function updateGreeting() {
    const greetingElement = document.getElementById('greeting');
    const currentHour = new Date().getHours();
    
    let greeting;
    
    if (currentHour >= 6 && currentHour < 12) {
        greeting = 'Buenos días';
    } else if (currentHour >= 12 && currentHour < 20) {
        greeting = 'Buenas tardes';
    } else {
        greeting = 'Buenas noches';
    }
    
    greetingElement.textContent = greeting;
}

// ========================================
// INICIALIZACIÓN
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 Spotify Clone iniciado correctamente');
    updateGreeting();
    updateProgress();
    volumeFilled.style.width = currentVolume + '%';
});

// ========================================
// ATAJOS DE TECLADO
// ========================================
document.addEventListener('keydown', (e) => {
    // Espacio para play/pause
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        togglePlayPause();
    }
    
    // Flecha derecha para adelantar
    if (e.code === 'ArrowRight') {
        currentProgress = Math.min(currentProgress + 5, 100);
        updateProgress();
    }
    
    // Flecha izquierda para retroceder
    if (e.code === 'ArrowLeft') {
        currentProgress = Math.max(currentProgress - 5, 0);
        updateProgress();
    }
    
    // Flecha arriba para subir volumen
    if (e.code === 'ArrowUp') {
        e.preventDefault();
        currentVolume = Math.min(currentVolume + 10, 100);
        volumeFilled.style.width = currentVolume + '%';
    }
    
    // Flecha abajo para bajar volumen
    if (e.code === 'ArrowDown') {
        e.preventDefault();
        currentVolume = Math.max(currentVolume - 10, 0);
        volumeFilled.style.width = currentVolume + '%';
    }
});
