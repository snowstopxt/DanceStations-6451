import React from "react";
import { Card, CardBody, Stack, Link } from '@chakra-ui/react';

//for testing
import Image from 'next/image';


/*
const StudioCard = ({ studio }) => {
  return (
    <Card className="flex-col" >
        <CardBody className="flex">
            <div>
                <Image className="flex relative" src={studio.photoURL} alt={studio.name} />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-h2-s font-bold p-2">{studio.price}</div>
            </div>
            
            <div>
                <Stack direction='column' spacing = {3} >
                <Link href="/">
                <div className="text-h2-s font-bold">{studio.name}</div>
                </Link>
                <div className="text-h2-s">{studio.address}</div>
                </Stack>
            </div>
        </CardBody>
    </Card>
  );
}
*/

// TESTING
const StudioCard = () => {
    return (
        <Card className="flex-col" >
            <CardBody className="flex">
                <div>
                    <Image className="flex relative" src="/logo-transparent.png" alt="studio name"  width={150} height={30} />
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-h2-s font-bold p-2">S$50/hour</div>
                </div>
                
                <div>
                    <Stack direction='column' spacing = {3} >
                    <Link href="/">
                    <div className="text-h2-s font-bold">1MILLION</div>
                    </Link>
                    <div className="text-h2-s">Seoul</div>
                    </Stack>
                </div>
            </CardBody>
        </Card>
      );
    }



export default StudioCard;