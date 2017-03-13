"use strict"
var request = require('request');
var funcoes = require('./funcoes');

const clientes = 'https://mockbin.com/bin/b7cf0b01-cc41-4006-a3b7-965c155d2c3b';
const compras  = 'https://mockbin.com/bin/bccf6706-3ae0-44ea-8b12-fc45ae236b04';

var lista_clientes = [];
var lista_compras  = [];
var lista_produtos = [];

function montarListas(){
   var data = new Date;
   console.log('Atualizando listas: ' + data);
   request(clientes, function (error, response, body) {
      if (!error && response.statusCode == 200) {
         lista_clientes = JSON.parse(body);
      }
   });

   request(compras, function (error, response, body) {
      if (!error && response.statusCode == 200) {
         lista_compras = JSON.parse(body);

         lista_compras.map(function(obj,index){
            obj.itens.map(function(desc){
               if(funcoes.verificaObj(lista_produtos, ['produto', desc.produto]) == false){
                  lista_produtos.push(desc);
               };
            })
         })
      };
   });
}

montarListas();
setInterval(function(){ montarListas() }, 60000);

exports.clientes = function(){
   return lista_clientes;
}

exports.compras = function(){
   return lista_compras;
}

exports.produtos = function(){
   return lista_produtos;
}
