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
    cabecalho.insertCell().textContent = 'Nascimento'
    cabecalho.insertCell().textContent = 'Email'
    cabecalho.insertCell().textContent = 'Sexo'
    cabecalho.insertCell().textContent = 'Salário'
    cabecalho.insertCell().innerHTML = 'Opções'

    snapshot.forEach(item => {
      // Dados do Firebase
      let db = item.ref.path.pieces_[0] //collection
      let id = item.ref.path.pieces_[1] //id do registro   
      let registro = JSON.parse(JSON.stringify(item.val()))
      //Criando as novas linhas na tabela
      let novaLinha = tabela.insertRow()
      novaLinha.insertCell().textContent = item.val().nome
      novaLinha.insertCell().textContent = item.val().nascimento
      novaLinha.insertCell().textContent = item.val().email
      novaLinha.insertCell().textContent = item.val().sexo
      novaLinha.insertCell().textContent = item.val().salario
      novaLinha.insertCell().innerHTML = `<button class='btn btn-sm btn-danger' onclick=remover('${db}','${id}')>🗑 Excluir</button>
      <button class='btn btn-sm btn-info' onclick=carregaDadosAlteracao('${db}','${id}')>✏️ Editar</button>`

    })
    let rodape = tabela.insertRow()
    rodape.className = 'table-info'
    rodape.insertCell().textContent = ''
    rodape.insertCell().textContent = ''
    rodape.insertCell().textContent = ''
    rodape.insertCell().textContent = ''
    rodape.insertCell().textContent = ''
    rodape.insertCell().innerHTML = totalRegistros(collection)
  })
}

/**
 * obtemDados.
 * Obtem dados da collection a partir do Firebase.
 * @param {string} db - Nome da collection no Firebase
 * @param {integer} id - Id do registro no Firebase
 * @return {object} - Os dados do registro serão vinculados aos inputs do formulário.
 */

function carregaDadosAlteracao(db, id) {
  firebase.database().ref(db).on('value', (snapshot) => {
    snapshot.forEach(item => {
      if (item.ref.path.pieces_[1] === id) {
        document.getElementById('id').value = item.ref.path.pieces_[1]
        document.getElementById('nome').value = item.val().nome
        document.getElementById('email').value = item.val().email
        document.getElementById('nascimento').value = item.val().nascimento
        document.getElementById('salario').value = item.val().salario
        if(item.val().sexo==='Masculino'){ 
          document.getElementById('sexoM').checked = true
        } else {
          document.getElementById('sexoF').checked = true
        }
      }
    })
  })
}



/**
 * incluir.
 * Inclui os dados do formulário na collection do Firebase.
 * @param {object} event - Evento do objeto clicado
 * @param {string} collection - Nome da collection no Firebase
 * @return {null} - Snapshot atualizado dos dados
 */

function salvar(event, collection) {
  event.preventDefault() // evita que o formulário seja recarregado
  //Verifica os campos obrigatórios
  if (document.getElementById('nome').value === '') { alert('⚠️É obrigatório informar o nome!') }
  else if (document.getElementById('email').value === '') { alert('⚠️É obrigatório informar o email!') }
  else if (document.getElementById('nascimento').value === '') { alert('⚠️É obrigatório informar o nascimento!') }
  else if (document.getElementById('salario').value === '') { alert('⚠️É obrigatório informar o salário!') }
  else if (document.getElementById('id').value !== '') { alterar(event, collection) }
  else { incluir(event, collection) }
}


function incluir(event, collection) {
  event.preventDefault()
  //Obtendo os campos do formulário
  const form = document.forms[0];
  const data = new FormData(form);
  //Obtendo os valores dos campos
  const values = Object.fromEntries(data.entries());
  //Enviando os dados dos campos para o Firebase
  return firebase.database().ref(collection).push(values)
    .then(() => {
      alert('✅ Registro cadastrado com sucesso!')
      document.getElementById('formCadastro').reset()
    })
    .catch(error => {
      console.log(error.code)
      console.log(error.message)
      alert('❌ Falha ao incluir: ' + error.message)
    })
}

function alterar(event, collection) {
  event.preventDefault()
  //Obtendo os campos do formulário
  const form = document.forms[0];
  const data = new FormData(form);
  //Obtendo os valores dos campos
  const values = Object.fromEntries(data.entries());
  console.log(values)
  //Enviando os dados dos campos para o Firebase
  return firebase.database().ref().child(collection + '/' + values.id).update({
    nome: values.nome,
    email: values.email,
    sexo: values.sexo,
    nascimento: values.nascimento,
    salario: values.salario
  })
    .then(() => {
      alert('✅ Registro alterado com sucesso!')
      document.getElementById('formCadastro').reset()
    })
    .catch(error => {
      console.log(error.code)
      console.log(error.message)
      alert('❌ Falha ao alterar: ' + error.message)
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
 * totalRegistros
 * Retornar a contagem do total de registros da collection informada
 * @param {string} collection - Nome da collection no Firebase
 * @param {integer} id - Id do registro no Firebase
 * @return {null} - Snapshot atualizado dos dados
 */

function totalRegistros(collection) {
  var retorno = '...'
  firebase.database().ref(collection).on('value', (snap) => {
    if (snap.numChildren() === 0) {
      retorno = '⚠️ Ainda não há nenhum registro cadastrado!'
    } else {
      retorno = `Total de Registros: <span class="badge bg-primary"> ${snap.numChildren()} </span>`
    }
  })
  return retorno
}