const readline = require('readline');

const apiCep = async (cep) => {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

  if (!response.ok) {
    throw new Error("Erro ao buscar o CEP");
  }

  const data = await response.json();

  if (data.erro) {
    throw new Error("CEP não encontrado");
  }
  return data

};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const regex = /^\d{5}-?\d{3}$/;
rl.question('Digite o CEP que deseja buscar: ', async (resposta) => {
  const cep = String(resposta);

  if (!regex.test(resposta)) {
    console.log('CEP inválido. Por favor, insira um CEP no formato XXXXX-XXX ou XXXXXXXX.');
    rl.close();
    return;
  }

  const result = await apiCep(cep);

  console.log(result);
  rl.close();
});