var express = require('express');
var load = require('express-load');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var helmet = require('helmet');

module.exports = function() {
  var app = express();

  //setar valores de porta
  app.set("port", 3000);
  app.set('view engine', 'ejs');
  app.set('views', './app/views');

  //middlwere

  //permite capturar post no back
  app.use(methodOverride());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  //cria uma sessão com autenticação
  app.use(cookieParser());
  app.use(session({
    secret: 'homem avestruz',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  //proteção de cabeçalho obstruindo informações para hackers
  app.use(helmet());
  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.disable('x-powered-by');
  app.use(helmet.hidePoweredBy({
    setTo: 'PHP 5.5.14'
  }));



  //carregamento de pastas e arquivos facilitado
  /**
  dentro da pasta app será carregado os modelos, controllers e rotas, nesta ordem.
  */
  load('models', {
      cwd: 'app'
    })
    .then('controllers')
    .then('routes/auth.js')
    .then('routes')
    .into(app);


  app.get('*', function(req, res, next) {

    var regex = /fonts|css|lib|js|partials/g;
    var str = req.url;
    var m;

    if((m = regex.exec(str)) !== null){
      next();
    }else{
      res.status(404).render('404');
    }
  });

  //define a pagina principal pelo express.static
  app.use(express.static("public"));

  return app;
};
