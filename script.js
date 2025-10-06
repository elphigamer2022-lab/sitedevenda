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


    // ===============================================
    // LÓGICA: DEPOIMENTOS DE ALUNOS (Três Slots)
    // ===============================================
    
    // Gera o HTML de um depoimento (Estrelas movidas para o footer/actions)
    function createTestimonialHTML(author, quote, rating, postId, isAuthor = true, likes = 0) {
        const fullStars = '<i class="fas fa-star"></i>'.repeat(rating);
        const emptyStars = '<i class="far fa-star"></i>'.repeat(5 - rating);
        // Exibe Edit/Remove apenas se for o 'dono' (simulação)
        const displayStyle = isAuthor ? '' : 'style="display: none;"'; 

        return `
            <div class="testimonial-header">
                <div class="testimonial-info">
                    <p class="testimonial-author">${author}</p>
                    </div>
            </div>
            <p class="testimonial-quote">"${quote}"</p>
            
            <div class="testimonial-actions">
                <div class="star-rating footer-rating" data-rating="${rating}">
                    ${fullStars}${emptyStars}
                </div>

                <div class="action-bar-right">
                    <button class="action-button like-button" data-post-id="${postId}">
                        <i class="far fa-heart"></i>
                        <span class="like-count">${likes}</span>
                    </button>
                    <div class="management-buttons">
                        <button class="action-button edit-button" title="Editar Depoimento" ${displayStyle}><i class="fas fa-pencil-alt"></i></button>
                        <button class="action-button delete-button" title="Remover Depoimento" ${displayStyle}><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            </div>
        `;
    }

    // Handler para o clique na Lixeira do Depoimento
    function handleDeleteTestimonialClick(e) {
        const button = e.currentTarget;
        if (confirm("Confirma a remoção deste depoimento? Somente o autor ou o admin pode remover.")) {
            const postCard = button.closest('.testimonial-post-card');
            if (postCard) {
                const slot = postCard.dataset.slot; // Pega o slot para manter a ordem
                
                // Transforma o card de volta para "Adicionar Depoimento"
                postCard.classList.remove('testimonial-post-card');
                postCard.classList.add('testimonial-add-card');
                postCard.removeAttribute('data-post-id');
                postCard.innerHTML = `
                    <button class="add-testimonial-button" title="Adicionar meu depoimento">
                        <i class="fas fa-plus add-testimonial-icon"></i>
                        <p>Adicionar meu Depoimento</p>
                    </button>
                `;
                console.log(`[FRONTEND SIMULAÇÃO - Depoimento] Depoimento removido do Slot ${slot}.`);
                attachInteractionListeners(); // Re-anexa listeners
            }
        }
    }
    
    // Handler para o clique no botão de Adicionar/Editar
    function handleAddEditClick(e) {
        const button = e.currentTarget;
        const isEdit = button.classList.contains('edit-button');
        const card = isEdit ? button.closest('.testimonial-post-card') : button.closest('.testimonial-add-card');

        // SIMULAÇÃO: Formulário simples
        const author = prompt("Qual o seu nome?");
        const quote = prompt("Deixe seu depoimento:");
        let rating = parseInt(prompt("De 1 a 5, qual sua avaliação? (Digite o número)"));
        
        rating = isNaN(rating) || rating < 1 || rating > 5 ? 5 : rating;
        
        if (author && quote) { // Apenas valida se autor e quote existem
            const postId = isEdit ? card.dataset.postId : `depo${Date.now()}`;
            const slot = card.dataset.slot; // Mantém o slot
            const likes = isEdit ? parseInt(card.querySelector('.like-count').textContent) : 0;
            
            // Transforma ou mantém o card como Postado
            card.classList.remove('testimonial-add-card');
            card.classList.add('testimonial-post-card');
            card.dataset.postId = postId;
            
            // Aqui simulamos que o autor que acabou de postar é o dono (isAuthor: true)
            card.innerHTML = createTestimonialHTML(author, quote, rating, postId, true, likes);
            
            console.log(`[FRONTEND SIMULAÇÃO - Depoimento] Depoimento ${isEdit ? 'editado' : 'postado'} no Slot ${slot}. ID: ${postId}`);
            
            attachInteractionListeners(); // Re-anexa listeners aos novos botões (Like, Edit, Delete)
        } else {
            console.log("[FRONTEND SIMULAÇÃO - Depoimento] Postagem/Edição cancelada.");
        }
    }
    
    // Função para anexar todos os listeners específicos de depoimento
    function attachTestimonialListeners() {
        // A. Adicionar Depoimento (em todos os slots .testimonial-add-card)
        document.querySelectorAll('.add-testimonial-button').forEach(button => {
            button.removeEventListener('click', handleAddEditClick);
            button.addEventListener('click', handleAddEditClick);
        });

        // B. Editar Depoimento (apenas nos posts que têm a permissão visual)
        document.querySelectorAll('.testimonial-post-card .edit-button').forEach(button => {
            button.removeEventListener('click', handleAddEditClick);
            button.addEventListener('click', handleAddEditClick);
        });
        
        // C. Remover Depoimento (apenas nos posts que têm a permissão visual)
        document.querySelectorAll('.testimonial-post-card .delete-button').forEach(button => {
            button.removeEventListener('click', handleDeleteTestimonialClick);
            button.addEventListener('click', handleDeleteTestimonialClick);
        });
    }

    // Inicializa todos os listeners quando a página carrega
    attachInteractionListeners();
});
