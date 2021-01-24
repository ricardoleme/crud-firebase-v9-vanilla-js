var nameInput = document.getElementById('nameInput')
var emailInput = document.getElementById('emailInput')
var ageInput = document.getElementById('ageInput')
var addButton = document.getElementById('addButton')

addButton.addEventListener('click', () => {
  create(nameInput.value, emailInput.value, ageInput.value)
})

function create(name, email, age){
  var data = {
    name,
    email,
    age
  }

  return firebase.database().ref().child('users').push(data)
}
