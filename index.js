import express from "express";
import rotaProfissional from "./rotas/rotaProfissional.js";

const host = "0.0.0.0";
const porta = 4000;

const app = express();

app.use(express.json());

app.use('/profissional', rotaProfissional);

app.listen(porta, host, () => {
    console.log(`Servidor esperando por requisições em http://${host}:${porta}`)
});
