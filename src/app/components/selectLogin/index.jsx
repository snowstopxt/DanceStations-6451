import React from 'react';
import { Card, Link } from '@chakra-ui/react';
import { BsFillPersonFill } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";

const LoginCard = ({userType}) => {

    console.log(userType);
    return (
        
        <div>
        <Card>
            <div className="flex justify-center items-center">
                {userType==="dancer" ? <BsFillPersonFill size={50} /> : <GoHomeFill size={50} />}
                </div>
            <div>{userType==="dancer" ? 'Book a Dance Studio' : 'List a Dance Studio'}</div>
            <Link href={`/login/${userType}`}>
            <button
                            type="submit"
                            className="w-full px-4 py-2 text-white font-medium rounded-lg bg-brand-teal hover:bg-brand-dark-teal hover:shadow-xl transition duration-300"
                        >
                            Login as {userType==='dancer' ? 'Dancer' : 'Studio Owner'}
                        </button>
                        </Link>
        </Card>
        </div>
        
    )
}

export default LoginCard;