/*const StudioPage = ({params} : {params: {studioId: string}}) => {
    return (
        <div>Studio Details {params.studioId}
      </div>
    );
}

export default StudioPage;

*/
'use client'

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchStudioById } from '../../firebase/clientApp';

const StudioDetailsPage = ({params} : {params: {studioId: string}}) => {
  //const router = useRouter();
  //const { studioId } = router.query;
  const [studio, setStudio] = useState(null);

  useEffect(() => {
    const fetchStudio = async () => {
      // Fetch studio data based on studioId
      // Example: Assuming you have a function to fetch studio data
      const fetchedStudio = await fetchStudioById(params.studioId);
      setStudio(fetchedStudio);
    };

    if (params.studioId) {
      fetchStudio();
    }
  }, [params.studioId]);

  if (!studio) {
    return <div>Loading...</div>;
  }

  return (
    // Render studio details using the fetched studio data
    <div>
      <h1>heh</h1>
    </div>
  );
};

export default StudioDetailsPage;