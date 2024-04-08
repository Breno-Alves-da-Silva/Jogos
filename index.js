const express = require('express');
const fs = require('fs');
const cors = require('cors');

const dadosCliente = require('./data/Jogos.json')


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
server.post('/medicamento', (req, res) => {
    const novoMedicamento = req.body

    if (!novoMedicamento.nome || !novoMedicamento.fabricante || !novoMedicamento.preco || !novoMedicamento.quantidade) {
        return res.status(400).json({ mensagem: "Dados não preenchidos ou incompletos, tente novamente" })
    } else {
        dadosMedicamento.Medicamento.push(novoMedicamento)
        salvarDadosMedicamento(dadosMedicamento)

        return res.status(201).json({ mensagem: "Medicamento cadastrado com sucesso" })
    }
})

//READ
server.get('/Medicamento', (req, res) => {
    return res.json(dadosMedicamento.Medicamento)
})

//UPDATE
server.put('/medicamento/:id', (req, res) => {
    const medicamentoId = parseInt(req.params.id)
    const atualizarMedicamento = req.body

    const indiceMedicamento = dadosMedicamento.Medicamento.findIndex(u => u.id === medicamentoId)

    if (indiceMedicamento === -1) {
        return res.status(404).json({ mensagem: "Medicamento não encontrado" })
    } else {
        dadosMedicamento.Medicamento[indiceMedicamento].nome = atualizarMedicamento.nome || dadosMedicamento.Medicamento[indiceMedicamento].nome

        dadosMedicamento.Medicamento[indiceMedicamento].fabricante = atualizarMedicamento.fabricante || dadosMedicamento.Medicamento[indiceMedicamento].fabricante

        dadosMedicamento.Medicamento[indiceMedicamento].endereco = atualizarMedicamento.endereco || dadosMedicamento.Medicamento[indiceMedicamento].endereco

        dadosMedicamento.Medicamento[indiceMedicamento].email = atualizarMedicamento.email || dadosMedicamento.Medicamento[indiceMedicamento].email

        dadosMedicamento.Medicamento[indiceMedicamento].telefone = atualizarMedicamento.telefone || dadosMedicamento.Medicamento[indiceMedicamento].telefone

        salvarDadosMedicamento(dadosMedicamento)

        return res.status(201).json({ mensagem: "Dados completos, atualização feita com sucesso!" })
    }
})

//DELETE
server.delete('/medicamento/:id', (req, res) => {
    const id = parseInt(req.params.id)

    dadosMedicamento.Medicamento = dadosMedicamento.Medicamento.filter(u => u.id !== id)

    salvarDadosMedicamento(dadosMedicamento)
    return res.status(200).json({ mensagem: "Medicamento excluido com sucesso" })
})

// FUNÇÃO SALVAR DADOS 
function salvarDadosMedicamento() {
    fs.writeFileSync(__dirname + "/data/Medicamento.json", JSON.stringify(dadosMedicamento, null, 2));
}
