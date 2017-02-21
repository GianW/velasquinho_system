var express = require("express");
var app = express();

var request = require('request');

const clientes = 'https://mockbin.com/bin/b7cf0b01-cc41-4006-a3b7-965c155d2c3b';
const compras  = 'https://mockbin.com/bin/bccf6706-3ae0-44ea-8b12-fc45ae236b04';

var lista_clientes = [];
var lista_compras = [];

app.use(express.static(__dirname + '/public'));

app.get('/clientes', function(req,res){
   res.json(lista_clientes);
});

app.get('/compras', function(req,res){
   res.json(lista_compras);
});


//# 1 - Lista os clientes ordenados pelo valor total de compras
app.get('/clientes-ordem-compra', function(req,res){
   somaComprasCliente(function(data){
      res.json(data);
      res.end();
   });
});

//# 2 - Mostre o cliente com maior compra única no último ano (2016).
app.get('/cliente-maior-compra', function(req,res){
   maiorCompraAno('2016', function(data){
      res.json(data);
      res.end();
   });
});

//# 3 - Liste os clientes mais fiéis.
app.get('/cliente-fiel', function(req,res){
   clienteMaisCompras(function(data){
      console.log('Cliente com mais compras');
      res.json(data);
      res.end();
   });;
});


//# 4 - Recomende um vinho para um determinado cliente a partir do histórico
app.get('/cliente-recomendacao', function(req,res){
   recomendaCliente();
});

module.exports = app;

function recomendaCliente(){

}

function clienteMaisCompras(callback){

   var valor_clientes = [];
   var json_clientes  = [];

   lista_compras.map(function(obj,index){
      if(valor_clientes[obj.cliente]){
         valor_clientes[obj.cliente] += parseFloat(obj.itens.length);
      }else{
         valor_clientes[obj.cliente] = parseFloat(obj.itens.length);
      }
      if (index == (lista_compras.length - 1)) {
          for (var i=0; i< lista_clientes.length; i++){
            var element = {};
            element.nome = lista_clientes[i].nome;
            element.cpf = lista_clientes[i].cpf;
            element.qtd = valor_clientes[lista_clientes[i].cpf.replace("-", ".")];
            json_clientes.push(element);

            if (i == (lista_clientes.length - 1)) {
              json_clientes.sort(function (a, b) {
                  return b.qtd - a.qtd;
              });
              callback(json_clientes[0]);
            }
         }
      }
   })
}

function maiorCompraAno(ano, callback){
   var controle = false;

   var nova_lista = lista_compras.filter(function(elem, i, array){
      var aux = elem.data.split('-');
      if (i == (lista_compras.length - 1)){
         controle = true;
      }
      if (aux[2] == ano){return true}
      else{return false};
   });

   //refatorar para promise
   if(controle){
      nova_lista.sort(function (a, b) {
         return b.valorTotal - a.valorTotal;
      });
      console.log('Maior compra ano: ' + ano);
      callback(nova_lista[0]);
   }
}



function somaComprasCliente(callback){

   var valor_clientes = [];
   var json_clientes  = [];

   lista_compras.map(function(obj,index){
      if(valor_clientes[obj.cliente]){
         valor_clientes[obj.cliente] += parseFloat(obj.valorTotal);
      }else{
         valor_clientes[obj.cliente] = parseFloat(obj.valorTotal);
      }
      if (index == (lista_compras.length - 1)) {
          for (var i=0; i< lista_clientes.length; i++){
            var element = {};
            element.nome = lista_clientes[i].nome;
            element.valor = valor_clientes[lista_clientes[i].cpf.replace("-", ".")];
            json_clientes.push(element);

            if (i == (lista_clientes.length - 1)) {
              json_clientes.sort(function (a, b) {
                  return b.valor - a.valor;
              });
              callback(json_clientes);
            }
         }
      }
   })
}



function montarListas(){
   console.log('Atualizando listas')
   request(clientes, function (error, response, body) {
      if (!error && response.statusCode == 200) {
         lista_clientes = JSON.parse(body);
      }
   })

   request(compras, function (error, response, body) {
      if (!error && response.statusCode == 200) {
         lista_compras = JSON.parse(body);
      }
   })
}

montarListas();
setInterval(function(){ montarListas() }, 60000);
