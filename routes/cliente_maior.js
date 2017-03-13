var express = require('express');
var dados = require('../dados');

var router = express.Router();

router.route('/')
   .get(function (req, res) {
      maiorCompraAno('2016', function(data){
         res.json(data);
         res.end();
      });
   });



function maiorCompraAno (ano, callback){
   listaComprasAno(ano, dados.compras())
      .then(lista => {callback(lista[0])})
      .catch(console.error);
};


const listaComprasAno = (ano, lista_compras) => {

   var nova_lista = lista_compras.filter(function(elem, i, array){
      var aux = elem.data.split("-");
      if (aux[2] == ano){return true}
   });

   //ordena lista de forma decrescente pelo valor total da compra
   nova_lista.sort(function (a, b) {
      return b.valorTotal - a.valorTotal;
   });

   return Promise.resolve(nova_lista);
};

module.exports = router;