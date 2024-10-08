import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import React, {useState, useEffect} from 'react';
import { retrievePhoto } from "../../firebase/clientApp";
import { Box, Image, Text, Divider, Flex } from "@chakra-ui/react";

const StudioInfo = ({ stars, studio }) => {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    async function fetchPhoto() {
      const url = await retrievePhoto(studio);
      setPhotoUrl(url);
    }

    if (studio && studio.image) {
      fetchPhoto();
    }
  }, [studio]);



    const starRating = Array.from({ length: 5 }, (elem, index) => {
            
        return (
            <span key={index} style={{ display: 'inline-flex', color: '#ffe234'}}>
                {stars >= index + 1 ? (
                    <FaStar />
                ) : stars >= index + 0.5 ? (
                    <FaStarHalfAlt />
                ) : (
                    <AiOutlineStar />
                )}
            </span>
        );
    });
    
    console.log("studio.image", studio.image)

    return (
        <Box display="flex" flexDirection="column">
          <Image
            m="8"
            src={photoUrl || "/logo-transparent.png"}
            alt={studio.name}
            borderRadius="lg"
            objectFit="contain"
            width={400}
            height={300}
          />
          <Flex width={400} alignItems="center" justifyContent="space-between" ml="8">
            <Text fontSize="2xl" fontWeight="bold">{studio.name}</Text>
            <Text ml="2">{starRating}</Text>
          </Flex>
          <Text ml="8" fontSize="lg">{studio.mrt}</Text>
          <Text ml="8" fontSize="lg">{studio.size} square meters</Text>
          <Text ml="8" color="brand.purple" fontSize="lg">${studio.price}/h</Text>
    
          <Divider my="5" borderBottomWidth="2px" mr="2" />
    
          <Text ml="8" fontSize="2xl" fontWeight="bold">About this station</Text>
          <Text ml="8" fontSize="lg">{studio.description}</Text>
        </Box>
      );
}

export default StudioInfo;