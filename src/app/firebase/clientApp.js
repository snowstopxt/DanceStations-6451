import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  collection,
  getFirestore, 
  doc,
  setDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCaBqTXR0IcD3qYuWdt3pwD_SeJFz0AbZQ",
    authDomain: "dancestations-d5b02.firebaseapp.com",
    projectId: "dancestations-d5b02",
    storageBucket: "dancestations-d5b02.appspot.com",
    messagingSenderId: "988002424763",
    appId: "1:988002424763:web:3bc00d2816f374ecba569e"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);
const db  = getFirestore()

// const uploadProcessedData = async () => {
//   const dataToUpload = {
//     name: 'Studio 1',
//     mrt: 'Buona Vista',
//     size: 100,
//     price: 50
//   };
//   try {
//     const document = doc(db, 'studios');
//     let dataUpdated = await setDoc(document, dataToUpload);
//     return dataUpdated;
//   } catch (err) {
//     console.log(err.message)
//   }
// };



// collection ref

const getData = async () => {
  try {
    const colRef = collection(db, 'studios');
    const studiosData = [];
    const q = query(colRef);
    const docSnap = await getDocs(q);

    docSnap.forEach((doc) => {
      const data = doc.data();
      const lat = data.location.latitude
      const lng = data.location.longitude
      studiosData.push({...data, lat, lng});
    });
    return studiosData;
  } catch (error) {
    console.log(error.message);
  }
};


export{ app, auth, getData};