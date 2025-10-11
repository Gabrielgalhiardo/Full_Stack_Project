Front-End de Gestão com React e JWT
📝 Descrição
Interface para uma plataforma de gestão desenvolvida em React. Consome uma API REST segura e oferece rotas protegidas com painéis específicos para diferentes papéis (Admin, Colaborador, Cliente). Inclui funcionalidades como vitrine de produtos, cadastro de itens e gerenciamento completo de usuários.

✨ Features
Interface Reativa: Construída com componentes reutilizáveis em React.

Sistema de Rotas: Navegação clara entre páginas públicas e privadas usando React Router.

Autenticação Segura: Fluxo completo de login e logout com armazenamento seguro de tokens JWT.

Controle de Acesso por Papel (RBAC):

Vitrine Pública: Qualquer visitante pode visualizar os produtos.

Painel do Colaborador: Rotas protegidas para criar, visualizar, atualizar e deletar seus próprios produtos.

Painel do Administrador: Rotas protegidas para gerenciar contas de colaboradores (criar, listar, desativar, etc.).

Consumo de API: Comunicação eficiente com o back-end através do Axios, com interceptadores para injeção de tokens.

Gerenciamento de Estado: Lógica de estado para gerenciar a autenticação do usuário e os dados da aplicação.

⚙️ Tecnologias e Bibliotecas
React 18+

Vite (Build Tool moderno e rápido)

React Router (Para roteamento e navegação)

Axios (Para realizar as chamadas à API REST)

Context API ou Redux Toolkit (Para gerenciamento de estado global)

Styled Components ou Tailwind CSS (Para estilização)

📋 Pré-requisitos
Antes de começar, você vai precisar ter as seguintes ferramentas instaladas em sua máquina:

Node.js (versão 18.x ou superior)

Yarn ou npm (gerenciador de pacotes)

✅ O back-end (API REST) do projeto deve estar em execução, pois este front-end depende dele para funcionar.
