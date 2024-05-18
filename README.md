# Employee Management Application

Esta é uma aplicação de gerenciamento de funcionários, desenvolvida com Next.js, Chakra UI, Express.js e MongoDB. 
Ela permite adicionar, editar, visualizar e excluir funcionários de um banco de dados.

## Tecnologias Utilizadas
- Frontend: Next.js, Chakra UI
- Backend: Express.js, MongoDB


## Executando a Aplicação
A aplicação roda em dois terminais, um com o Frontend e outro com o Backend. Certifique-se de rodar os dois em dois terminais diferentes.

- **Frontend:**
  - Na raiz do projeto, execute o seguinte comando:
    yarn
    yarn dev
    
- **Backend:**
  - Navegue até a pasta `src/api` e execute o seguinte comando:
    yarn
    node server.js
    

## Rotas da API
- **GET /api/employees:** Lista todos os funcionários.
- **GET /api/employeesById/:id:** Retorna informações de um funcionário pelo ID.
- **POST /api/createEmployee:** Adiciona um novo funcionário.
- **PUT /api/updateEmployee:** Atualiza informações de um funcionário.
- **DELETE /api/deleteEmployee/:id:** Remove um funcionário.