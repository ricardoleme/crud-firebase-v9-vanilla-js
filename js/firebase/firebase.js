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

/********************************************** 
* Renomeie este arquivo para firebase.js!
***********************************************/

// Cole as informações do seu RealTime Database do Firebase abaixo:
const firebaseConfig = {
  apiKey: "AIzaSyAg9EaCqvHmCShQllvy4FOPedRRS6-eMSo",
  authDomain: "crud-firebase-vanilla-js.firebaseapp.com",
  databaseURL: "https://crud-firebase-vanilla-js-default-rtdb.firebaseio.com",
  projectId: "crud-firebase-vanilla-js",
  storageBucket: "crud-firebase-vanilla-js.appspot.com",
  messagingSenderId: "595096453227",
  appId: "1:595096453227:web:a73295471f9e9a3b74f12e"
};


/*
* Nas regras do Realtime Database, informe:
* {
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
*/

// Inicializando o Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
