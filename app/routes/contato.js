var verificaAutenticacao = require('../../config/auth');

module.exports = function(app) {
  var controllers = app.controllers.contato;

  //routes é um arquivo que gerencia as rotas existentes do backend
  app.route("/contatos")
    .get(verificaAutenticacao, controllers.listar)
    .post(verificaAutenticacao, controllers.salvar);

  app.route('/contatos/:id')
    .get(verificaAutenticacao, controllers.obter)
    .delete(verificaAutenticacao, controllers.deletar);

};
