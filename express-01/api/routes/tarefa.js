import { Router } from "express";
import tarefaController from "../controllers/tarefaController";

const router = Router();

router.post("/", tarefaController.criar);
router.get("/", tarefaController.listar);
router.get("/:objectId", tarefaController.buscar);
router.put("/:objectId", tarefaController.atualizar);
router.delete("/:objectId", tarefaController.remover);

export default router;