const pessoas = ['Mario', 'Amanda', 'Ranger Azul'];

const output = pessoas.filter((pessoa) => {
  const termToFilerNormalized = 'A'.toLowerCase();
  const pessoaNormalized = pessoa.toLowerCase();
  return pessoaNormalized.includes(termToFilerNormalized);
});

console.log(output);
