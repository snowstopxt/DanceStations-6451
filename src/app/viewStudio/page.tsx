"use client"
import React from 'react';
import Availability from '../components/Availability/index'
import { useSearchParams } from 'next/navigation';


const ViewStudioPage= () => {
    return (
        <div>
            <Availability />
        </div>
    );
};

export default ViewStudioPage;