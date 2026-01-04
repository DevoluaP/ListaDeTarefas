# ListaDeTarefas

Este projeto é uma aplicação de lista de tarefas desenvolvida com **Angular**. O objetivo é gerenciar tarefas, permitindo **adicionar**, **editar** e **deletar** tarefas. A aplicação oferece uma interface simples e intuitiva para interagir com as tarefas, além de manter as funcionalidades essenciais para gerenciamento de atividades diárias.

## Funcionalidades

- **Adicionar nova tarefa**: Permite adicionar uma nova tarefa à lista.
- **Editar tarefa**: Você pode editar o nome ou status de uma tarefa existente.
- **Deletar tarefa**: A qualquer momento, você pode excluir uma tarefa da lista.

## Tecnologias utilizadas

- **Angular**: Framework para desenvolvimento da aplicação.
- **Karma**: Framework de testes unitários.
- **Angular CLI**: Ferramenta de linha de comando para facilitar o desenvolvimento.

## Instalação

Para rodar o projeto localmente, siga os passos abaixo:

### 1. Clone o repositório

```
git clone https://github.com/seu-usuario/lista-de-tarefas.git
```

### 2. Instale as dependências

Após clonar o repositório, navegue até a pasta do projeto e instale as dependências utilizando o npm:

```
cd lista-de-tarefas
```

```
npm install
```

### 3. Rode o servidor de desenvolvimento

Execute o seguinte comando para rodar o servidor local:

```
ng serve
```

Isso irá iniciar o servidor de desenvolvimento e você pode acessar a aplicação no seguinte endereço:

http://localhost:4200/

A aplicação será recarregada automaticamente quando você fizer mudanças nos arquivos fonte.

### 4. Login

Para acessar a aplicação, utilize as seguintes credenciais de login:

- **Usuário**: `user`
- **Senha**: `password`

## Comandos do Angular CLI

### Geração de componentes

Para gerar um novo componente, execute o seguinte comando:

```
ng generate component nome-do-componente
```

Você também pode gerar outros itens como diretivas, pipes, serviços, classes, interfaces, enums e módulos, por exemplo:

```
ng generate directive nome-da-diretiva
```

```
ng generate service nome-do-serviço
```

### Build

Para gerar o build de produção, execute:

```
ng build --prod
```

Os arquivos gerados serão armazenados na pasta `dist/`.

### Testes unitários

Para rodar os testes unitários da aplicação, utilize o seguinte comando:

```
ng test
```

Os testes são executados usando o Karma, que vai abrir um navegador e rodar os testes automaticamente.

### Testes end-to-end

Se você quiser rodar os testes end-to-end, execute o seguinte comando:

```
ng e2e
```

Lembre-se de que você precisará configurar um pacote de testes end-to-end, como o Protractor, para rodar esse comando.
