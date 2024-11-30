# GerenciamentoDeTasks-API
Task Management API
Uma API simples de Gerenciamento de Tarefas desenvolvida com Node.js. A API permite criar, ler, atualizar e deletar tarefas. Ela é construída sem o uso de bibliotecas externas, utilizando apenas recursos nativos do Node.js. A API também faz uso de expressões regulares para filtrar parâmetros e simula o envio de arquivos CSV utilizando fetch.

Funcionalidades
CRUD (Create, Read, Update, Delete) para gerenciar tarefas.
Utiliza expressões regulares para rotas dinâmicas.
Importação de arquivos CSV via requisição simulada com fetch.
Armazenamento em um arquivo JSON (db.json).
Middleware personalizado para fazer o parse de corpos de requisição.
