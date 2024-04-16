const express = require('express');
const fs = require('fs');
const cors = require('cors');

const dadosJogos= require('./data/Jogos.json')


const server = express()

server.use(cors())
server.use(express.json())

server.listen(3000, () => {
    console.log("O servidor está funcionando")
})

server.get('/', (req, res) => {
    return res.json({ mensagem: "Estou funcionando" })
})

//CREATE
server.post('/jogos', (req, res) => {
    const novoJogos = req.body

    if (!novoJogos.nome || !novoJogos.dataLancamento || !novoJogos.descricao || !novoJogos.imagem) {
        return res.status(400).json({ mensagem: "Dados não preenchidos ou incompletos, tente novamente" })
    } else {
        dadosJogos.Jogos.push(novoJogos)
        salvarDadosJogos(dadosJogos)

        return res.status(201).json({ mensagem: "Jogos cadastrado com sucesso" })
    }
})

//READ
server.get('/jogos', (req, res) => {
    return res.json(dadosJogos.Jogos)
})

//UPDATE
server.put('/jogos/:id', (req, res) => {
    const jogosId = parseInt(req.params.id)
    const atualizarJogos = req.body

    const indiceJogos = dadosJogos.Jogos.findIndex(u => u.id === jogosId)

    if (indiceJogos === -1) {
        return res.status(404).json({ mensagem: "Jogo não encontrado" })
    } else {
        dadosJogos.Jogos[indiceJogos].nome = atualizarJogos.nome || dadosJogos.Jogos[indiceJogos].nome

        dadosJogos.Jogos[indiceJogos].Descricao = atualizarJogos.Descricao || dadosJogos.Jogos[indiceJogos].Descricao

        dadosJogos.Jogos[indiceJogos].dataLançamento = atualizarJogos.dataLançamento || dadosJogos.Jogos[indiceJogos].dataLançamento

        dadosJogos.Jogos[indiceJogos].imagem = atualizarJogos.imagem || dadosJogos.Jogos[indiceJogos].imagem

        salvarDadosJogos(dadosJogos)

        return res.status(201).json({ mensagem: "Dados completos, atualização feita com sucesso!" })
    }
})

//DELETE
server.delete('/jogos/:id', (req, res) => {
    const id = parseInt(req.params.id)

    dadosJogos.Jogos = dadosJogos.Jogos.filter(u => u.id !== id)

    salvarDadosJogos(dadosJogos)
    return res.status(200).json({ mensagem: "Jogo excluido com sucesso" })
})

// FUNÇÃO SALVAR DADOS 
function salvarDadosJogos() {
    fs.writeFileSync(__dirname + "/data/Jogos.json", JSON.stringify(dadosJogos, null, 2));
}
