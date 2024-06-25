import { Image } from '@chakra-ui/react';
import React from 'react';

const StudioInfo = ({ studio }) => {
    return (
    <div className = "flex-col">
        
        <Image className="m-8" src="/logo-transparent.png" alt={studio.name} borderRadius='lg' objectFit='contain' width={400} height={300} />
        <div className='ml-8 text-h2-s font-bold'>{studio.name}</div>
        <div className='ml-8 text-body-l'>{studio.mrt}</div>
        <div className='ml-8 text-body-l'>{studio.size} square meters</div>
        <div className='ml-8 text-brand-purple text-body-l'>${studio.price}/h</div>

        <div className='m-5 border-b-2 mb-2.5 mr-2 w-full'></div>

        <div className='ml-8 text-h2-s font-bold'>About this station</div>
    </div>
    )
}

export default StudioInfo;