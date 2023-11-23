const botaoCadastrar = document.getElementById('btCadastrar');
const botaoAtualizar = document.getElementById('btAtualizar');
const botaoExcluir = document.getElementById('btExcluir');
const botaoConfirmar = document.getElementById('btConfirmar');
const botaoCancelar = document.getElementById('btCancelar');

botaoCadastrar.onclick = () => {
    habilitarBotoes('cadastrar');
};

botaoAtualizar.onclick = () => {
    habilitarBotoes('atualizar');
};

botaoExcluir.onclick = () => {
    habilitarBotoes('excluir');
};

botaoConfirmar.onclick = () => {
    if (validarDados()){
        alert('Operação realizada com sucesso!');
        limparFormulario();
        habilitarBotoes('padrao');
    }    
};

botaoCancelar.onclick = () => {
    limparFormulario();
    habilitarBotoes('padrao');
};

function habilitarBotoes(acao){

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

function incluirUsuario(){

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
            'Content-Type':'aolication/json'
        },
        body:{
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
        }
    }).then((resposta) => {
        return resposta.json();
    }).then((dados) => {
        if (dados.status){

        } else {

        }
    }).catch((erro) => {

    })
}

function mostraMensagem(msg){


}

// voltar a aula em 1h12