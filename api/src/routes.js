const express = require('express');
const { userTable } = require('./api');
const routes = express.Router();
const tables = require('./api')




routes.get('/emprestimos/:valor', (req, res) => {
  const {valor} = req.params;

  if (valor <= 299 || valor >=10001) { //conferindo se o valor é maior que 300 e menor que 10.000
    return res.status(406).json(); //caso seja menor que 300 ou maior que 10.000 a API retorna o status: 406 - Not Acceptable

  }else{
    return res.send(tables.getTables()) //chamando tables.js para retornar as tabelas
  }

})

routes.post('/emprestimos/select/:valor/:tabela/:parcela', (req, res) =>{
  const {valor, tabela, parcela} = req.params;
  const result = tables.userTable(valor, tabela, parcela);
  return res.status(result).json()

})

routes.get('/emprestimos/clientes/:cpf', (req, res) =>{
  const {cpf} = req.params;
  return res.send(tables.findClient(cpf));

})


module.exports = routes;
