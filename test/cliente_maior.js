"use strict";
var fn = require('../functions/cliente_maior.js');

exports.exec = function(){

   describe('Testes: cliente_maior', function(){

      it('Função que lista as compras por um ano especifico', function(done){

         var lista_compras = [{"codigo":"","data":"19-02-2016","cliente":"000.000.000.01","itens":[],"valorTotal":158},
                             {"codigo":"4a7c9be2","data":"22-10-2015","cliente":"000.000.000.02","itens":[],"valorTotal":278},
                             {"codigo":"9a639286726e","data":"20-08-2014","cliente":"000.000.000.03","itens":[],"valorTotal":297.7},
                             {"codigo":"2f6d9a4b8b51","data":"04-12-2016","cliente":"000.000.000.04","itens":[],"valorTotal":208},
                             {"codigo":"ab96-e4d940c9710a","data":"08-05-2015","cliente":"000.000.000.04","itens":[],"valorTotal":155},
                             {"codigo":"ebf8ecd864dc","data":"10-10-2016","cliente":"000.000.000.05","itens":[],"valorTotal":566},
                             {"codigo":"bda1ea8cb35d","data":"08-05-2014","cliente":"000.000.000.06","itens":[],"valorTotal":622.8},
                             {"codigo":"29f11851f993","data":"07-10-2016","cliente":"000.000.000.08","itens":[],"valorTotal":324.8},
                             {"codigo":"9211083c4d61","data":"08-11-2016","cliente":"000.000.000.09","itens":[],"valorTotal":324.8},
                             {"codigo":"3f60a4e5518b","data":"12-07-2015","cliente":"000.000.000.10","itens":[],"valorTotal":428.8}];

         var retorno_esperado = [{"codigo":"ebf8ecd864dc","data":"10-10-2016","cliente":"000.000.000.05","itens":[],"valorTotal":566},
                                 {"codigo":"29f11851f993","data":"07-10-2016","cliente":"000.000.000.08","itens":[],"valorTotal":324.8},
                                 {"codigo":"9211083c4d61","data":"08-11-2016","cliente":"000.000.000.09","itens":[],"valorTotal":324.8},
                                 {"codigo":"2f6d9a4b8b51","data":"04-12-2016","cliente":"000.000.000.04","itens":[],"valorTotal":208},
                                 {"codigo":"","data":"19-02-2016","cliente":"000.000.000.01","itens":[],"valorTotal":158}];


          fn.listaComprasAno("2016", lista_compras)
            .then(retorno => {
               if ( JSON.stringify(retorno_esperado) == JSON.stringify(retorno) ) {
                  done();
               }else{
                  done(new Error("Retorno diferente do esperado"));
               }
            })
            .catch(console.error);
      });
   });

}