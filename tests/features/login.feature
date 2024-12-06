Feature: Login de usuário

  Scenario: Login com sucesso
    Given que o usuário está na página de login
    When o usuário insere as credenciais válidas
    Then o usuário deve ser redirecionado para a página inicial
