var express = require('express');
var dados = require('../dados');
var fn = require('../functions/cliente_ordem.js')

var router = express.Router();

router.route('/')
   .get(function (req, res) {
      somaComprasClientes(dados.compras(), function(data){
         res.json(data);
         res.end();
      });
   });


function somaComprasClientes(compras, callback){
   fn.listaClientesValorTotal(compras)
      .then(lista => { return fn.jsonClientesValorTotal(lista, dados.clientes()); })
      .then(result => {callback(result);})
      .catch(console.error);
}

module.exports = router;