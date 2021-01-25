# Firebase CRUD

The application's goal is make a CRUD (Create, Read, Update, Delete) of data using real time database in firebase. 

## Table of Contents
- [Firebase CRUD](#firebase-crud)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Firebase SDK](#firebase-sdk)
    - [Hosting](#hosting)
    - [Using Firebase CLI](#using-firebase-cli)
  - [How it works](#how-it-works)
  - [firstcrudfirebase](#firstcrudfirebase)
  - [Clone](#clone)
  - [Contributing](#contributing)
  - [License](#license)

## Getting Started

In the Firebase console, click Add project, then select or enter a Project name. In the center of the Firebase console's project overview page, click the Web icon to launch the setup workflow. 

### Firebase SDK
For this application, we add Firebase SDKs from the CDN:

```
<body>
  <!-- Insert these scripts at the bottom of the HTML, but before you use any Firebase services -->

  <!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
  <script src="https://www.gstatic.com/firebasejs/8.2.4/firebase-app.js"></script>

  <!-- If you enabled Analytics in your project, add the Firebase SDK for Analytics -->
  <script src="https://www.gstatic.com/firebasejs/8.2.4/firebase-analytics.js"></script>

  <!-- Add Firebase products that you want to use -->
  <script src="https://www.gstatic.com/firebasejs/8.2.4/firebase-auth.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.2.4/firebase-database.js"></script>
</body>
```
Initialize Firebase in your app:
```
<body>
  <!-- Previously loaded Firebase SDKs -->

  <script>
    // TODO: Replace the following with your app's Firebase project configuration

    var firebaseConfig = {
      apiKey: "API_KEY",
      authDomain: "PROJECT_ID.firebaseapp.com",
      databaseURL: "https://PROJECT_ID.firebaseio.com",
      projectId: "PROJECT_ID",
      storageBucket: "PROJECT_ID.appspot.com",
      messagingSenderId: "SENDER_ID",
      appId: "APP_ID",
      measurementId: "G-MEASUREMENT_ID",
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  </script>
</body>
```
### Hosting
If you linked your Firebase Web App with a Firebase Hosting site, you can deploy your site's content and configuration now (when setting up your Web App) or anytime later.

To deploy to Firebase, you'll use the Firebase CLI, a command-line tool.

### Using Firebase CLI
Install the CLI:
```
npm install -g firebase-tools
```
Login:
```
firebase login
```
Init:
```
firebase init
```
Deploy:
```
firebase deploy
```
For each command, you can adequate the configurations according your project.

## How it works

This page was created using only Vanilla Javascript, HTML5, CSS3 and Bootstrap, therefore for visualizing this page access:

## [firstcrudfirebase](https://firstcrudfirebase.web.app/)

## Clone
Clone this repository to your local machine using https://github.com/GCMoura/first-crud-firebase.git.

## Contributing
If you would like to contribute, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---
Made by Gabriel Moura. [Get in touch!](https://www.linkedin.com/in/gabriel-moura-b45b90150/)