# API de Pedidos - Restaurante

API RESTful desenvolvida em Node.js para gerenciamento de pedidos de restaurante, com autenticação JWT e mapeamento de dados.

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como resposta ao desafio técnico de criação de uma API de pedidos. A API implementa operações CRUD completas para gerenciamento de pedidos, com autenticação de usuários e transformação de dados entre diferentes formatos.

### Funcionalidades Principais

- ✅ **CRUD Completo de Pedidos**: Criar, listar, buscar, atualizar e deletar pedidos
- ✅ **Autenticação JWT**: Sistema de registro e login de usuários com tokens JWT
- ✅ **Mapeamento de Dados**: Transformação automática entre formato de API e formato de banco de dados
- ✅ **Validação de Dados**: Middleware de validação para garantir integridade dos dados
- ✅ **Testes Automatizados**: Cobertura de ~95% com Jest e Supertest
- ✅ **Documentação API**: Documentação completa no Postman

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação via tokens
- **bcryptjs** - Criptografia de senhas
- **Jest** - Framework de testes
- **Supertest** - Testes de API
- **ESLint** - Linter de código

## 📦 Instalação e Configuração

### Pré-requisitos

- Node.js (v14 ou superior)
- MongoDB (local ou Atlas)
- npm ou yarn

### Passo a Passo

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd Restaurante_api_node
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/restaurante_db
MONGODB_URI_TEST=mongodb://localhost:27017/restaurante_test_db
JWT_SECRET=seu_secret_super_seguro_aqui
JWT_EXPIRES_IN=7d
```

4. **Inicie o servidor**
```bash
# Desenvolvimento (com nodemon)
npm run dev

# Produção
npm start
```

## 📚 Documentação da API

### Documentação Completa
Acesse a documentação interativa no Postman:
**[https://documenter.getpostman.com/view/23527601/2sB3dLUXCN](https://documenter.getpostman.com/view/23527601/2sB3dLUXCN)**

### Endpoints Principais

#### Autenticação

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/auth/register` | Registrar novo usuário | Não |
| POST | `/auth/login` | Login e obtenção de token | Não |

#### Pedidos (Requer Autenticação)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/order` | Criar novo pedido |
| GET | `/order` | Listar todos os pedidos |
| GET | `/order/:numeroPedido` | Buscar pedido específico |
| PUT | `/order/:numeroPedido` | Atualizar pedido |
| DELETE | `/order/:numeroPedido` | Deletar pedido |

### Formato de Dados

#### Entrada (Request)
```json
{
  "numeroPedido": "v10089015vdb-01",
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "itens": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

#### Saída (Response)
```json
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 1000,
  "dataCriacao": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

> **Nota**: O `valorTotal` é calculado automaticamente com base nos itens do pedido.

## 🧪 Testes

Execute os testes automatizados:

```bash
# Rodar todos os testes com cobertura
npm test

# Rodar testes específicos
npx jest __tests__/auth
npx jest __tests__/orders
```

### Cobertura de Testes

- **Test Suites**: 3 passed
- **Tests**: 22 passed
- **Coverage**: ~95%
  - Controllers: 91%
  - Middlewares: 100%
  - Models: 92%
  - Routes: 100%
  - Utils: 100%

## 📁 Estrutura do Projeto

```
Restaurante_api_node/
├── src/
│   ├── config/
│   │   └── database.js          # Configuração MongoDB
│   ├── controllers/
│   │   ├── authController.js    # Lógica de autenticação
│   │   └── orderController.js   # Lógica de pedidos
│   ├── middlewares/
│   │   ├── authMiddleware.js    # Proteção de rotas
│   │   └── validationMiddleware.js # Validação de dados
│   ├── models/
│   │   ├── Order.js             # Schema de pedidos
│   │   └── Users.js             # Schema de usuários
│   ├── routes/
│   │   ├── authRoutes.js        # Rotas de autenticação
│   │   └── orderRoutes.js       # Rotas de pedidos
│   ├── utils/
│   │   └── mapper.js            # Mapeamento de dados
│   ├── app.js                   # Configuração Express
│   └── server.js                # Inicialização do servidor
├── __tests__/
│   ├── auth/
│   │   └── auth.test.js         # Testes de autenticação
│   ├── orders/
│   │   └── order.test.js        # Testes de pedidos
│   └── app.test.js              # Testes da aplicação
├── .env                         # Variáveis de ambiente
├── package.json
└── README.md
```

## 🔐 Autenticação

A API utiliza JWT (JSON Web Tokens) para autenticação. Para acessar rotas protegidas:

1. Registre um usuário em `/auth/register`
2. Faça login em `/auth/login` para obter o token
3. Inclua o token no header das requisições:
```
Authorization: Bearer seu_token_aqui
```

## 🛠️ Scripts Disponíveis

```bash
npm start          # Inicia o servidor em produção
npm run dev        # Inicia o servidor em desenvolvimento (nodemon)
npm test           # Executa os testes com cobertura
npm run lint       # Verifica o código com ESLint
npm run lint:fix   # Corrige problemas do ESLint automaticamente
```

## 📝 Critérios Atendidos

- ✅ Funcionalidade completa dos requisitos mínimos
- ✅ Código bem organizado e comentado
- ✅ Convenções de nomenclatura adequadas
- ✅ Tratamento de erros robusto
- ✅ Uso correto de status HTTP
- ✅ Repositório público no GitHub
- ✅ **Recursos Adicionais**:
  - Autenticação JWT implementada
  - Documentação completa no Postman
  - Testes automatizados com alta cobertura

---

**Desenvolvido como parte do desafio técnico de API Node.js**