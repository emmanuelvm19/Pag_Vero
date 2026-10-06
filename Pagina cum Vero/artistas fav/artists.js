const tabs = document.querySelectorAll('.art-tab');
const paneles = document.querySelectorAll('.art-panel');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const destino = tab.dataset.target;
        document.querySelector('.artistas').dataset.tab = destino;
        tabs.forEach(t => t.setAttribute('aria-selected', t === tab));
        paneles.forEach(p => p.classList.toggle('activo', p.id === destino));
    });
});

// Voltear tarjetas con click, Enter o Espacio
document.querySelectorAll('.art-card').forEach(card => {
    const voltear = () => card.classList.toggle('volteada');
    card.addEventListener('click', voltear);
    card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); voltear(); }
    });
});

// ===============================================AUDIO FELIZ CUMPLEAÑOS==========================================
const audio = document.getElementById('art-audio');
const btnPlay = document.getElementById('art-play');
const vol = document.getElementById('art-vol');

audio.volume = vol.value;

btnPlay.addEventListener('click', () => {
    if (audio.paused) audio.play();
    else audio.pause();
});

audio.addEventListener('play',  () => { btnPlay.textContent = '❚❚'; btnPlay.setAttribute('aria-label', 'Pausar'); });
audio.addEventListener('pause', () => { btnPlay.textContent = '▶';  btnPlay.setAttribute('aria-label', 'Reproducir'); });

vol.addEventListener('input', () => { audio.volume = vol.value; });
const progreso = document.getElementById('art-progreso');
const actual = document.getElementById('art-actual');
const total = document.getElementById('art-total');
const btnReinicio = document.getElementById('art-reinicio');
let arrastrando = false;

const formato = s => {
    if (!isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const seg = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${seg}`;
};

// Mostrar duración total cuando el audio la conoce
const cargarDuracion = () => { total.textContent = formato(audio.duration); };
audio.addEventListener('loadedmetadata', cargarDuracion);
if (audio.readyState >= 1) cargarDuracion();

// La barra avanza sola mientras suena
audio.addEventListener('timeupdate', () => {
    actual.textContent = formato(audio.currentTime);
    if (!arrastrando && audio.duration) {
        progreso.value = (audio.currentTime / audio.duration) * 100;
    }
});

// Mover la barra salta a esa parte de la canción
progreso.addEventListener('pointerdown', () => { arrastrando = true; });
progreso.addEventListener('pointerup',   () => { arrastrando = false; });
progreso.addEventListener('input', () => {
    if (audio.duration) {
        audio.currentTime = (progreso.value / 100) * audio.duration;
        actual.textContent = formato(audio.currentTime);
    }
});

// Volver al inicio (si estaba sonando, sigue sonando)
btnReinicio.addEventListener('click', () => {
    audio.currentTime = 0;
    progreso.value = 0;
    actual.textContent = '0:00';
});
const nombreTema = document.querySelector('.art-tema');
const botonesCancion = document.querySelectorAll('.art-cancion');

function actualizarBotones() {
    botonesCancion.forEach(b => {
        const suena = !audio.paused && audio.getAttribute('src') === b.dataset.src;
        b.textContent = suena ? '❚❚ Pausar' : '▶ Reproducir';
        b.closest('.art-card').classList.toggle('sonando', suena);
    });
}

botonesCancion.forEach(b => {
    b.addEventListener('click', e => {
        e.stopPropagation();   // que el click no voltee la tarjeta
        if (audio.getAttribute('src') === b.dataset.src) {
        // Es la misma canción: alterna play y pausa
            audio.paused ? audio.play() : audio.pause();
        } else {
        // Es otra canción: la carga y la reproduce desde el inicio
            audio.setAttribute('src', b.dataset.src);
            nombreTema.textContent = b.dataset.titulo;
            progreso.value = 0;
            audio.load();
            audio.play();
        }
});

  // Enter y Espacio sobre el botón no deben voltear la tarjeta
    b.addEventListener('keydown', e => e.stopPropagation());
});

audio.addEventListener('play', actualizarBotones);
audio.addEventListener('pause', actualizarBotones);