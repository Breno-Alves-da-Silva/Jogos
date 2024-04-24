const express = require('express');
const server = express();
const dadosJogos = require('./data/Jogos.json');
const fs = require('fs');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json')  ;

server.use(express.json());
server.use(cors());

server.use(express.json());
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.listen(3000, () => {
    console.log("O servidor está funcionando")
})

server.post('/jogos', (req, res) => {
    const novoJogos = req.body;

    novoJogos.id = parseInt(novoJogos.id);

    if (!novoJogos.id || !novoJogos.nome || !novoJogos.imagem || !novoJogos.descricao || !novoJogos.dataLancamento) {
        return res.status(400).json({ mensagem: "Dados incompletos, tente novamente" });
    } else {
        const jogosExistente = dadosJogos.Jogos.find(jogos => jogos.id === novoJogos.id);
        if (jogosExistente) {
            return res.status(400).json({ mensagem: "ID já existe, tente novamente com um ID diferente" });
        } else {
            dadosJogos.Jogos.push(novoJogos);
            salvarDadosJogos(dadosJogos);
            return res.status(201).json({ mensagem: "Novo jogo cadastrada com sucesso!" });
        }
    }
});
server.get('/jogos', (req, res) => {
    return res.json(dadosJogos.jogos);
});

server.put('/jogos/:id', (req, res) => {
    const jogosId = parseInt(req.params.id);
    const atualizarJogos = req.body;
    const idJogos = dadosJogos.jogos.findIndex(m => m.id === jogosId);

    if (idJogos === -1) {
        return res.status(404).json({ mensagem: "Jogos não encontrado :/" });
    } else {
        dadosJogos.jogos[idJogos].id = atualizarJogos.id || dadosJogos.jogos[idJogos].id;
        dadosJogos.jogos[idJogos].nome = atualizarJogos.nome || dadosJogos.jogos[idJogos].nome;
        dadosJogos.jogos[idJogos].imagem = atualizarJogos.imagem || dadosJogos.jogos[idJogos].imagem;
        dadosJogos.jogos[idJogos].descricao = atualizarJogos.descricao || dadosJogos.jogos[idJogos].descricao;
        dadosJogos.jogos[idJogos].dataLancamento = atualizarJogos.dataLancamento || dadosJogos.jogos[idJogos].dataLancamento;
        salvarDadosJogos(dadosJogos);
        return res.json({ mensagem: "Jogos atualizado com sucesso!" });
    }
});
server.delete("/jogos/:id", (req, res) => {
    const jogosId = parseInt(req.params.id);
    dadosJogos.jogos = dadosJogos.jogos.filter(m => m.id !== jogosId);
    salvarDadosJogos(dadosJogos);
    return res.status(200).json({ mensagem: "Jogo excluído com sucesso" });
});
function salvarDadosJogos() {
    fs.writeFileSync(__dirname + '/data/Jogos.json', JSON.stringify(dadosJogos, null, 2));
}
module.exports = { server, salvarDadosJogos };
