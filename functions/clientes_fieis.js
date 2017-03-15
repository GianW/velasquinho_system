/*
recebe: lista de compras ex: [{data: "11-08-2016", cliente: "000.000.000.08", itens: [], valorTotal: 596}, ... }]
retorna: Objeto chave/valor com totais por cpf ex: ['000.000.000.01' : 10]
*/
exports.listaClientesQtdCompras = function (lista_compras) {

   var valor_clientes = [];

   lista_compras.map(function(obj,index){
      if(valor_clientes[obj.cliente]){
         valor_clientes[obj.cliente] += parseFloat(obj.itens.length);
      }else{
         valor_clientes[obj.cliente] = parseFloat(obj.itens.length);
      }
   });

  return Promise.resolve(valor_clientes);
};

/*
recebe:lista de clientes como array de objetos ex:[{"id":1,"nome":"Vinicius","cpf":"000.000.000-01"}, ... ]
       Objeto chave/valor com totais por cpf ex: ['000.000.000.01' : 10]
retorna: JSON no formato de array com nome e total ex:  [ { nome: 'Vinicius', qtd: 3 }, ... ]
*/
exports.jsonClientesQtdCompras = function (lista_clientes, lista_totais) {

   var json_clientes  = [];

   lista_clientes.map(function(obj, index){
      var element = {};
      var valor = lista_totais[lista_clientes[index].cpf.replace("-", ".")];

      if (valor == undefined) {return;}

      element.nome = lista_clientes[index].nome;
      element.cpf  = lista_clientes[index].cpf;
      element.qtd  = valor;
      json_clientes.push(element);
   });

  json_clientes.sort(function (a, b) {
   return b.qtd - a.qtd;
  });

  return Promise.resolve(json_clientes);
};
