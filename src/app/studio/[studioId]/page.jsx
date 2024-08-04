'use client'

import { useEffect, useState } from 'react';
import { fetchStudioById, fetchUserById } from '../../firebase/clientApp';
import StudioInfo from '../../components/studioInfo';
import Availability from '../../components/availability';
import Header from '../../components/header';
import { auth } from '../../firebase/clientApp';
import { Box, Flex } from "@chakra-ui/react";

const Page = ({params}) => {
  const user = auth.currentUser;
  const userId = user?.uid || null;
  const [studio, setStudio] = useState(null);
  const [stars, setStars] = useState(0);
  const [studioArr, setStudioArr] = useState([]);
  const [isOwner, setIsOwner] = useState(false);

  const { studioId } = params; 

  const handleStars = (studio) => {
    let total = 0;
    for (let i = 0; i < studio.stars.length; i++) {
      total += ( i + 1 ) * studio.stars[i];
    }

    setStars(total/studio.totalStars);
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const fetchingUser = await fetchUserById(userId);
      console.log('fetchedUser:', fetchingUser);
      
      if (fetchingUser[0].studioId) {
        const studioIds = fetchingUser[0].studioId;
        console.log('studioIds at studio page:', studioIds);
        setStudioArr(studioIds);
      } 

      if (studioArr.includes(studioId)) {
        setIsOwner(true);
    };
  
    fetchUserData();
  }
}, [userId]);

try {
  useEffect(() => {
    const fetchStudio = async () => {

      const fetchedStudio = await fetchStudioById(studioId);
      setStudio(fetchedStudio);
      handleStars(fetchedStudio);
      
    };

    if (studioId) {
      fetchStudio();
      
    }
  }, [studioId]);

  if (!studio) {
    return <div>Loading...</div>;
  } else {
      console.log(studio);
      return (
        <div>
          <Header/>

          <Flex flexDirection="row">
        <Box m="3" flexBasis="50%" alignSelf="flex-start" justifySelf="center">
          <StudioInfo stars={stars} studio={studio} />
        </Box>

        <Box m="8" flexBasis="50%" alignSelf="flex-start" justifySelf="center">
          {!isOwner && <Availability userId={userId} studioId={studioId} />}
        </Box>
      </Flex>
        </div>
      );
  }
} catch (error) {
  console.error('Error fetching studio', error);
}
}

export default Page;