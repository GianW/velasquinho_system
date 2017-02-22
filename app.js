var express = require("express");
var app = express();

var request = require('request');

const clientes = 'https://mockbin.com/bin/b7cf0b01-cc41-4006-a3b7-965c155d2c3b';
const compras  = 'https://mockbin.com/bin/bccf6706-3ae0-44ea-8b12-fc45ae236b04';

var lista_clientes = [];
var lista_compras  = [];
var lista_produtos = [];

app.use(express.static(__dirname + '/public'));

app.get('/clientes', function(req,res){
   res.json(lista_clientes);
});

app.get('/compras', function(req,res){
   res.json(lista_compras);
});


//# 1 - Lista os clientes ordenados pelo valor total de compras
app.get('/clientes-ordem-compra', function(req,res){
   somaComprasCliente(function(data){
      res.json(data);
      res.end();
   });
});

//# 2 - Mostre o cliente com maior compra única no último ano (2016).
app.get('/cliente-maior-compra', function(req,res){
   //refatorar para pegar por parametro
   maiorCompraAno('2016', function(data){
      res.json(data);
      res.end();
   });
});

//# 3 - Liste os clientes mais fiéis.
app.get('/cliente-fiel', function(req,res){
   clienteMaisCompras(function(data){
      console.log('Cliente com mais compras');
      res.json(data);
      res.end();
   });;
});


//# 4 - Recomende um vinho para um determinado cliente a partir do histórico
app.get('/cliente-recomendacao', function(req,res){
   recomendaCliente(function(data){
      console.log('Incidacao de produto');
      res.json(data);
      res.end();
   });
});

module.exports = app;

function recomendaCliente(callback){
   var codCliente = "000.000.000.01";

   var lista_compras_cliente = [];
   var produtos_selecionaveis = [];
   var lista_variedades = [];
   var lista_categoria = [];
   var pontos_variedades = [];

   var execLista = new Promise(
      function(resolve, reject) {
         lista_compras.filter(
            function(elem, i, array){
               if(elem.cliente == codCliente){return true}
            }).map(function(obj,index){
               obj.itens.map(function(obj){
                  lista_compras_cliente.push(obj)
                  //lista de preferencias
                  lista_variedades.push(obj.variedade);
                  lista_categoria.push(obj.categoria);
               }) ;
            })
         resolve('');
      }
   );
   execLista.then(
      function(){
         lista_produtos.map(
            function(obj, index){
               //monta lista com produtos ainda nao comprados pelo cliente
               if(verificaObj(lista_compras_cliente, ['produto', obj.produto]) == false){
                  produtos_selecionaveis.push(obj);
               }
               if(index == (lista_produtos.length - 1)){
                  var variedadeRecomendar = verificaItemQtdMaior(lista_variedades, 'variedade');
                  variedadeRecomendar.then(function(valor){
                     //verifica se existe algum produto com essa variedade que o cliente ainda nao comprou
                     if (verificaObj(produtos_selecionaveis, ['variedade', valor.variedade]) == true) {
                        produtos_selecionaveis.forEach(function(item,index,array){
                           if(item.variedade == valor.variedade){
                              //retorna item indicado
                              console.log('Variedade indicada: ');
                              callback(item);
                           }
                        })
                     }else{
                        //verifica categorias
                        var categoriaRecomendar = verificaItemQtdMaior(lista_categoria, 'categoria');
                        categoriaRecomendar.then(function(retorno){
                           if (verificaObj(produtos_selecionaveis, ['categoria', retorno.categoria]) == true) {
                              produtos_selecionaveis.forEach(function(item,index,array){
                                 if(item.categoria == retorno.categoria){
                                    //retorna item indicado
                                    console.log('Categoria indicada: ');
                                    callback(item);
                                 }
                              })
                           }

                        });
                     }
                  });
               }
            }
         )
      }
   );
}

