"use client"
import React from 'react';
import Availability from '../components/availability'
import { useSearchParams } from 'next/navigation';
import { auth } from '../firebase/clientApp';


/*const StudioPage = ({params} : {params: {studioId: string}}) => {
    return (
        <div>Studio Details {params.studioId}
      </div>
    );
}

export default StudioPage;*/

const ViewStudioPage= () => {
    
    const user = auth.currentUser;
    

    return (
        <div>
            <Availability userId ={'xLMMqF0e04fMr8qFw0ZoCGq9hm32'} studioId={"ZhMi8rUk01tI5gwF7t8N"}/>
        </div>
    );
};

export default ViewStudioPage;