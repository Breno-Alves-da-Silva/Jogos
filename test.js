document.addEventListener('DOMContentLoaded', function () {
    loadMusicasList();
    document.getElementById('formAdicionarMusica').addEventListener('submit', function (event) {
        event.preventDefault();
        adicionarMusica();
    });
});

//-------------------------Função de adicionar música

function adicionarMusica() {
    const id = document.getElementById('id').value;
    const nome = document.getElementById('nomeMusica').value;
    const imagem = document.getElementById('imagemMusica').value;
    const cantor = document.getElementById('cantorMusica').value;
    const album = document.getElementById('albumMusica').value;

    if (!id || !nome || !imagem || !cantor || !album) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    fetch('http://localhost:3000/api/musicas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            nome: nome,
            imagem: imagem,
            cantor: cantor,
            album: album,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar música');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        loadMusicasList();
    })
    .catch(error => {
        alert('ID Repetido, tente outro.');
    });
}

function loadMusicasList() {
    fetch('http://localhost:3000/api/musicas')
        .then(response => response.json())
        .then(data => displayMusicasList(data))
        .catch(error => console.error('Error:', error));
}

//--------------------------Funções para ver, e abrir as informações das musicas.

function displayMusicasList(data) {
    const listaMusicas = document.getElementById('listaMusicas');
    listaMusicas.innerHTML = '';
    data.forEach(musica => {
        const listItem = document.createElement('div');
        listItem.classList = `musica`
        listItem.innerHTML = 
        `
            <img src="${musica.imagem}" id="iconeMusica">
            <h3 id="texto">${musica.nome}
            <h4 id="texto2">${musica.cantor}
        `
        listItem.addEventListener('click', function() {
            ver(musica.id);
        });
        listaMusicas.appendChild(listItem);
    });

    function ver(id) {
        const musica = data.find(musica => musica.id === id);
        if (musica) {

            const modalM = document.getElementById("dialogMusica")
            modalM.showModal()

            const vish = document.getElementById('quadrado-preto');
            vish.innerHTML = 
            `
            <h4 onclick="sairModal2()">Voltar</h4>
            <h2>Música:</h2>
            <div id="dentro">
                <a href="https://www.youtube.com/results?search_query=${musica.nome} ${musica.cantor}"><img src="${musica.imagem}" id="iconeMusica"></a>
                <br>
                <h3>ID: ${id}</p>
                <p>Nome: ${musica.nome}</p>
                <p>Cantor: ${musica.cantor}</p>
                <p>Álbum: ${musica.album}</p>
                
            </div>
            <div id="botoes">
                <button type="button" onClick="deletarMusica(${musica.id})" class="botao">Deletar</button>
                <button type="button" onClick="alterarMusicas(${musica.id}, '${musica.nome}', '${musica.imagem}', '${musica.cantor}', '${musica.album}')" class="botao" id="botaoAlt">Alterar</button>
            </div>
            `;
        }
    }
}

//------------Função de alterar

function alterarMusicas(id, nome, imagem, cantor, album) {
    const modalA = document.getElementById("dialogAlt")
    modalA.showModal()

    document.getElementById("idAlt").value = id;
    document.getElementById("nomeMusicaAlt").value = nome;
    document.getElementById("imagemMusicaAlt").value = imagem;
    document.getElementById("cantorMusicaAlt").value = cantor;
    document.getElementById("albumMusicaAlt").value = album;


    document.getElementById('idAlt').readOnly = true;
}

function alterarMusica() {
    const id = parseInt(document.getElementById('idAlt').value);
    const nome = document.getElementById('nomeMusicaAlt').value;
    const imagem = document.getElementById('imagemMusicaAlt').value;
    const cantor = document.getElementById('cantorMusicaAlt').value;
    const album = document.getElementById('albumMusicaAlt').value;


    fetch(`http://localhost:3000/api/musicas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            nome: nome,
            imagem: imagem,
            cantor: cantor,
            album: album,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao adicionar música');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        loadMusicasList();
    })
    .catch(error => {
        alert('Erro ao adicionar música.');
    });
    
}

//-----------Função de Deletar

function deletarMusica(id) {
    fetch(`http://localhost:3000/api/musicas/${id}`, {
        method: 'DELETE',
    })
}

//----------Algumas funções pra sair e abrir os modal

function sairModal() {
    const modal = document.getElementById("dialogAdd")
    modal.close()
}

