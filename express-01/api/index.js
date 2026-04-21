import "dotenv/config";
import cors from "cors";
import express from "express";

//import models, { sequelize } from "./models";
import routes from "./routes";

const app = express();

app.set("trust proxy", true);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models: null,
    me: null,
  };
  next();
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

//app.use("/session", routes.session);
//app.use("/users", routes.user);
//app.use("/messages", routes.message);
//app.use("/tarefas", routes.tarefa);

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

//sequelize.sync().catch(console.error);

app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  const message = err.message || "Erro interno do servidor";
  res.status(status).json({ error: message });
});

export default app;