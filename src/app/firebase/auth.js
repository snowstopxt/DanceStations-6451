import { createUserWithEmailAndPassword, browserSessionPersistence, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, updatePassword} from "firebase/auth";
import { auth } from "./clientApp";
import { setPersistence } from "firebase/auth";
import { addToUserCollection } from "./clientApp";

export const doCreateUserWithEmailAndPassword = async (email, password, username, {userType}) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('userCredential:', userCredential);
    const user = userCredential.user;
    console.log('user:', user);
    console.log('user.uid:', user.uid);
    await addToUserCollection({userId: user.uid, username: username, userType});
    return userCredential;
}

export const doSignInWithEmailAndPassword = (email, password) => {
    setPersistence(auth, browserSessionPersistence).then(() => { return signInWithEmailAndPassword(auth, email, password).catch((error) => { throw error; })
});

};

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    return result;
};



// export const doPasswordReset = (email) => {
//     return sendPasswordResetEmail(auth, email);

// };

// export const doPasswordChange = (password) => {
//     return updatePassword(auth.currentUser, password);
// };

// export const doSendEmailVerification = () => {
//     return sendEmailVerification(auth.currentUser, {
//         url: `${window.location.origin}/home`,
//     });
// };