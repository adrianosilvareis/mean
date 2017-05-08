app.controller("listarContatos", function($scope, $resource) {

  var Contato = $resource('/contatos/:id');

  var init = function() {
    Contato.query(success, error);
  };

  $scope.deletarContato = function(_id) {
    Contato.delete({
        id: _id
      },
      init,
      function(error) {
        $scope.errormessage = "Não foi possivel deletar este contato";
        console.log(error);
      }
    );
  };

  var success = function(contatos) {
    $scope.contatos = contatos;
  };

  var error = function(error) {
    $scope.errormessage = "Não foi possível obter a lista de contatos";
    console.log(error);
  };

  init();
});
