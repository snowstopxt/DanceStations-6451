import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  collection,
  getFirestore, 
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy, 
  startAt, 
  endAt
} from "firebase/firestore";

import * as geofire from 'geofire-common';

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

const getData = async (info) => {
  try {
    console.log('info: ', info);
    const radius = geofire.distanceBetween(info.coords, info.north);
    console.log('radius: ', radius);
  
    const bounds = geofire.geohashQueryBounds(info.coords, radius*1000);
    const promises = [];

    for (const b of bounds) {
      const q = query(
        collection(db, 'studios'),
        orderBy('geohash'),
        startAt(b[0]),
        endAt(b[1]));
      promises.push(getDocs(q));
    }

    const snapshots = await Promise.all(promises);
    const studiosData = [];

    for(const snap of snapshots) {
      for (const doc of snap.docs) {
        const data = doc.data();
        const lat = data.location.latitude;
        const lng = data.location.longitude;
        
        const distanceInKm = geofire.distanceBetween([lat, lng], info.coords);
        if (distanceInKm <= radius) {
          //console.log('Data structure:', data);
          studiosData.push({...data, id: doc.id});
        }
      }
    }
    // docSnap.forEach((doc) => {
    //   const data = doc.data();
    //   const hash = geofire.geohashForLocation([data.location.latitude, data.location.longitude]);
    //   console.log('doc id: ', doc.id, 'hash: ', hash);
    //   const lat = data.location.latitude
    //   const lng = data.location.longitude
    //   studiosData.push({...data, lat, lng, hash});
    // });
    return studiosData;
  } catch (error) {
    console.log(error.message);
  }
};

const returnData = async () => {
  return studiosData;
}

const fetchStudioById = async (studioId) => {
  /*
  try {
    const docRef = await collection(db, 'studios').doc(studioId).get();

    if (docRef.exists) {
      return { id: docRef.id, ...docRef.data() };
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching studio:', error);
    return null;
  }
    */



  const docRef = doc(db, 'studios', studioId);
  const docSnap = await getDoc(docRef);
  try {
    if (docSnap.exists()) {
      const studioData = docSnap.data();
      console.log(docSnap.data());
      return {...studioData, id: docSnap.id};

    } else {
      console.log('No such document!');
      return null;
    }
  }
  catch (error) {
    console.error('Error fetching studio:', error);
    return null;
  }
};

export{ app, auth, getData, returnData, fetchStudioById};