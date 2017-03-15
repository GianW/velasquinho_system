var express = require('express');
var dados = require('../dados');
var fn = require('../functions/cliente_maior.js');

var router = express.Router();

router.route('/')
   .get(function (req, res) {
      maiorCompraAno('2016', function(data){
         res.json(data);
         res.end();
      });
   });

function maiorCompraAno (ano, callback){
   fn.listaComprasAno(ano, dados.compras())
      .then(lista => { callback(lista[0]); })
      .catch(console.error);
}

module.exports = router;