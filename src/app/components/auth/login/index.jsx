'use client'
import React, { useState } from "react";
import { doSignInWithEmailAndPassword, doSignInWithGoogle} from '../../../firebase/auth'
import { useAuth } from '../../../../contexts/authContext'
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
    Icon,
    Link,
    Stack,
    Text,
    useBreakpointValue,
    useDisclosure,
    useToast,
    Divider,
  } from '@chakra-ui/react';
 
import { FcGoogle } from "react-icons/fc";

// const GoogleIcon = () => (
//   <FcGoogle/>
// );

const Login = ({userType}) => {
    //const { userLoggedIn } = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const router = useRouter();
    const toast = useToast();
    
    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            try {
                await doSignInWithEmailAndPassword(email, password)
                if (userType == 'dancer') router.push('/');
                else if (userType == 'studio owner') router.push('/ownerMain');
            } catch (error) {
                setErrorMessage(error.message)
                setIsSigningIn(false)
            }
        }
    }

    const onGoogleSignIn = async (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            try {
                await doSignInWithGoogle()
                router.push('/');
            } catch (error) {
                setErrorMessage(error.message)
                setIsSigningIn(false)
            }
        }
    }

    return (
        <Box minHeight="100vh" display="flex" flexDirection="column" bgColor="brand.100">
          
            <Header />
         
          <Box as="main" flex="1" display="flex" justifyContent="center" alignItems="center" padding={4}>
            <Box width={{ base: 'full', sm: 'md' }} backgroundColor="white" boxShadow="lg" borderRadius="md" padding={4}>
              <Stack spacing={5}>
                <Heading as="h3" size="lg" textAlign="center" color="black">
                  Log in to DanceStations
                </Heading>
                <form onSubmit={onSubmit}>
                  <Stack spacing={5}>
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
                      colorScheme="brand"
                      variant="brand-lg"
                      isLoading={isSigningIn}
                      loadingText="Signing In..."
                      width="full"
                    >
                      Sign In
                    </Button>
                  </Stack>
                </form>
                <Text textAlign="center" fontSize="sm">
                  Don&apos;t have an account?{' '}
                  <Link href={`/register/${userType}`} color="teal.500" fontWeight="bold">
                    Sign up
                  </Link>
                </Text>
                <Stack spacing={4} textAlign="center">
                  <Box display="flex" alignItems="center" justifyContent="center" position="relative">
                    <Box width="full" position="absolute" top="50%" />
                    <Divider />
                    <Text fontSize="sm" fontWeight="semibold" background="white" px={2}>
                      OR
                    </Text>
                    <Divider />
                  </Box>
                  <Button
                    colorScheme="gray"
                    variant="outline"
                    leftIcon={<FcGoogle />}
                    onClick={onGoogleSignIn}
                    isDisabled={isSigningIn}
                    width="full"
                  >
                    {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Box>
      );

    
}

export default Login