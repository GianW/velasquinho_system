"use strict";
var fn = require('../functions/clientes_fieis.js');

exports.exec = function(){
   describe('Testes: clientes_fieis', function(){

      it('Função de soma valor total por cliente', function(done){

        var lista_compras = [{cliente : '000.000.000.01', valorTotal : 10, itens : [{},{}]},
                             {cliente : '000.000.000.02', valorTotal : 20, itens : [{},{}]},
                             {cliente : '000.000.000.01', valorTotal : 30, itens : [{}]}];

        var retorno_esperado = [];
        retorno_esperado['000.000.000.01'] = 3;
        retorno_esperado['000.000.000.02'] = 2;

        fn.listaClientesQtdCompras(lista_compras)
          .then(retorno => {
              if (JSON.stringify(retorno) == JSON.stringify(retorno_esperado)){
                done();
              }else{
                done(new Error("Retorno diferente do esperado"));
              }
          })
          .catch(console.error)

      });
      it('Normatizar a lista com total em formato JSON valido', function(done){

         var lista_clientes = [{"id":1,"nome":"Vinicius","cpf":"000.000.000-01"},
                               {"id":2,"nome":"Marcos","cpf":"000.000.000-02"},
                               {"id":3,"nome":"Joel","cpf":"000.000.000-03"}];

          var lista_totais = [];
          lista_totais['000.000.000.01'] = 3;
          lista_totais['000.000.000.02'] = 2;

          var retorno_esperado = [ { nome: 'Vinicius', cpf: '000.000.000-01', qtd: 3 },
                                    { nome: 'Marcos', cpf: '000.000.000-02', qtd: 2 } ];

         fn.jsonClientesQtdCompras(lista_clientes, lista_totais)
            .then(retorno => {
               if( JSON.stringify(retorno) == JSON.stringify(retorno_esperado) ){
                  done();
               }else{
                  done(new Error("Retorno diferente do esperado"));
               }
            })
            .catch(console.error)
      });
   });
}
