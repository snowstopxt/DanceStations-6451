import React, { useContext, useEffect, useState, createContext } from 'react';
import { getData } from '../app/firebase/clientApp';

export const StudiosContext = React.createContext();

export function useStudios() {
    return useContext(StudiosContext);
}

export const StudiosProvider = ({ queries, children}) => {
    const [studios, setStudios] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            let data = await getData({ coords: queries.coords, north: queries.north });
            if (queries.name !== '' || queries.mrt !== '') {
                data = data.filter((studio) => 
                    studio.name.toLowerCase().includes(queries.name.toLowerCase()) || 
                    studio.mrt.toLowerCase().includes(queries.mrt.toLowerCase())
            
                );
            }
            setStudios(data);  
            
        };

        fetchData();
      
    }, [queries]);
  
    return (
      <StudiosContext.Provider value={studios}>
        {children}
      </StudiosContext.Provider>
    );
  };
