/*
recebe:  Ano para ser filtrado ex: '2016',
         Lista com as compras registradas ex:  [{"codigo":"","data":"19-02-2016","cliente":"000.000.000.01","itens":[],"valorTotal":158}, ... ]
retorna: Lista com as compras registradas no ano selecionado ex:  [{"codigo":"","data":"19-02-2016","cliente":"000.000.000.01","itens":[],"valorTotal":158}, ... ]
*/
exports.listaComprasAno = function (ano, lista_compras) {

   var nova_lista = lista_compras.filter(function(elem, i, array){
      var aux = elem.data.split("-");
      if (aux[2] == ano){return true;}
   });

   //ordena lista de forma decrescente pelo valor total da compra
   nova_lista.sort(function (a, b) {
      return b.valorTotal - a.valorTotal;
   });

   return Promise.resolve(nova_lista);
};