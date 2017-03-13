var express = require('express');
var dados = require('../dados');

var router = express.Router();

router.route('/')
   .get(function (req, res) {
      somaComprasCliente(function(data){
         res.json(data);
         res.end();
      });
   });


const jsonClientesValorTotal = (lista, lista_clientes) =>{

   var json_clientes  = [];

   lista_clientes.map(function(obj, index){
      var element = {};
      element.nome = lista_clientes[index].nome;
      element.valor = lista[lista_clientes[index].cpf.replace("-", ".")];
      json_clientes.push(element);
   });

  json_clientes.sort(function (a, b) {
   return b.valor - a.valor;
  });

  return Promise.resolve(json_clientes);
};


const listaClientesValorTotal = (lista_compras) => {

   var valor_clientes = [];

   lista_compras.map(function(obj,index){
      if(valor_clientes[obj.cliente]){
         valor_clientes[obj.cliente] += parseFloat(obj.valorTotal);
      }else{
         valor_clientes[obj.cliente] = parseFloat(obj.valorTotal);
      }
   });
  return Promise.resolve(valor_clientes);
};




function somaComprasCliente(callback){
   listaClientesValorTotal(dados.compras())
      .then(lista => { return jsonClientesValorTotal(lista, dados.clientes()); })
      .then(result => {callback(result)})
      .catch(console.error)
};


module.exports = router;