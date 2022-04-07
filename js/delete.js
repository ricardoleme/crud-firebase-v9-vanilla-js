var emailInput = document.getElementById('emailInput')
var addButton = document.getElementById('addButton')

var deleteForm = document.getElementById('deleteForm')
var nameInput = document.getElementById('nameInput')
var ageInput = document.getElementById('ageInput')
var deleteButton = document.getElementById('deleteButton')

var db
var id

addButton.addEventListener('click', () => {
  deleteUser(emailInput.value)
})

function deleteUser(email){
  firebase.database().ref('users').on('value', (snapshot) => {
  
    snapshot.forEach(item => {

      if(item.val().email === email){
        
        nameInput.value = item.val().name
        
        ageInput.value = item.val().age

        db = item.ref.path.pieces_[0]
        id = item.ref.path.pieces_[1]
      }
    })
  })
}

deleteButton.addEventListener('click', () => {
  let user = firebase.database().ref().child(db + '/' + id)

  user.remove()
    .then( () => {
      alert('Usuário excluído')
    })
    .catch(error => {
      console.log(error.code)
      console.log(error.message)
      alert('Falha ao excluir, verifique o erro no console')
    })
})
