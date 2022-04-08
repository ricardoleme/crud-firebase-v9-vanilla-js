/**
 * obtemDados.
 * Obtem dados da collection a partir do Firebase.
 * @param {string} collection - Nome da collection no Firebase
 * @return {object} - Uma tabela com os dados obtidos
 */
function obtemDados(collection) {
  var tabela = document.getElementById('tabelaDados')  
  firebase.database().ref(collection).on('value', (snapshot) => {    
    snapshot.forEach(item => {      
      // Cria um novo elemento <tr> e insere na primeira posição da tabela
      var linha = tabela.insertRow(1);
      // Insere novas células (<td> elementos) dentro da linha (<tr>) criada
      var celula1 = linha.insertCell(0);
      var celula2 = linha.insertCell(1);
      var celula3 = linha.insertCell(2);
      var celula4 = linha.insertCell(3);
      // Dados do Firebase
      var db = item.ref.path.pieces_[0] //collection
      var id = item.ref.path.pieces_[1] //id do registro
      // Adiciona conteúdo dentro de cada célula
      celula1.innerHTML = item.val().name
      celula2.innerHTML = item.val().age
      celula3.innerHTML = item.val().email
      celula4.innerHTML = `<button class='btn btn-danger' onclick=remove('${db}','${id}')>Excluir</button>`
    })         
  })
}

function remove(db, id){
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
}

function adiciona(collection, documento){
db.collection(collection).doc("LA").set({
  name: "Los Angeles",
  age: "14",
  email: "la@usa.com"
})
.then(() => {
  console.log("Document successfully written!");
})
.catch((error) => {
  console.error("Error writing document: ", error);
})
}