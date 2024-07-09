import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';
import React from 'react';
import { Image } from '@chakra-ui/react';

const StudioInfo = ({ stars, studio }) => {

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
    

    return (
        <div className="flex-col">
            <Image className="m-8" src="/logo-transparent.png" alt={studio.name} borderRadius='lg' objectFit='contain' width={400} height={300} />
            <div className='flex items-center justify-between ml-8'>
                <div className='text-h2-s font-bold'>{studio.name}</div>
                <div className='ml-2'>{starRating}</div>
            </div>
            <div className='ml-8 text-body-l'>{studio.mrt}</div>
            <div className='ml-8 text-body-l'>{studio.size} square meters</div>
            <div className='ml-8 text-brand-purple text-body-l'>${studio.price}/h</div>

            <div className='m-5 border-b-2 mb-2.5 mr-2 w-full'></div>

            <div className='ml-8 text-h2-s font-bold'>About this station</div>
        </div>
    );
}

export default StudioInfo;