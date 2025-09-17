/*************************************************************************************************************************
 * Objetivo: Arquivo de funções para gerenciar a API de estados e cidades
 * Data: 15/09/2025
 * Versão: 1.0
 * Autor: Nicolas dos Santos Durão
 *************************************************************************************************************************/

const { request } = require('express')
const dados = require('./estados_cidades.js')

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

        dados.listaDeEstados.estados.forEach(function (item){
            if(item.sigla == sigla){
                message.uf = item.sigla
                message.descricao = item.nome
                message.capital = item.capital
                message.regiao = item.regiao
            }
        })

        if(dados){
            return message
        } else {
            return MESSAGE_ERRO
        }
}

//Retorna a capital buscando pela sigla do estado
const getCapitalBySigla = function(sigla){

}

//Retorna os estados baseado em sua região
const getEstadosByRegiao = function(regiao){

}

//Retorna uma lista de estados referente as capitais do país
const getVerifyCapitaisDoPais = function(){

}

//Retorna uma lista de cidades pesquisando pela sigla do estado
const getCidadesBySigla = function(sigla){

}

module.exports = {
    getAllEstados,
    getEstadoBySigla
}
