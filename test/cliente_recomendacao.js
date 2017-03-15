"use strict";
var fn = require('../functions/cliente_recomendacao.js');

exports.exec = function(){

   describe('Testes: cliente_recomendacao', function(){

      it('Função que lista as compras de um cliente especifico e suas preferencias', function(done){

         var lista_compras = [{"codigo":"","data":"19-02-2016","cliente":"000.000.000.01","itens":[
                                 {"produto":"Casa Silva Reserva","variedade":"Cabernet Sauvignon","pais":"Chile","categoria":"Tinto","safra":"2014","preco":79},
                                 {"produto":"Casa Silva Reserva","variedade":"Carménère","pais":"Chile","categoria":"Tinto","safra":"2014","preco":79}],"valorTotal":158},
                             {"codigo":"4a7c9be2","data":"22-10-2015","cliente":"000.000.000.01","itens":[
                                 {"codigo":"d3fa29d8eab4","produto":"Wente Reliz Creek Pinot Noir","variedade":"Pinot Noir","pais":"EUA","categoria":"Tinto","safra":"2012","preco":258},
                                 {"codigo":"d3fa29d8eab4","produto":"Wente Reliz Creek Pinot Noir","variedade":"Pinot Noir","pais":"EUA","categoria":"Tinto","safra":"2012","preco":258},
                                 {"codigo":"36b100e1c98e","produto":"Casa Valduga Raízes","variedade":"Merlot","pais":"Brasil","categoria":"Tinto","safra":"2013","preco":55}],"valorTotal":278},
                             {"codigo":"9a639286726e","data":"20-08-2014","cliente":"000.000.000.03","itens":[
                                 {"produto":"Casa Silva Reserva","variedade":"Chardonnay","pais":"Chile","categoria":"Branco","safra":"2016","preco":79},
                                 {"produto":"Casa Silva Reserva","variedade":"Sauvignon Blanc","pais":"Chile","categoria":"Branco","safra":"2015","preco":79},
                                 {"produto":"Casa Silva Gran Reserva","variedade":"Petit Verdot","pais":"Chile","categoria":"Tinto","safra":"2009","preco":120}],"valorTotal":297.7},
                             {"codigo":"2f6d9a4b8b51","data":"04-12-2016","cliente":"000.000.000.04","itens":[],"valorTotal":208},
                             {"codigo":"ab96-e4d940c9710a","data":"08-05-2015","cliente":"000.000.000.04","itens":[],"valorTotal":155},
                             {"codigo":"ebf8ecd864dc","data":"10-10-2016","cliente":"000.000.000.05","itens":[],"valorTotal":566},
                             {"codigo":"bda1ea8cb35d","data":"08-05-2014","cliente":"000.000.000.06","itens":[],"valorTotal":622.8},
                             {"codigo":"29f11851f993","data":"07-10-2016","cliente":"000.000.000.08","itens":[],"valorTotal":324.8},
                             {"codigo":"9211083c4d61","data":"08-11-2016","cliente":"000.000.000.09","itens":[],"valorTotal":324.8},
                             {"codigo":"3f60a4e5518b","data":"12-07-2015","cliente":"000.000.000.10","itens":[],"valorTotal":428.8}];

         var retorno_esperado = [{"produto":"Casa Silva Reserva","variedade":"Cabernet Sauvignon","pais":"Chile","categoria":"Tinto","safra":"2014","preco":79},
                                 {"produto":"Casa Silva Reserva","variedade":"Carménère","pais":"Chile","categoria":"Tinto","safra":"2014","preco":79},
                                 {"codigo":"d3fa29d8eab4","produto":"Wente Reliz Creek Pinot Noir","variedade":"Pinot Noir","pais":"EUA","categoria":"Tinto","safra":"2012","preco":258},
                                 {"codigo":"d3fa29d8eab4","produto":"Wente Reliz Creek Pinot Noir","variedade":"Pinot Noir","pais":"EUA","categoria":"Tinto","safra":"2012","preco":258},
                                 {"codigo":"36b100e1c98e","produto":"Casa Valduga Raízes","variedade":"Merlot","pais":"Brasil","categoria":"Tinto","safra":"2013","preco":55},
                                 {"variedade":["Cabernet Sauvignon","Carménère","Pinot Noir","Pinot Noir","Merlot"],
                                 "categoria":["Tinto","Tinto","Tinto","Tinto","Tinto"],
                                 "pais":["Chile","Chile","EUA","EUA","Brasil"],
                                 "safra":["2014","2014","2012","2012","2013"]}];

         fn.listaComprasCliente(lista_compras, "000.000.000.01")
            .then(retorno => {
               if ( JSON.stringify(retorno) == JSON.stringify(retorno_esperado) ) {
                  done();
               }else{
                  done(new Error("Retorno diferente do esperado"));
               }
            })
            .catch(console.error)
      });
      it('Função que lista os produtos ainda não adquiridos pelo cliente', function(done){


         var lista_compras_cliente = [{"produto":"Casa Silva Reserva","variedade":"Cabernet Sauvignon","pais":"Chile","categoria":"Tinto","safra":"2014","preco":79},
                                      {"produto":"Casa Silva Reserva","variedade":"Carménère","pais":"Chile","categoria":"Tinto","safra":"2014","preco":79}];

         var lista_produtos = [{"produto":"Casa Silva Reserva","variedade":"Cabernet Sauvignon","pais":"Chile","categoria":"Tinto","safra":"2014","preco":79},
                                 {"produto":"Casa Silva Reserva","variedade":"Carménère","pais":"Chile","categoria":"Tinto","safra":"2014","preco":79},
                                 {"codigo":"d3fa29d8eab4","produto":"Wente Reliz Creek Pinot Noir","variedade":"Pinot Noir","pais":"EUA","categoria":"Tinto","safra":"2012","preco":258},
                                 {"codigo":"d3fa29d8eab4","produto":"Wente Reliz Creek Pinot Noir","variedade":"Pinot Noir","pais":"EUA","categoria":"Tinto","safra":"2012","preco":258},
                                 {"codigo":"36b100e1c98e","produto":"Casa Valduga Raízes","variedade":"Merlot","pais":"Brasil","categoria":"Tinto","safra":"2013","preco":55}];

        var retorno_esperado = [{"codigo":"d3fa29d8eab4","produto":"Wente Reliz Creek Pinot Noir","variedade":"Pinot Noir","pais":"EUA","categoria":"Tinto","safra":"2012","preco":258},
                                {"codigo":"d3fa29d8eab4","produto":"Wente Reliz Creek Pinot Noir","variedade":"Pinot Noir","pais":"EUA","categoria":"Tinto","safra":"2012","preco":258},
                                {"codigo":"36b100e1c98e","produto":"Casa Valduga Raízes","variedade":"Merlot","pais":"Brasil","categoria":"Tinto","safra":"2013","preco":55}];


        fn.listaProdutosNaoComprados(lista_compras_cliente, lista_produtos)
         .then(retorno => {
            if (JSON.stringify(retorno) == JSON.stringify(retorno_esperado)) {
               done();
            }else{
               done(new Error("Retorno diferente do esperado"));
            }
         })
         .catch(console.error)
      });
      it('Função que indica produto', function(done){

         var preferencias = {"variedade":["Cabernet Sauvignon","Carménère","Pinot Noir","Pinot Noir","Merlot"],
                              "categoria":["Tinto","Tinto","Tinto","Tinto","Tinto"],
                              "pais":["Chile","Chile","EUA","EUA","Brasil"],
                              "safra":["2014","2014","2012","2012","2013"]};

         var produtos_selecionaveis = [{"codigo":"36b100e1c98e","produto":"Casa Valduga Raízes","variedade":"Merlot","pais":"Brasil","categoria":"Tinto","safra":"2013","preco":55},
                                       {"codigo":"f3fc98c5419b","produto":"Casa Valduga Raízes","variedade":"Cabernet Sauvignon","pais":"Brasil","categoria":"Tinto","safra":"2013","preco":55},
                                       {"codigo":"d3fa29d8eab4","produto":"Wente Reliz Creek Pinot Noir","variedade":"Pinot Noir","pais":"EUA","categoria":"Tinto","safra":"2012","preco":258},
                                       {"codigo":"36b100e1c98e","produto":"Casa Valduga Raízes","variedade":"Merlot","pais":"Brasil","categoria":"Tinto","safra":"2013","preco":55},
                                       {"codigo":"e4d940c9710a","produto":"Casa Valduga Raízes","variedade":"Chardonnay","pais":"Brasil","categoria":"Branco","safra":"2013","preco":55}];

         var retorno_esperado = [{"codigo":"d3fa29d8eab4","produto":"Wente Reliz Creek Pinot Noir","variedade":"Pinot Noir","pais":"EUA","categoria":"Tinto","safra":"2012","preco":258}];


         fn.indicaProduto(produtos_selecionaveis, preferencias)
         .then(retorno => {
            if (JSON.stringify(retorno) == JSON.stringify(retorno_esperado)) {
               done();
            }else{
               done(new Error("Retorno diferente do esperado"));
            }
         })
         .catch(console.error)

      });
    });
}