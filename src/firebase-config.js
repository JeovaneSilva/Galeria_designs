// const URL = "https://api-galeria-designs-backend.vercel.app/"

// async function initFirebase() {
//   try {
//     const response = await fetch('/');
//     const data = await response.json();

//     // Use os dados recebidos diretamente como o objeto Firebase config
//     const app = firebase.initializeApp(data);
//     const auth = app.auth();
//     const storage = app.storage();
//     const database = app.database();

//     return { auth, storage, database };
//   } catch (error) {
//     console.error('Erro ao obter a configuração do Firebase:', error);
//     throw error; // Rejeita a promessa com o erro
//   }
// }

// export const { auth, storage, database } = await initFirebase(); // Importe as variáveis 


const firebaseConfig = {
  apiKey: "AIzaSyC5E8XYNymJJbP9qvYBBobZyKvumqZkd2Y",
  authDomain: "jean-designs.firebaseapp.com",
  databaseURL: "https://jean-designs-default-rtdb.firebaseio.com",
  projectId: "jean-designs",
  storageBucket: "jean-designs.appspot.com",
  messagingSenderId: "605079963145",
  appId: "1:605079963145:web:66f230d23c4476d15e5ad8"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const storage = app.storage();
const database = app.database();

export {auth, storage, database}
