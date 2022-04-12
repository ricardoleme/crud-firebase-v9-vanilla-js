# 🔥 CRUD com autenticação integrado ao Firebase utilizando apenas HTML, CSS e Javascript

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

- [ ] Abra o arquivo index.html no seu navegador, crie um novo usuário e navegue pelo seu CRUD!


Made with 💜, HTML, CSS and only Vanilla JS. 