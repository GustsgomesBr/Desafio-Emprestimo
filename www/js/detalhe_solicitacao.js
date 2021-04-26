var url_string =window.location.href
var url = new URL(url_string);
var token = url.searchParams.get("token");
var detalhesData;

async function GetDetailsData(){
  try{
    const response = await fetch(`http://localhost:3000/emprestimos/solicitacoes/completas?token=${token}`);
    const data = await response.json();
    detalhesData = data;
    RenderDetails()
  }
  catch (error){
    console.error(error);
  }
}

function RenderDetails(){
  var valorTotal = document.getElementById('valorTotal');
  var valorDepositar = document.getElementById('valorDepositar');

  var fluxoSolicitacao = document.getElementById('fluxoSolicitacao')
  var numeroCartao = document.getElementById('numeroCartao');
  var validadeCartao = document.getElementById('validadeCartao');
  var codigoCartao = document.getElementById('codigoCartao');

  var parcelas = document.getElementById('parcelas');
  var valorParcela = document.getElementById('valorParcela');

  var nomeTabela = document.getElementById('nomeTabela');

  //cliente infos

  var clienteNome = document.getElementById('clienteNome');
  var clienteCPF = document.getElementById('clienteCPF');
  var clienteAgencia = document.getElementById('clienteAgencia');
  var clienteBanco = document.getElementById('clienteBanco');
  var clienteConta = document.getElementById('clienteConta');
  var clienteNConta = document.getElementById('clienteNConta');


  //anexando infos

  valorTotal.innerHTML = "R$" + detalhesData.calc.valor.toFixed(2);
  valorDepositar.innerHTML = "R$" + detalhesData.calc.valor.toFixed(2);

  fluxoSolicitacao.innerHTML = detalhesData.contrato;
  numeroCartao.innerHTML = detalhesData.cardInfo.numero;
  validadeCartao.innerHTML = detalhesData.cardInfo.validade;
  codigoCartao.innerHTML = detalhesData.cardInfo.codigo;

  parcelas.innerHTML = detalhesData.parcelas;
  valorParcela.innerHTML = "R$" + detalhesData.calc.valorParcelas.toFixed(2);

  nomeTabela.innerHTML = detalhesData.calc.tabNome;

  //anexando cliente infos

  clienteNome.innerHTML = detalhesData.userInfos.name;
  clienteCPF.innerHTML = detalhesData.userInfos.cpf1;
  clienteAgencia.innerHTML = detalhesData.userInfos.bank.accountAgency;
  clienteBanco.innerHTML = detalhesData.userInfos.bank.label;
  clienteConta.innerHTML = detalhesData.userInfos.bank.accountTypeLabel;
  clienteNConta.innerHTML = detalhesData.userInfos.bank.agencyNumbers;
  

}


GetDetailsData()


