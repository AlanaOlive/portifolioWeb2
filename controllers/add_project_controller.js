
document.getElementById('projectForm').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const projectName = document.getElementById('projectName').value;
    const projectSummary = document.getElementById('projectSummary').value;
    const projectLink = document.getElementById('projectLink').value;

    const keywordCheckboxes = document.querySelectorAll('#dropdownMenuButton + .dropdown-menu input:checked');
    const keywords = Array.from(keywordCheckboxes).map(checkbox => checkbox.value);

    const authorCheckboxes = document.querySelectorAll('#dropdownAuthorsButton + .dropdown-menu input:checked');
    const authors = Array.from(authorCheckboxes).map(checkbox => checkbox.value);

    const projectData = {
        project_name: projectName,
        project_resume: projectSummary,
        project_link: projectLink,
        keywords: keywords, 
        authors: authors 
    };

    fetch('http://localhost:3000/cadastroProjetos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData) 
    })
    .then(response => response.json()) 
    .then(data => {
        console.log('Projeto criado com sucesso:', data);
        alert('Projeto cadastrado com sucesso!'); 
    })
    .catch(error => {
        console.error('Erro ao cadastrar projeto:', error);
        alert('Erro ao cadastrar o projeto'); 
    });
});
