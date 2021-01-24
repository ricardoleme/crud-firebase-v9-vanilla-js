var usersList = document.getElementById('users-list')

firebase.database().ref('users').on('value', (snapshot) => {
  snapshot.forEach(item => {
    usersList.innerHTML += ''
    
    var li = document.createElement('li')

    li.appendChild(document.createTextNode(item.val().name + ': ' + item.val().age))

    usersList.appendChild(li)
  })
})