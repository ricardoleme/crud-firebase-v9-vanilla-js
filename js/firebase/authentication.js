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
 * Essa constante retorna a URL do App sem nenhum nome de arquivo.
 * A expressão regular /\/[^\/]*$/ captura a barra (/) seguida por qualquer caractere que não seja uma barra zero ou mais vezes até o 
 * final da string, que é o nome do arquivo na URL. O método replace() substitui esse trecho da string por uma string vazia, removendo o nome do arquivo da URL.
 * Por exemplo, se a URL atual for https://www.exemplo.com.br/pasta/subpasta/arquivo.html, 
 * o valor retornado será https://www.exemplo.com.br/pasta/subpasta.
 * @const {string}
 */
const urlApp = window.location.href.replace(/\/[^\/]*$/, '');


/**
 * novoUsuario.
 * Cria um novo usuário no Firebase.
 * @param {string} email e-mail do usuário
 * @param {string} senha Senha do usuário
 * @return {object} O usuário criado
 */
function novoUsuario(email, senha) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, senha)
    .then((result) => {
      console.log(`Usuário Logado: ${JSON.stringify(result.user)}`)
      window.location.href = `${urlApp}/home.html` //Direcionamos o usuário para a tela inicial
    })
    .catch(error => {
      console.error(error.code)
      console.error(error.message)
      alerta(`Erro: Não foi possível cadastrar o usuário <br> ${errors[error.code]}`, 'danger')
    })
}

/**
 * loginFirebase.
 * Realiza a autenticação do usuário no Firebase.
 * @param {string} email e-mail do usuário
 * @param {string} senha Senha do usuário
 * @return {object} O usuário logado
 */
function loginFirebase(email, senha) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, senha)
    .then(result => {
      console.log(result.user)
      window.location.href = `${urlApp}/home.html`
    })
    .catch(error => {
      console.error(error.code)
      alerta(`Erro: Não foi possível efetuar o login <br> ${errors[error.code]}`, 'danger')
    })
}

/**
 * loginGoogle.
 * Realiza a autenticação do usuário utilizando a conta Google do mesmo.
 * @return {object} O usuário logado
 */
function loginGoogle() {
  //Não esqueça de adicionar também o endereço 127.0.0.1 em Authentication/Settings no Firebase para poder rodar localmente

  const provider = new firebase.auth.GoogleAuthProvider()
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      console.log(`Usuário Google: ${JSON.stringify(result.user)}`)
      window.location.href = `${urlApp}/home.html`
    }).catch((error) => {
      alerta(`Erro: Não foi possível efetuar o login <br> ${errors[error.code]}`, 'danger')
    })
}

/**
 * logoutFirebase.
 * Realiza o logout do usuário no Firebase.
 * @return {null} Redireciona o usuário para o login
 */
function logoutFirebase() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      window.location.href = `${urlApp}/`
      localStorage.removeItem('usuarioId') //Remove o id do usuário atual no Local Storage
    })
    .catch(function (error) {
      alerta(`Erro: Não foi possível efetuar o logout <br> ${errors[error.code]}`, 'danger')
    });
}

/**
 * verificaLogado.
 * Verifica se o usuário deve ter acesso a página que será carregada
 * @return {null} Caso não esteja logado, redireciona para o início
 */
function verificaLogado() {
  firebase
    .auth()
    .onAuthStateChanged(user => {
      if (user) {
        //Salva o id do usuário atual no Local Storage
        localStorage.setItem('usuarioId', user.uid) 
        //Salvamos os dados do usuário logado na collection usuarios
        salvaDadosUsuario(user.uid, user.displayName, user.email, user.photoURL)
        //Coloca a foto do usuário ao lado do botáo Logout
        let imagemUsuario = document.getElementById('imagemUsuario')
        user.photoURL ? imagemUsuario.innerHTML = `<img src="${user.photoURL}" alt="Foto do Usuário" title="${user.displayName}" class="img rounded-circle pe-2 .d-sm-none" width="48" />`
                      : imagemUsuario.innerHTML = `<img src="https://robohash.org/${user.email}" alt="Foto do Usuário" title="${user.email}" class="img rounded-circle pe-2" width="48" />`
      } else {
        console.error('Usuário não logado. Redirecionando...')
        window.location.href = `${urlApp}/`
      }
    })
}

