# 🔥 CRUD com autenticação integrado ao Firebase (v.9 SDK) utilizando apenas HTML, CSS e Javascript puro

Projeto em HTML, CSS e Vanilla Javascript que implementa um pequeno CRUD.

> ⚠️ **Projeto utilizado nas aulas da disciplina de Programação para a Internet da Fatec Itu**

# 🧠 Contexto

Uma das dificuldades dos desenvolvedores de é implementar um pequeno CRUD que possua autenticação, sem antes se envolver em um framework web, como o Vue, Angular ou React.
O propósito desse pequeno sistema é mostrar que é possível desenvolvermos uma aplicação 100% na nuvem, utilizando apenas HTML, CSS e Javascript.
## 📋 Instruções

- [ ] Inicialmente clone o projeto; 
- [ ] Acesse https://firebase.google.com e crie um novo projeto.
- [ ] Renomeie o arquivo firebase-example.js para firebase.js e copie as informações apresentadas pelo Firebase.
- [ ] Acesse Realtime Database e em regras, informe que apenas usuários autenticados terão direito aos dados:
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

- [ ] Abra o arquivo index.html no seu navegador, crie um novo usuário e navegue pelo seu CRUD! (ou se preferir, instale o [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VS Code, clique com o botão direito dentro do arquivo index.html e selecione Open with Live Server)

## 🌐 Veja uma demonstração do projeto. 
Utilize a sua conta Google para efetuar o Login, ou cadastre um novo usuário.

https://ricardoleme.github.io/crud-firebase-v9-vanilla-js/

## 📷 Imagens do Projeto

![Login](images/login.png "Login com Usuário e Senha ou Login via Google")
![Novo Usuário](images/novousuario.png "UI do Cadastro de um novo usuário (integrado ao Firebase v.9)")
![Menu Inicial](images/menuinicial.png "UI do Menu Inicial")
![Cadastro de Clientes](images/clientes.jpg "UI do Cadastro de Clientes (integrado ao Firebase v.9)")


Made with 💜, HTML, CSS and only Vanilla JS. 