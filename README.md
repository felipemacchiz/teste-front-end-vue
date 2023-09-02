# Teste prático em Vue.js

Aplicação web para cadastro de endereços, onde o usuário pode cadastrar, listar, buscar, editar e excluir seus endereços.

Na aplicação, o usuário cadastra o endereço preenchendo um nome e o CEP, e utilizando a [API Via CEP](https://viacep.com.br/), os campos são preenchidos automaticamente de acordo com o CEP que o usuário digitar.

Foi criado um servidor para simular uma API e um banco de dados [nesse repositório](https://github.com/felipemacchiz/teste-front-end-api). É necessário iniciar o servidor antes de inciar a aplicação front-end.

A aplicação foi feita utilizando o framework Vue.js. As principais ferramentas utilizadas foram:
- Vuetify
- Vuex
- axios
- i18n

## Setup do projeto

Após o download do projeto, é necessário importar as dependências utilizando o script no terminal:

```
npm install
```

### Compilação utilizada para o desenvolvimento

Para o desenvolvimento, foi utilizado o seguinte comando para fazer a compilação do código:

```
npm run dev
```

A aplicação roda em `localhost` na porta `8000`. Executando o script você poderá acessar a aplcaçaõ em `http://localhost:8000`.

### Compilar para produção e preview

Para compliar o código para produção, é utilizado o comando:

```
npm run build
```

Para pré-vizualizar a aplicação, utilize o comando: 

```
npm run preview
```

Executando o script você poderá acessar a aplicação em `http://localhost:4173`.

