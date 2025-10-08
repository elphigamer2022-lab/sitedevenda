document.addEventListener('DOMContentLoaded', () => {
    console.log("O site 'Rascunho da Mente' foi carregado com sucesso!");

    // Funcionalidade de upload de imagem na galeria
    document.querySelectorAll('.gallery-item-container').forEach(container => {
        const overlay = container.querySelector('.add-overlay');
        const fileInput = container.querySelector('.file-input');
        const imgElement = container.querySelector('.gallery-item');
    
        overlay.addEventListener('click', () => {
            fileInput.click();
        });
    
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    imgElement.src = e.target.result;
                    imgElement.style.opacity = '1';
                    overlay.style.display = 'none'; // Esconde a sobreposição do ícone
                };
                reader.readAsDataURL(file);
            }
        });
    });
    

    // Funcionalidade do formulário de comentários
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede o envio real do formulário
    
            const commentText = document.getElementById('comment-text').value;
            const authorName = document.getElementById('author-name').value || 'Anônimo';
    
            if (commentText.trim() !== '') {
                // Cria um novo card de depoimento
                const newCard = document.createElement('div');
                newCard.className = 'testimonial-card';
                newCard.innerHTML = `
                    <p class="testimonial-quote">"${commentText}"</p>
                    <p class="testimonial-author">- ${authorName}</p>
                `;
    
                const testimonialGrid = document.querySelector('.testimonial-grid');
                testimonialGrid.appendChild(newCard);
    
                // Limpa o formulário
                commentForm.reset();
    
                alert('Comentário enviado com sucesso! (Funcionalidade de salvamento permanente requer um servidor e banco de dados)');
            } else {
                alert('Por favor, escreva um comentário.');
            }
        });
    }

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

    // Funcionalidade de curtir na galeria
    document.querySelectorAll('.gallery-item-container .like-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const isLiked = event.currentTarget.getAttribute('data-liked') === 'true';
            if (!isLiked) {
                const likeCountElement = event.currentTarget.parentNode.querySelector('.like-count');
                let currentCount = parseInt(likeCountElement.innerText);
                likeCountElement.innerText = currentCount + 1;
                event.currentTarget.classList.add('liked');
                event.currentTarget.setAttribute('data-liked', 'true');
            }
        });
    });
});
