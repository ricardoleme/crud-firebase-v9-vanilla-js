/**
 * obtemDados.
 * Obtem dados da collection a partir do Firebase.
 * @param {string} collection - Nome da collection no Firebase
 * @return {object} - Uma tabela com os dados obtidos
 */
function obtemDados(collection) {
  var tabela = document.getElementById('tabelaDados')
  firebase.database().ref(collection).on('value', (snapshot) => {
    tabela.innerHTML = ''
    let cabecalho = tabela.insertRow()
    cabecalho.className = 'table-info'
    cabecalho.insertCell().textContent = 'Nome'
    cabecalho.insertCell().textContent = 'Idade'
    cabecalho.insertCell().textContent = 'Email'
    cabecalho.insertCell().innerHTML = 'Opções'

    snapshot.forEach(item => {
      // Dados do Firebase
      let db = item.ref.path.pieces_[0] //collection
      let id = item.ref.path.pieces_[1] //id do registro   
      let registro = JSON.parse(JSON.stringify(item.val()))
      //Criando as novas linhas na tabela
      let novaLinha = tabela.insertRow()
      novaLinha.insertCell().textContent = item.val().name
      novaLinha.insertCell().textContent = item.val().age
      novaLinha.insertCell().textContent = item.val().email
      novaLinha.insertCell().innerHTML = `<button class='btn btn-sm btn-danger' onclick=remover('${db}','${id}')>🗑 Excluir</button>
      <button class='btn btn-sm btn-info' onclick=carregaDadosAlteracao('${db}','${id}')>✏️ Editar</button>`

    })
    let rodape = tabela.insertRow()
    rodape.className = 'table-info'
    rodape.insertCell().textContent = ''
    rodape.insertCell().textContent = ''
    rodape.insertCell().textContent = ''
    rodape.insertCell().innerHTML = totalRegistros(collection)
  })
}

/**
 * remover.
 * Remove os dados da collection a partir do id passado.
 * @param {string} db - Nome da collection no Firebase
 * @param {integer} id - Id do registro no Firebase
 * @return {null} - Snapshot atualizado dos dados
 */
function remover(db, id) {
  if (window.confirm("⚠️Confirma a exclusão do registro?")) {
  let dadoExclusao = firebase.database().ref().child(db + '/' + id)
  dadoExclusao.remove()
    .then(() => {
      alert('✅ Registro removido com sucesso!')
      new bootstrap.Alert('aoagai')
    })
    .catch(error => {
      console.log(error.code)
      console.log(error.message)
      alert('❌ Falha ao excluir: ' + error.message)
    })
}
}

/**
 * incluir.
 * Inclui os dados do formulário na collection do Firebase.
 * @param {object} event - Evento do objeto clicado
 * @param {string} collection - Nome da collection no Firebase
 * @return {null} - Snapshot atualizado dos dados
 */

function incluir(event, collection) {
  event.preventDefault()
  //Obtendo os campos do formulário
  const form = document.forms[0];
  const data = new FormData(form);
  //Obtendo os valores dos campos
  const values = Object.fromEntries(data.entries());
  //Enviando os dados dos campos para o Firebase
  //firebase.database().ref('data').set({name:name});
  return firebase.database().ref(collection).push(values)
    .then(() => {
      alert('✅ Registro cadastrado com sucesso!')
      document.getElementById('formCadastro').reset()
    })
    .catch(error => {
      console.log(error.code)
      console.log(error.message)
      alert('❌ Falha ao cadastrar: ' + error.message)
    })
}

function carregaDadosAlteracao(db, id) {
  firebase.database().ref(db).on('value', (snapshot) => {
      snapshot.forEach(item => {
      if(item.ref.path.pieces_[1] === id){
        document.getElementById('name').value = item.val().name
        document.getElementById('email').value = item.val().email
        document.getElementById('age').value = item.val().age


      }
    })
  })
}

function totalRegistros(collection){
  var retorno = '...'
  firebase.database().ref(collection).on('value',(snap)=>{
    if(snap.numChildren()===0){
      retorno = '⚠️ Ainda não há nenhum registro cadastrado!'
    } else {
    retorno =  `Total de Registros: <span class="badge bg-primary"> ${snap.numChildren()} </span>`
    }
  })
  return retorno
}