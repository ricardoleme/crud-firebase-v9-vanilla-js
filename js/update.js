var emailInput = document.getElementById('emailInput')
var addButton = document.getElementById('addButton')

var updateForm = document.getElementById('updateForm')
var nameInput = document.getElementById('nameInput')
var ageInput = document.getElementById('ageInput')
var updateButton = document.getElementById('updateButton')

var returnButton = document.getElementById('returnHomeButton')

var db
var id

addButton.addEventListener('click', () => {
  update(emailInput.value)
})

function update(email){
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

updateButton.addEventListener('click', () => {
  firebase.database().ref().child(db + '/' + id).update({
    name: nameInput.value, 
    age: ageInput.value
  }).then(
    alert('Atualização feita')
    )
})

