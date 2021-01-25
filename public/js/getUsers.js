var usersTable = document.getElementById('content')

firebase.database().ref('users').on('value', (snapshot) => {
  snapshot.forEach(item => {

    var tr = document.createElement('tr')
    
    var tdName = document.createElement('td')

    tdName.innerHTML = item.val().name

    var tdAge = document.createElement('td')

    tdAge.innerHTML = item.val().age

    //li.appendChild(document.createTextNode(item.val().name + ': ' + item.val().age))

    tr.appendChild(tdName)
    tr.appendChild(tdAge)

    usersTable.appendChild(tr)
  })
})