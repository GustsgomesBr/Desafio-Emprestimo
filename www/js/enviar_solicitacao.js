var userSolicitation = {}
var url_string =window.location.href
var url = new URL(url_string);
var tab = url.searchParams.get("tab");
var parc = url.searchParams.get("parc");
var valor = url.searchParams.get("valor");
var cpf = url.searchParams.get('cpf');

userSolicitation.tabela = tab;
userSolicitation.parcelas = parc;
userSolicitation.valor = valor;
userSolicitation.cpf = cpf;
userSolicitation.cardInfo = {}
userSolicitation.token = Math.random().toString(36).substr(2);

function CheckCard(){
  var inputNome = document.getElementById('nomeCartao');
  var inputCartao = document.getElementById('numeroCartao');
  var inputValidade = document.getElementById('validadeCartao');
  var inputCodigo = document.getElementById('codigoCartao');

  if(inputNome.value === "" || inputCartao.value === "" || inputValidade.value === "" || inputCodigo.value === "" || inputCartao.value.length <= 15 || inputCodigo.value.length <= 2 || inputNome.value.length <= 5 || inputValidade.value.length <=4){
    alert('Por Favor, preencha todos os dados do cartão corretamente!');
  }else{
    userSolicitation.cardInfo.nome = inputNome.value;
    userSolicitation.cardInfo.numero = inputCartao.value;
    userSolicitation.cardInfo.validade = inputValidade.value;
    userSolicitation.cardInfo.codigo = inputCodigo.value;
    console.log(userSolicitation)
    PostData();
  }
}


function PostData(){
    async function sendData(){
      try{
        const response = await fetch(`http://localhost:3000/emprestimos/solicitar`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userSolicitation)
        });
        const data = await response.json()
        if(data.resposta === "ok"){
          console.log('Dados enviados com sucesso!');
          window.open(`/resumo-solicitacao.html?token=${userSolicitation.token}`, '_self')
        }

      }
      catch (error){
        console.error(error);
      }
    }
    sendData();    
}