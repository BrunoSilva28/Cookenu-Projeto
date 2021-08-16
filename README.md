## PROJETO COOKENU

- Este é um projeto básico de Backend, utilizando Typescript, MySQL, além das bibliotecas knexJs e expressJs, desenvolvido para atender aos modelos REST API.

---
## DESCRIÇÃO DO PROJETO

- O projeto consiste em simular a metodologia CRUD na estruturação de Sistema de Feeds de Receitas,criando e acessando informações de usuários, receitas, relação seguidores e seguidos, sendo criado endpoints `GET`, `POST`, `PUT` e `DELETE` para alimentar as demandas.

---
## DOCUMENTAÇÃO DE FUNCIONAMENTO

### LINK DA DOCUMENTAÇÃO NO POSTMAN: https://documenter.getpostman.com/view/15825773/Tzz4PeRJ

### `GET` All Recipes From Followed Users

`https://cookenu-projeto.herokuapp.com/feed`

- Este endpoint retorna todas as receitas dos usuários seguidos pelo usuário logado.
- São exibidos das receitas seus `id`,`title`, `description`, `createdAt`, `creatorId` e respectivos `creatorName` como resposta.
- As receitas são exibidas de forma ordenada decrescente por data de criação, mostrando as mais recentes no topo e as mais antigas no fundo.

### Body
- `No Content`

### Headers
```
Authorization: token
```

### Path Variables
- `No content`

### Response Example
```
{
  "recipes": [
    {
      "id": "59db9df2-1e68-4102-8d9e-dac43bb5271b",
      "title": "Breno 2",
      "description": "descrição breno",
      "createdAt": "12/08/2021",
      "creatorId": "f4090135-f9bf-429b-ad43-7c1ffbaa9eec",
      "creatorName": "Breno"
    },
    {
      "id": "c922e1d4-b753-4f5f-ba38-1faa9bb84294",
      "title": "Breno 1",
      "description": "descrição breno",
      "createdAt": "12/08/2021",
      "creatorId": "f4090135-f9bf-429b-ad43-7c1ffbaa9eec",
      "creatorName": "Breno"
    }
  ]
}
```
### Validation Restrictions
- Não há restrições.

---
### `GET` User Profile

`https://cookenu-projeto.herokuapp.com/user/profile`

- Este endpoint retorna informações não-sensíveis do usuário logado.
- São exibidos do usuário seus `id`,`name` e respectivos `email` como resposta.

### Body
- `No Content`

### Headers
```
Authorization: token
```

### Path Variables
- `No Content`

### Response Example
```
{
  "userProfile": {
    "id": "959ee8f2-6542-4281-b0b4-bc1ff65e0956",
    "name": "Ana",
    "email": "ana@labenu.com"
  }
}
```
### Validation Restrictions
- Não há restrições.

---
### `GET` Profile By User Id

`https://cookenu-projeto.herokuapp.com/user/:id`

- Este endpoint retorna informações não-sensíveis de usuário pelo seu id.
- A busca é feita pela query param `id`, que corresponde ao id do usuário de interesse.
- São exibidos do usuário seus `id`,`name` e respectivos `email` como resposta.

### Body
- `No Content`

### Headers
```
Authorization: token
```

### Path Variables
- id    3b5bb57a-ee0b-4961-8142-a4ee6c89ace9

### Response Example
```
{
  "userProfile": {
    "id": "3b5bb57a-ee0b-4961-8142-a4ee6c89ace9",
    "name": "Daniel",
    "email": "daniel@labenu.com"
  }
}
```
### Validation Restrictions
- Não há restrições.

---
### `GET` Recipe By Id

`https://cookenu-projeto.herokuapp.com/recipe/:id`

- Este endpoint retorna informações de uma receita pela sua id.
- A busca é feita através do query param `id`, que corresponde ao id da receita de interesse.
- São exibidos da receita seus `id`, `title`, `description` e respectivos `createdAt` como resposta.

