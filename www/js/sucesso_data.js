//Pegando o token da URL
var url_string =window.location.href
var url = new URL(url_string);
var token = url.searchParams.get("token");
var sucessData
async function GetSucessData(){
  try{
    const response = await fetch(`https://emprestimos-back.herokuapp.com/emprestimos/solicitacoes/completas?token=${token}`);
    const data = await response.json();
    sucessData = data;
    RenderClientData();
  }
  catch (error){
    console.error(error);
  }
}

function RenderClientData(){
  var clientName = document.getElementById('clientName');
  var clientPhone = document.getElementById('clientPhone');
  
  var taxaJuros = document.getElementById('taxaJuros')

  var lastCardNumbers = document.getElementById('lastCardNumbers');
  var cardValidade = document.getElementById('cardValidade');

  var parcelas = document.getElementById('parcelas')
  var valorDesejado = document.getElementById('valorDesejado');
  var valorParcela = document.getElementById('valorParcela');
  var valorTotal = document.getElementById('valorTotal');

  clientName.innerHTML = sucessData.userInfos.name;
  clientPhone.innerHTML = sucessData.userInfos.phone;

  taxaJuros.innerHTML = sucessData.calc.tabela.installments[sucessData.calc.parcelas-1].installmentInterest * 100 + "%";

  lastCardNumbers.innerHTML = sucessData.cardInfo.numero.substr(sucessData.cardInfo.numero.length - 4);
  cardValidade.innerHTML = sucessData.cardInfo.validade.substr(2, 7);

  parcelas.innerHTML = sucessData.parcelas;
  valorDesejado.innerHTML = "R$" + sucessData.calc.valor.toFixed(2)
  valorParcela.innerHTML = "R$" + sucessData.calc.valorParcelas.toFixed(2);
  valorTotal.innerHTML = "R$" + sucessData.calc.valorTotal.toFixed(2);

}

function DetalheSolicitation(){
  window.open(`/detalhe-solicitacao.html?token=${token}`, '_self')
}

GetSucessData();