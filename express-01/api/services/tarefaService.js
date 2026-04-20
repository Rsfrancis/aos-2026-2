const { v4: uuidv4 } = require('uuid');

const tarefas = [];

exports.criar = (dados) => {
    if (!dados.descricao) {
        throw new Error("Descrição é obrigatória");
    }

    const novaTarefa = {
        objectId: uuidv4(),
        descricao: dados.descricao,
        concluida: dados.concluida ?? false
    };

    tarefas.push(novaTarefa);
    return novaTarefa;
};

exports.listar = () => {
    return tarefas;
};

exports.buscarPorId = (objectId) => {
    return tarefas.find(t => t.objectId === objectId);
};

exports.atualizar = (objectId, dados) => {
    const tarefa = tarefas.find(t => t.objectId === objectId);

    if (!tarefa) return null;

    if (dados.descricao !== undefined) {
        tarefa.descricao = dados.descricao;
    }

    if (dados.concluida !== undefined) {
        tarefa.concluida = dados.concluida;
    }

    return tarefa;
};

exports.remover = (objectId) => {
    const index = tarefas.findIndex(t => t.objectId === objectId);

    if (index === -1) return false;

    tarefas.splice(index, 1);
    return true;
};