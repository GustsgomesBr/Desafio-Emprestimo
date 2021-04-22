var tabelas;
var tabelasAmostra = false;

function Calcular(value){ 
  if(value <= 299.99 || value >= 10000.1){ //evitando valores abaixo de 300 e acima de 10.000 mesmo o back-end tendo essa defesa.
    alert('error: Valor não autorizado!')
  }else{
    async function getTables(){
      try{
        const response = await fetch(`http://localhost:3000/emprestimo?value=${value}`);
        const data = await response.json();
        tabelas = data;
        CreateTables();
      }
      catch (error){
        console.error(error);
      }
    }
    getTables();
    
  }
}

function CreateTables(){
  tabelasAmostra = true;
  for (let i = 0; i < tabelas.length; i++) {
    for (let f = 0; f < tabelas[i].installments.length; f++) {
      var tabelaDiv = document.createElement('div');
      tabelaDiv.class = "tabelas";
      var tabela = document.createElement('table');
      
    }
    
  }
}