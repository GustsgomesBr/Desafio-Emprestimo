<h3 align="center">
    <a href="https://emprestimos-desafio.netlify.app/">Acessar a demonstração</a>
<h3 >

## 🔖Sobre

O projeto **Desafio-Emprestimo** é um desafio FullStack proposto por uma startup no processo seletivo.

---

## 🚀Tecnologias utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias

- [ExpressJs](https://expressjs.com/pt-br/)
- [HTML5, CSS3 e JS](#)

---

## Como iniciar o projeto

```bash

    # Entrar no diretório
    $ cd api

    # Instalar as dependencias
    $ npm i

    # Iniciar o projeto
    $ npm start
```

---

## 🗃️Informações uteis para navegar no projeto:

## Navegando no Front-End:

  

### Página 1 - Valor Desejado: 
Digite o valor desejado de no miniom 300 e no maximo 10.000.

---
### Página 2 - Tabelas: 
Selecione a linha/tabela que tenha interesse.

---
### Página 3 - Busque o Cliente:

Cliente 1 CPF: 25568725625

Cliente 2 CPF: 22888486252

Preencha o CPF e clique em Solicitar;

---
### Página 4 - Meio de Pagamento:

Apenas "Cartão de Crédito" está disponível

---
### Página 5 - Dados do Cartão:

#### Cliente 1:

Nome: Fellipe da Silva Sauro 

Número Cartão: 3738282246310005

Data de Validade: Janeiro/2028

CVC: 321

---
#### Cliente 2:

Nome: Maria Daniela

Número Cartão: 3784282246310005

Data de Validade: Abril/2025

CVC: 256

---
#### Estes dados não são obrigatórios, apenas uma sugestão.

---

### Página 6 - Revisão de dados e Tipo de Contrato:

Selecione o tipo de contrato: automatico ou manual, revise os dados e clique em concluir.

---
### Página 7 e 8 - Ultimas paginas:

Apenas para revisão, sem interação.

---

## Back-End:
O back-end foi separado em três partes principais; Server.js (setup do servidor) Routes.js (setup das rodas do servidor) e Api.js (funções mais complexas para deixar o Routes.js mais "limpo")

---

### Rotas:
#### /emprestimo:

Esta rota recebe o valor solicitado, confirma se ele é maior de 300 e menor de 10.000 e chama o Api.js para retornar as tabelas.

---

#### /emprestimos/clientes:

Esta rota recebe o CPF e chama o Api.js para retornar o cliente do CPF pesquisado

---

#### /emprestimos/solicitar:

Esta rota recebe todas as informações da solicitação de emprestimo do front-end e escreve na base inProgressSolicitation.json;
retornando enfim apenas um resposta: ok

---

#### /emprestimos/solicitacoes:

Esta rota compara o token do front-end com o token das solicitações em progresso e retorna as informações da solicitação.

---

#### /emprestimos/solicitacoes/concluir:

Esta rota recebe o token do front-end e chama o  Api.js para concluir a solicitação em progresso, apagando-a do banco inProgressSolicitation.json e passando para o banco completeSolicitation.json (banco das solicitações completas).

---

#### /emprestimos/solicitacoes/completas:

Esta ultima rota recebe o token do front-end e retorna as informações completas da solicitação de emprestimo feita.

Desenvolvido com 💜