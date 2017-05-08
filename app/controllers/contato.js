var sanitize = require('mongo-sanitize');

module.exports = function(app) {

  var Contato = app.models.contato;

  var controllers = {};

  controllers.listar = function(req, res) {
    Contato.find().populate('emergencia').exec()
      .then(
        function(contatos) {
          res.json(contatos);
        },
        function(erro) {
          console.error(erro);
          res.status(500).json(erro);
        }
      );
  };

  controllers.obter = function(req, res) {
    var _id = req.params.id;

    Contato.findById(_id).exec()
      .then(
        function(contato) {
          res.json(contato);
        },
        function(erro) {
          console.log(erro);
          res.status(404).json(erro);
        }
      );
  };

  controllers.deletar = function(req, res) {
    var _id = sanitize(req.params.id);

    Contato.remove({
        "_id": _id
      }).exec()
      .then(
        function() {
          res.end();
        },
        function(erro) {
          return console.error(erro);
        }
      );
  };

  controllers.salvar = function(req, res) {
    var _id = req.body._id;

    /*
    Independente da quantidade de parâmetros,
    apenas selecionamos o nome, sobrenome, email, idade e emergencia:
    */
    var dados = {
      "nome": req.body.nome,
      "sobrenome": req.body.sobrenome,
      "email": req.body.email,
      "idade": req.body.idade,
      "emergencia": req.body.emergencia || null
    };

    if (_id) {
      atualizar(_id, dados, res);
    } else {
      salvar(req, dados, res);
    }
  };

  var atualizar = function(_id, dados, res) {
    Contato.findByIdAndUpdate(_id, dados).exec()
      .then(
        function(contato) {
          res.json(contato);
        },
        function(erro) {
          console.error(erro);
          res.status(500).json(erro);
        }
      );
  };

  var salvar = function(req, dados, res) {
    Contato.create(dados)
      .then(
        function(contato) {
          res.status(201).json(contato);
        },
        function(erro) {
          console.erro(erro);
          res.status(500).json(erro);
        }
      );
  };

  return controllers;
};
