var express = require('express');
var dados = require('../dados');
var fn = require('../functions/clientes_fieis.js');

var router = express.Router();

router.route('/')
   .get(function (req, res) {
      clienteMaisCompras(function(data){
         res.json(data);
         res.end();
      });
   });

function clienteMaisCompras(callback){
   fn.listaClientesQtdCompras(dados.compras())
      .then(lista => { return fn.jsonClientesQtdCompras(dados.clientes(), lista); })
      .then(result => {callback(result);})
      .catch(console.error);
}

module.exports = router;