import { Router } from "express";
import ProfissionalCtrl from "../controle/ProfissionalCtrl.js";

const rotaProfissional = new Router();
const profCtrl = new ProfissionalCtrl();

rotaProfissional.get('/', profCtrl.consultar)
.post('/', profCtrl.gravar)
.put('/', profCtrl.atualizar)
.patch('/', profCtrl.atualizar)
.delete('/', profCtrl.excluir);

export default rotaProfissional;