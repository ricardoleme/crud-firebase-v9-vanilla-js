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
 * alerta.
 * Cria uma mensagem de alerta utilizando o Bootstrap 5
 * @param {string} mensagem Mensagem de Alerta
 * @param {string} tipo Tipo do Alerta (danger, success, warning ou primary)
 * @return {string} Cria na div mensagemAlerta o elemento 
 */
function alerta(mensagem, tipo) {
    let mensagemAlerta = document.getElementById('mensagemAlerta')
    let wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + tipo + ' alert-dismissible m-3" role="alert">' + mensagem + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    mensagemAlerta.append(wrapper)
    //Auto Close após 3 segundos
    window.setTimeout(function () {
      wrapper.innerHTML = ''
    }, 3000);
    //Iremos fazer o scroll até a div da mensagem
        mensagemAlerta.scrollIntoView();
  }

 