# Nações

Esta aplicação lista cards de países com informações disponibilizadas pela [API Graph Countries](https://github.com/lennertVanSever/graphcountries) e permite salvar informações customizadas utilizando a [API Custom Countries](https://github.com/rafaelbitencourt/CustomCountries).

### [Demonstração](https://nationsleague.herokuapp.com/)

## Como funciona

A aplicação busca os países da [API Graph Countries](https://github.com/lennertVanSever/graphcountries) de forma paginada, verifica se há customização na [API Custom Countries](https://github.com/rafaelbitencourt/CustomCountries) para os países retornados e, caso tenha customização, substitui os dados originais pelos dados customizados.
Para os países com customização há uma Flag no Card.
O clique nos Cards dá acesso a mais informações e permite editar, salvar e remover customizações.

## Desenvolvimento

* Aplicação criada com [Create React App](https://github.com/facebook/create-react-app).
* [Apollo Client](https://www.apollographql.com/docs/react/) para as requisições [GraphQL](https://graphql.org/).
* [Material-UI](https://material-ui.com/) para o Design.

## Como utilizar

Requisitos:
* [NodeJS e npm instalados](https://nodejs.org/en/download/)

Passo a passo:
1. Clone este repositório
2. Baixe as dependências, execute `npm install`
3. Inicie a aplicação com `npm start`

Obs.: Caso tenha clonado também a [API Custom Countries](https://github.com/rafaelbitencourt/CustomCountries) e queira utilizá-la, configure a URL no arquivo `src\config\config.json`.
