document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const userName = document.getElementById('userName').value;
    const userPassword = document.getElementById('userPassword').value;

    const userData = {
        user_name: userName,
        password: userPassword,
        admin_roles: false
    };

    const fetchRoute = document.getElementById('btnSave').dataset.route;
    const fetchMethod = document.getElementById('btnSave').dataset.method;

    fetch(fetchRoute, {
        method: fetchMethod,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Usuário salvo com sucesso:', data);
        alert('Usuário salvo com sucesso!');
        window.location.href = '/admin/usuarios'
    })
    .catch(error => {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário');
    });
});