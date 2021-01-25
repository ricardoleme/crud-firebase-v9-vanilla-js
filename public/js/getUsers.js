var usersTable = document.getElementById('content')

firebase.database().ref('users').on('value', (snapshot) => {
  snapshot.forEach(item => {

    var tr = document.createElement('tr')
    
    var tdName = document.createElement('td')

    tdName.innerHTML = item.val().name

    var tdAge = document.createElement('td')

    tdAge.innerHTML = item.val().age

    var tdEmail = document.createElement('td')

    tdEmail.innerHTML = item.val().email

    tr.appendChild(tdName)
    tr.appendChild(tdAge)
    tr.appendChild(tdEmail)

    usersTable.appendChild(tr)
  })
})