function sairModal2() {
    const modalM = document.getElementById("dialogMusica")
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

/*
-------------------------------------------------------------------------

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerenciamento das Músicas</title>
    <link rel="stylesheet" href="style.css">
    <script src="../src/musicas.js"></script>
</head>

<body>

    <header>
        <div id="pai">
            <img src="../images/Spotify_icon.svg.png" id="icone">
            <h3>Gerenciamento de Musicas</h3>
        </div>
        <div id="filho" onClick="adicionarModal()">
            <h3>Adicionar</h3>
        </div>
    </header>
    <main>
        <div id="listaMusicas"></div>
    </main>

    <dialog id="dialogMusica">
        <div id="quadrado-preto">

        </div>
    </dialog>

<dialog id="dialogAdd">
        <div id="quadrado-preto2">
            <h4 onclick="sairModal()">Voltar</h4>
            <h2>Adicionar uma Música:</h2>
            <form id="formAdicionarMusica">
                <label for="id">ID:</label>
                <input type="text" id="id" name="id" required>
                <label for="nomeMusica">Nome:</label>
                <input type="text" id="nomeMusica" name="nomeMusica" required>
                <label for="imagemMusica">Imagem:</label>
                <input type="text" id="imagemMusica" name="imagemMusica" required>
                <label for="cantorMusica">Cantor:</label>
                <input type="text" id="cantorMusica" name="cantorMusica" required>
                <label for="albumMusica">Álbum:</label>
                <input type="text" id="albumMusica" name="albumMusica" required>
                <button type="button" onclick="adicionarMusica()" class="botao">Adicionar</button>
            </form>
        </div>
</dialog>

    <dialog id="dialogAlt">
        <div id="quadrado-preto3">
            <h4 onclick="sairModal3()">Voltar</h4>

            <form id="formAdicionarMusica">
                <label for="id">ID:</label>
                <input type="text" id="idAlt" name="id" required>
                <label for="nomeMusica">Nome:</label>
                <input type="text" id="nomeMusicaAlt" name="nomeMusica" required>
                <label for="imagemMusica">Imagem:</label>
                <input type="text" id="imagemMusicaAlt" name="imagemMusica" required>
                <label for="cantorMusica">Cantor:</label>
                <input type="text" id="cantorMusicaAlt" name="cantorMusica" required>
                <label for="albumMusica">Álbum:</label>
                <input type="text" id="albumMusicaAlt" name="albumMusica" required>
                <button type="button" onclick="alterarMusica()" class="botao">Alterar</button>
            </form>
        </div>
    </dialog>
</body>

</html>

___________________________________________________________________________
*/
const express = require('express');
const server = express();
const dadosMusicas = require('./data/dadosMusicas.json');
const fs = require('fs');
server.use(express.json());
server.post('/musicas', (req, res) => {
    const novaMusica = req.body;

    novaMusica.id = parseInt(novaMusica.id);

    if (!novaMusica.id || !novaMusica.nome || !novaMusica.imagem || !novaMusica.cantor || !novaMusica.album) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        const musicaExistente = dadosMusicas.Musica.find(musica => musica.id === novaMusica.id);
        if (musicaExistente) {
            return res.status(400).json({ mensagem: "ID já existe, tente novamente com um ID diferente" });
        } else {
            dadosMusicas.Musica.push(novaMusica);
            salvarDadosMusicas(dadosMusicas);
            return res.status(201).json({ mensagem: "Nova música cadastrada com sucesso!" });
        }
    }
});
server.get('/musicas', (req, res) => {
    return res.json(dadosMusicas.Musica);
});
server.put('/musicas/:id', (req, res) => {
    const musicaId = parseInt(req.params.id);
    const atualizarMusica = req.body;
    const idMusica = dadosMusicas.Musica.findIndex(m => m.id === musicaId);

    if (idMusica === -1) {
        return res.status(404).json({ mensagem: "Musica não encontrado :/" });
    } else {
        dadosMusicas.Musica[idMusica].id = atualizarMusica.id || dadosMusicas.Musica[idMusica].id;
        dadosMusicas.Musica[idMusica].nome = atualizarMusica.nome || dadosMusicas.Musica[idMusica].nome;
        dadosMusicas.Musica[idMusica].imagem = atualizarMusica.imagem || dadosMusicas.Musica[idMusica].imagem;
        dadosMusicas.Musica[idMusica].cantor = atualizarMusica.cantor || dadosMusicas.Musica[idMusica].cantor;
        dadosMusicas.Musica[idMusica].album = atualizarMusica.album || dadosMusicas.Musica[idMusica].album;
        salvarDadosMusicas(dadosMusicas);
        return res.json({ mensagem: "Musica atualizado com sucesso!" });
    }
});
server.delete("/musicas/:id", (req, res) => {
    const musicaId = parseInt(req.params.id);
    dadosMusicas.Musica = dadosMusicas.Musica.filter(m => m.id !== musicaId);
    salvarDadosMusicas(dadosMusicas);
    return res.status(200).json({ mensagem: "Musica excluído com sucesso" });
});
function salvarDadosMusicas() {
    fs.writeFileSync(__dirname + '/data/dadosMusicas.json', JSON.stringify(dadosMusicas, null, 2));
}
module.exports = { server, salvarDadosMusicas };
