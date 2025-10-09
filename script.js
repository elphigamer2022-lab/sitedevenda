document.addEventListener('DOMContentLoaded', () => {
    console.log("O site 'Rascunho da Mente' foi carregado com sucesso!");

    // Funcionalidade de carrossel na hero-section
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    const intervalTime = 5000; // Tempo entre as transições (5 segundos)

    function showNextSlide() {
        // Remove a classe 'active' do slide atual
        slides[currentSlide].classList.remove('active');

        // Calcula o índice do próximo slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Adiciona a classe 'active' ao próximo slide
        slides[currentSlide].classList.add('active');
    }

    // Inicia a troca de slides a cada X segundos
    setInterval(showNextSlide, intervalTime);

    // O código da barra de pesquisa foi mantido, mas a funcionalidade só será ativada se a barra de pesquisa existir na página.
    // Isso é útil se você tiver uma barra de pesquisa em outras páginas, como na página de blog.
    const searchBar = document.getElementById('course-search');
    if (searchBar) { 
        const courseCards = document.querySelectorAll('.course-card');

        searchBar.addEventListener('keyup', (e) => {
            const searchText = e.target.value.toLowerCase();

            courseCards.forEach(card => {
                const cardTitle = card.querySelector('h4').innerText.toLowerCase();
                const cardDescription = card.querySelector('p').innerText.toLowerCase();

                if (cardTitle.includes(searchText) || cardDescription.includes(searchText)) {
                    card.style.display = 'block'; 
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});