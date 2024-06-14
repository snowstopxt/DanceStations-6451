import React, { useContext, useEffect, useState, createContext } from 'react';
import { getData } from '../app/firebase/clientApp';

export const StudiosContext = React.createContext();

export function useStudios() {
    return useContext(StudiosContext);
}

export const StudiosProvider = ({ coords, north, children }) => {
    const [studios, setStudios] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        const data = await getData({coords, north});
        setStudios(data);
      };
  
      fetchData();
      
    }, [coords, north]);
  
    return (
      <StudiosContext.Provider value={studios}>
        {children}
      </StudiosContext.Provider>
    );
  };
