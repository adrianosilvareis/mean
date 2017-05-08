describe("ContatoController", function() {
  var $scope, $httpBackend;

  beforeEach(function() {
    module('site');
    inject(function($injector, _$httpBackend_) {
      $scope = $injector.get('$rootScope').$new();
      $httpBackend = _$httpBackend_;
      $httpBackend.when('GET', '/contatos/1')
      .respond({_id: '1'});
    });
  });

  it("Deve criar um Contato vazio quando nenhum parâmetro de rota for passado",
  inject(function($controller) {
    $controller('contato',{
      'contato': {},
      '$routeParams': {contatoId: 1},
      "$scope" : $scope}
    );
      expect($scope.contato._id).toBeUndefined();
  }));
});
