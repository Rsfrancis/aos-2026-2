const { v4: uuidv4 } = require('uuid');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.query(`CREATE TABLE IF NOT EXISTS tarefas (
  "objectId" VARCHAR PRIMARY KEY,
  descricao VARCHAR NOT NULL,
  concluida BOOLEAN DEFAULT false
)`);

exports.criar = async (dados) => {
  if (!dados.descricao) throw new Error("Descrição é obrigatória");
  const id = uuidv4();
  const { rows } = await pool.query(
    `INSERT INTO tarefas ("objectId", descricao, concluida) VALUES ($1, $2, $3) RETURNING *`,
    [id, dados.descricao, dados.concluida ?? false]
  );
  return rows[0];
};

exports.listar = async () => {
  const { rows } = await pool.query(`SELECT * FROM tarefas`);
  return rows;
};

exports.buscarPorId = async (objectId) => {
  const { rows } = await pool.query(`SELECT * FROM tarefas WHERE "objectId" = $1`, [objectId]);
  return rows[0] || null;
};

exports.atualizar = async (objectId, dados) => {
  const { rows } = await pool.query(
    `UPDATE tarefas SET descricao = COALESCE($1, descricao), concluida = COALESCE($2, concluida) WHERE "objectId" = $3 RETURNING *`,
    [dados.descricao, dados.concluida, objectId]
  );
  return rows[0] || null;
};

exports.remover = async (objectId) => {
  const { rows } = await pool.query(`DELETE FROM tarefas WHERE "objectId" = $1 RETURNING *`, [objectId]);
  return rows.length > 0;
};