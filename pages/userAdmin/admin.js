import {database, storage } from '../../src/firebase-config.js'


const designsImportados = document.getElementById('designs-importados');
const addDesignForm = document.getElementById('addDesignForm');
const textDesign = document.getElementById('textDesign');

// Configurar referência para o nó 'designs' no Realtime Database
const designsRef = database.ref('designs');

// Função para criar e adicionar a estrutura HTML do design
function addDesignToPage(imageUrl, name) {
    const designDiv = document.createElement('div');
    designDiv.className = 'col-12 col-md-4';

    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = 'Imagem Carregada';
    imgElement.className = 'img-fluid';

    const bannerContentDiv = document.createElement('div');
    bannerContentDiv.className = 'banner-content';
    const h3Element = document.createElement('h3');
    h3Element.textContent = name;

    bannerContentDiv.appendChild(h3Element);
    designDiv.appendChild(imgElement);
    designDiv.appendChild(bannerContentDiv);
    
    designsImportados.appendChild(designDiv);
}

// Adicionar um ouvinte para o formulário de adição de design
addDesignForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const file = addDesignForm.querySelector('input[type=file]').files[0];
    const designName = textDesign.value || 'Nome Padrão';

    // Enviar arquivo para o Firebase Storage
    const uploadTask = storage.ref(`designs/${file.name}`).put(file);

    uploadTask.on("state_changed", function(snapshot) {
        // Atualizações de progresso
    }, function(error) {
        console.error("Erro durante o upload:", error);
    }, function() {
        console.log('Upload realizado com sucesso');
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            // Adicionar a informação ao Firebase Database
            designsRef.push({ imageUrl: downloadURL, name: designName });
        });
    });
});

// Adicionar designs existentes do Realtime Database na página
designsRef.on('child_added', function(snapshot) {
    const design = snapshot.val();
    addDesignToPage(design.imageUrl, design.name);
});
