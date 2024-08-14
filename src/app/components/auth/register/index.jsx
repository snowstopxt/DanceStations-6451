'use client'
import React, { useState } from "react";
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle} from '../../../firebase/auth';
import { updateProfile } from 'firebase/auth';
import { useAuth } from '../../../../contexts/authContext';
// import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../header/index';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Text,
    useToast,
  } from '@chakra-ui/react';


const Register = ({userType}) => {
    const { userLoggedIn } = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [isSigningUp, setIsSigningUp] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const router = useRouter();
    const toast = useToast();
    
    const onSubmit = async (e) => {
            e.preventDefault()
            if (!isSigningUp) {
                setIsSigningUp(true)
                try {
                    await doCreateUserWithEmailAndPassword(email, password, username, {userType}).then((userCreds) => {
                        const user = userCreds.user;
                        updateProfile(user, {displayName: `${username}`})
                    }
                    );
                    router.push('/login');
                    toast({
                        title: 'Account created.',
                        description: 'You have successfully registered. Please log in.',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                      });
                } catch (error) {
                    setErrorMessage(error.message)
                    setIsSigningUp(false)
                    toast({
                        title: 'Registration failed.',
                        description: error.message,
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                      });
                }
           }
    }

    return (
          
          <Box as="main" flex="1" display="flex" justifyContent="center" alignItems="center" padding={4}>
            <Box width={{ base: 'full', sm: 'md' }} backgroundColor="white" boxShadow="lg" borderRadius="md" padding={4}>
              <Stack spacing={5}>
                <Heading as="h3" size="lg" textAlign="center" color="black">
                  Welcome to DanceStations
                </Heading>
                <form onSubmit={onSubmit}>
                  <Stack spacing={5}>
                    <FormControl id="username" isRequired>
                      <FormLabel>Username</FormLabel>
                      <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </FormControl>
                    <FormControl id="email" isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormControl>
                    <FormControl id="password" isRequired>
                      <FormLabel>Password</FormLabel>
                      <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormControl>
                    {errorMessage && (
                      <Text color="red.600" fontWeight="bold">
                        {errorMessage}
                      </Text>
                    )}
                    <Button
                      type="submit"
                      size="lg"
                      fontSize="16px"
                      variant="brand-blue"
                      isLoading={isSigningUp}
                      loadingText="Signing Up..."
                      width="full"
                    >
                      {isSigningUp ? 'Signing Up...' : userType ==="dancer" ? 'Sign Up as Dancer' : 'Sign Up as Studio Owner'}
                    </Button>
                  </Stack>
                </form>
                <Text textAlign="center" fontSize="sm">
                  Already have an account?{' '}
                  <Link href={`/login/${userType}`} color="teal.500" fontWeight="bold">
                    Sign in
                  </Link>
                </Text>
              </Stack>
            </Box>
          </Box>
      );
}

export default Register