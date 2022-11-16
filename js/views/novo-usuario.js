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


 // Atalhos para os elementos DOM - Document Object Model
const formNovoUsuario = document.getElementById('formNovoUsuario')

//Adiciona um Listener no formulário
formNovoUsuario.addEventListener('submit', (event) => {
  const email = document.getElementById('emailNovo').value
  const senha = document.getElementById('senhaNovo').value
  event.preventDefault()
 novoUsuario(email, senha)
}
)