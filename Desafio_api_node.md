# Desafio: API de Pedidos em Node.js

**Objetivo:** Desenvolver uma API em Node.js usando JavaScript para gerenciar pedidos. A API deve permitir a criação, leitura, atualização e exclusão de pedidos (CRUD).

---

## 🚀 Endpoints

A API deve expor as seguintes rotas:

### Obrigatórios
1.  **Criar um novo pedido**
    * `POST http://localhost:3000/order`
2.  **Obter dados do pedido** (passando o número do pedido na URL)
    * `GET http://localhost:3000/order/{numeroPedido}`

### Opcionais
3.  **Listar todos os pedidos**
    * `GET http://localhost:3000/order/list`
4.  **Atualizar pedido**
    * `PUT http://localhost:3000/order/{numeroPedido}`
5.  **Deletar pedido**
    * `DELETE http://localhost:3000/order/{numeroPedido}`
---

## 📦 Estrutura de Dados e Transformação

A API deve receber os dados em um formato (Input), realizar o **mapeamento (de/para)** e salvar no banco de dados em outro formato (Output).

### 1. Formato de Entrada (Request)
Exemplo de corpo da requisição (`curl`):

```bash
curl --location 'http://localhost:3000/order' \
--header 'Content-Type: application/json' \
--data '{
    "numeroPedido": "v10089015vdb-01",
    "valorTotal": 10000,
    "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
    "items": [
        {
            "idItem": "2434",
            "quantidadeItem": 1,
            "valorItem": 1000
        }
    ]
}'
````

### 2\. Formato de Saída (Banco de Dados)

O JSON deve ser transformado para o seguinte padrão antes de ser salvo:

```json
{
  "orderId": "v10089016vdb",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000
    }
  ]
}
```

**Regra de Mapeamento:**

  * `numeroPedido` ➡️ `orderId`
  * `valorTotal` ➡️ `value`
  * `dataCriacao` ➡️ `creationDate`
  * **Items:**
      * `idItem` ➡️ `productId`
      * `quantidadeItem` ➡️ `quantity`
      * `valorItem` ➡️ `price`

-----

## 🗄️ Estrutura do Banco de Dados

Você pode optar por SQL ou NoSQL (MongoDB).

### Opção A: SQL / PostgreSQL

Tabelas sugeridas:

**Tabela: Order**

  * `orderId`
  * `value`
  * `creationDate`

**Tabela: Items**

  * `orderId` (Chave Estrangeira)
  * `productId`
  * `quantity`
  * `price`

### Opção B: MongoDB

A collection deve seguir este formato de documento:

```json
{
    "_id": "ObjectId('64dab8a0f6b7183237d307f6')",
    "orderId": "v10089016vdb-01",
    "value": 10000,
    "creationDate": "ISODate('2023-07-19T12:24:11.529Z')",
    "items": [
        {
            "productId": 2434,
            "quantity": 1,
            "price": 1000,
            "_id": "ObjectId('64daba7d05bcc674899dc5bf')"
        }
    ],
    "__v": 0
}
```

-----

## ✅ Critérios de Avaliação

1.  Funcionalidade completa dos requisitos mínimos.
2.  Código bem organizado e comentado.
3.  Utilização adequada das convenções de nomenclatura.
4.  Tratamento de erros robusto e mensagens de erro compreensíveis.
5.  Uso correto das respostas HTTP (status codes) para cada operação.
6.  **Código hospedado em repositório público no GitHub**, com commits organizados e mensagens claras.

### 🌟 Recursos Adicionais (Opcional)

  * Implementar autenticação básica (ex: Token JWT).
  * Documentar a API usando Swagger ou Postman.

-----

> **Importante:** Ao finalizar, enviar o link do repositório do GitHub.

```

---

### Próximo passo
Como você tem interesse em Python e SQL, mas o desafio pede **Node.js**, você gostaria de ajuda para:
1.  Montar a estrutura básica do projeto em Node?
2.  Criar a lógica de "Mapeamento" (transformar o JSON de entrada no de saída)?
```