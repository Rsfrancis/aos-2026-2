const service = require('../services/tarefaService');

exports.criar = async (req, res) => {
    try {
        const tarefa = await service.criar(req.body);
        res.status(201).json(tarefa);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
};

exports.listar = async (req, res) => {
    res.json(await service.listar());
};

exports.buscar = async (req, res) => {
    const tarefa = await service.buscarPorId(req.params.objectId);
    if (!tarefa) {
        return res.status(404).json({ erro: "Tarefa não encontrada" });
    }
    res.json(tarefa);
};

exports.atualizar = async (req, res) => {
    const tarefa = await service.atualizar(req.params.objectId, req.body);
    if (!tarefa) {
        return res.status(404).json({ erro: "Tarefa não encontrada" });
    }
    res.json(tarefa);
};

exports.remover = async (req, res) => {
    const ok = await service.remover(req.params.objectId);
    if (!ok) {
        return res.status(404).json({ erro: "Tarefa não encontrada" });
    }
    res.json({ mensagem: "Removido com sucesso" });
};