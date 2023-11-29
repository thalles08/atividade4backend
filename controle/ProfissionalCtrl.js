import Profissional from "../modelo/profissional.js";

export default class ProfissionalCtrl {
    
    // Método POST do HTTP
    gravar(requisicao, resposta){
        resposta.type('aplication/json'); // responder no formato JSON
        
        if (requisicao.method === 'POST'){
            const dados = requisicao.body;

            const cpf = dados.cpf;
            const nome = dados.nome;
            const dataNascimento = dados.dataNascimento;
            const email = dados.email;
            const telefone = dados.telefone;
            const cep = dados.cep;
            const endereco = dados.endereco;
            const numeroCompl = dados.numeroCompl;
            const bairro = dados.bairro;
            const cidade = dados.cidade;

            if (cpf && nome && dataNascimento && email && telefone && cep && endereco && numeroCompl && bairro && cidade){
                const profissional = new Profissional(0, cpf, nome, dataNascimento, email, telefone, cep, endereco, numeroCompl, bairro, cidade);
                profissional.gravar().then(()=>{
                    resposta.json({
                        status: true,
                        mensagem: "Profissional gravado com sucesso!",
                        id_profissional: profissional.id
                    });
                }).catch((erro)=>{
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível registrar o Profissional: " + erro.message
                    });
                });
            }
            else {
                resposta.json({
                    status: false,
                    mensagem: "Os campos cpf, nome, dataNascimento, email, telefone, cep, endereco, numeroCompl, bairro, cidade são obrigatórios!"
                })
            }          
        }
        else{
            resposta.json({
                status: false,
                mensagem: "Metodo HTTP inválido! Para gravar um Profissional, utilize o método POST."
            });
        }
    }

    // Método PUT OU PATCH do HTTP
    atualizar(requisicao, resposta){
        resposta.type('aplication/json'); // responder no formato JSON
        
        if (requisicao.method === 'PUT' || requisicao.method === "PATCH"){
            const dados = requisicao.body;

            const id = dados.id;
            const cpf = dados.cpf;
            const nome = dados.nome;
            const dataNascimento = dados.dataNascimento;
            const email = dados.email;
            const telefone = dados.telefone;
            const cep = dados.cep;
            const endereco = dados.endereco;
            const numeroCompl = dados.numeroCompl;
            const bairro = dados.bairro;
            const cidade = dados.cidade;

            if (id && cpf && nome && dataNascimento && email && telefone && cep && endereco && numeroCompl && bairro && cidade){
                const profissional = new Profissional(id, cpf, nome, dataNascimento, email, telefone, cep, endereco, numeroCompl, bairro, cidade);
                profissional.atualizar().then(()=>{
                    resposta.json({
                        status: true,
                        mensagem: "Profissional atualizado com sucesso!",
                        id_profissional: profissional.id
                    });
                }).catch((erro)=>{
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível atualizar o Profissional: " + erro.message
                    });
                });
            }
            else {
                resposta.json({
                    status: false,
                    mensagem: "Os campos id, cpf, nome, dataNascimento, email, telefone, cep, endereco, numeroCompl, bairro, cidade são obrigatórios!"
                })
            }          
        }
        else{
            resposta.json({
                status: false,
                mensagem: "Metodo HTTP inválido! Para atualizar um Profissional, utilize o método PUT ou PATCH."
            });
        }
    }

    // Método DELETE do HTTP
    excluir(requisicao, resposta){
        resposta.type('aplication/json'); // responder no formato JSON
        
        if (requisicao.method === 'DELETE'){
            const dados = requisicao.body;

            const id = dados.id;
            
            if (id){
                const profissional = new Profissional(id);
                profissional.excluir().then(()=>{
                    resposta.json({
                        status: true,
                        mensagem: "Profissional excluído com sucesso!",                        
                    });
                }).catch((erro)=>{
                    resposta.json({
                        status: false,
                        mensagem: "Não foi possível excluir o Profissional: " + erro.message
                    });
                });
            }
            else {
                resposta.json({
                    status: false,
                    mensagem: "O campo id é obrigatório!"
                })
            }          
        }
        else{
            resposta.json({
                status: false,
                mensagem: "Metodo HTTP inválido! Para excluir um Profissional, utilize o método DELETE."
            });
        }
    }

    // Método GET do HTTP
    consultar(requisicao, resposta){
        resposta.type('aplication/json'); // responder no formato JSON
        
        if (requisicao.method === 'GET'){
            const profissional = new Profissional(0);
            profissional.consultar().then((listaProfissionais)=>{
                resposta.json(listaProfissionais);
            }).catch((erro)=>{
                resposta.json({
                    status: false,
                    mensagem: "Não foi possível obter o Profissional: " + erro.message
                });
            });
        }        
        else{
            resposta.json({
                status: false,
                mensagem: "Metodo HTTP inválido! Para consultar um Profissional, utilize o método GET."
            });
        }
    }
}