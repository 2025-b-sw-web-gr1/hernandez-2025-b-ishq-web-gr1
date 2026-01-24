// Main JavaScript file
console.log('📚 Book Tracker cargado correctamente');

// Animación suave al hacer scroll
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll para todos los enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
