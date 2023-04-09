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

/*
Acesse as Regras do Storage e permita o upload apenas para usuários autenticados:

rules_version = '2';
service firebase.storage {
 match /b/{bucket}/o {
   match /{allPaths=**} {
     allow read, write: if request.auth != null;
   }
 }
}

*/

/**
 * Efetua o upload de uma imagem para o Firebase Storage e exibe a imagem na tela.
 * @param {File} arquivo - O arquivo de imagem que será enviado.
 * @param {string} nomeArquivo - O nome que será dado ao arquivo no Firebase Storage.
 * @throws {Error} Se o tamanho do arquivo for maior do que o máximo permitido (1 MB) ou se não for uma imagem válida.
 * @returns {void}
 */
function uploadImagem(arquivo, nomeArquivo) {
  // verifica se o tamanho do arquivo é menor ou igual ao máximo permitido (1 MB = 1.000.000 bytes)
  if (arquivo.size > 1000000) {
    alerta('O arquivo selecionado é maior do que o máximo permitido (1 MB)', 'danger')
    throw new Error('O arquivo selecionado é maior do que o máximo permitido (1 MB)');
  }
  // verifica se a extensao do arquivo é uma imagem
  const extensoesImagem = ['jpg', 'jpeg', 'png', 'gif'];
  const extensao = nomeArquivo.split('.').pop().toLowerCase();
  if (!extensoesImagem.includes(extensao)) {
    alerta('O arquivo selecionado não é uma imagem', 'danger');
    throw new Error('O arquivo selecionado não é uma imagem');
  }

  // Crie uma referência para o arquivo no armazenamento e efetua o upload
  const uploadTask = storageRef.child('clientes/' + nomeArquivo).put(arquivo);

  uploadTask.on('state_changed', function (snapshot) {
    var progresso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Progresso do upload: ' + progresso.toFixed(2) + '%');
  }, function (error) {
    // ocorreu um erro durante o upload
    console.error('Erro ao enviar o arquivo:', error);
  }, function () {
    // upload completo, obtém o caminho completo da imagem
    uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
      let img = document.createElement("img");
      img.src = downloadURL;
      img.alt = "Avatar";
      img.classList.add("avatar");
      var avatar = document.querySelector(".img-cliente");
      avatar.innerHTML = "";
      avatar.appendChild(img);
      console.log('Caminho completo da imagem:', downloadURL);
    });
  });
  return
}

// Selecione o input file do HTML
const inputFile = document.querySelector('input[type="file"]');

// Quando o usuário selecionar um arquivo, faça o upload para o Firebase
inputFile.addEventListener('change', (event) => {
  const arquivo = event.target.files[0];
  const nomeArquivo = arquivo.name;
  uploadImagem(arquivo, nomeArquivo)
});

/* Será necessário habilitar o CORS
https://developer.bitmovin.com/encoding/docs/how-do-i-set-up-cors-for-my-google-cloud-storage-bucket

Para listar o Bucket name: 
gsutil ls 

*/
