import ProfissionalDAO from "../persistencia/profissionalDAO.js";

export default class Profissional {

    #id
    #cpf
    #nome
    #dataNascimento
    #email
    #telefone
    #cep
    #endereco
    #numeroCompl
    #bairro
    #cidade

    constructor(id, cpf, nome, dataNascimento, email, telefone, cep, endereco, numeroCompl, bairro, cidade) {
        
        this.#id = id;
        this.#cpf = cpf;
        this.#nome = nome;
        this.#dataNascimento = dataNascimento;
        this.#email = email;
        this.#telefone = telefone;
        this.#cep = cep;
        this.#endereco = endereco;
        this.#numeroCompl = numeroCompl;
        this.#bairro = bairro;
        this.#cidade = cidade;

    }

    get id () {
        return this.#id;
    }

    set id (novoId) {
        this.#id = novoId;
    }

    get cpf() {
        return this.#cpf;
    }

    set cpf(novoCpf) {
        this.#cpf = novoCpf;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get dataNascimento() {
        return this.#dataNascimento;
    }

    set dataNascimento(novaDataNascim) {
        this.#dataNascimento = novaDataNascim;
    }

    get email() {
        return this.#email;
    }

    set email(novoEmail) {
        this.#email = novoEmail;
    }

    get telefone() {
        return this.#telefone;
    }

    set telefone(novoTelefone) {
        this.#telefone = novoTelefone;
    }

    get cep() {
        return this.#cep
    }

    set cep(novoCep) {
        this.#cep = novoCep;
    }

    get endereco () {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    get numeroCompl() {
        return this.#numeroCompl;
    }

    set numeroCompl(novoNumeroCompl) {
        this.#numeroCompl = novoNumeroCompl;
    }

    get bairro () {
        return this.#bairro;
    }

    set bairro(novoBairro) {
        this.#bairro = novoBairro;
    }

    get cidade() {
        return this.#cidade;
    }

    set cidade(novaCidade) {
        this.#cidade = novaCidade;
    }

    toJSON() {
        return {
            id: this.id,
            cpf: this.#cpf,
            nome: this.#nome,
            dataNascimento: this.#dataNascimento,
            email: this.#email,
            telefone: this.#telefone,
            cep: this.#cep,
            endereco: this.#endereco,
            numeroCompl: this.#numeroCompl,
            bairro: this.#bairro,
            cidade: this.#cidade
        };
    }

    async gravar() {
        const profDAO = new ProfissionalDAO();
        await profDAO.gravar(this);
    }

    async atualizar() {
        const profDAO = new ProfissionalDAO();
        await profDAO.atualizar(this);
    }

    async excluir() {
        const profDAO = new ProfissionalDAO();
        await profDAO.excluir(this);
    }

    async consultar() {
        const profDAO = new ProfissionalDAO();
        return await profDAO.consultar();
    }


}