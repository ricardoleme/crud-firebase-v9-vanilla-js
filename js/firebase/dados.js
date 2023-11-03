/**
 * Copyright 2023 Prof. Ms. Ricardo Leme All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict' //modo estrito

/**
 * obtemDados.
 * Obtem dados da collection a partir do Firebase.
 * @param {string} collection - Nome da collection no Firebase
 * @return {object} - Uma tabela com os dados obtidos
 */
async function obtemDados(collection) {
  let spinner = document.getElementById('carregandoDados')
  let tabela = document.getElementById('tabelaDados')
  await firebase.database().ref(collection).orderByChild('nome').on('value', (snapshot) => {
    tabela.innerHTML = ''
    tabela.innerHTML += `<tr class='fundo-laranja-escuro'>    
    <th>Avatar</th>
    <th>Nome</th>
    <th>Nascimento</th>
    <th>Email</th>
    <th>Sexo</th>
    <th>Peso</th>
    <th>Altura</th>
    <th>Opções</th>`



    snapshot.forEach(item => {
      // Dados do Firebase
      let db = item.ref._delegate._path.pieces_[0] //collection
      let id = item.ref._delegate._path.pieces_[1] //id do registro   
      //Criando as novas linhas na tabela
      let novaLinha = tabela.insertRow()
      novaLinha.insertCell().innerHTML = '<img src="' + item.val().foto + '" alt="Avatar do Cliente" class="avatar"/>'
      novaLinha.insertCell().innerHTML = '<small>' + item.val().nome + '</small>'
      novaLinha.insertCell().textContent = new Date(item.val().nascimento).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
      novaLinha.insertCell().innerHTML = '<small>' + item.val().email + '</small>'
      novaLinha.insertCell().textContent = item.val().sexo
      novaLinha.insertCell().textContent = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(item.val().peso)
      novaLinha.insertCell().textContent = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(item.val().altura)
      novaLinha.insertCell().innerHTML = `<button class='btn btn-sm btn-danger' onclick=remover('${db}','${id}')><i class="bi bi-trash"></i></button>
      <button class='btn btn-sm btn-warning' onclick=carregaDadosAlteracao('${db}','${id}')><i class="bi bi-pencil-square"></i></button>`

    })
    let rodape = tabela.insertRow()
    rodape.className = 'fundo-laranja-claro'
    rodape.insertCell().colSpan = "7"
    rodape.insertCell().innerHTML = totalRegistros(collection)

  })
  spinner.classList.add('d-none') //oculta o carregando...
}

/**
 * obtemDados.
 * Obtem dados da collection a partir do Firebase.
 * @param {string} db - Nome da collection no Firebase
 * @param {integer} id - Id do registro no Firebase
 * @return {object} - Os dados do registro serão vinculados aos inputs do formulário.
 */

async function carregaDadosAlteracao(db, id) {
  await firebase.database().ref(db + '/' + id).on('value', (snapshot) => {
    document.getElementById('id').value = id
    document.getElementById('nome').value = snapshot.val().nome
    document.getElementById('cpf').value = snapshot.val().cpf
    document.getElementById('email').value = snapshot.val().email
    document.getElementById('nascimento').value = snapshot.val().nascimento
    document.getElementById('peso').value = snapshot.val().peso
    document.getElementById('altura').value = snapshot.val().altura
    if (snapshot.val().sexo === 'Masculino') {
      document.getElementById('sexoM').checked = true
    } else {
      document.getElementById('sexoF').checked = true
    }
  })

  document.getElementById('nome').focus() //Definimos o foco no campo nome
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
  if (document.getElementById('nome').value === '') { alerta('⚠️É obrigatório informar o nome!', 'warning') }
  else if (document.getElementById('email').value === '') { alerta('⚠️É obrigatório informar o email!', 'warning') }
  else if (document.getElementById('nascimento').value === '') { alerta('⚠️É obrigatório informar o nascimento!', 'warning') }
  else if (document.getElementById('peso').value < 0 || document.getElementById('peso').value > 300) { alerta('⚠️O peso deve ser um número entre 0 a 300', 'warning') }
  else if (document.getElementById('id').value !== '') { alterar(event, collection) }
  else { incluir(event, collection) }
}


