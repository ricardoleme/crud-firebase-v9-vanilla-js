/********************************************** 
* Renomeie este arquivo para firebase.js!
***********************************************/

// Cole as informações do seu RealTime Database do Firebase abaixo:
var firebaseConfig = {
  apiKey: "AIzaSyA5WIcfTiQpTtyTka3VdrpwGTrqvavrPLU",
  authDomain: "fatecitu-pi.firebaseapp.com",
  projectId: "fatecitu-pi",
  storageBucket: "fatecitu-pi.appspot.com",
  messagingSenderId: "980271155195",
  appId: "1:980271155195:web:c47d2e2e5995215b132d5e"
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
var database = firebase.database();