const service = require('../services/tarefaService');

exports.criar = (req, res) => {
    try {
        const tarefa = service.criar(req.body);
        res.status(201).json(tarefa);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

exports.listar = (req, res) => {
    res.json(service.listar());
};

exports.buscar = (req, res) => {
    const tarefa = service.buscarPorId(req.params.objectId);

    if (!tarefa) {
        return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json(tarefa);
};

exports.atualizar = (req, res) => {
    const tarefa = service.atualizar(req.params.objectId, req.body);

    if (!tarefa) {
        return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json(tarefa);
};

exports.remover = (req, res) => {
    const ok = service.remover(req.params.objectId);

    if (!ok) {
        return res.status(404).json({ erro: "Tarefa não encontrada" });
    }

    res.json({ mensagem: "Removido com sucesso" });
};