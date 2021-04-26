const data = require('./api.json');
const solicitationData = require('./inProgressSolicitation.json');
const tables = {getTables, userTable, findClient, findSolicitation, ConcludeSolicitation}
const fs = require('fs');
const basePath = __dirname;

function getTables(){
  return data.rateTable;
}

function userTable(value, table, installments){
  if(table > data.rateTable.length){
    return {error: {code: 404, message: "Table Not Found"}}
  }
  else{

  }
}

function findClient(cNumber){
    function clientNumber(user){
      return user.cpf == cNumber
    }
    var client = data.client.find(clientNumber); //encontra os dados do client;
    if(client != undefined){
      return client; //retorna os dados para a rota
    }else{
      return {error: {code: 404, message:"Not Found"}};
    }
}

function findSolicitation(tNumber){
  function clientToken(user){
    return user.token == tNumber;
  }
  var solicitation = solicitationData.find(clientToken);
  if(solicitation != undefined){
    var calc = calculeClientSolicitation(solicitation.tabela, solicitation.valor, solicitation.parcelas);
    solicitation.calc = calc;
    return solicitation
  }else{
    return {error: {code: 404, message:"Not Found"}};
  } 

}

function calculeClientSolicitation(tabela, valor, parcelas){
  var calculo = {}
  calculo.tabela = data.rateTable[tabela];
  calculo.tabNome = data.rateTable[tabela].name,
  calculo.valor = parseFloat(valor),
  calculo.valorTaxas =  calculo.valor * parseFloat(calculo.tabela.installments[parcelas-1].installmentInterest),
  calculo.valorTotal =  calculo.valorTaxas + calculo.valor,
  calculo.valorParcelas = calculo.valorTotal / parcelas,
  calculo.valorComissao = calculo.valorTaxas * calculo.tabela.installments[parcelas-1].comission,
  calculo.parcelas = parseFloat(parcelas);

  return calculo
}

function ConcludeSolicitation(req, token){
  //adicionando a solicitação completa para o banco de solicitações completas;
  var cpSolicitations = require('./completeSolicitations.json');
  cpSolicitations.push(req);
  let cpJsonFile = JSON.stringify(cpSolicitations)
  fs.writeFile(`${basePath}/completeSolicitations.json`, cpJsonFile, 'utf8', function(error){return error});
  
  //apagando a solicitação do banco de solicitações em progresso
  var ipSolicitation = solicitationData;
  var pos = ipSolicitation.map(function(e){return e.token}).indexOf(token);
  ipSolicitation[pos] = {deleted: "yes", token: "none"}
  let inJsonFile = JSON.stringify(ipSolicitation);
  fs.writeFile(`${basePath}/inProgressSolicitation.json`, inJsonFile, 'utf8', function(error){return error});

  return ({status: "OK!"})
}


module.exports = tables;