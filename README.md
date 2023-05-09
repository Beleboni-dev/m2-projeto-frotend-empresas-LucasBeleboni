Sobre a aplicação

Esta é uma aplicação web para gerenciamento de empresas, departamentos e funcionários. A aplicação contém três páginas principais: a página inicial, a página/modal de cadastro e a página/modal de login. Após o login, o usuário será direcionado para sua respectiva área, que pode ser o painel de controle do administrador ou do usuário comum. A seguir, detalhamos cada uma dessas páginas:
Página Inicial

A página inicial contém as seguintes funcionalidades:

    Redirecionamento para as páginas/modal de cadastro e login.
    Exibição de uma lista de todas as empresas cadastradas na API.
    Filtro para listagem de empresas por categoria.
    Não há restrições para acesso a essa página.

Página/modal de Cadastro

A página/modal de cadastro contém um formulário de cadastro de usuário com os seguintes campos:

    Nome
    E-mail
    Senha

Além disso, há um botão para redirecionamento para a página/modal de login.
Restrições

    Se o cadastro for bem-sucedido, o usuário será redirecionado para a tela/modal de login. Caso contrário, se a requisição for inválida, um feedback será fornecido ao usuário na forma de uma mensagem de erro.
    Não é necessário criar um usuário administrador, pois já existe um cadastrado no banco de dados. Esse usuário é considerado o proprietário de todas as empresas na aplicação. Para acessar a conta do administrador, utilize as seguintes credenciais:

admin@mail.com
123456

Página/modal de Login

A página/modal de login contém um formulário de login de usuário com os seguintes campos:

    E-mail
    Senha

Além disso, há um botão para redirecionamento para a página/modal de cadastro.
Restrições

    Caso o login seja bem-sucedido, a resposta da requisição será armazenada no localStorage. O usuário será redirecionado para a tela de dashboard correspondente. A chave "isAdm" é utilizada para identificar para qual dashboard redirecionar.
    Caso contrário, ou seja, a requisição seja inválida, um feedback será fornecido ao usuário na forma de uma mensagem de erro.

Painel de Controle

Após o login, o usuário será direcionado para sua respectiva área: painel de controle do administrador ou do usuário comum.
Painel de Controle do Administrador

O painel de controle do administrador contém as seguintes seções:
Seção de Departamentos

    Formulário de cadastro de departamento para uma empresa específica.
    Lista de todos os departamentos de uma empresa específica.
    Ao clicar em um departamento, visualização de dados específicos dele, como funcionários, descrição, nome e a que empresa pertence.
    Lista de todos os funcionários de um departamento com nome e e-mail.
    Contratação e demissão de um funcionário de um departamento.

Seção de Usuários:

    Atualizar os dados de um funcionário, nome e email;
    Listar todos os usuários cadastrados na aplicação.
    Excluir um funcionário da aplicação
    

    Painel de Controle do Usuário comum contém as seguintes seções:

    Visualiza apenas sua empresa;
    Visualiza apenas o seu departamento;
    Listar todos os funcionários do departamento a qual pertence com o nome de cada um;
    Caso ele não pertença a nenhum departamento é adicionada a mensagem na tela uma mensagem como: “Você ainda não foi contratado”.
