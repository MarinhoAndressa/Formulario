document.getElementById("cadastroForm").addEventListener("submit", function(event) {
    event.preventDefault(); /* Evita o envio do formulário se houver erros */

    let nome = document.getElementById("nome").value.trim();
    let dataNascimento = document.getElementById("dataNascimento").value;
    let nomepai = document.getElementById("nomepai").value.trim();
    let nomemae = document.getElementById("nomemae").value.trim();
    let cpf = document.getElementById("cpf").value.trim();
    let telefone = document.getElementById("telefone").value.trim();
    let cep = document.getElementById("cep").value.trim();
    let estado = document.getElementById("estado").value.trim();
    let cidade = document.getElementById("cidade").value.trim();
    let bairro = document.getElementById("bairro").value.trim();
    let rua = document.getElementById("rua").value.trim();
    let numero = document.getElementById("numero").value.trim();
    let complemento = document.getElementById("complemento").value.trim();
    let email = document.getElementById("email").value.trim();
    let senha = document.getElementById("senha").value;
    let confirmarSenha = document.getElementById("confirmarSenha").value;
    let maenorIdade = document.getElementById("menorIdade");

    if (nome.length < 3) {
        alert("O nome deve ter pelo menos 3 caracteres.");
        return;
    }

    if (!validarCPF(cpf)) {
        alert("CPF inválido!");
        return;
    }

    if (!validarTelefone(telefone)) {
        alert("Número de telefone inválido!");
        return;
    }

    let idade = calcularIdade(dataNascimento);
    maiorIdade.checked = idade >= 18;

    if (!validarEmail(email)) {
        alert("E-mail inválido!");
        return;
    }

    if (senha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    if (senha !== confirmarSenha) {
        alert("As senhas não conferem.");
        return;
    }

    alert("Cadastro realizado com sucesso!");
});

/* Função para validar CPF */
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ""); /* Remove caracteres não numéricos */
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf[10]);
}

/* Função para validar telefone */

function validarTelefone(telefone) {
    let regex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return regex.test(telefone);
}

/* Função para calcular idade */
function calcularIdade(dataNascimento) {
    let hoje = new Date();
    let nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    let m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;
    return idade;
}

/* Função para validar e-mail */
function validarEmail(email) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

document.getElementById("buscarCep").addEventListener("click", function() {
    let cep = document.getElementById("cep").value.trim();

    if (!validarCEP(cep)) {
        alert("CEP inválido! Use o formato 00000-000.");
        return;
    }

    buscarEndereco(cep);
});

/* Função para validar o formato do CEP */
function validarCEP(cep) {
    let regex = /^[0-9]{5}-?[0-9]{3}$/;
    return regex.test(cep);
}

/* Função para buscar o endereço pelo CEP usando a API ViaCEP */
function buscarEndereco(cep) {
    cep = cep.replace("-", ""); /* Remove o traço para a busca */

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            debugger
            if (data.erro) {
                alert("CEP não encontrado!");
            } else {
                document.getElementById("estado").value = `${data.estado}`;
                document.getElementById("cidade").value = `${data.localidade}`;
                document.getElementById("bairro").value = `${data.bairro}`;
                document.getElementById("rua").value = `${data.logradouro}`;

            }
        })
        .catch(error => {
            alert("Erro ao buscar o CEP. Tente novamente!");
            console.error(error);
        });
}

document.getElementById("dataNascimento").addEventListener("change", function() {
    let dataNascimento = this.value;
    let idade = calcularIdade(dataNascimento);

    let nomePai = document.getElementById("nomePai");
    let nomeMae = document.getElementById("nomeMae");

    if (idade < 18) {
        nomePai.disabled = false;
        nomeMae.disabled = false;
        nomePai.setAttribute("required", "true");
        nomeMae.setAttribute("required", "true");
    } else {
        nomePai.disabled = true;
        nomeMae.disabled = true;
        nomePai.removeAttribute("required");
        nomeMae.removeAttribute("required");
        nomePai.value = "";
        nomeMae.value = "";
    }
});

/* Função para calcular idade com base na data de nascimento */
function calcularIdade(dataNascimento) {
    let hoje = new Date();
    let nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    let mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    return idade;
}

document.getElementById("dataNascimento").addEventListener("change", function () {
    const dataNascimento = this.value;
    const idade = calcularIdade(dataNascimento);

    const divResponsaveis = document.getElementById("responsaveis");
    const nomePai = document.getElementById("nomePai");
    const nomeMae = document.getElementById("nomeMae");

    if (idade < 18) {
        divResponsaveis.style.display = "block";
        nomePai.setAttribute("required", "true");
        nomeMae.setAttribute("required", "true");
    } else {
        divResponsaveis.style.display = "none";
        nomePai.removeAttribute("required");
        nomeMae.removeAttribute("required");
        nomePai.value = "";
        nomeMae.value = "";
    }
});

// Função para calcular idade
function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade;
}


