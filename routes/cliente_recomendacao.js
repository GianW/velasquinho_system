var express = require('express');
var dados = require('../dados');
var fn = require('../functions/cliente_recomendacao.js');

var router = express.Router();

router.route('/:cliente')
   .get(function (req, res) {
      var cliente = req.params.cliente;
      recomendaCliente(cliente, function(data){
         res.json(data);
         res.end();
      });
   });

function recomendaCliente(cliente, callback){
   var codCliente = cliente;
   var preferencias = {};

   fn.listaComprasCliente(dados.compras(), codCliente)
      .then(lista_compras_cliente => {
         preferencias = lista_compras_cliente.pop();
         return fn.listaProdutosNaoComprados(lista_compras_cliente, dados.produtos());
      }).then(produtos_selecionaveis => {
         return fn.indicaProduto(produtos_selecionaveis, preferencias);
      }).then(retorno => {
         callback(retorno);
      })
      .catch(console.error);
}

module.exports = router;