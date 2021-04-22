const data = require('./api.json');
var userSolicitation = {
    clientId: 0,
    userValue: 0,
    selectedTable: 0,
    SelectedInstallments: 0,
  }

const tables = {getTables, userTable, findClient}

function getTables(){
  return data.rateTable;
}

function userTable(value, table, installments){
  if(table > data.rateTable.length){
    return {error: {code: 404, message: "Table Not Found"}}
  }
  else{
    userSolicitation.userValue = value;
    userSolicitation.selectedTable = table;
    userSolicitation.SelectedInstallments = installments;
    return userSolicitation
  }
}
//Segurança zero mas ok
function findClient(cNumber){
    function clientNumber(user){
      return user.cpf == cNumber
    }
    var client = data.client.find(clientNumber); //encontra os dados do client;
    if(client != undefined){
      userSolicitation.clientId = client.id;
    }else{
      return {error: {code: 404, message:"Not Found"}};
    }
    console.log(userSolicitation)
    return client; //retorna os dados ao front

}




module.exports = tables;