var userData;


//Pegando informações da URL
var url_string =window.location.href
var url = new URL(url_string);
var tab = url.searchParams.get("tab");
var parc = url.searchParams.get("parc");
var valor = url.searchParams.get("valor");



function Encontrar(text){
  if(text.length <= 10 || text.length >= 12){ //Evitando fazer uma solicitação com números errados ao back
    alert('Erro: CPF Incorreto, não utilize pontos.')
  }else{
    async function getUsers(){
      try{
        const response = await fetch(`http://localhost:3000/emprestimos/clientes?cpf=${text}`);
        const data = await response.json();
        if(data.error === 0){
          userData = data
          CreateUserLabel()
        }else{
          CreateUserNotFound()
        }
      }
      catch (error){
        console.error(error);
      }
    }
    getUsers();
    
  }
}

var app = document.getElementsByClassName('App')[0]

function CreateUserLabel(){
  
  //apagando possivel label anterior.
  var oldUser = document.getElementsByClassName('clientDiv');
  if(oldUser.length === 0){

  }else{
    oldUser[0].remove()
  }

  var clientDiv = document.createElement('div');
  clientDiv.className = "clientDiv";
  var h3 = document.createElement('h3');
  var h2 = document.createElement('h2');
  var h1 = document.createElement('h1');
  var solicitBtn = document.createElement('input');
  solicitBtn.type = "Submit"
  solicitBtn.value = "Solicitar"
  h3.innerHTML = "Cliente Encontrado:"
  h2.innerHTML = userData.cpf1;
  h1.innerHTML = userData.name;


  solicitBtn.addEventListener("click", function(){
    window.open(`/pagamento.html?tab=${tab}&parc=${parc}&valor=${valor}&cpf=${userData.cpf}`, '_self') //gravando opções do usuario no link
  })
  
  app.appendChild(clientDiv)
  clientDiv.appendChild(h3);
  clientDiv.appendChild(h2);
  clientDiv.appendChild(h1);
  clientDiv.appendChild(solicitBtn);


}

function CreateUserNotFound(){
  //apagando possivel label anterior.
  var oldUser = document.getElementsByClassName('clientDiv');
  if(oldUser.length === 0){

  }else{
    oldUser[0].remove()
  }
  var clientDiv = document.createElement('div');
  clientDiv.className = "clientDiv";
  var h1 = document.createElement('h1');
  h1.innerHTML = "Cliente não encontrado!"
  h1.style.color = "#F00"
  clientDiv.appendChild(h1);
  app.appendChild(clientDiv);

}