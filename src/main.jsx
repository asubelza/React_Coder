import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOHMWEoBPCLVhxH4gO9_mEcV8DbcmsgSU",
  authDomain: "onepiecestore-e2990.firebaseapp.com",
  projectId: "onepiecestore-e2990",
  storageBucket: "onepiecestore-e2990.firebasestorage.app",
  messagingSenderId: "907379384217",
  appId: "1:907379384217:web:42210f2a7f1530206efd08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render(
  <App />
)
