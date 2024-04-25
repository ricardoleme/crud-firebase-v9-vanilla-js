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
    <th>Nome</th>
    <th>Valor</th>
    <th>Dias da Semana</th>    
    <th>Opções</th>`



    snapshot.forEach(item => {
      // Dados do Firebase
      let db = item.ref._delegate._path.pieces_[0] //collection
      let id = item.ref._delegate._path.pieces_[1] //id do registro   
      //Criando as novas linhas na tabela
      let novaLinha = tabela.insertRow()      
      novaLinha.insertCell().innerHTML = '<small>' + item.val().nome + '</small>'      
      novaLinha.insertCell().textContent = new Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(item.val().valor)      
      novaLinha.insertCell().textContent = item.val().diasSemana
      novaLinha.insertCell().innerHTML = `<button class='btn btn-sm btn-danger' onclick=remover('${db}','${id}')><i class="bi bi-trash"></i></button>
      <button class='btn btn-sm btn-warning' onclick=carregaDadosAlteracao('${db}','${id}')><i class="bi bi-pencil-square"></i></button>`

    })
    let rodape = tabela.insertRow()
    rodape.className = 'fundo-laranja-claro'
    rodape.insertCell().colSpan = "3"
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
    document.getElementById('nome').value = snapshot.val().nome || ''
    document.getElementById('valor').value = (parseFloat(snapshot.val().valor || 0)).toFixed(2); // Handle cases where valor might be absent or not a number
    const diasSelecionados = snapshot.val().diasSemana || []; // Handle cases where diasSemana might be absent

    const select = document.getElementById('diasSemana');
    for (const option of select.options) {
      option.selected = diasSelecionados.includes(option.value);
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
  
  if (document.getElementById('nome').value === '') {
    document.getElementById('nome').focus()
    alerta('⚠️É obrigatório informar o nome!', 'warning')
  }
  else if (document.getElementById('nome').value.length < 5) {
    document.getElementById('nome').focus()
    alerta(`⚠️O nome informado é muito curto. <br>Foram informados <strong> ${document.getElementById('nome').value.length} </strong> caracteres. Informe no mínimo 5 caracteres`, 'warning')
  }
  else if (document.getElementById('nome').value.length > 100) {
    document.getElementById('nome').focus()
    alerta(`⚠️O nome informado é muito longo. <br>Foram informados <strong> ${document.getElementById('nome').value.length} </strong> caracteres. Informe no máximo 100 caracteres`, 'warning')
  } 
  else if (document.getElementById('valor').value < 0 || document.getElementById('valor').value > 999.99) { 
    document.getElementById('valor').focus()
    alerta(`⚠️O valor do plano deve ser um número entre 0 a 999.99 e foi informado o valor ${document.getElementById('valor').value}`, 'warning') 
  }  
  else if (document.getElementById('diasSemana').value === '') {
    document.getElementById('diasSemana').focus()
    alerta('⚠️É obrigatório selecionar ao menos um dia da semana para o plano!', 'warning')
  }
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
  //Obtendo os dias selecionados
  const diasSelecionados = Array.from(document.getElementById('diasSemana').selectedOptions)
  .map(option => option.value);

  //Enviando os dados dos campos para o Firebase
  return await firebase.database().ref(collection).push({
    nome: values.nome.toUpperCase(),
    valor: values.valor,
    diasSemana: diasSelecionados,    
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
    //Obtendo os dias selecionados
    const diasSelecionados = Array.from(document.getElementById('diasSemana').selectedOptions)
    .map(option => option.value);
  //Enviando os dados dos campos para o Firebase
  return await firebase.database().ref().child(collection + '/' + values.id).update({
    nome: values.nome.toUpperCase(),
    valor: values.valor,
    diasSemana: diasSelecionados,   
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

// Função para validar o formato da data de nascimento
function validarDataNascimento(dataNascimento) {
  // Converte a string da data de nascimento para um objeto Date
  const dataNascimentoConvertida = new Date(dataNascimento)
  // Verifica se a data de nascimento é válida (não NaN)
  if (isNaN(dataNascimentoConvertida)) {
    return false
  }
  // Obtém a data de hoje
  const dataHoje = new Date()
  // Compara a data de nascimento com a data de hoje
  return dataNascimentoConvertida < dataHoje
}

// Função para validar o formato do email
function validarEmail(email) {
  // Expressão regular para validar o formato do email
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}