### Body
- `No Content`

### Headers
```
Authorization: token
```

### Query Variables
- id    b85bdf54-e841-4c37-84a2-ccef4714c6b7

### Response Example
```
{
  "recipe": {
    "id": "b85bdf54-e841-4c37-84a2-ccef4714c6b7",
    "title": "Ana 2",
    "description": "descrição ana",
    "createdAt": "12/08/2021"
  }
}
```
### Validation Restrictions
- Não há restrições.

---
### `POST` SignUp

`https://cookenu-projeto.herokuapp.com/signup`

- Este endpoint cadastra um novo usuário no sistema.

### Body
```
{
    "name": "NomeDoUsuario",
    "email": "emaildousuario@email.com",
    "password": "123456",
    "role": "normal"
}
```

### Headers
```
    Content-Type: application/json
```

### Path Variables
- `No Content`

### Response Example
```
{
  "message": "User created successfully!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRkOTk5OWY2LTgzMTktNDk0OS1iNDNjLTMxM2JlODkxNDM5YSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2MjkxMzU1NjUsImV4cCI6MTYyOTEzOTE2NX0.1ix35lyoolgeu_18KTebNBHA49BkslMjNL_5Cqjs4Zo"
}
```

### Validation Restrictions
- `name`, `email` e `password` são campos obrigatórios.
- `email` deve ser um campo único.
- `email` deve ser inserido no formato `xxxx@yyyyy.zzz.www`.
- Todos os campos são da forma `string type`.
- `role` é um campo de preenchimento opcional, que corresponde a somente dois possíveis valores: `ADMIN` ou `NORMAL`. Caso nada seja informado, o campo não exista ou seja fornecido valor diferente de `ADMIN`, o campo gerará como padrão o valor `NORMAL`.
- `role` é não sensível à `capital letters` e, portanto `ADMIN` é igual a escrever, por exemplo, `aDmiN`, `AdMIN`, etc.

---
### `POST` Login

`https://cookenu-projeto.herokuapp.com/login`

- Este endpoint loga um usuário existente no sistema.

### Body
```
{
    "email": "emaildousuario@email.com",
    "password": "123456"
}
```

### Headers
```
    Content-Type: application/json
```

### Path Variables
- `No Content`

### Response Example
```
{
  "message": "Login has been successfully!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRkOTk5OWY2LTgzMTktNDk0OS1iNDNjLTMxM2JlODkxNDM5YSIsInJvbGUiOiJOT1JNQUwiLCJpYXQiOjE2MjkxMzYwMzEsImV4cCI6MTYyOTEzOTYzMX0.GTFPJWW9jFgQAWpBa15onw9zcbGj6ymadpkqhecGBuA"
}
```
### Validation Restrictions
- `email` e `password` são campos obrigatórios.
- Todos os campos são da forma `string type`.

---
### `POST` New Recipe

`https://cookenu-projeto.herokuapp.com/recipe`

- Este endpoint cria uma nova receita de um usuário logado.

### Body
```
{
    "title": "Nova receita",
    "description": "descrição de nova receita"
}
```

### Headers
```
    Content-Type: application/json
    Authorization: token
```

### Path Variables
- `No Content`

### Response Example
```
{
  "message": "Recipe created successfully!" 
}
```
### Validation Restrictions
- `title` e `description` são campos obrigatórios.
- Todos os campos são da forma `string type`.

---
### `POST` Follow User

`https://cookenu-projeto.herokuapp.com/user/follow`

- Este endpoint possibilita ao usuário logado seguir outro usuário do sistema pelo seu `id`.

### Body
```
{
    "userToFollowId": "f4090135-f9bf-429b-ad43-7c1ffbaa9eec"
}
```

### Headers
```
    Content-Type: application/json
    Authorization: token
```

### Path Variables
- `No Content`

