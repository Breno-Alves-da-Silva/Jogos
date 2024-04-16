const jogoForm = document.getElementById('jogo-form')
const jogoList = document.getElementById('jogo-list')
const openButton = document.getElementById('open-dialog');
const dialog = document.getElementById('meu-dialogo');
const closeButton = document.getElementById('fechar-dialogo');
const imagemDialog = document.getElementById("imagem-dialog");

function listJogos() {
    fetch('http://localhost:3000/jogos')
    .then(response => response.json())
    .then(data => {
      data.forEach(imagem => {
            const img = document.createElement('img');
            img.src = imagem.imagem;
            img.addEventListener('click', function () {
                imagemDialog.showModal(imagem.nome,imagem.dataLancamento,imagem.descricao);
            });
            jogoList.appendChild(img);
        });
    })
    .catch(error => console.error('Erro ao obter dados das imagens:', error));
}

// // submit (GET)
 jogoForm.addEventListener('submit', (e) => {
     e.preventDefault() 

     const id = parseInt(document.getElementById('id').value)
     const nome = document.getElementById('nome').value
     const descricao = document.getElementById('descricao').value
     const dataLancamento = document.getElementById('dataLancamento').value
     const imagem = document.getElementById('imagem').value

     fetch('http://localhost:3000/jogos', {
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
 });

function deletejogo(id) {
    fetch(`http://localhost:3000/jogos/${id}`, {
        method: 'DELETE'
    })
        .then(() => listJogos())
        .catch(error => console.error('Erro', error))
}

function updatejogo(idum) {

    const id = parseInt(document.getElementById('id').value)
    const nome = document.getElementById('nome').value
    const descricao = document.getElementById('descricao').value
    const dataLancamento = document.getElementById('dataLancamento').value
    const imagem = document.getElementById('imagem').value

    if (nome.trim() === '' && descricao.trim() === '' && dataLancamento.trim() === '' && imagem.trim() === '') {
        alert("Digite em um(ou mais) campos para prosseguir com a alteração")
    } else {
        fetch(`http://localhost:3000/jogos/${idum}`, {
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


openButton.addEventListener('click', () => {
    dialog.showModal();
});

closeButton.addEventListener('click', () => {
    dialog.close();
});
   
listJogos()