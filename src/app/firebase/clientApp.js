import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
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
  endAt,
 } from "firebase/firestore";

import { getStorage, ref, uploadBytes} from "firebase/storage"

import * as geofire from 'geofire-common';
import { get } from "http";
import { setUncaughtExceptionCaptureCallback } from "process";

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
const storage = getStorage(app);


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

const fetchUserData = async () => {
  auth.onAuthStateChanged(async (user) => {
    console.log("client fetch", user);
    if (user) {
      return user;
    } else {
      return null;
    }
  });
}

export const doSignOut = () => {
  signOut(auth).then(() => {
      console.log('User signed out');
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
};

const getData = async (info) => {
  try {
    console.log('info: ', info);
    const radius = geofire.distanceBetween(info.coords, info.north);
    console.log('radius: ', radius);
    // const hash = geofire.geohashForLocation([1.3112579452023452, 103.8549410172018])
    // const newRef = doc(db, 'studios', 'LON');
    // await updateDoc(newRef, {
    //   geohash: hash,
    //   lat: lat,
    //   lng: lng
    // });


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

    return studiosData;
  } catch (error) {
    console.log(error.message);
  }
};

const returnData = async () => {
  return studiosData;
}


async function createBooking(roomId, userId, date, startTime, endTime, file) {
    let isBooked = false;

    for (let i = parseInt(startTime); i < parseInt(endTime); i+=1) {
      console.log('i:', i);
      const bookingRef = doc(db, `reservations/${roomId}/${date}/${i}`);

      await getDoc(bookingRef).then((snapshot) => {
        if (snapshot.exists()) {
          console.log('Slot is already booked');
          isBooked = true;
        } 
      }).catch((error) => {
        console.error('Error checking slot availability:', error);
      });
  } 

  if (isBooked) {
    return isBooked;
  }

  for (let i = parseInt(startTime); i < parseInt(endTime); i+=1) {
      const bookingRef = doc(db, `reservations/${roomId}/${date}/${i}`);
      await setDoc(bookingRef, { userId: userId }).then(async () => {


    // Create a reference to the user's document
    const userDocRef = doc(db, 'users', userId);

    // Create a reference to the dates subcollection under the user's document
    //const datesCollectionRef = collection(userDocRef, 'dates');
    //const dateDocRef = doc(datesCollectionRef, date);

    // Create a reference to the reservations subcollection under the date document
    const reservationsCollectionRef = collection(userDocRef, 'reservations');
    const reservationDocRef = doc(reservationsCollectionRef);

    await setDoc(reservationDocRef, {
      studioId: roomId,
      date: date,
      startTime: startTime,
      endTime: endTime
    }).then(() => {
      console.log('Booking successful!!')});
  })
  }
  return isBooked;
  
}


async function createStudio({name, mrt, geohash, location, size, price, description, image}) {
  const studioRef = collection(db, 'studios');
  const newStudioRef = doc(studioRef);
  const studioId = newStudioRef.id;
  const storageRef = ref(storage, `images/${studioId}_${Date.now()}`);

  const snapshot = await uploadBytes(storageRef, file);
  console.log('Uploaded a blob or file!');

  const downloadURL = await getDownloadURL(snapshot.ref);
  

  // uploadBytes(storageRef, file).then((snapshot) => {
  //   console.log('Uploaded a blob or file!');
  // });

  await setDoc(newStudioRef, {
      name: name,
      mrt: mrt,
      geohash: geohash,
      location: new firebase.firestore.GeoPoint(Number(location.lat), Number(location.lng)),
      size: size,
      price: price,
      description: description,
      image: image
    }).then(() => {
      console.log('Studio created successfully');
    }).catch((error) => {
      console.error('Error creating studio:', error);
    });
}

async function fetchBookingsForDay(roomId, date) {
  const bookingRef = collection(db, `reservations/${roomId}/${date}`);
  const bookingSnapshot = await getDocs(bookingRef);
  const bookings = [];

  bookingSnapshot.forEach((doc) => {
    const data = doc.data();
    const time = parseInt(doc.id);
    bookings.push({ time, ...data });
  });

  console.log('firestore bookings', bookings);
  return bookings;
  
}

const fetchStudioById = async (studioId) => {
  
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

const fetchReservations = async () => {

  const user = auth.currentUser;
  if (user) {
    const userId = user.uid;

    // Create a reference to the user's document
    const userDocRef = doc(db, 'users', userId);

    //const reservationsSnapshot = await getDocs(userDocRef);

    const reservations = [];

    //for (const reservationDoc of reservationsSnapshot.docs) {

      // Create a reference to the reservations subcollection
      const reservationsCollectionRef = collection(userDocRef, 'reservations');

      // Create a query to get all reservations sorted by date and startTime
      const q = query(reservationsCollectionRef, orderBy('date'), orderBy('startTime'));

      // Execute the query
      const reservationsSnapshot = await getDocs(q);

      reservationsSnapshot.forEach((doc) => {
        reservations.push({id: doc.id, ...doc.data()});
      });
    //}

    // Sort reservations by startTime
    //reservations.sort((a, b) => a.startTime.localeCompare(b.startTime));

    return reservations;
  } else {
    console.log('User is not signed in');
    return [];
  }
};




export { app, auth, fetchUserData, getData, returnData, fetchStudioById, createBooking, fetchBookingsForDay, fetchReservations, createStudio };
