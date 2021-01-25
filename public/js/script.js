var firebaseConfig = {
  apiKey: "AIzaSyCQoqxsOC_ogaIXEGbUTqVKkIgU5FCpJlg",
  authDomain: "firstcrudfirebase.firebaseapp.com",
  projectId: "firstcrudfirebase",
  databaseURL: "https://firstcrudfirebase-default-rtdb.firebaseio.com/",
  storageBucket: "firstcrudfirebase.appspot.com",
  messagingSenderId: "735658657430",
  appId: "1:735658657430:web:11542ec962a8033d42a4b7",
  measurementId: "G-GH19RCWVXX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();