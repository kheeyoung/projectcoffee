// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';


const firebaseConfig = {
    apiKey: "AIzaSyBUL5n2TjoroAaWa6IKvdCWWwK2sqd3UMw",
    authDomain: "projectcoffee-27885.firebaseapp.com",
    projectId: "projectcoffee-27885",
    storageBucket: "projectcoffee-27885.appspot.com",
    messagingSenderId: "79885377304",
    appId: "1:79885377304:web:16d7d8c0160198059d486d"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set };
