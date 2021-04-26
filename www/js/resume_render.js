var automatico = true;

//Pegando o token da URL
var url_string =window.location.href
var url = new URL(url_string);
var token = url.searchParams.get("token");

var solicitation;

async function GetData(){
  try{
    const response = await fetch(`http://localhost:3000/emprestimos/solicitacoes?token=${token}`);
    const data = await response.json();
    solicitation = data;
    RenderInfos()


  }
  catch (error){
    console.error(error);
  }
}

GetData();

function RenderInfos(){
  var nTable = document.getElementById('nTable');
  var vDesejado = document.getElementById('vDesejado');
  var vtdEmprestimo = document.getElementById('vtdEmprestimo');
  var parcelas = document.getElementById('parcelas');
  var vdParcela = document.getElementById('vdParcela');
  if(solicitation != undefined){
    nTable.innerHTML = solicitation.calc.tabela.name;
    vDesejado.innerHTML = "R$ " +  solicitation.calc.valor.toFixed(2);
    vtdEmprestimo.innerHTML = "R$ " +  solicitation.calc.valorTotal.toFixed(2);
    parcelas.innerHTML = solicitation.calc.parcelas;
    vdParcela.innerHTML = "R$ " + solicitation.calc.valorParcelas.toFixed(2);
    RenderTabela()
  }
}


function RenderTabela(){
  //criando tabela
    var tabelaDiv = document.createElement('div');
    var tabela = document.createElement('table');
    var app = document.getElementsByClassName("App")[0];
    var tabelaTitle = document.createElement('h1');
    tabelaDiv.className = "tables";
    tabelaTitle.innerHTML = solicitation.calc.tabela.name;
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
    for (let f = 0; f < solicitation.calc.tabela.installments.length; f++) {
      //criando os elementos td e o tr
      var tableTr = document.createElement('tr');
      var tableTd1 = document.createElement('td');
      var tableTd2 = document.createElement('td');
      var tableTd3 = document.createElement('td');
      var tableTd4 = document.createElement('td');
      var tableTd5 = document.createElement('td');
      var tableTd6 = document.createElement('td');

      tableTd1.innerHTML = solicitation.calc.tabela.installments[f].id;

      tableTd2.innerHTML = solicitation.calc.tabela.installments[f].installmentInterest * 100;
      tableTd2.innerHTML = tableTd2.innerHTML + '%';

      //calculando o valor por parcela
      tableTd3.innerHTML = solicitation.calc.valor * solicitation.calc.tabela.installments[f].installmentInterest;
      tableTd3.innerHTML = parseFloat(tableTd3.innerHTML) + solicitation.calc.valor;
      tableTd3.innerHTML = parseFloat(tableTd3.innerHTML) / solicitation.calc.tabela.installments[f].installments;
      tableTd3.innerHTML = "R$" + parseFloat(tableTd3.innerHTML).toFixed(2);

      //mostrando o valor total com o juros;
      tableTd4.innerHTML = solicitation.calc.valor * solicitation.calc.tabela.installments[f].installmentInterest;
      tableTd4.innerHTML = parseFloat(tableTd4.innerHTML) + solicitation.calc.valor;
      tableTd4.innerHTML = "R$" + parseFloat(tableTd4.innerHTML).toFixed(2);
      //porcentagem de comissão
      tableTd5.innerHTML = solicitation.calc.tabela.installments[f].comission * 100;
      tableTd5.innerHTML = tableTd5.innerHTML + '%';

      //calculando o valor da porcentagem de comissão
      tableTd6.innerHTML = (solicitation.calc.valor * solicitation.calc.tabela.installments[f].installmentInterest) * solicitation.calc.tabela.installments[f].comission;
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

  function ConcluirSolicitacao(){
    if(automatico){
      solicitation.contrato = "Automático"
    }else{
      solicitation.contrato = "Manual"
    }
    async function sendSolicitacao(){
      try{
        const response = await fetch(`http://localhost:3000/emprestimos/solicitacoes/concluir?token=${solicitation.token}`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(solicitation)
        });
        const data = await response.json()
        if(data.status === "OK!"){
          console.log('Solicitação concluida com sucesso!!');
          window.open(`/sucesso-solicitacao.html?token=${token}`, '_self')
        }

      }
      catch (error){
        console.error(error);
      }
    }
    sendSolicitacao();  
  }



function TipoContrato(option){
  if(option === true){
    automatico = true
  }else{
    automatico = false
  }

  function SetButton(){
    var auto = document.getElementsByClassName('automatico')[0];
    var manu = document.getElementsByClassName('manual')[0];
    if(automatico){
      auto.id = "active"
      manu.id = ""
    }else{
      auto.id = ""
      manu.id = "active"
    }
  }
  SetButton()
}