function verificaItemQtdMaior(arr, tipo){
   return new Promise(function(resolve, reject){
     var listaRetorno = [];

    //percorre as variedades que o usuario consome para verificar recorrencias
    arr.forEach(function(item, index, array){
      if(verificaObj(listaRetorno, [tipo, item]) == false){
         if (tipo == 'variedade') {
            listaRetorno.push({ 'variedade' : item, 'qtd': 1})
         }else{
            listaRetorno.push({ 'categoria' : item, 'qtd': 1})
         }
      }else{
         listaRetorno.forEach(function(obj, i, a){
            if(obj[tipo] == item){
               obj.qtd += 1;
            }
         });
      }
      if (index == (arr.length - 1)) {

         var maior = 0;
         var chave;
         for(var prop in listaRetorno) {
            if(listaRetorno[prop].qtd > maior) {
                maior = listaRetorno[prop].qtd;
                chave = prop;
            }
            if(prop == (listaRetorno.length - 1)){
               resolve(listaRetorno[chave]);
            }
         }
      }
   });
   })
}

function clienteMaisCompras(callback){

   var valor_clientes = [];
   var json_clientes  = [];

   lista_compras.map(function(obj,index){
      if(valor_clientes[obj.cliente]){
         valor_clientes[obj.cliente] += parseFloat(obj.itens.length);
      }else{
         valor_clientes[obj.cliente] = parseFloat(obj.itens.length);
      }
      if (index == (lista_compras.length - 1)) {
          for (var i=0; i< lista_clientes.length; i++){
            var element = {};
            element.nome = lista_clientes[i].nome;
            element.cpf = lista_clientes[i].cpf;
            element.qtd = valor_clientes[lista_clientes[i].cpf.replace("-", ".")];
            json_clientes.push(element);

            if (i == (lista_clientes.length - 1)) {
              json_clientes.sort(function (a, b) {
                  return b.qtd - a.qtd;
              });
              callback(json_clientes[0]);
            }
         }
      }
   })
}

function maiorCompraAno(ano, callback){
   var controle = false;

   var nova_lista = lista_compras.filter(function(elem, i, array){
      var aux = elem.data.split('-');
      if (i == (lista_compras.length - 1)){
         controle = true;
      }
      if (aux[2] == ano){return true}
      else{return false};
   });

   //refatorar para promise
   if(controle){
      nova_lista.sort(function (a, b) {
         return b.valorTotal - a.valorTotal;
      });
      console.log('Maior compra ano: ' + ano);
      callback(nova_lista[0]);
   }
}



function somaComprasCliente(callback){

   var valor_clientes = [];
   var json_clientes  = [];

   lista_compras.map(function(obj,index){
      if(valor_clientes[obj.cliente]){
         valor_clientes[obj.cliente] += parseFloat(obj.valorTotal);
      }else{
         valor_clientes[obj.cliente] = parseFloat(obj.valorTotal);
      }
      if (index == (lista_compras.length - 1)) {
          for (var i=0; i< lista_clientes.length; i++){
            var element = {};
            element.nome = lista_clientes[i].nome;
            element.valor = valor_clientes[lista_clientes[i].cpf.replace("-", ".")];
            json_clientes.push(element);

            if (i == (lista_clientes.length - 1)) {
              json_clientes.sort(function (a, b) {
                  return b.valor - a.valor;
              });
              callback(json_clientes);
            }
         }
      }
   })
}

function verificaObj(arr, procurar) {
   var chave = procurar[0];
   var valor = procurar[1];
   return !!arr.filter(function (el) {
     return el[chave] == valor;
    }).length;
}

function montarListas(){
   console.log('Atualizando listas')
   request(clientes, function (error, response, body) {
      if (!error && response.statusCode == 200) {
         lista_clientes = JSON.parse(body);
      }
   })

   request(compras, function (error, response, body) {
      if (!error && response.statusCode == 200) {
         lista_compras = JSON.parse(body);
         lista_compras.map(function(obj,index){
            obj.itens.map(function(valor){
               if(verificaObj(lista_produtos, ['produto', valor.produto]) == false){
                  lista_produtos.push(valor);
               };
            })
         })
      }
   })

}

montarListas();
setInterval(function(){ montarListas() }, 60000);
