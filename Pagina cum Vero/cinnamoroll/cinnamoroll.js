const tarjetas = document.querySelectorAll('.flip-card');

tarjetas.forEach(tarjeta => {
    // Click: voltea la tarjeta
    tarjeta.addEventListener('click', () => {
        tarjeta.classList.toggle('volteada');
    });

    // Teclado: Enter o Espacio también la voltean
    tarjeta.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            tarjeta.classList.toggle('volteada');
        }
    });
});