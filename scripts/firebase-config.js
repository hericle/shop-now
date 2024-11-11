import { initializeApp } from "firebase/app"; // Importa a função para inicializar o Firebase
import { getAuth } from "firebase/auth"; // Importa a função para autenticação
import { getDatabase } from "firebase/database"; // Importa a função para o banco de dados em tempo real

const firebaseConfig = {
  apiKey: "AIzaSyAVLyrTKTAolmrOKh7RxjUoJu_A4BtaXEI",
  authDomain: "shop-now-585dc.firebaseapp.com",
  databaseURL: "https://shop-now-585dc-default-rtdb.firebaseio.com",
  projectId: "shop-now-585dc",
  storageBucket: "shop-now-585dc.appspot.com", // Corrigido: bucket deve ser .appspot.com
  messagingSenderId: "899190490509",
  appId: "1:899190490509:web:f1e7572b5d81586488e9c4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Inicializa a autenticação
const db = getDatabase(app); // Inicializa o banco de dados em tempo real

export { auth, db }; // Exporta as instâncias de autenticação e banco de dados
