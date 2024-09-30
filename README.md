# Favorites Manager

Este projeto é uma aplicação simples de gerenciamento de favoritos que permite ao usuário adicionar, visualizar e remover itens da sua lista de favoritos.

## Funcionalidades

### Adicionar aos Favoritos
- O usuário pode adicionar um item à sua lista de favoritos. A adição é feita por meio de um botão em cada item disponível.
- Requisição **POST** para a API, onde o item é enviado e adicionado ao banco de dados de favoritos.

### Listar Favoritos
- O usuário pode visualizar todos os itens que foram adicionados aos favoritos.
- A listagem é atualizada dinamicamente com uma requisição **GET** para a API.

### Remover Favorito
- O usuário pode remover um item da lista de favoritos através de um botão presente em cada item favoritado.
- A remoção é realizada por uma requisição **DELETE** para a API, usando o ID do item.
- **Observação:** Se o item a ser removido não for encontrado na API, o sistema retornará um erro 404 (Not Found).

## Estrutura dos Componentes

### Header
- Componente de cabeçalho exibido em todas as páginas, contendo links de navegação.

### Favorites
- Componente que lista todos os favoritos adicionados e permite a remoção de qualquer item.

### ProductList e ProductItem
- Componentes que exibem a lista de produtos disponíveis para adicionar aos favoritos.
- Cada produto possui um botão de "Adicionar aos Favoritos".

### Formulário
- Formulário para criação de novos produtos e inserção na lista principal, se aplicável.

## Tecnologias Utilizadas
- **React**: Biblioteca JavaScript para construção da interface de usuário.
- **Axios**: Biblioteca para fazer requisições HTTP assíncronas.
- **JSON Server**: API fake utilizada para simular uma base de dados.

## Como Rodar o Projeto

- npm install
- json-server --watch db.json --port 3001
- npm start

