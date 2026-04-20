const { v4: uuidv4 } = require('uuid');

function criarTarefa({ descricao, concluida = false }) {
    return {
        objectId: uuidv4(),
        descricao,
        concluida
    };
}

module.exports = {
    criarTarefa
};