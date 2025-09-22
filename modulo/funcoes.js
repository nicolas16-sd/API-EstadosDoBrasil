/*************************************************************************************************************************
 * Objetivo: Arquivo de funções para gerenciar a API de estados e cidades
 * Data: 15/09/2025
 * Versão: 1.0
 * Autor: Nicolas dos Santos Durão
 *************************************************************************************************************************/

/*************************************************
 * find() -> retorna apenas um elemento
 * filter() -> retorna vários resultados
 * map() -> retorna uma nova estrutura
 * ***********************************************/


const { request } = require('express')
const dados = require('./estados_cidades.js')
const { json } = require('body-parser')

const MESSAGE_ERRO = {status: false, status_code: 500, development: 'Nicolas dos Santos'}

//Retorna todos os estados
const getAllEstados = function(){

    //Variável de base para o cabeçalho da API
    let message = {status: true, status_code: 200, development: 'Nicolas dos Santos', uf: []}
    
    //Este forEach percorre cada elemento da lista de estados e sua função executa a ação para cada item da lista, devolvendo a sigla de cada item(estado)
    dados.listaDeEstados.estados.forEach(function (item){
        message.uf.push(item.sigla)

        //Ordenando os estados em ordem alfabética
        message.uf.sort()
    })

    //Criação do atributo "quantidade" 
    message.quantidade = message.uf.length


    if(message.uf.length > 0){
        return message //Saída verdadeira (200)
    } else { 
        return MESSAGE_ERRO //Saída falsa (500)
    }
}

//Retorna os estados buscando pela sigla
const getEstadoBySigla = function(sigla){   
    let message = {status: true, status_code: 200, development: 'Nicolas dos Santos', uf: '', descricao: '', capital: '', regiao: ''}

        //Find retorna o único elemento que faz parte da minha condição
        const estado = dados.listaDeEstados.estados.find(item => item.sigla === sigla)

        if(estado){
            message.uf = estado.sigla
            message.descricao = estado.nome
            message.capital = estado.capital
            message.regiao = estado.regiao
            return message
        } else {
            return MESSAGE_ERRO
        }
}

//Retorna a capital buscando pela sigla do estado
const getCapitalBySigla = function(sigla){
    let message = {status: true, status_code: 200, development: 'Nicolas dos Santos', uf: '', descricao: '', capital: ''}

    const capital = dados.listaDeEstados.estados.find(item => item.sigla === sigla)

    if (capital){
        message.uf = capital.sigla
        message.descricao = capital.nome
        message.capital = capital.capital
        return message
    } else {
        return MESSAGE_ERRO
    }
}

//Retorna os estados baseado em sua região
const getEstadosByRegiao = function(regiao){
    let message = {status: true, status_code: 200, development: 'Nicolas dos Santos', resultados: []}

    //Pega a lista completa de estados e filtra apenas os que pertencem á região pedida
    const estados = dados.listaDeEstados.estados.filter(item => item.regiao === regiao)

    //Se o filtro identificar que a região tem uma quantidade de estados maior que 0 ela retorna a mensagem de sucesso
    if(estados.length > 0){
        message.resultados = estados.map(estado => ({
            regiao: estado.regiao,
            uf: estado.sigla,
            descricao: estado.nome
        }))
        return message
    } else {
        return MESSAGE_ERRO
    }
    
}

//Retorna uma lista de estados referente as capitais do país
const getVerifyCapitaisDoPais = function(){
    let message = {status: true, status_code: 200, development: 'Nicolas dos Santos', capitais: []}

    dados.listaDeEstados.estados.forEach(function (item){
        if(item.capital_pais){
            let json = {}

            json.capital_atual = item.capital_pais.capital
            json.uf = item.sigla
            json.descricao = item.nome
            json.capital = item.capital
            json.regiao = item.regiao
            json.capital_pais_ano_inicio = item.capital_pais.ano_inicio
        }
    })
}

//Retorna uma lista de cidades pesquisando pela sigla do estado
const getCidadesBySigla = function(sigla){
    let message = {status: true, status_code: 200, development: 'Nicolas dos Santos'}

    const cidades = dados.listaDeEstados.estados.find(item => item.sigla === sigla)


    if(cidades){
        message.uf = cidades.sigla,
        message.descricao = cidades.nome,

        //Criação do atributo "quantidade_cidades"
        message.quantidade_cidades = cidades.cidades.length,
        //Usando o map para criar uma nova estrutura
        message.cidades = cidades.cidades.map(cidades => cidades.nome)
        return message
    } else {
        return MESSAGE_ERRO
    }
}

console.log(getCidadesBySigla("SP"))

module.exports = {
    getAllEstados,
    getEstadoBySigla,
    getCapitalBySigla,
    getEstadosByRegiao,
    getVerifyCapitaisDoPais,
    getCidadesBySigla
}
