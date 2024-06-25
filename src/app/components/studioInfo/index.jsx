import { Image } from '@chakra-ui/react';
import React from 'react';

const StudioInfo = ({ studio }) => {
    return (
    <div className = "flex-col">
        

        <div className='text-h2-s font-bold'>{studio.name}</div>
        <div className='text-body-l'>{studio.mrt}</div>
        <div className='text-body-l'>{studio.size} square meters</div>
        <div className='text-brand-purple text-body-l'>${studio.price}/h</div>

        <div className='border-b-2 mb-2.5 mr-2 w-full'></div>

        <div className='text-h2-s font-bold'>About this station</div>
    </div>
    )
}

export default StudioInfo;