### Response Example
```
{
  "message": "Followed successfully!"
}
```
### Validation Restrictions
- `userToFollowId` é um campo obrigatório.
- O valor de `userToFollowId` não deve ser o mesmo do usuário logado, pois um usuário não pode seguir
a si mesmo.
- Todos os campos são da forma `string type`.

---
### `POST` Unfollow User

`https://cookenu-projeto.herokuapp.com/user/unfollow`

-  Este endpoint possibilita ao usuário logado remover seguida a outro usuário do sistema pelo seu `id.

### Body
```
{
    "userToUnFollowId": "f4090135-f9bf-429b-ad43-7c1ffbaa9eec"
}
```

### Headers
```
    Content-Type: application/json
    Authorization: token
```

### Path Variables
- `No Content`

### Response Example
```
{
	"message": "Unfollowed successfully"
}
```
### Validation Restrictions
- `userToUnfollowId` é um campo obrigatório.
- O valor de `userToUnfollowId` não deve ser o mesmo do usuário logado, pois um usuário não pode seguir
a si mesmo.
- Todos os campos são da forma `string type`.

---
### `PUT` Edit Recipe

`https://cookenu-projeto.herokuapp.com/recipe/edit/:recipeId`

-  Este endpoint edita uma receita no sistema.

### Body
```
{
    "title": "novo titulo",
    "description": "nova descrição"
}
```

### Headers
```
    Content-Type: application/json
    Authorization: token
```

### Path Variables
- recipeId  90c161a8-a9d4-4e3a-a816-d2c452fc41d3

### Response Example
```
{
  "message": "Recipe modified successfully!"
}
```
### Validation Restrictions
- Ao menos `title` ou `description` deve ser passado como um campo obrigatório.
- Caso o `role` do usuário possua valor `NORMAL`, o usuário só poderá alterar receitas de sua própria criação. Caso seu `role` possua valor `ADMIN`, este poderá alterar qualquer receita no sistema.
- Todos os campos são da forma `string type`.

---
### `PUT` Send Temporary New Password By Email

`https://cookenu-projeto.herokuapp.com/user/tempPass`

-  Este endpoint possibilita ao usuário receber uma nova senha temporária pelo seu `email` cadastrado.

### Body
```
{
    "email": "emailcadastrado@email.com"
}
```

### Headers
```
    Content-Type: application/json
```

### Path Variables
- `No Content`

### Response Example
```
{
  "message": "New temporary password created and send to user email!"
}
```
### Validation Restrictions
- `email` é um campo obrigatório.
- O valor de `email` já deve ser cadastrado no sistema.

---
### `DELETE` Delete Recipe

`https://cookenu-projeto.herokuapp.com/recipe/:recipeId`

-  Este endpoint possibilita ao usuário logado remover uma receita do sistema pelo seu `id`.

### Body
- `No content`

### Headers
```
    Authorization: token
```

### Path Variables
- recipeId  2,996515

### Response Example
```
{
	"message": "Recipe deleted successfully!"
}
```
### Validation Restrictions
- Caso o usuário tenha `role` de valor `NORMAL`, este só poderá remover receitas de sua própria criação.
Caso tenha `role` de valor `ADMIN`, este poderá deletar qualquer receita presente no sistema.

---
### `DELETE` Delete User Account

`https://cookenu-projeto.herokuapp.com/user/:userId`

-  Este endpoint possibilita ao usuário logado remover uma conta de usuário do sistema.

### Body
- `No content`

### Headers
```
    Authorization: token
```

### Path Variables
- userId  1.2654665

### Response Example
```
{
	"message": "User account deleted successfully!"
}
```
### Validation Restrictions
- Caso o usuário tenha `role` de valor `NORMAL`, este só poderá remover sua própria conta.
Caso tenha `role` de valor `ADMIN`, este poderá deletar qualquer outra conta de usuário presente no sistema.
- Um usuário `ADMIN` não pode remover sua própria conta, sendo necessário que outro `ADMIN` o remova do sistema.