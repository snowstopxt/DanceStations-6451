'use client'

import { useEffect, useState } from 'react';
import { fetchStudioById } from '../../firebase/clientApp';
import StudioInfo from '../../components/studioInfo';
import Availability from '../../components/availability';
import Header from '../../components/header';
import { auth } from '../../firebase/clientApp';

const StudioDetailsPage = ({params} : {params: {studioId: string}}) => {
  const user = auth.currentUser;
  const userId = user?.uid || null;
  const [studio, setStudio] = useState<any>(null);
  const [stars, setStars] = useState<number>(0);

const handleStars = (studio: any) => {
  let total = 0;
  for (let i = 0; i < studio.stars.length; i++) {
    total += ( i + 1 ) * studio.stars[i];
  }

  setStars(total/studio.totalStars);
}

try {
  useEffect(() => {
    const fetchStudio = async () => {

      const fetchedStudio = await fetchStudioById(params.studioId);
      setStudio(fetchedStudio);
      handleStars(fetchedStudio);
      
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
          <StudioInfo stars={stars} studio={studio} />
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