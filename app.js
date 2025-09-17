/*************************************************************************************************************************
 * Objetivo: endPoints referentes a API de estados e cidades
 * Data: 15/09/2025
 * Versão: 1.0
 * Autor: Nicolas dos Santos Durão
 * 
 * Observações: Instalações do Express, Cors, Body Parser
 * npm install express --save
 * npm install cors --save
 * npm install body-parser --save
 *************************************************************************************************************************/

//Impotrt das dependências da API
const express = require('express') //Responsável pela API
const cors = require('cors') //Responsável pelas permissões da API (App)
const bodyParser = require('body-parser') //Responsável por gerenciar a chegada dos dados da API com o Front

const dados = require('./modulo/funcoes.js')

//Retorna a porta do servidor atual ou colocamos uma porta local
const PORT = process.PORT || 8080

//Criando uma instância de uma classe do Express 
const app = express()

//Configuração de permissões
app.use((request, response, next) => {
    response.header('Acess-Control-Allow-Origin', '*') //Servidor de Origem da API
    response.header('Acess-Control-Allow-Methods', 'GET') //Verbos permitidos na API

    //Carrega as configurações no CORS da API
    app.use(cors())
    next()//Próximo, carregar os próximos endpoints
}) 

//request -> chegada de dados da API
//response -> retorno de dados da API

//ENDPOINTS
app.get('/v1/estados', function(request, response) {
    //Pesquisa na função de estados
     let estados = dados.getAllEstados()

     response.status(estados.status_code)
     response.json(estados)
})

app.get('/v1/estado/regiao/:id', function(request, response){
    let sigla =  request.query.uf
    let estado = request.query.estado
    let regiao = request.query.regiao
    let id = request.params.id
    console.log(sigla)
    console.log(estado)
    console.log(regiao)
    console.log(id)
})

app.get('/v1/estado/:uf', function(req, res){
    let estado = dados.getEstadoBySigla()

    res.status(estado.status_code)
    res.json(estado)
})

//Start da Api
app.listen(PORT, function(){
    console.log('API aguardando requisições')
})