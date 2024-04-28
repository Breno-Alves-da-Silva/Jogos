document.addEventListener('DOMContentLoaded', function () {
    loadJogosList();
    document.getElementById('formAdicionarJogos').addEventListener('submit', function (event) {
        event.preventDefault();
        adicionarJogos();
    });
});



//-------------------------Função de adicionar jogo

function adicionarJogos() {
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nomeJogos').value;
    const imagem = document.getElementById('imagemJogos').value;
    const descricao= document.getElementById('descricaoJogos').value;
    const dataLancamento = document.getElementById('dataLancamentoJogos').value;

    if (!id || !nome || !imagem || !descricao || !dataLancamento) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    fetch('http://localhost:3000/jogos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            nome: nome,
            imagem: imagem,
            descricao: descricao,
            dataLancamento: dataLancamento,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar jogo');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        loadJogosList();
    })
    .catch(error => {
        alert('ID Repetido, tente outro.');
    });
}

function loadJogosList() {
    fetch('http://localhost:3000/jogos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar lista de jogos');
            }
            if (response.headers.get('content-length') === '0') {
                throw new Error('Resposta vazia do servidor');
            }
            return response.json();
        })
        .then(data => displayJogosList(data))
        .catch(error => console.error('Error:', error));
}


//--------------------------Funções para ver, e abrir as informações das Jogos.

function displayJogosList(data) {
    const listaJogos = document.getElementById('listaJogos');
    listaJogos.innerHTML = '';
    data.forEach(jogos => {
        const listItem = document.createElement('div');
        listItem.classList = `Jogos`
        listItem.innerHTML = 
        `
            <img src="${jogos.imagem}" id="iconeJogos">
            <h3 id="texto">${jogos.nome}
        `
        listItem.addEventListener('click', function() {
            ver(jogos.id);
        });
        listaJogos.appendChild(listItem);
    });

    function ver(id) {
        const jogos = data.find(jogos => jogos.id === id);
        if (jogos) {

            const modalM = document.getElementById("dialogJogos")
            modalM.showModal()

            const vish = document.getElementById('quadrado-preto');
            vish.innerHTML = 
            `
            <h4 onclick="sairModal2()">Voltar</h4>
            <h2>Jogo:</h2>
            <div id="dentro">
                <img src="${jogos.imagem}" id="iconeJogos"></a>
                <br>
                <h3>ID: ${id}</p>
                <p>Nome: ${jogos.nome}</p>
                <p>Data de lançamento: ${jogos.dataLancamento}</p>
                <p>Descrição: ${jogos.descricao}</p>
                
            </div>
            <div id="botoes">
                <button type="button" onClick="deletarJogos(${jogos.id})" class="botao">Deletar</button>
                <button type="button" onClick="alterarJogos(${jogos.id}, '${jogos.nome}', '${jogos.imagem}', '${jogos.dataLancamento}', '${jogos.descricao}')" class="botao" id="botaoAlt">Alterar</button>
            </div>
            `;
        }
    }
}

//------------Função de alteraro
function alterarJogos(id, nome, imagem, dataLancamento, descricao) {
    const modalA = document.getElementById("dialogAlt")
    modalA.showModal()

    document.getElementById("idAlt").value = id;
    document.getElementById("nomeJogosAlt").value = nome;
    document.getElementById("imagemJogosAlt").value = imagem;
    document.getElementById("dataLancamentoJogosAlt").value = dataLancamento;
    document.getElementById("descricaoJogosAlt").value = descricao;

    document.getElementById('idAlt').readOnly = true;
}

function alterarJogo() {
    const id = parseInt(document.getElementById('idAlt').value);
    const nome = document.getElementById('nomeJogosAlt').value;
    const imagem = document.getElementById('imagemJogosAlt').value;
    const dataLancamento = document.getElementById('dataLancamentoJogosAlt').value;
    const descricao = document.getElementById('descricaoJogosAlt').value;

    fetch(`http://localhost:3000/jogos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            nome: nome,
            imagem: imagem,
            dataLancamento: dataLancamento,
            descricao: descricao,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar jogo');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        loadJogosList();
    })
    .catch(error => {
        alert('Erro ao adicionar jogo');
    });
}

//-----------Função de Deletar

function deletarJogos(id) {
    fetch(`http://localhost:3000/jogos/${id}`, {
        method: 'DELETE',
    })
}

function sairModal() {
    const modal = document.getElementById("dialogAdd")
    modal.close()
}

function sairModal2() {
    const modalM = document.getElementById("dialogJogos")
    modalM.close()
}

function sairModal3() {
    const modalA = document.getElementById("dialogAlt")
    modalA.close()
}
    
function adicionarModal() {
    const modal = document.getElementById("dialogAdd")
    modal.showModal()
}

   