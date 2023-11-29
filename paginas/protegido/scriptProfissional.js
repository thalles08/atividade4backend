const botaoCadastrar = document.getElementById('btCadastrar');
const botaoAtualizar = document.getElementById('btAtualizar');
const botaoExcluir = document.getElementById('btExcluir');
const botaoConfirmar = document.getElementById('btConfirmar');
const botaoCancelar = document.getElementById('btCancelar');

let acao = 'padrao';

mostrarTabelaProfissional();

botaoCadastrar.onclick = () => {
    acao = 'cadastrar';
    habilitarBotoes();
};

botaoAtualizar.onclick = () => {
    acao = 'atualizar';
    habilitarBotoes();
};

botaoExcluir.onclick = () => {
    acao = 'excluir';
    habilitarBotoes();
};

botaoConfirmar.onclick = () => {
    if (validarDados()){
        if (acao === 'cadastrar'){
            incluirProfissional();
        }
        if (acao === 'atualizar'){
            //atualizarProfissional();
        }
        if (acao === 'excluir'){
            if (confirm("Tem certeza que deseja excluir o profissional?")){
                excluirProfissional();
            }
        }
    }    
};

botaoCancelar.onclick = () => {
    limparFormulario();
    acao = 'padrao';
    habilitarBotoes();
};

function habilitarBotoes(){

    if (acao === 'cadastrar' || acao === 'atualizar' || acao === 'excluir'){
        botaoCadastrar.disabled = true;
        botaoAtualizar.disabled = true;
        botaoExcluir.disabled = true;
        botaoConfirmar.disabled = false;
        botaoCancelar.disabled = false;
    } 
    else {
        botaoCadastrar.disabled = false;
        botaoAtualizar.disabled = false;
        botaoExcluir.disabled = false;
        botaoConfirmar.disabled = true;
        botaoCancelar.disabled = true;
    }
}

function validarDados(){
    const form = document.getElementById('formProfissional');
    form.classList.add('was-validated'); // classe bootstrap para exibir o feedback
    if (form.checkValidity()) {
        return true;
    }
    else {
        return false;
    }
}

function limparFormulario(){
    const formProfissional = document.getElementById('formProfissional');
    formProfissional.reset();
    formProfissional.classList.remove('was-validated');
}

function incluirProfissional(){

    // pegar as informações que serão preenchidas no formulário e enviá-las para o backend:

    const cpf = document.getElementById('cpf').value;
    const nome = document.getElementById('nome').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const cep = document.getElementById('cep').value;
    const endereco = document.getElementById('endereco').value;
    const numeroCompl = document.getElementById('numeroCompl').value;
    const bairro = document.getElementById('bairro').value;
    const cidade = document.getElementById('cidade').value;

    // o envio dos dados será feito por meio da api fetch:

    fetch('http://localhost:4000/profissional', {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            cpf:cpf,
            nome:nome,
            dataNascimento:dataNascimento,
            email:email,
            telefone:telefone,
            cep:cep,
            endereco:endereco,
            numeroCompl:numeroCompl,
            bairro:bairro,
            cidade:cidade
        })
    }).then((resposta) => {
        return resposta.json();
    }).then((dados) => {
        if (dados.status){
            mostraMensagem(dados.mensagem + " Profissional cadastrado com o ID: " + dados.id_profissional);
            limparFormulario();
            acao = 'padrao';
            habilitarBotoes();
            mostrarTabelaProfissional();
        } else {
            mostraMensagem(dados.mensagem);
        }
    }).catch((erro) => {
        mostraMensagem('Erro ao cadastrar Profissional: ' + erro.message);
    })
}

function excluirProfissional(){
    id = document.getElementById('id').value;

    fetch('http://localhost:4000/profissional', {
        method: 'DELETE',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    }).then((resposta) => {
        return resposta.json();
    }).then((dados) => {
        if (dados.status){
            mostraMensagem(dados.mensagem);
            limparFormulario();
            acao = 'padrao';
            habilitarBotoes();
            mostrarTabelaProfissional();
        } else {
            mostraMensagem(dados.mensagem);
        }
    }).catch((erro) => {
        mostraMensagem('Erro ao excluir Profissional: ' + erro.message);
    })
}

