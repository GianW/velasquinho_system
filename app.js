"use strict";

var express = require("express");
var app = express();

var dados = require('./dados');

var cliente_ordem = require('./routes/cliente_ordem.js');
var cliente_maior = require('./routes/cliente_maior.js');
var clientes_fieis = require('./routes/clientes_fieis.js');
var cliente_recomendacao = require('./routes/cliente_recomendacao.js');

app.use(express.static(__dirname + '/public'));

app.get('/clientes', function (req, res) {
    res.json(dados.clientes());
});

app.get('/compras', function (req, res) {
   res.json(dados.compras());
});

//# 1 - Lista os clientes ordenados pelo valor total de compras
app.use('/clientes-ordem-compra', cliente_ordem);

//# 2 - Mostre o cliente com maior compra única no último ano (2016).
app.use('/cliente-maior-compra', cliente_maior);

//# 3 - Liste os clientes mais fiéis.
app.use('/cliente-fiel', clientes_fieis);

//# 4 - Recomende um vinho para um determinado cliente a partir do histórico
app.use('/cliente-recomendacao', cliente_recomendacao);

module.exports = app;