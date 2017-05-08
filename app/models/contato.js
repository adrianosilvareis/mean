var mongoose = require("mongoose");

module.exports = function() {

  //estrutura do schema
  var schema = mongoose.Schema({
    nome: {
      type: String,
      required: true
    },
    sobrenome: {
      type: String,
      require: true
    },
    email: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    idade: {
      type: Number
    },
    emergencia: {
      type: mongoose.Schema.ObjectId,
      ref: "Contato"
    }
  });

  //retorno de um model e seu nome
  return mongoose.model('Contato', schema);
};
