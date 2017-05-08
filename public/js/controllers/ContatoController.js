app.controller("contato", function($scope, $resource, contato) {

  var Contato = $resource("/contatos/:id");

  var init = function(contato) {
    $scope.contato = (contato ? contato : new Contato());

    Contato.query(
      function(contatos) {
        $scope.contatos = contatos;
      },
      function(erro) {
        $scope.errormessage = "Não foi possivel carregar contatos de emergencia!";
      }
    );
  };

  var error = function(error) {
    $scope.errormessage = "Não foi possivel salvar este contato! Verifique o console";
    console.log(error);
  };

  $scope.salvar = function() {
    $scope.contato.$save()
      .then(function() {
        $scope.contato = new Contato();
      })
      .catch(error);
  };

  init(contato);
});
