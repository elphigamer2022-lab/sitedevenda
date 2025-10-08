document.addEventListener('DOMContentLoaded', () => {
    console.log("O site 'Rascunho da Mente' foi carregado com sucesso!");

    // ===============================================
    // LÓGICA REUTILIZÁVEL: LIKE/CURTIR
    // ===============================================

    // Handler para o clique no Like (Reutilizado para Galeria e Depoimentos)
    function handleLikeClick(e) {
        e.preventDefault();
        const button = e.currentTarget;
        const icon = button.querySelector('i');
        const countSpan = button.querySelector('.like-count');
        let currentCount = parseInt(countSpan.textContent.trim());

        const postId = button.dataset.postId;
        // Determina se é um Depoimento ou um Desenho (para log de simulação)
        const postType = button.closest('.testimonial-post-card') ? 'Depoimento' : 'Desenho';
        
        // Verifica se o item já está curtido (Simulação de 1 like por pessoa)
        const isLiked = button.classList.contains('liked');

        if (isLiked) {
            // Descurtir
            button.classList.remove('liked');
            icon.classList.remove('fas', 'fa-heart'); // Coração cheio
            icon.classList.add('far', 'fa-heart'); // Coração vazio
            countSpan.textContent = currentCount - 1;

            console.log(`[FRONTEND SIMULAÇÃO - ${postType}] Descurtiu o post ID: ${postId}. Novo total: ${currentCount - 1}`);

        } else {
            // Curtir
            button.classList.add('liked');
            icon.classList.remove('far', 'fa-heart'); // Coração vazio
            icon.classList.add('fas', 'fa-heart'); // Coração cheio
            countSpan.textContent = currentCount + 1;
            
            console.log(`[FRONTEND SIMULAÇÃO - ${postType}] Curtiu o post ID: ${postId}. Novo total: ${currentCount + 1}`);
        }
    }

    // Função para anexar todos os listeners de interação
    function attachInteractionListeners() {
        
        // A. Anexar Listeners de Like para TODOS os botões de like
        document.querySelectorAll('.like-button').forEach(button => {
            button.removeEventListener('click', handleLikeClick);
            button.addEventListener('click', handleLikeClick);
        });

        // B. Anexar Listeners de Excluir para a Galeria
        document.querySelectorAll('.gallery-post-card .delete-button').forEach(button => {
            button.removeEventListener('click', handleDeleteImageClick);
            button.addEventListener('click', handleDeleteImageClick);
        });

        // C. Anexar Listeners para os Depoimentos
        attachTestimonialListeners();
    }
        });

        // B. Anexar Listeners de Excluir para a Galeria
        document.querySelectorAll('.gallery-post-card .delete-button').forEach(button => {
            button.removeEventListener('click', handleDeleteImageClick);
            button.addEventListener('click', handleDeleteImageClick);
        });

        // C. Anexar Listeners para os Depoimentos
        attachTestimonialListeners();
    }


    // ===============================================
    // LÓGICA: GALERIA DE DESENHOS (Mantida)
    // ===============================================

    function createPostCardHTML(fileURL, postId, likes = 0) {
        return `
            <img src="${fileURL}" alt="Desenho de Aluno" class="post-image">
            <div class="post-actions">
                <button class="like-button" data-post-id="${postId}">
                    <i class="far fa-heart"></i>
                    <span class="like-count">${likes}</span>
                </button>
                <button class="delete-button" title="Excluir Desenho">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
    }
  regrasdagaleria
});
// Funcionalidade para o botão de regras da galeria
const toggleButton = document.getElementById('toggle-rules');
const rulesContent = document.getElementById('rules-content');
main


    // ===============================================
    // LÓGICA: GALERIA DE DESENHOS (Mantida)
    // ===============================================

    function createPostCardHTML(fileURL, postId, likes = 0) {
        return `
            <img src="${fileURL}" alt="Desenho de Aluno" class="post-image">
            <div class="post-actions">
                <button class="like-button" data-post-id="${postId}">
                    <i class="far fa-heart"></i>
                    <span class="like-count">${likes}</span>
                </button>
                <button class="delete-button" title="Excluir Desenho">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
    }

    function handleDeleteImageClick(e) {
        const button = e.currentTarget;
        if (confirm("Tem certeza que deseja remover este desenho da galeria?")) {
            const postCard = button.closest('.gallery-post-card');
            if (postCard) {
                const slot = postCard.dataset.slot;
                postCard.remove();
                
                const newUploadCard = document.createElement('div');
                newUploadCard.className = 'gallery-upload-card gallery-item';
                newUploadCard.dataset.slot = slot;
                newUploadCard.innerHTML = `
                    <label for="file-upload-${slot}" class="upload-label">
                        <i class="fas fa-plus upload-icon"></i>
                        <span class="upload-text">Postar Desenho</span>
                    </label>
                    <input type="file" id="file-upload-${slot}" accept="image/*" style="display: none;">
                `;
                
                document.querySelector('.gallery-grid').appendChild(newUploadCard);
                attachInteractionListeners(); 
                console.log(`[FRONTEND SIMULAÇÃO - Desenho] Post ID ${postCard.dataset.postId} removido.`);
            }
        }
    }

    document.querySelectorAll('.gallery-upload-card').forEach(card => {
        const slot = card.dataset.slot;
        const fileInput = document.getElementById(`file-upload-${slot}`);

        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'INPUT') { 
                 fileInput.click();
            }
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
}

    function handleDeleteImageClick(e) {
        const button = e.currentTarget;
        if (confirm("Tem certeza que deseja remover este desenho da galeria?")) {
            const postCard = button.closest('.gallery-post-card');
            if (postCard) {
                const slot = postCard.dataset.slot;
                postCard.remove();
                
                const newUploadCard = document.createElement('div');
                newUploadCard.className = 'gallery-upload-card gallery-item';
                newUploadCard.dataset.slot = slot;
                newUploadCard.innerHTML = `
                    <label for="file-upload-${slot}" class="upload-label">
                        <i class="fas fa-plus upload-icon"></i>
                        <span class="upload-text">Postar Desenho</span>
                    </label>
                    <input type="file" id="file-upload-${slot}" accept="image/*" style="display: none;">
                `;
                
                document.querySelector('.gallery-grid').appendChild(newUploadCard);
                attachInteractionListeners(); 
                console.log(`[FRONTEND SIMULAÇÃO - Desenho] Post ID ${postCard.dataset.postId} removido.`);
            }
        }
    }

    document.querySelectorAll('.gallery-upload-card').forEach(card => {
        const slot = card.dataset.slot;
        const fileInput = document.getElementById(`file-upload-${slot}`);

        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'INPUT') { 
                 fileInput.click();
            }
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                const fileURL = URL.createObjectURL(file);
                const postId = `img${Date.now()}`; 
                
                card.classList.remove('gallery-upload-card');
                card.classList.add('gallery-post-card');
                card.innerHTML = createPostCardHTML(fileURL, postId, 0); 
                
                attachInteractionListeners(); 
                e.target.value = null; 
            }
        });
    });
main


    // ===============================================
    // LÓGICA: DEPOIMENTOS DE ALUNOS (Três Slots)
    // ===============================================
    

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

    // Inicializa todos os listeners quando a página carrega
    attachInteractionListeners();
}); 
main
