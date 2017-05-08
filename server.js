var http = require('http');
var app = require('./config/express.js')();
require('./config/passport')();
require('./config/database.js')('mongodb://localhost/contatooh');

http.createServer(app).listen(app.get('port'), function() {
  console.log("Servidor escutando na porta: " + app.get('port'))
});
