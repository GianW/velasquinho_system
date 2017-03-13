/*jslint node: true */
"use strict"
var funcoes = require('./funcoes');

var dados = require('./dados');

exports.verificaObj = function (arr, procurar) {
   var chave = procurar[0];
   var valor = procurar[1];
   return !!arr.filter(function (el) {
     return el[chave] == valor;
    }).length;
};

exports.retornaObjExiste = function (arr, procurar) {
   var chave = procurar[0];
   var valor = procurar[1];
   var chaveDois = procurar[2];
   var valorDois = procurar[3];

   return arr.filter(function (el) {
      if (chaveDois == undefined) {
         return (el[chave] == valor);
      }else{
         return (el[chave] == valor && el[chaveDois] == valorDois);
      }
    });
};

exports.teste = function (){
   funcoes.mensagem();
};

exports.mensagem = function (){
   console.log('Oláá')
}