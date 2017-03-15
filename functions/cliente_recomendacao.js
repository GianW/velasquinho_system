var funcoes = require('../funcoes');

/*
Recebe: Lista de compras,
        codigo do cliente (cpf)
Retorna: Lista de compras realizadas pelo cliente, na ultima posição do array
         retorna objeto contendo as preferencias de compra
*/
exports.listaComprasCliente = function (lista_compras, codCliente) {

   var lista_compras_cliente = [];

   var objPreferencias = {
      variedade : [],
      categoria : [],
      pais : [],
      safra : []
   };

   lista_compras.filter(function(elem, i, array){
      if(elem.cliente == codCliente){return true;}
   }).map(function(obj,index){
      obj.itens.map(function(obj){
         lista_compras_cliente.push(obj);

         //Usa a leitura da lista para gerar objeto com as preferencias
         objPreferencias.variedade.push(obj.variedade);
         objPreferencias.categoria.push(obj.categoria);
         objPreferencias.pais.push(obj.pais);
         objPreferencias.safra.push(obj.safra);
      });
   });

  lista_compras_cliente.push(objPreferencias);
  return Promise.resolve(lista_compras_cliente);
};


/*
Recebe: Produtos ainda não comprados e preferencias do usuário
*/
exports.indicaProduto = function (produtos_selecionaveis, preferencias) {

   const variedade = ListaItensMaiorRepeticao(preferencias.variedade);
   const categoria = ListaItensMaiorRepeticao(preferencias.categoria);
   const pais = ListaItensMaiorRepeticao(preferencias.pais);
   const safra = ListaItensMaiorRepeticao(preferencias.safra);

   var retorno = Promise.all([variedade, categoria, pais, safra])
      .then(valor => {
         return logicaRecomendacao(valor, produtos_selecionaveis);
      })
      .then(produto => {
         return produto;
      })
      .catch(console.error);

   return Promise.resolve(retorno);
};


const logicaRecomendacao = (listaPref, produtos_selecionaveis) =>{

   var tamLista = 0;
   var i = 0;
   var retorno = "";
   var pesquisa = ["variedade", "categoria", "pais", "safra"];

   while(i < 4){
      if(listaPref[i].length > tamLista){
         tamLista = listaPref[i].length;
      }
      i++;
   }

   listaPref.forEach(function(obj, index){
      if(retorno !== "" && retorno.length > 0){return;}

      for(var valor of obj){
         var proxPos = 0;

         while(proxPos < tamLista){
            var proxIndex = index + 1;

            while(proxIndex < listaPref.length){

               if (listaPref[proxIndex][proxPos] !== undefined) {
                  retorno = funcoes.retornaObjExiste(produtos_selecionaveis,
                                    [pesquisa[index], valor.nome, pesquisa[proxIndex], listaPref[proxIndex][proxPos].nome ]);

                  if(listaPref[proxIndex][proxPos] !== undefined && retorno !== "" && retorno.length > 0){
                     break;
                  }
               }

               if(retorno !== "" && retorno.length > 0){break;}
               proxIndex++;

            }
            if(retorno !== "" && retorno.length > 0){break;}
            proxPos++;

         }
         if(retorno !== "" && retorno.length > 0){break;}
      }
   });
   return Promise.resolve(retorno);
};

const ListaItensMaiorRepeticao = (lista) =>{

   var contador = [];
   lista.map(function(obj, index){
      if(funcoes.verificaObj(contador, ["nome", obj])){
         contador.forEach(function(ele){
            if(ele.nome == obj){
               ele.valor += 1;
            }
         });
      }else{
         contador.push( {nome: obj, valor: 1});
      }
   });

   contador.sort(function(a,b){return b.valor - a.valor; });

   return Promise.resolve(contador);
};


/*
Recebe: Lista de compras do cliente
        Lista de produtos
Retorna:Lista de produtos ainda não comprados pelo cliente
*/
exports.listaProdutosNaoComprados = function (lista_compras_cliente, lista_produtos) {

   var produtos_selecionaveis = [];

   lista_produtos.map(
      function(obj, index){
         if(funcoes.verificaObj(lista_compras_cliente, ["produto", obj.produto]) === false){
            produtos_selecionaveis.push(obj);
         }
      }
   );
   return Promise.resolve(produtos_selecionaveis);
};