async function incluir(event, collection) {
  let usuarioAtual = firebase.auth().currentUser
  let botaoSalvar = document.getElementById('btnSalvar')
  botaoSalvar.innerText = 'Aguarde...'
  event.preventDefault()
  //Obtendo os campos do formulário
  const form = document.forms[0];
  const data = new FormData(form);
  //Obtendo os valores dos campos
  const values = Object.fromEntries(data.entries());
  //obtendo a URL da imagem do avatar do cliente
  let imgSrc = document.querySelector('.img-cliente img').getAttribute('src');
  console.log(imgSrc);
  //Enviando os dados dos campos para o Firebase
  return await firebase.database().ref(collection).push({
    nome: values.nome.toUpperCase(),
    email: values.email.toLowerCase(),
    sexo: values.sexo,
    nascimento: values.nascimento,
    peso: values.peso,
    altura: values.altura,
    cpf: values.cpf,
    foto: imgSrc,
    usuarioInclusao: {
      uid: usuarioAtual.uid,
      nome: usuarioAtual.displayName,
      urlImagem: usuarioAtual.photoURL,
      email: usuarioAtual.email,
      dataInclusao: new Date()
    }
  })
    .then(() => {
      alerta(`✅ Registro incluído com sucesso!`, 'success')
      document.getElementById('formCadastro').reset() //limpa o form
      //Limpamos o avatar do cliente
      let avatar = document.querySelector(".img-cliente");
      avatar.innerHTML = "";
      botaoSalvar.innerHTML = '<i class="bi bi-save-fill"></i> Salvar'
    })
    .catch(error => {
      alerta('❌ Falha ao incluir: ' + error.message, 'danger')
    })

}

async function alterar(event, collection) {
  let usuarioAtual = firebase.auth().currentUser
  let botaoSalvar = document.getElementById('btnSalvar')
  botaoSalvar.innerText = 'Aguarde...'
  event.preventDefault()
  //Obtendo os campos do formulário
  const form = document.forms[0];
  const data = new FormData(form);
  //Obtendo os valores dos campos
  const values = Object.fromEntries(data.entries());
  //Enviando os dados dos campos para o Firebase
  return await firebase.database().ref().child(collection + '/' + values.id).update({
    nome: values.nome.toUpperCase(),
    email: values.email.toLowerCase(),
    sexo: values.sexo,
    nascimento: values.nascimento,
    peso: values.peso,
    altura: values.altura,
    cpf: values.cpf,
    usuarioAlteracao: {
      uid: usuarioAtual.uid,
      nome: usuarioAtual.displayName,
      urlImagem: usuarioAtual.photoURL,
      email: usuarioAtual.email,
      dataAlteracao: new Date()
    }
  })
    .then(() => {
      alerta('✅ Registro alterado com sucesso!', 'success')
      document.getElementById('formCadastro').reset()
      document.getElementById('id').value = ''
      botaoSalvar.innerHTML = '<i class="bi bi-save-fill"></i> Salvar'
    })
    .catch(error => {
      console.error(error.code)
      console.error(error.message)
      alerta('❌ Falha ao alterar: ' + error.message, 'danger')
    })
}

/**
 * remover.
 * Remove os dados da collection a partir do id passado.
 * @param {string} db - Nome da collection no Firebase
 * @param {integer} id - Id do registro no Firebase
 * @return {null} - Snapshot atualizado dos dados
 */
async function remover(db, id) {
  if (window.confirm("⚠️Confirma a exclusão do registro?")) {
    let dadoExclusao = await firebase.database().ref().child(db + '/' + id)
    dadoExclusao.remove()
      .then(() => {
        alerta('✅ Registro removido com sucesso!', 'success')
      })
      .catch(error => {
        console.error(error.code)
        console.error(error.message)
        alerta('❌ Falha ao excluir: ' + error.message, 'danger')
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
  let retorno = '...'
  firebase.database().ref(collection).on('value', (snap) => {
    if (snap.numChildren() === 0) {
      retorno = '⚠️ Ainda não há nenhum registro cadastrado!'
    } else {
      retorno = `Total: <span class="badge fundo-laranja-escuro"> ${snap.numChildren()} </span>`
    }
  })
  return retorno
}

/**
 * Formata o valor do campo de CPF com pontos e traço enquanto o usuário digita os dados.
 *
 * @param {object} campo - O campo de entrada do CPF.
 */
function formatarCPF(campo) {
  // Remove caracteres não numéricos
  let cpf = campo.value.replace(/\D/g, '');

  // Adiciona pontos e traço conforme o usuário digita
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  // Atualiza o valor do campo
  campo.value = cpf;
}


/**
 * Filtra os elementos de uma tabela com base no valor inserido em um campo de filtro.
 *
 * @param {string} idFiltro - O ID do campo de filtro de entrada.
 * @param {string} idTabela - O ID da tabela que será filtrada.
 */
function filtrarTabela(idFiltro, idTabela) {
  var input, filter, table, tr, td, i, j, txtValue;
  input = document.getElementById(idFiltro);
  filter = input.value.toUpperCase();
  table = document.getElementById(idTabela);
  tr = table.getElementsByTagName("tr");

  for (i = 1; i < tr.length; i++) {
    tr[i].style.display = "none"; // Oculte todas as linhas do corpo da tabela inicialmente.
    for (j = 0; j < tr[i].cells.length; j++) {
      td = tr[i].cells[j];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = ""; // Exiba a linha se houver correspondência.
          break; // Saia do loop interno quando encontrar uma correspondência.
        }
      }
    }
  }
}
