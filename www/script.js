var tabelas;
var valorSolicitado;
var totalValue = [];

var clientSolicitation = {
  tabela: "",
  parcelas: ""
}
function Calcular(value){ 
  if(value <= 299.99 || value >= 10000.1){ //evitando valores abaixo de 300 e acima de 10.000 mesmo o back-end tendo essa defesa.
    alert('error: Valor não autorizado!')
  }else{
    async function getTables(){
      try{
        const response = await fetch(`http://localhost:3000/emprestimo?value=${value}`);
        const data = await response.json();
        tabelas = data;
        valorSolicitado = parseFloat(value);
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
  //apagando tabelas antigas
  var oldTabelas = document.getElementsByClassName('tables');
  if(oldTabelas.length === 0){

  }else{
    let qndTabelas = oldTabelas.length
    for (let a = 0; a < qndTabelas; a++) {
      oldTabelas[0].remove();
    }
  }


  //criando novas tabelas
  for (let i = 0; i < tabelas.length; i++) {
    var tabelaDiv = document.createElement('div');
    var tabela = document.createElement('table');
    var app = document.getElementsByClassName("App")[0];
    var tabelaTitle = document.createElement('h1');
    tabelaDiv.className = "tables";
    tabelaTitle.innerHTML = tabelas[i].name;
    app.appendChild(tabelaDiv);
    tabelaDiv.appendChild(tabelaTitle)
    tabelaDiv.appendChild(tabela);
    //criando a primeira linha da tabela;
    var tr = document.createElement('tr');
    var th1 = document.createElement('th');
    var th2 = document.createElement('th');
    var th3 = document.createElement('th');
    var th4 = document.createElement('th');
    var th5 = document.createElement('th');
    var th6 = document.createElement('th');
    tabela.appendChild(tr);
    th1.innerHTML = "Parcelas";
    th2.innerHTML = "Juros das Parcela";
    th3.innerHTML = "Valor Parcela";
    th4.innerHTML = "Valor Total";
    th5.innerHTML = "Comissão %";
    th6.innerHTML = "Comissão Parceiro"
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    tr.appendChild(th5);
    tr.appendChild(th6);
    for (let f = 0; f < tabelas[i].installments.length; f++) {
      //criando os elementos td e o tr
      var tableTr = document.createElement('tr');
      var tableTd1 = document.createElement('td');
      var tableTd2 = document.createElement('td');
      var tableTd3 = document.createElement('td');
      var tableTd4 = document.createElement('td');
      var tableTd5 = document.createElement('td');
      var tableTd6 = document.createElement('td');

      tableTr.id = tabelas[i].installments[f].id;
      tableTr.setAttribute('tabela', i);
      tableTr.className = "clickableTr";
      tableTd1.innerHTML = tabelas[i].installments[f].id;

      tableTd2.innerHTML = tabelas[i].installments[f].installmentInterest * 100;
      tableTd2.innerHTML = tableTd2.innerHTML + '%';

      //calculando o valor por parcela
      tableTd3.innerHTML = valorSolicitado * tabelas[i].installments[f].installmentInterest;
      tableTd3.innerHTML = parseFloat(tableTd3.innerHTML) + valorSolicitado;
      tableTd3.innerHTML = parseFloat(tableTd3.innerHTML) / tabelas[i].installments[f].installments;
      tableTd3.innerHTML = "R$" + parseFloat(tableTd3.innerHTML).toFixed(2);

      //mostrando o valor total com o juros;
      tableTd4.innerHTML = valorSolicitado * tabelas[i].installments[f].installmentInterest;
      tableTd4.innerHTML = parseFloat(tableTd4.innerHTML) + valorSolicitado;
      tableTd4.innerHTML = "R$" + parseFloat(tableTd4.innerHTML).toFixed(2);
      totalValue.push([])
      totalValue[i].push(tableTd4.innerHTML)
      //porcentagem de comissão
      tableTd5.innerHTML = tabelas[i].installments[f].comission * 100;
      tableTd5.innerHTML = tableTd5.innerHTML + '%';

      //calculando o valor da porcentagem de comissão
      tableTd6.innerHTML = (valorSolicitado * tabelas[i].installments[f].installmentInterest) * tabelas[i].installments[f].comission;
      tableTd6.innerHTML = "R$" + parseFloat(tableTd6.innerHTML).toFixed(2);

      //colocando todos os TDs dentro do Tr e o tr dentro da tabela index;
      tabela.appendChild(tableTr);
      tableTr.appendChild(tableTd1);
      tableTr.appendChild(tableTd2);
      tableTr.appendChild(tableTd3);
      tableTr.appendChild(tableTd4);
      tableTr.appendChild(tableTd5);
      tableTr.appendChild(tableTd6);

    }
  }
  let clickableRow = document.getElementsByClassName('clickableTr');
  for (let g = 0; g < clickableRow.length; g++) {
    clickableRow[g].addEventListener("click", function (){
      var numTabela = clickableRow[g].getAttribute('tabela');
      clientSolicitation.tabela = numTabela;
      clientSolicitation.parcelas = clickableRow[g].id;
      CreateFooter(tabelas[numTabela].name, clickableRow[g].id, totalValue[numTabela][clickableRow[g].id-1])
    })
  }
}

function CreateFooter(table, parcelas, valorParcela){
  var footer = document.createElement('footer');
  var nomeh1 = document.createElement('h1');
  var parcelah1 = document.createElement('h1');
  var valorParcelah1 = document.createElement('h1');

  nomeh1.innerHTML = `Nome: ${table}`
  parcelah1.innerHTML = `Parcelas: ${parcelas}`
  valorParcelah1.innerHTML = `Valor da Parcela: ${valorParcela}`
  var submitBtn = document.createElement('input');
  submitBtn.type = "Submit";
  submitBtn.value = "Avançar";

  document.body.appendChild(footer);
  footer.appendChild(nomeh1);
  footer.appendChild(parcelah1);
  footer.appendChild(valorParcelah1);
  footer.appendChild(submitBtn);

  submitBtn.addEventListener("click", function(){
    window.open(`?tab=${clientSolicitation.tabela}&parc=${clientSolicitation.parcelas}`, '_self')
  })

}