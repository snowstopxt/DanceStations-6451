import React, { useContext, useEffect, useState, createContext } from 'react';
import { getData } from '../app/firebase/clientApp';

export const StudiosContext = React.createContext();

export function useStudios() {
    return useContext(StudiosContext);
}

export const StudiosProvider = ({ queries, children}) => {
    const [studios, setStudios] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [studiosPerPage] = useState(5);

    useEffect(() => {
        const fetchData = async () => {
            let data = await getData({ coords: queries.coords, north: queries.north });
            if (queries.name !== '' && queries.mrt !== '') {
                data = data.filter((studio) => 
                    studio.name.toLowerCase().includes(queries.name.toLowerCase()) || 
                    studio.mrt.toLowerCase().includes(queries.mrt.toLowerCase()) 
                );
                console.log('both given')
            } else if (queries.name == '') {
                data = data.filter((studio) => studio.mrt.toLowerCase().includes(queries.mrt.toLowerCase()));
                console.log('mrt given')
            } else if (queries.mrt == '') {
                data = data.filter((studio) => studio.name.toLowerCase().includes(queries.name.toLowerCase()));
                console.log('name given')
            } else {
                console.log('no queries');
            }

            if (data == null) {
                console.log('no data');
            } else {

            data = data.filter((studio) => studio.price <= queries.max && studio.price >= queries.min);
            setStudios(data);  
            }
        };

        fetchData();
      
    }, [queries]);

    // const indexOfLastStudio = currentPage * studiosPerPage;
    // const indexOfFirstStudio = indexOfLastStudio - studiosPerPage;
    // const currentStudios = studios.slice(indexOfFirstStudio, indexOfLastStudio);

    // // Change page
    // const paginate = pageNumber => setCurrentPage(pageNumber);

  
    return (
      <StudiosContext.Provider value={studios}>
        {children}
      </StudiosContext.Provider>
    );
  };
