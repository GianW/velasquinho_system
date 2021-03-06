"use strict";
var request = require('supertest');
var app = require('../app');
var funcoes = require('../funcoes');

var cliente_ordem = require('./cliente_ordem.js');
var cliente_maior = require('./cliente_maior.js');
var clientes_fieis = require('./clientes_fieis.js');
var clientes_recomendacao = require('./cliente_recomendacao.js');

require('mocha-jshint')({
   paths: [
      './app.js',
      './dados.js',
      './functions/',
      './routes/'
   ]
});


describe('Request para as APIS', function(){
  it('API clientes', function(done){
      request(app)
      .get('/clientes')
      .expect('Content-Type', /json/)
      .end(function(error){
         if(error) throw error;
         done();
      });
   });
  it('Returns JSON format', function(done){
      request(app)
      .get('/compras')
      .expect('Content-Type', /json/)
      .end(function(error){
         if(error) throw error;
         done();
      });
   });

});

describe('Teste para as saidas do programa', function(){
   it('Clientes por ordem de compra', function(done){
      request(app)
      .get('/clientes-ordem-compra')
      .expect(200)
      .end(function(error){
         if(error) throw error;
         done();
      });
   });
   it('Cliente com maior compra unica', function(done){
      request(app)
      .get('/cliente-maior-compra')
      .expect(200)
      .end(function(error){
         if(error) throw error;
         done();
      });
   });
   it('Clientes fieis', function(done){
      request(app)
      .get('/cliente-fiel')
      .expect(200)
      .end(function(error){
         if(error) throw error;
         done();
      });
   });
   it('Recomendação vinho', function(done){
      request(app)
      .get('/cliente-recomendacao/000.000.000.01')
      .expect(200)
      .end(function(error){
         if(error) throw error;
         done();
      });
   });
});

describe('Teste das funções genericas', function(){

   it('Verificação se objeto existe no array', function(done){

      var lista = [{'nome': 'teste'},{'nome':'valor'},{'nome':'Valesquinho'},{'nome': ''}];
      var pesquisa = ['nome', 'Valesquinho'];

      var retorno = funcoes.verificaObj(lista, pesquisa );

      if (retorno) {done();}

   });
   it('Verificação se objeto não existe no array', function(done){

      var lista = [{'nome': 'teste'},{'nome':'valor'},{'nome':'Valesquinho'},{'nome': ''}];
      var pesquisa = ['nome', 'System'];

      var retorno = funcoes.verificaObj(lista, pesquisa );

      if (!retorno) {done();}

   });
});

cliente_ordem.exec();
cliente_maior.exec();
clientes_fieis.exec();
clientes_recomendacao.exec();
