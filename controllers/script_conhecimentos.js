function incluirItem() {
    const id = document.getElementById('itemDescricao').dataset.id;
    const descricao = document.getElementById('itemDescricao').value;

    const itemData = {
        description: descricao,
        active: true
    };
    let fetchRoute = '/admin/conhecimentos';
    let fetchMethod = 'POST';   
    
    if (id !== undefined && id > 0 && id !== "" && id !== "0") {
        fetchRoute = '/admin/conhecimentos/'+id;
        fetchMethod = 'PUT';              
    }

    fetch(fetchRoute, {
        method: fetchMethod,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(itemData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Conhecimento salvo com sucesso:', data);
        alert('Conhecimento salvo com sucesso!');
        window.location.href = '/admin/conhecimentos'
    })
    .catch(error => {
        console.error('Erro ao salvar conhecimento:', error);
        alert('Erro ao salvar conhecimento');
    });
}

function editItem(id) {
    var rows = document.getElementsByClassName("list-desc");
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].dataset.id == id) {
            var edit = document.getElementById("itemDescricao"); 
            edit.value = rows[i].textContent;
            edit.dataset.id = id;
            edit.focus();
        }    
    }
}

function deleteItem(id) {
    if (id > 0 && confirm('Tem certeza que deseja deletar este conhecimento?')) {     
        fetch('/admin/conhecimentos/'+id, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Conhecimento excluído com sucesso:', id);
            alert('Conhecimento excluído com sucesso!');
            window.location.href = '/admin/conhecimentos'
        })
        .catch(error => {
            console.error('Erro ao excluir conhecimento:', error);
            alert('Erro ao excluir conhecimento');
        });
    }         
}