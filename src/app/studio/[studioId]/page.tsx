'use client'

import { useEffect, useState } from 'react';
import { fetchStudioById } from '../../firebase/clientApp';
import StudioInfo from '../../components/StudioInfo';
import Availability from '../../components/Availability';
import Header from '../../components/header';
import { auth } from '../../firebase/clientApp';

const StudioDetailsPage = ({params} : {params: {studioId: string}}) => {
  const user = auth.currentUser;
  const userId = user?.uid || null;
  const [studio, setStudio] = useState<any>(null);

try {
  useEffect(() => {
    const fetchStudio = async () => {

      const fetchedStudio = await fetchStudioById(params.studioId);
      setStudio(fetchedStudio);
    };

    if (params.studioId) {
      fetchStudio();
    }
  }, [params.studioId]);

  if (!studio) {
    return <div>Loading...</div>;
  } else {
      console.log(studio);
      return (
        <div>
        <Header />

        <div className="flex flex-row">
          
          <div className="m-3 basis-1/2 self-start place-self-center">
          <StudioInfo studio={studio} />
          </div>

          <div className="m-8 basis-1/2 self-start place-self-center">
          <Availability userId={userId} studioId={params.studioId}/>
          </div>

        </div>
        </div>
      );
  }
} catch (error) {
  console.error('Error fetching studio', error);
}
}

export default StudioDetailsPage;