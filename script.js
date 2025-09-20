document.addEventListener('DOMContentLoaded', () => {
    console.log("O site 'Desenho em Foco' foi carregado com sucesso!");

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
