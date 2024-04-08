const jogoForm = document.getElementById('jogo-form')
const jogoList = document.getElementById('jogo-list')

function listJogos() {
    fetch('http://localhost:3000/jogos')
        .then(response => response.json())
        .then(data => {
            jogoList.innerHTML = ''
            data.forEach(jogo => {
                const li = document.createElement('li')
                li.innerHTML = `ID: ${jogo.id} - Nome: ${jogo.nome} - Descrição: ${jogo.descricao} - Data de lançamento: ${jogo.dataLancamento} - Imagem: ${jogo.Imagem}`

                const deleteButton = document.createElement('button')
                deleteButton.textContent = 'Excluir'
                deleteButton.addEventListener('click', () => deletejogo(jogo.id))
                li.appendChild(deleteButton)

                const atualizarButton = document.createElement('button')
                atualizarButton.textContent = 'Atualizar'
                atualizarButton.addEventListener('click', () => updatejogo(jogo.id))
                li.appendChild(atualizarButton)

                jogoList.appendChild(li)
            })
        })
        .catch(error => console.error('Erro:', error))
}

// submit (GET)
jogoForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevenção padrão de erros
    //pegando os dados do formulário
    const id = parseInt(document.getElementById('id').value)
    const nome = document.getElementById('nome').value
    const descricao = document.getElementById('descricao').value
    const dataLancamento = parseInt(document.getElementById('dataLancamento').value)
    const imagem = parseInt(document.getElementById('imagem').value)

    fetch('http://localhost:3000/jogo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, nome: nome, descricao: descricao, dataLancamento: dataLancamento, imagem: imagem }),
    })
        .then(response => response.json())
        .then(() => {
            listJogos()
            jogoForm.reset()
        })
        .catch(error => console.error('Erro:', error))
})

function deletejogo(id) {
    fetch(`http://localhost:3000/jogos/${id}`, {
        method: 'DELETE'
    })
        .then(() => listJogos())
        .catch(error => console.error('Erro', error))
}

function updatejogo(id) {

    const id = parseInt(document.getElementById('id').value)
    const nome = document.getElementById('nome').value
    const descricao = document.getElementById('descricao').value
    const dataLancamento = parseInt(document.getElementById('dataLancamento').value)
    const imagem = parseInt(document.getElementById('imagem').value)

    if (nome.trim() === '' && fabricante.trim() === '' && preco == null && quantidade == null) {
        alert("Digite em um(ou mais) campos para prosseguir com a alteração")
    } else {
        fetch(`http://localhost:3000/jogos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: nome, descricao: descricao, dataLancamento: dataLancamento, imagem: imagem }),
        })
            .then(response => response.json())
            .then(() => {
                listJogos()
                jogoForm.reset()
            })
            .catch(error => console.error('Erro:', error))
    }
}

listJogos()