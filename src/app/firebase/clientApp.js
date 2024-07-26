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
  limit,
  serverTimestamp,
  addDoc
} from "firebase/firestore";
import { useCollectionData } from 'react-firebase-hooks/firestore';

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

/*
      // Create a reference to the user's document
      const userDocRef = doc(db, 'users', userId);

      // Create a reference to the studio subcollection under the user's document
      const studioCollectionRef = collection(userDocRef, 'studios');
      const studioDocRef = doc(studioCollectionRef, roomId);

      // Create a reference to the date subcollection under the studio document
      const dateCollectionRef = collection(studioDocRef, 'dates');
      const dateDocRef = doc(dateCollectionRef, date);

      // Create a reference to the time subcollection under the date document
      //const timeCollectionRef = collection(dateDocRef, 'times');
      //const timeDocRef = doc(timeCollectionRef, timeSlot);

      await setDoc(dateDocRef, {
        studioId: roomId,
        date: date,
        startTime: startTime,
        endTime: endTime
      }).then(() => {
        console.log('Booking successful')});

        /*
      db.collection('users').doc(userId).set({
        studioId: roomId,   // brush up, such that userid > studioId > date > time
        date: date,
        startTime: startTime,
        endTime: endTime
      }).then(() => {
      console.log('Booking successful')});
      */
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


// call this method directly under createNewAccount
const addToUserCollection = async ({userId, userType, username}) => {

  const userDocRef = doc(db, 'users', userId);

  console.log('userId:', userId);
  console.log('username:', username);
  console.log('userType:', userType);

  await setDoc(userDocRef, {
    userType: userType,
    username: username
  }, { merge: true });

};

const retrieveMessages = (receiverId) => {
  console.log('retrieving messages');


  const senderId = auth.currentUser.uid;  

  console.log('senderId:', senderId);
  const senderDocRef = doc(db, 'users', senderId);
  const sentCollectionRef = collection(senderDocRef, 'sentMsgs');
  const receivedCollectionRef = collection(senderDocRef, 'receivedMsgs');

  let sentMessages = [];
  let receivedMessages = [];

  // query messages sent to specific receiver first
  const q = query(sentCollectionRef, where('sentTo', '==', receiverId), orderBy('createdAt'));
  // retrieve messages sent to receiver by the current user in an array
  sentMessages = useCollectionData(q, { idField: 'id' })[0];
  //const sentMessagesSnapshot = await getDocs(q);
  //sentMessagesSnapshot.forEach((doc) => {
    //sentMessages.push({id: doc.id, ...doc.data()});
  //});
  
  console.log('sent messages:', sentMessages);

  // query messages received from specific sender
  const q2 = query(receivedCollectionRef, where('sentBy', '==', receiverId), orderBy('createdAt'));
  // retrieve messages received from sender by the current user in an array
  receivedMessages = useCollectionData(q2, { idField: 'id' })[0];
  //const receivedMessagesSnapshot = await getDocs(q2);
  //receivedMessagesSnapshot.forEach((doc) => {
    //receivedMessages.push({id: doc.id, ...doc.data()});
  //});
  console.log('received messages:', receivedMessages);

  // merge the two arrays and sort by createdAt
  //const messages = [...sentMessages, ...receivedMessages].sort((a, b) => a.createdAt - b.createdAt);
  if (sentMessages && receivedMessages) {
  const messages = sentMessages.concat(receivedMessages).sort((a, b) => a.createdAt - b.createdAt);
  console.log('messages:', messages);
    return messages;
  } else if (sentMessages) {
    return sentMessages;
  } else if (receivedMessages) {
    return receivedMessages;
  } else {
    console.log('No messages found');
    return [];
  }
  
/*
  if (messages) {
    return messages;
  } else {
    console.log('No messages found');
    return [];
  }
    */


/*
  const messagesRef = collection(db, 'messages');
  //const query = messagesRef.orderBy('createdAt').limit(25); 
  const messagesQuery = query(messagesRef, orderBy('createdAt'), limit(25));
  const [messages] = useCollectionData(messagesQuery, {idField: 'id'});

  console.log('messages:', messages);
  if (messages) {
    return messages;
  } else {
    return [];
  }
    */
  
};

// message will be stored in (i) user1 > sent and (ii) user2 > received
// storage architecture:
  // messages >> userid >> sent >> sentTo >> doc
  //                    >> received >> sentBy >> doc
const sendMessage = async (text, receiverId) => {
  console.log('sending message');
  console.log('sendMessages -- text:', text);
  console.log('sendMessages -- receiverId:', receiverId);

  const senderId = auth.currentUser.uid;  
  //const receiverId = receiver.uid;

  const senderDocRef = doc(db, 'users', senderId);
  const sentCollectionRef = collection(senderDocRef, 'sentMsgs');

  const receiverDocRef = doc(db, 'users', receiverId);
  const receivedCollectionRef = collection(receiverDocRef, 'receivedMsgs');

  try {
   await addDoc(sentCollectionRef, {
    text: text,
    createdAt: serverTimestamp(),
    sentTo: receiverId
  });
    await addDoc(receivedCollectionRef,{
    text: text,
    createdAt: serverTimestamp(),
    sentBy: senderId
  });
} catch (error) {
  console.error('Error sending message:', error);
}
};

const fetchUserById = async (userId) => {
  console.log('fetching user by id');
  console.log('fetchUserById -- userId:', userId);
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  console.log('fetchUserById -- docSnap:', docSnap);
  try {
    if (docSnap.exists()) {
      const userData = docSnap.data();
      console.log(docSnap.data());
      return {...userData, id: docSnap.id};

    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching receiving user:', error);
    return null;
  }
}

export { app, auth, fetchUserData, getData, returnData, fetchStudioById, createBooking, fetchBookingsForDay, fetchReservations, createStudio, addToUserCollection, retrieveMessages, sendMessage, fetchUserById };
