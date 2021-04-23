const express = require('express');
const routes = express.Router();
const tables = require('./api')


routes.get('/emprestimo', (req, res) => {
  const valor = req.query.valor
  if (valor <= 299 || valor >=10001) { //conferindo se o valor é maior que 300 e menor que 10.000
    return res.status(406).json(); //caso seja menor que 300 ou maior que 10.000 a API retorna o status: 406 - Not Acceptable

  }else{
    return res.json(tables.getTables()) //chamando tables.js para retornar as tabelas
  }

})

routes.post('/emprestimos/selected', (req, res) =>{
  const valor = req.query.valor;
  const tabela = req.query.tabela;
  const parcela = req.query.parcela;
  const result = tables.userTable(valor, tabela, parcela);
  return res.send(result);
})

routes.get('/emprestimos/clientes', (req, res) =>{
  const cpf = req.query.cpf;

  return res.send(tables.findClient(cpf));

})


module.exports = routes;