/**
 * salvaDadosUsuario.
 * Salva os dados do usuário corrente
 * @param {integer} id id do usuário
 * @param {string} nome Nome Completo do usuário
 * @param {string} email E-mail do usuário
 * @param {string} imagemUrl URL da imagem do usuário
 * @return {null} Salva o usuário logado na collection usuarios
 */
 function salvaDadosUsuario(id, nome, email, imagemUrl) {
  firebase.database().ref('usuarios/' + id).set({
    usuario: nome,
    email: email,
    imagemPerfil : imagemUrl,
    ultimoAcesso: new Date()
  });
}


/**
 * errors.
 * Constante com a tradução em pt-BR dos principais erros de autenticação
 **/
const errors = {
  'auth/app-deleted': 'O banco de dados não foi localizado.',
  'auth/expired-action-code': 'O código da ação o ou link expirou.',
  'auth/invalid-action-code': 'O código da ação é inválido. Isso pode acontecer se o código estiver malformado ou já tiver sido usado.',
  'auth/user-disabled': 'O usuário correspondente à credencial fornecida foi desativado.',
  'auth/user-not-found': 'O usuário não correponde à nenhuma credencial.',
  'auth/weak-password': 'A senha é muito fraca.',
  'auth/email-already-in-use': 'Já existi uma conta com o endereço de email fornecido.',
  'auth/invalid-email': 'O endereço de e-mail não é válido.',
  'auth/operation-not-allowed': 'O tipo de conta correspondente à esta credencial, ainda não encontra-se ativada.',
  'auth/account-exists-with-different-credential': 'E-mail já associado a outra conta.',
  'auth/auth-domain-config-required': 'A configuração para autenticação não foi fornecida.',
  'auth/credential-already-in-use': 'Já existe uma conta para esta credencial.',
  'auth/operation-not-supported-in-this-environment': 'Esta operação não é suportada no ambiente que está sendo executada. Verifique se deve ser http ou https.',
  'auth/timeout': 'Excedido o tempo de resposta. O domínio pode não estar autorizado para realizar operações.',
  'auth/missing-android-pkg-name': 'Deve ser fornecido um nome de pacote para instalação do aplicativo Android.',
  'auth/missing-continue-uri': 'A próxima URL deve ser fornecida na solicitação.',
  'auth/missing-ios-bundle-id': 'Deve ser fornecido um nome de pacote para instalação do aplicativo iOS.',
  'auth/invalid-continue-uri': 'A próxima URL fornecida na solicitação é inválida.',
  'auth/unauthorized-continue-uri': 'O domínio da próxima URL não está na lista de autorizações.',
  'auth/invalid-dynamic-link-domain': 'O domínio de link dinâmico fornecido, não está autorizado ou configurado no projeto atual.',
  'auth/argument-error': 'Verifique a configuração de link para o aplicativo.',
  'auth/invalid-persistence-type': 'O tipo especificado para a persistência dos dados é inválido.',
  'auth/unsupported-persistence-type': 'O ambiente atual não suportar o tipo especificado para persistência dos dados.',
  'auth/invalid-credential': 'A credencial expirou ou está mal formada.',
  'auth/wrong-password': 'Senha incorreta.',
  'auth/invalid-verification-code': 'O código de verificação da credencial não é válido.',
  'auth/invalid-verification-id': 'O ID de verificação da credencial não é válido.',
  'auth/custom-token-mismatch': 'O token está diferente do padrão solicitado.',
  'auth/invalid-custom-token': 'O token fornecido não é válido.',
  'auth/captcha-check-failed': 'O token de resposta do reCAPTCHA não é válido, expirou ou o domínio não é permitido.',
  'auth/invalid-phone-number': 'O número de telefone está em um formato inválido (padrão E.164).',
  'auth/missing-phone-number': 'O número de telefone é requerido.',
  'auth/quota-exceeded': 'A cota de SMS foi excedida.',
  'auth/cancelled-popup-request': 'Somente uma solicitação de janela pop-up é permitida de uma só vez.',
  'auth/popup-blocked': 'A janela pop-up foi bloqueado pelo navegador.',
  'auth/popup-closed-by-user': 'A janela pop-up foi fechada pelo usuário sem concluir o login no provedor.',
  'auth/unauthorized-domain': 'O domínio do aplicativo não está autorizado para realizar operações.',
  'auth/invalid-user-token': 'O usuário atual não foi identificado.',
  'auth/user-token-expired': 'O token do usuário atual expirou.',
  'auth/null-user': 'O usuário atual é nulo.',
  'auth/app-not-authorized': 'Aplicação não autorizada para autenticar com a chave informada.',
  'auth/invalid-api-key': 'A chave da API fornecida é inválida.',
  'auth/network-request-failed': 'Falha de conexão com a rede.',
  'auth/requires-recent-login': 'O último horário de acesso do usuário não atende ao limite de segurança.',
  'auth/too-many-requests': 'As solicitações foram bloqueadas devido a atividades incomuns. Tente novamente depois que algum tempo.',
  'auth/web-storage-unsupported': 'O navegador não suporta armazenamento ou se o usuário desativou este recurso.',
  'auth/invalid-claims': 'Os atributos de cadastro personalizado são inválidos.',
  'auth/claims-too-large': 'O tamanho da requisição excede o tamanho máximo permitido de 1 Megabyte.',
  'auth/id-token-expired': 'O token informado expirou.',
  'auth/id-token-revoked': 'O token informado perdeu a validade.',
  'auth/invalid-argument': 'Um argumento inválido foi fornecido a um método.',
  'auth/invalid-creation-time': 'O horário da criação precisa ser uma data UTC válida.',
  'auth/invalid-disabled-field': 'A propriedade para usuário desabilitado é inválida.',
  'auth/invalid-display-name': 'O nome do usuário é inválido.',
  'auth/invalid-email-verified': 'O e-mail é inválido.',
  'auth/invalid-hash-algorithm': 'O algoritmo de HASH não é uma criptografia compatível.',
  'auth/invalid-hash-block-size': 'O tamanho do bloco de HASH não é válido.',
  'auth/invalid-hash-derived-key-length': 'O tamanho da chave derivada do HASH não é válido.',
  'auth/invalid-hash-key': 'A chave de HASH precisa ter um buffer de byte válido.',
  'auth/invalid-hash-memory-cost': 'O custo da memória HASH não é válido.',
  'auth/invalid-hash-parallelization': 'O carregamento em paralelo do HASH não é válido.',
  'auth/invalid-hash-rounds': 'O arredondamento de HASH não é válido.',
  'auth/invalid-hash-salt-separator': 'O campo do separador de SALT do algoritmo de geração de HASH precisa ser um buffer de byte válido.',
  'auth/invalid-id-token': 'O código do token informado não é válido.',
  'auth/invalid-last-sign-in-time': 'O último horário de login precisa ser uma data UTC válida.',
  'auth/invalid-page-token': 'A próxima URL fornecida na solicitação é inválida.',
  'auth/invalid-password': 'A senha é inválida, precisa ter pelo menos 6 caracteres.',
  'auth/invalid-password-hash': 'O HASH da senha não é válida.',
  'auth/invalid-password-salt': 'O SALT da senha não é válido.',
  'auth/invalid-photo-url': 'A URL da foto de usuário é inválido.',
  'auth/invalid-provider-id': 'O identificador de provedor não é compatível.',
  'auth/invalid-session-cookie-duration': 'A duração do COOKIE da sessão precisa ser um número válido em milissegundos, entre 5 minutos e 2 semanas.',
  'auth/invalid-uid': 'O identificador fornecido deve ter no máximo 128 caracteres.',
  'auth/invalid-user-import': 'O registro do usuário a ser importado não é válido.',
  'auth/invalid-provider-data': 'O provedor de dados não é válido.',
  'auth/maximum-user-count-exceeded': 'O número máximo permitido de usuários a serem importados foi excedido.',
  'auth/missing-hash-algorithm': 'É necessário fornecer o algoritmo de geração de HASH e seus parâmetros para importar usuários.',
  'auth/missing-uid': 'Um identificador é necessário para a operação atual.',
  'auth/reserved-claims': 'Uma ou mais propriedades personalizadas fornecidas usaram palavras reservadas.',
  'auth/session-cookie-revoked': 'O COOKIE da sessão perdeu a validade.',
  'auth/uid-alread-exists': 'O indentificador fornecido já está em uso.',
  'auth/email-already-exists': 'O e-mail fornecido já está em uso.',
  'auth/phone-number-already-exists': 'O telefone fornecido já está em uso.',
  'auth/project-not-found': 'Nenhum projeto foi encontrado.',
  'auth/insufficient-permission': 'A credencial utilizada não tem permissão para acessar o recurso solicitado.',
  'auth/internal-error': 'O servidor de autenticação encontrou um erro inesperado ao tentar processar a solicitação.'
}
