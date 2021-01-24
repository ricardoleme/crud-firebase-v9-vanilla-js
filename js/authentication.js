//Buttons
var authEmailPassButton = document.getElementById('authEmailPassButton')
var createUserButton = document.getElementById('createUserButton')
var logOutButton = document.getElementById('logOutButton')

//Inputs
var emailInput = document.getElementById('emailInput')
var passwordInput = document.getElementById('passwordInput')

//Displays
var displayName = document.getElementById('displayName')

//Criar novo usuário

createUserButton.addEventListener('click', () => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(() => {
      alert('Bem vindo: ' + emailInput.value)
    })
    .catch(error => {
      console.log(error.code)
      console.log(error.message)
      alert('Falha ao cadastrar, verifique o erro no console')
    })
})

//Autenticar com e-mail e senha
authEmailPassButton.addEventListener('click', () => {
  firebase
    .auth()
    .signInWithEmailAndPassword(emailInput.value, passwordInput.value)
    .then(result => {
      console.log(result.user.uid)
      displayName.innerText = "Bem vindo, " + emailInput.value
      alert("Autenticado " , emailInput.value)
      console.log()
      // setTimeout(() => {
      //   window.location = 'http://localhost:8080/home.html'
      // }, 1000);
    })
    .catch(error => {
      console.log(error.code)
      console.log(error.message)
      alert('Falha ao cadastrar, verifique o erro no console')
    })
})

//Logout
logOutButton.addEventListener('click', () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      displayName.innerText = "Você não está autenticado"
      alert("Você se deslogou")
    })
    .catch(error => {
      console.log(error.code)
    })
})

function signIn(provider){
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      console.log(result)
      var token = result.credential.accessToken
      displayName.innerText = 'Bem vindo, ' + result.user.displayName
    })
    .catch(error => {
      console.log(error)
      alert('Falha na autenticação')
    })
}