import React, { useContext, useEffect, useState} from 'react';
import { auth, fetchUserById } from '../app/firebase/clientApp';

export const OwnerContext = React.createContext();

export function useOwner() {
    return useContext(OwnerContext);
}

export const OwnerProvider = ({children}) => {
    const [studios, setStudios] = useState([]);
    const user = auth.currentUser;
    const userId = user?.uid || null;

    useEffect(() => {
        const fetchUserData = async () => {
            console.log('owner provider user ID', userId);

            if (userId) {
                const fetchingUser = await fetchUserById(userId);
                console.log('fetchedUser in provider:', fetchingUser);

                if (fetchingUser[0]?.studioId) {
                    const studioIds = fetchingUser[0].studioId;
                    console.log('studioIds:', studioIds);
                    setStudios(studioIds);
                } 
            }
        };

        fetchUserData();
    }, [auth.currentUser]);

    useEffect(() => {
        console.log('studios updated:', studios);
    }, [studios]);


    return (
        <OwnerContext.Provider value={studios}>
          {children}
        </OwnerContext.Provider>
      );
}
