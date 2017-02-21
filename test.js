var request = require('supertest');
var app = require('./app');

describe('Request para as APIS', function(){
  it('API clientes', function(done){
      request(app)
      .get('/clientes')
      .expect('Content-Type', /json/)
   })
  it('Returns JSON format', function(done){
      request(app)
      .get('/compras')
      .expect('Content-Type', /json/)
      .end(function(error){
         if(error) throw error;
         done();
      });
   })

})

describe('Teste para as saidas do programa', function(){
   it('Clientes por ordem de compra', function(done){
      request(app)
      .get('/clientes-ordem-compra')
      .expect(200)
      .end(function(error){
         if(error) throw error;
         done();
      });
   })
   it('Cliente com maior compra unica', function(done){
      request(app)
      .get('/cliente-maior-compra')
      .expect(200)
      .end(function(error){
         if(error) throw error;
         done();
      });
   })
   it('Clientes fieis', function(done){
      request(app)
      .get('/cliente-fiel')
      .expect(200)
      .end(function(error){
         if(error) throw error;
         done();
      });
   })
   it('Recomendação vinho', function(done){
      request(app)
      .get('/cliente-recomendacao')
      .expect(200)
      .end(function(error){
         if(error) throw error;
         done();
      });
   })
})

