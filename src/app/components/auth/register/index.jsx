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


const Register = () => {
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
                    await doCreateUserWithEmailAndPassword(email, password).then((userCreds) => {
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
        <Box minHeight="100vh" display="flex" flexDirection="column" bgColor="brand.100">
            <Header />
          
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
                      colorScheme="brand"
                      variant="brand-lg"
                      isLoading={isSigningUp}
                      loadingText="Signing Up..."
                      width="full"
                    >
                      {isSigningUp ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                  </Stack>
                </form>
                <Text textAlign="center" fontSize="sm">
                  Already have an account?{' '}
                  <Link href="/login" color="teal.500" fontWeight="bold">
                    Sign in
                  </Link>
                </Text>
              </Stack>
            </Box>
          </Box>
        </Box>
      );

    // return (
      
    //     <div className="flex flex-col h-screen">
    //         <div className="w-screen">
    //             <Header />
    //         </div>
            
    //         <main className="flex w-full h-full place-items-center place-content-center">
    //             <div className="w-96 text-dark-grey space-y-5 p-4 shadow-xl rounded-xl bg-white">
                   
    //                 <div className="text-center">
    //                     <div className="mt-2">
    //                         <h3 className="text-black text-h2-l font-semibold sm:text-2xl">Welcome to DanceStations</h3>
    //                     </div>
    //                 </div>

    //                 <form
    //                     onSubmit={onSubmit}
    //                     className="space-y-5"
    //                 >
    //                     <div>
                        
    //                         <input
    //                             type="text"
    //                             autoComplete='text'
    //                             placeholder="Username"
    //                             required
    //                             value={username} onChange={(e) => { setUsername(e.target.value) }}
    //                             className="w-full mt-2 px-3 py-2 bg-transparent outline-none focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
    //                         />
    //                     </div>

    //                     <div>
    //                         <input
    //                             type="email"
    //                             placeholder="Email"
    //                             autoComplete='email'
    //                             required
    //                             value={email} onChange={(e) => { setEmail(e.target.value) }}
    //                             className="w-full mt-2 px-3 py-2 bg-transparent outline-none focus:border-brand-dark-purple shadow-sm rounded-lg transition duration-300"
    //                         />
    //                     </div>

    //                     <div>
    //                         <input
    //                             type="password"
    //                             placeholder="Password"
    //                             autoComplete='current-password'
    //                             required
    //                             value={password} onChange={(e) => { setPassword(e.target.value) }}
    //                             className="w-full mt-2 px-3 py-2 bg-transparent outline-none focus:border-brand-dark-purple shadow-sm rounded-lg transition duration-300"
    //                         />
    //                     </div>

    //                     {errorMessage && (
    //                         <span className='text-red-600 font-bold'>{errorMessage}</span>
    //                     )}

    //                     <button
    //                         type="submit"
    //                         disabled={isSigningUp}
    //                         className={`w-full px-4 py-2 text-white font-medium shadow-md rounded-lg ${isSigningUp ? 'bg-brand-dark-teal cursor-not-allowed' : 'bg-brand-teal hover:bg-brand-dark-teal hover:shadow-xl transition duration-300'}`}
    //                     >
    //                         {isSigningUp ? 'Signing Up...' : 'Sign Up'}
    //                     </button>
    //                 </form>
    //             <p className="text-center text-sm">Already have an account? <Link href={'/login'} className="hover:underline font-bold text-brand-dark-teal">Sign in</Link></p>
    //             </div>
    //         </main>
    //     </div>
    // )
}

export default Register