document.getElementById('projectForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const projectName = document.getElementById('projectName').value;
    const projectSummary = document.getElementById('projectSummary').value;
    const projectLink = document.getElementById('projectLink').value;

    const keywordCheckboxes = document.querySelectorAll('#dropdownMenuButton + .dropdown-menu input:checked');
    const keywords = Array.from(keywordCheckboxes).map(checkbox => checkbox.id);

    const authorCheckboxes = document.querySelectorAll('#dropdownAuthorsButton + .dropdown-menu input:checked');
    const authors = Array.from(authorCheckboxes).map(checkbox => checkbox.id);

    const projectData = {
        project_name: projectName,
        project_resume: projectSummary,
        project_link: projectLink,
        keywords_projects: keywords,
        authors_project: authors
    };

    const fetchRoute = document.getElementById('btnSave').dataset.route;
    const fetchMethod = document.getElementById('btnSave').dataset.method;

    fetch(fetchRoute, {
        method: fetchMethod,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Projeto salvo com sucesso:', data);
            alert('Projeto salvo com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao cadastrar projeto:', error);
            alert('Erro ao cadastrar o projeto');
        });
});