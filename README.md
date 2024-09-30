Toughts - Publicação de Pensamentos

Este projeto é uma mini rede social que permite aos usuários cadastrar, fazer login e publicar pensamentos. Ele foi desenvolvido com Node.js e Express no backend, utilizando o MySQL como banco de dados relacional e o Sequelize como ORM (Object-Relational Mapping). O frontend é renderizado usando Handlebars para gerar páginas HTML dinâmicas.

Funcionalidades
Cadastro de Usuários: Criação de contas com email e senha.
Login/Autenticação: Autenticação de usuários utilizando JSON Web Tokens (JWT).
Publicação de Pensamentos: Usuários autenticados podem publicar pensamentos.
Listagem de Pensamentos: Exibe os pensamentos publicados no feed público.
Tecnologias Utilizadas
Backend:
Node.js com Express: Para criação da API e gerenciamento da lógica de autenticação, usuários e pensamentos.
MySQL: Banco de dados relacional para armazenar informações de usuários e pensamentos.
Sequelize: ORM para gerenciar a interação com o banco de dados MySQL.
JWT (JSON Web Token): Para autenticação segura e persistente entre frontend e backend.
bcrypt: Para criptografia de senhas.
Frontend:
Handlebars: Template engine para renderização dinâmica de páginas HTML.
Bootstrap: Biblioteca de estilos para um design responsivo e moderno.
Estrutura do Projeto
Backend (Node.js + Express)
server.js: Configura o servidor Express e inicializa as rotas.
controllers/: Funções responsáveis por manipular as requisições e respostas para usuários e pensamentos.
models/: Definição dos modelos do Sequelize para usuários e pensamentos.
routes/: Define as rotas para cadastro, login e publicação de pensamentos.
middlewares/: Middleware para autenticação e proteção de rotas.
views/: Templates Handlebars para as páginas frontend.
Frontend (Handlebars)
views/layouts/: Contém o layout base da aplicação.
views/: Páginas HTML renderizadas (login, cadastro, feed de pensamentos, etc.).
