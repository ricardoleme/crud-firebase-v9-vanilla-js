var nameInput = document.getElementById('nameInput')
var emailInput = document.getElementById('emailInput')
var ageInput = document.getElementById('ageInput')
var addButton = document.getElementById('addButton')

addButton.addEventListener('click', (event) => {
  event.preventDefault()
  create(nameInput.value, emailInput.value, ageInput.value)
})

function create(name, email, age){
  var data = {
    name,
    email,
    age
  }

  return firebase.database().ref('users').push(data)
    .then(() => {
      alert('Usuário cadastrado com sucesso')
      nameInput.value = ''
      emailInput.value = ''
      ageInput.value = ''
    })
    .catch(error => {
      console.log(error.code)
      console.log(error.message)
      alert('Falha ao cadastrar, verifique o erro no console')
    })
 }
