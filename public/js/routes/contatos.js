app.config(function($routeProvider) {

  $routeProvider.when("/", {
    templateUrl: "partials/listarContatos.html",
    controller: "listarContatos"
  });

  $routeProvider.when("/contatos", {
    templateUrl: "partials/listarContatos.html",
    controller: "listarContatos"
  });

  $routeProvider.when("/contato", {
    templateUrl: "partials/contato.html",
    controller: "contato",
    resolve: {
      contato: function() {
        return;
      }
    }
  });

  $routeProvider.when("/contato/:id", {
    templateUrl: "partials/contato.html",
    controller: "contato",
    resolve: {
      contato: function($resource, $route) {
        var _id = $route.current.params.id;
        var Contato = $resource("/contatos/:id");

        return Contato.get({
          id: _id
        });

      }
    }
  });

});
