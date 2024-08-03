import React from 'react';
import {Card, Box, Text, Flex, Link} from '@chakra-ui/react';
import {BsFillPersonFill} from 'react-icons/bs';
import {GoHomeFill } from 'react-icons/go';
import "./selectLogin.css"

const SelectLogin = ({userType}) => {
    return (
        <div>
            <Card p={10} textAlign="center" w="full" maxW="sm" m={4}>
                <Flex justifyContent="center" alignItems="center" mb={4} w="100%">
                    {userType==="dancer" ? <BsFillPersonFill size={50}  /> : <GoHomeFill size={50} />}
                </Flex>
                <Text mb={4}>
                    {userType==="dancer" ? 'Book a Dance Studio' : 'List a Dance Studio'}
                </Text>
                <Link href={`/login/${userType}`}>
                        <button
                            type="submit"
                            className="custom-button">
                            Log in as {userType === "dancer" ? "Dancer" : "Studio Owner"}
                        </button>
                </Link>    
            </Card>
        </div>
    )
}

export default SelectLogin;