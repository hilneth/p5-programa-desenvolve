
# Projeto 5 do Programa Desenvolve

Nesse projeto fizemos uma pequena CLI que recebe um input CEP do usuário e retorna um objeto com o endereço completo.

## Explicação do código

```javascript
const readline = require('readline');
```
Inicialmente importamos a biblioteca readline.

```javascript
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
```

Logo em seguida criamos uma arrow function que é responsavel pelo fetch da api viacep, e da conversão dos dados coletados para um objeto e retorna-lo.

```javascript
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
```

Com a constante rl, criamos uma forma de criar interfaces com o readline.

```javascript
const regex = /^\d{5}-?\d{3}$/;
rl.question('Digite o CEP que deseja buscar: ', async (resposta) => {
  const cep = String(resposta);

  if (!regex.test(resposta)) {
    console.log('CEP inválido. Por favor, insira um CEP no formato XXXXX-XXX ou XXXXXXXX.');
    rl.close();
    return;
  }

  const result = await apiCep(cep);

  let endereco = `${result.logradouro}, ${result.bairro}, ${result.localidade}, ${result.uf}`;
  endereco = endereco.replace(/\s+/g, " ");
  const enderecoFormatado = encodeURIComponent(endereco);
  const linkMaps = `https://www.google.com/maps/search/?api=1&query=${enderecoFormatado}`;
  
  console.log(result);
  console.log(`\nLink no Google Maps:\n${linkMaps}`);
  rl.close();
});
```

Finalmente a função que finaliza e retorna o endereço e o link do google maps do endereço. Utiliza readline question function para receber o input de cep do usuário, verifica o formato com uma regex e retorna os resultados caso tenha sucesso. 