function mostraMensagem(msg){
    const divMensagem = document.getElementById('mensagem');
    divMensagem.innerHTML = `
        <div class="alert alert-info" role="alert">
        ${msg}
        </div>`;
    setTimeout(() => {
        divMensagem.innerHTML = ''
    }, 8000);

}

function mostrarTabelaProfissional(){
    fetch('http://localhost:4000/profissional', {method: 'GET'})
    .then((resposta) => {
        return resposta.json();
    }).then((dados) => {
        if (Array.isArray(dados)){
            if (dados.length > 0){
                let divTabela = document.getElementById('tabela');
                divTabela.innerHTML = '';
                let tabela = document.createElement('table');
                tabela.classList.add('table', 'table-striped', 'table-hover');
                let cabecalho = document.createElement('thead');
                let corpo = document.createElement('tbody');
                cabecalho.innerHTML = `<tr>
                                        <th>ID</th>
                                        <th>CPF</th>
                                        <th>Nome</th>
                                        <th>Data de Nascimento</th>
                                        <th>e-mail</th>
                                        <th>Telefone</th>
                                        <th>CEP</th>
                                        <th>Endereço</th>
                                        <th>Número / Complemento</th>
                                        <th>Bairro</th>
                                        <th>Cidade</th>
                                        <th>Ações</th>
                                       </tr>`
                tabela.appendChild(cabecalho);
                for (const profissional of dados){
                    let linhaTabela = document.createElement('tr');
                    linhaTabela.innerHTML = `<td>${profissional.id}</td>
                                             <td>${profissional.cpf}</td>
                                             <td>${profissional.nome}</td>
                                             <td>${profissional.dataNascimento}</td>
                                             <td>${profissional.email}</td>
                                             <td>${profissional.telefone}</td>
                                             <td>${profissional.cep}</td>
                                             <td>${profissional.endereco}</td>
                                             <td>${profissional.numeroCompl}</td>
                                             <td>${profissional.bairro}</td>
                                             <td>${profissional.cidade}</td>
                                             <td><button class="btn btn-light btn-sm" onClick = "selecionarProfissional('${profissional.id}', '${profissional.cpf}', '${profissional.nome}', 
                                                '${profissional.dataNascimento}', '${profissional.email}', '${profissional.telefone}', '${profissional.cep}', '${profissional.endereco}', '${profissional.numeroCompl}', '${profissional.bairro}', '${profissional.cidade}')">
                                                 Selecionar
                                                 </button>
                                             </td>`;
                    corpo.appendChild(linhaTabela);
                }
                tabela.appendChild(corpo);
                divTabela.appendChild(tabela);
            }
            else {
                mostraMensagem('Não há profissionais cadastrados.');
            }
        }
        else {
            mostraMensagem(dados.mensagem)
        }
    }).catch((erro) => {
        mostraMensagem('Erro ao enviar a requisição: ' + erro.message);
    })
}

function selecionarProfissional(id, cpf, nome, dataNascimento, email, telefone, cep, endereco, numeroCompl, bairro, cidade){
    document.getElementById('id').value = id;
    document.getElementById('cpf').value = cpf;
    document.getElementById('nome').value = nome;
    document.getElementById('dataNascimento').value = dataNascimento;
    document.getElementById('email').value = email;
    document.getElementById('telefone').value = telefone;
    document.getElementById('cep').value = cep;
    document.getElementById('endereco').value = endereco;
    document.getElementById('numeroCompl').value = numeroCompl;
    document.getElementById('bairro').value = bairro;
    document.getElementById('cidade').value = cidade;

    document.getElementById('btCadastrar').disabled = true;
}

// voltar a aula em 1h12