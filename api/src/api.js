const data = require('./api.json');

const tables = {getTables, userTable, findClient}

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
//Segurança zero mas ok
function findClient(cNumber){
    function clientNumber(user){
      return user.cpf == cNumber
    }
    var client = data.client.find(clientNumber); //encontra os dados do client;
    if(client != undefined){
    }else{
      return {error: {code: 404, message:"Not Found"}};
    }
    return client; //retorna os dados ao front

}




module.exports = tables;