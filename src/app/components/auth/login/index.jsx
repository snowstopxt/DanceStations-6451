'use client'
import React, { useState } from "react";
import { doSignInWithEmailAndPassword, doSignInWithGoogle} from '../../../firebase/auth'
import { useAuth } from '../../../../contexts/authContext'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '../../header/index';

const Login = () => {
    //const { userLoggedIn } = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const router = useRouter();
    
    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            try {
                await doSignInWithEmailAndPassword(email, password)
                router.push('/');
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

    // document.body.style = 'background: #CCABDB;';

    return (

        <div className="flex flex-col h-screen">
        <div className="w-screen">
            <Header />
        </div>
        <main className="flex w-full h-full place-items-center place-content-center">
            <div className="w-96 text-dark-grey space-y-5 p-4 shadow-xl rounded-xl bg-white">
               
                <div className="text-center">
                    <div className="mt-2">
                            <h3 className="text-black text-h2-l font-semibold sm:text-2xl">Log in as {userType === "dancer" ? "Dancer" : "Studio Owner"}</h3>
                        </div>
                    </div>
                    <form
                        onSubmit={onSubmit}
                        className="space-y-5"
                    >
                        <div>
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <input
                                type="email"
                                name='email'
                                autoComplete='email'
                                placeholder="Email"
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 rounded-md shadow-sm border-0 focus:ring-2"
                            />
                        </div>


                        <div>
                            <label htmlFor="password" className="text-sm font-medium">Password</label>
                            <input
                                type="password"
                                name='password'
                                placeholder="Password"
                                autoComplete='current-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 rounded-md shadow-sm border-0"
                            />
                        </div>

                        {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            aria-label={isSigningIn ? 'Signing In...' : 'Sign In'}
            
                            disabled={isSigningIn}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSigningIn ? 'bg-brand-dark-teal cursor-not-allowed' : 'bg-brand-teal hover:bg-brand-dark-teal hover:shadow-xl transition duration-300'}`}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <p className="text-center text-sm">Don&apos;t have an account? <Link href={`/register/${userType}`} className="hover:underline font-bold text-brand-dark-teal">Sign up</Link></p>
                    <div className='flex flex-row text-center w-full'>
                        <div className='border-b-2 mb-2.5 mr-2 w-full'></div><div className='text-sm font-semi-bold w-fit'>OR</div><div className='border-b-2 mb-2.5 ml-2 w-full'></div>
                    </div>
                    <button
                        disabled={isSigningIn}
                        onClick={(e) => { onGoogleSignIn(e) }}
                        className={`w-full flex items-center justify-center gap-x-3 py-2.5 shadow-md rounded-lg text-sm font-medium ${isSigningIn ? 'cursor-not-allowed' : 'hover:bg-light-grey transition duration-300 active:bg-light-grey'}`}>
                        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_17_40)">
                                <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                                <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                                <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                                <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                            </g>
                            <defs>
                                <clipPath id="clip0_17_40">
                                    <rect width="48" height="48" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Login