function incluirItem() {
    const id = document.getElementById('itemDescricao').dataset.id;
    const descricao = document.getElementById('itemDescricao').value;

    const itemData = {
        keyword: descricao,
        active: true
    };
    let fetchRoute = '/admin/palavraschave';
    let fetchMethod = 'POST';   
    
    if (id !== undefined && id > 0 && id !== "" && id !== "0") {
        fetchRoute = '/admin/palavraschave/'+id;
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
        console.log('Palavra-chave salva com sucesso:', data);
        alert('Palavra-chave salva com sucesso!');
        window.location.href = '/admin/palavraschave'
    })
    .catch(error => {
        console.error('Erro ao salvar palavra-chave:', error);
        alert('Erro ao salvar palavra-chave');
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
    if (id > 0 && confirm('Tem certeza que deseja deletar esta palavra-chave?')) {     
        fetch('/admin/palavraschave/'+id, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log('Palavra-chave excluída com sucesso:', id);
            alert('Palavra-chave excluída com sucesso!');
            window.location.href = '/admin/palavraschave'
        })
        .catch(error => {
            console.error('Erro ao excluir palavra-chave:', error);
            alert('Erro ao excluir Ppalavra-chave');
        });
    }         
}