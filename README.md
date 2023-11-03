# 🔥 CRUD com autenticação integrado ao Firebase (v.9 SDK) utilizando apenas HTML, CSS e Javascript puro

Projeto em HTML, CSS e Vanilla Javascript que implementa um pequeno CRUD. (São utilizados o Realtime Database, Authentication com email/senha e conta Google e Storage do Firebase)


<p align="center">
<a href="https://github.com/users/ricardoleme/achievements/starstruck" target="_blank">
<img alt="" src="https://github.githubassets.com/images/modules/profile/achievements/starstruck-default.png" width="50"><br>
<small>This repository has many stars from community.⭐️⭐️⭐️</small>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=Apache&color=FB724C&labelColor=FFFFFF">
<a href="https://fatecitu.edu.br" target="_blank">
  <img alt="License" src="https://img.shields.io/static/v1?label=Powered+by&message=Fatec&color=FB724C&labelColor=FFFFFF">
  </a>
</p>
<p align="center">
  <img alt="HTML 5" src="https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white">

  <img alt="CSS 3" src="https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white&color=0000FF"> 

  <img alt="JS" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 

  <img alt="Firebase" src="https://img.shields.io/badge/Firebase-F29D0C?style=for-the-badge&logo=firebase&logoColor=white"> 


</p>

# 🧠 Contexto

Uma das dificuldades dos desenvolvedores de é implementar um pequeno CRUD que possua autenticação, sem antes se envolver em um framework web, como o Vue, Angular ou React.
O propósito desse pequeno sistema é mostrar que é possível desenvolvermos uma aplicação 100% na nuvem, utilizando apenas HTML, CSS e Javascript.
## 📋 Instruções

- [ ] Inicialmente clone o projeto; 
- [ ] Acesse https://firebase.google.com e crie um novo projeto Web.
- [ ] Edite o arquivo firebase.js e cole nele as informações de conexão apresentadas pelo Firebase.
- [ ] Acesse _Realtime Database_ e em regras, informe que apenas usuários autenticados terão direito de acesso (escrita e leitura) aos dados:
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```
- [ ] Acesse _Cloud Firestore_ e em regras, informe que apenas usuários autenticados terão direito de acesso (escrita e leitura) aos dados:
```javascript
​rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write : if request.auth != null;
    }
  }
}
```

- [ ] Abra o arquivo index.html no seu navegador, crie um novo usuário e navegue pelo seu CRUD! (ou se preferir, instale o [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) no VS Code, clique com o botão direito dentro do arquivo index.html e selecione Open with Live Server)

## 🌐 Veja uma demonstração online do projeto. 

Utilize a sua conta Google para efetuar o Login, ou cadastre um novo usuário.

https://ricardoleme.github.io/crud-firebase-v9-vanilla-js/

## 📷 Imagens do Projeto
![Login](images/login.png "Login com Usuário e Senha ou Login via Google")
![Novo Usuário](images/novousuario.png "UI do Cadastro de um novo usuário (integrado ao Firebase v.9)")
![Menu Inicial](images/menuinicial.png "UI do Menu Inicial")
![Cadastro de Clientes](images/clientes.jpg "UI do Cadastro de Clientes (integrado ao Firebase v.9)")

## 📚 Inspirações
- https://github.com/GCMoura/first-crud-firebase
- https://github.com/ArefinAnwar/todo-crud_firebaseSDK9

## 💬 Contato

Prof. Ms. Ricardo Leme <br>
<a href="https://www.linkedin.com/in/ricardo-leme/" target="_blank">
  <img alt="Linkedin" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">
</a>
<a href="mailto:ricardo.leme@fatec.sp.gov.br" target="_blank">
  <img alt="Linkedin" src="https://img.shields.io/badge/Microsoft_Outlook-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white">
</a>

## 📝 Licença

Esse projeto está sob a licença Apache. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
---
Made with 💜, HTML, CSS and only Vanilla JS. 