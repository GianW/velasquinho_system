"use strict";
var fn = require('../functions/cliente_ordem.js');

exports.exec = function(){

   describe('Testes: cliente_ordem', function(){

      it('Função de soma valor total por cliente', function(done){

         var lista_compras = [{cliente : '000.000.000.01', valorTotal : 10},
                              {cliente : '000.000.000.02', valorTotal : 20},
                              {cliente : '000.000.000.01', valorTotal : 30}];

         fn.listaClientesValorTotal(lista_compras)
            .then(retorno => {
               if(retorno['000.000.000.01'] == 40 && retorno['000.000.000.02'] == 20){
                  done();
               }else{
                  done(new Error("Retorno diferente do esperado"));
               }
            })
            .catch(console.error);
      });

      it('Normatizar a lista com total em formato JSON valido', function(done){

         var lista_clientes = [{"id":1,"nome":"Vinicius","cpf":"000.000.000-01"},
                               {"id":2,"nome":"Marcos","cpf":"000.000.000-02"},
                               {"id":3,"nome":"Joel","cpf":"000.000.000-03"}];

         var lista_totais = [];

         lista_totais['000.000.000.01'] = 40;
         lista_totais['000.000.000.02'] = 20;

         var valor_esperado = [ { nome: 'Vinicius', valor: 40 },{ nome: 'Marcos', valor: 20 } ];

         fn.jsonClientesValorTotal(lista_totais, lista_clientes)
            .then(retorno => {
               if (JSON.stringify(retorno) == JSON.stringify(valor_esperado)) {
                  done();
               }else{
                  done(new Error("Retorno diferente do esperado"));
               }
            })
            .catch(console.error)

      });
   });
}
