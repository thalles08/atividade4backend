import Profissional from "../modelo/profissional.js";
import Conectar from "./conexao.js";

export default class ProfissionalDAO {

    async gravar(profissional) {
        if (profissional instanceof Profissional) {
            const conexao = await Conectar();
            const sql = "INSERT INTO profissional (cpf, nome, dataNascimento, email, telefone, cep, endereco, numeroCompl, bairro, cidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const parametros = [profissional.cpf, profissional.nome, profissional.dataNascimento, profissional.email, profissional.telefone, profissional.cep, profissional.endereco, profissional.numeroCompl, profissional.bairro, profissional.cidade];
            const resultado = await conexao.query(sql, parametros);
            profissional.id = resultado[0].insertId;
            global.poolConexoes.releaseConnection(conexao);            
        }
    }

    async atualizar(profissional) {
        if (profissional instanceof Profissional) {
            const conexao = await Conectar();
            const sql = "UPDATE profissional SET cpf = ?, nome = ?, dataNascimento = ?, email = ?, telefone = ?, cep = ?, endereco = ?, numeroCompl = ?, bairro = ?, cidade = ? WHERE id = ?";
            const parametros = [profissional.cpf, profissional.nome, profissional.dataNascimento, profissional.email, profissional.telefone, profissional.cep, profissional.endereco, profissional.numeroCompl, profissional.bairro, profissional.cidade, profissional.id];
            await conexao.query(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(profissional) {
        if (profissional instanceof Profissional) {
            const conexao = await Conectar();
            const sql = "DELETE FROM profissional WHERE id = ?";
            const parametros = [profissional.id];
            await conexao.query(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(profissional) {
        let listaProfissionais = [];        
        const conexao = await Conectar();
        const sql = "SELECT * FROM profissional ORDER BY nome";
        const [rows, fields] = await conexao.query(sql);
        for (const registro of rows) {
            const profissional = new Profissional(registro.id, registro.cpf, registro.nome, registro.dataNascimento, registro.email, registro.telefone, registro.cep, registro.endereco, registro.numeroCompl, registro.bairro, registro.cidade);
            listaProfissionais.push(profissional);
        }
        global.poolConexoes.releaseConnection(conexao);
        return listaProfissionais;
    }

}