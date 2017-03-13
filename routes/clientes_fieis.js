var express = require('express');
var dados = require('../dados');

var router = express.Router();

router.route('/')
   .get(function (req, res) {
      clienteMaisCompras(function(data){
         res.json(data);
         res.end();
      });;
   });



function clienteMaisCompras(callback){
   listaClientesQtdCompras(dados.compras())
      .then(lista => { return jsonClientesQtdCompras(lista) })
      .then(result => {callback(result)})
      .catch(console.error);
};

const listaClientesQtdCompras = (lista_compras) => {

   var valor_clientes = [];

   lista_compras.map(function(obj,index){
      if(valor_clientes[obj.cliente]){
         valor_clientes[obj.cliente] += parseFloat(obj.itens.length);
      }else{
         valor_clientes[obj.cliente] = parseFloat(obj.itens.length);
      }
   });

  return Promise.resolve(valor_clientes);
};


const jsonClientesQtdCompras = (lista) =>{

   var json_clientes  = [];
   var lista_clientes = dados.clientes();

   lista_clientes.map(function(obj, index){
      var element = {};
      element.nome = lista_clientes[index].nome;
      element.cpf  = lista_clientes[index].cpf;
      element.qtd  = lista[lista_clientes[index].cpf.replace("-", ".")];
      json_clientes.push(element);
   });

  json_clientes.sort(function (a, b) {
   return b.qtd - a.qtd;
  });

  return Promise.resolve(json_clientes);
};



module.exports = router;