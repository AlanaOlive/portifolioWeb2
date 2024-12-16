function toggleDropdown() {
    const dropdown = document.getElementById('dropdown-menu');
    dropdown.classList.toggle('show'); // Alterna a classe 'show'
}

function closeDropdown() {
    const dropdown = document.getElementById('dropdown-menu');
    dropdown.classList.remove('show'); // Remove a classe 'show' para fechar o menu
}

// Adiciona um evento para fechar o menu se clicar fora dele
document.addEventListener('click', function (event) {
    const dropdown = document.getElementById('dropdown-menu');
    const menuButton = document.querySelector('.menu-button');

    // Verifica se o clique foi fora do botão do menu e do dropdown
    if (!menuButton.contains(event.target) && !dropdown.contains(event.target)) {
        closeDropdown(); // Fecha o menu
    }
});

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

function editStudent(studentName) {
    const newName = prompt("Digite o novo nome para " + studentName, studentName);
    if (newName) {
        // atualizar a lista de alunos
        alert(studentName + " foi editado para " + newName);
        // Atualiza a lista no DOM se necessário
    }
}

function deleteStudent(studentName) {
    const confirmDelete = confirm("Tem certeza que deseja excluir " + studentName + "?");
    if (confirmDelete) {
        // remover o aluno da lista
        alert(studentName + " foi excluído!");
        // Remova o aluno do DOM se necessário
    }
}