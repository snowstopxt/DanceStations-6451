import React from "react";
import { Card, CardBody, Image, Stack, Link, Text } from '@chakra-ui/react';

//for testing
// import Image from 'next/image';



const StudioCard = ({ studio }) => {
  return (
    <Card>
        <Link href="/">
        <CardBody>
            <Image objectFit='cover' src="/logo-transparent.png" alt={studio.name} borderRadius='lg'/>
                <Stack mt='6' spacing = {0} >
                <Text className="text-h2-s font-bold ">{studio.name}</Text>
                <Text className="text-body-l ">{studio.mrt}</Text>
                {/* <div className="text-body-l place-self-center">{studio.area}</div> */}
                <Text className="text-brand-purple text-body-l ">${studio.price}/h</Text>
                </Stack>
        </CardBody>
        </Link>
    </Card>
  );
}



//TESTING
// const StudioCard = () => {
//     return (
//       <Card className="flex">
//         <Link href="/">
//           <CardBody className="flex justify-around">
//               <Image className="flex" src="/logo-transparent.png" alt="studio name"  width={150} height={30} />
//               <div>
//                   <Stack direction='column' spacing = {2}>
//                   <div className="text-h2-s font-bold place-self-center">1MILLION</div>
//                   <div className="text-body-l place-self-center">SEOUL</div>
//                   <div className="text-body-l place-self-center">60 square meters</div>
//                   <div className="text-brand-purple text-h2-s place-self-center">S$50 per hour</div>
//                   </Stack>
//               </div>
//           </CardBody>
//           </Link>
//       </Card>
//     );
//   }


export default StudioCard;