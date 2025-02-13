

    // Dados do projeto para edição
    const projectData = {
        projectName: "Projeto Exemplo",
        projectSummary: "Este é um resumo do projeto de exemplo.",
        projectLink: "https://github.com/projetoexemplo",
        keywords: ["Inovação", "Software"],
        authors: ["Autor 1", "Autor 3"]
    };

    // Função para preencher os dados no formulário
    function fillForm(data) {
        document.getElementById('projectName').value = data.projectName;
        document.getElementById('projectSummary').value = data.projectSummary;
        document.getElementById('projectLink').value = data.projectLink;

        // Selecionando as palavras-chave e autores
        const keywordCheckboxes = document.querySelectorAll('#dropdownMenuButton + .dropdown-menu input');
        keywordCheckboxes.forEach(checkbox => {
            if (data.keywords.includes(checkbox.value)) {
                checkbox.checked = true;
            }
        });

        const authorCheckboxes = document.querySelectorAll('#dropdownAuthorsButton + .dropdown-menu input');
        authorCheckboxes.forEach(checkbox => {
            if (data.authors.includes(checkbox.value)) {
                checkbox.checked = true;
            }
        });
    }

    // Função para alternar entre visualização e edição
    function toggleEditMode(isEditMode) {
        const formElements = document.querySelectorAll('#projectForm input, #projectForm textarea, #dropdownMenuButton, #dropdownAuthorsButton');
        formElements.forEach(element => {
            element.disabled = !isEditMode;
        });

        const submitBtn = document.getElementById('submitBtn');
        const editBtn = document.getElementById('editBtn');

        if (isEditMode) {
            submitBtn.style.display = 'inline-block';
            editBtn.style.display = 'none';
        } else {
            submitBtn.style.display = 'none';
            editBtn.style.display = 'inline-block';
        }
    }

    // Preencher o formulário com dados para edição
    fillForm(projectData);

    // Ao clicar no botão "Editar", habilita o formulário para edição
    document.getElementById('editBtn').addEventListener('click', () => {
        toggleEditMode(true);
    });

    // Ao submeter o formulário (para salvar), você pode enviar os dados de forma apropriada
    document.getElementById('projectForm').addEventListener('submit', (event) => {
        event.preventDefault();
        
        const formData = {
            projectName: document.getElementById('projectName').value,
            projectSummary: document.getElementById('projectSummary').value,
            projectLink: document.getElementById('projectLink').value,
            keywords: Array.from(document.querySelectorAll('#dropdownMenuButton + .dropdown-menu input:checked')).map(checkbox => checkbox.value),
            authors: Array.from(document.querySelectorAll('#dropdownAuthorsButton + .dropdown-menu input:checked')).map(checkbox => checkbox.value)
        };

        console.log('Dados para salvar ou editar:', formData);
        // Aqui você pode realizar o envio dos dados via fetch ou outra forma
    });

    // Inicialmente o formulário é em modo visualização
    toggleEditMode(false);
