import React, { useState } from "react";
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle} from '../../../firebase/auth'
import { useAuth } from '../../../../contexts/authContext'
import Link from 'next/link';
//import { useNavigate } from "react-router-dom";


const Register = () => {

    const { userLoggedIn } = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [isSigningUp, setIsSigningUp] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    //const navigate = useNavigate();

    
    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isSigningUp) {
            setIsSigningUp(true)
            try {
                await doCreateUserWithEmailAndPassword(email, password)
                //navigate("/login")       //CHECK IF CORREK
            } catch (error) {
                setErrorMessage(error.message)
                setIsSigningUp(false)
            }
       }
    }

    return (
        <div>
            <main className="w-full h-screen flex self-center place-content-center place-items-center">
                <div className="w-96 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                   
                    <div className="text-center">
                        <div className="mt-2">
                            <h3 className="text-gray-800 text-xl font-semibold sm:text-2xl">Welcome to DanceStations</h3>
                        </div>
                    </div>

                    <form
                        onSubmit={onSubmit}
                        className="space-y-5"
                    >
                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Username
                            </label>
                            <input
                                type="text"
                                autoComplete='text'
                                required
                                value={username} onChange={(e) => { setUsername(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Email
                            </label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email} onChange={(e) => { setEmail(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600 font-bold">
                                Password
                            </label>
                            <input
                                type="password"
                                autoComplete='current-password'
                                required
                                value={password} onChange={(e) => { setPassword(e.target.value) }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>

                        {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}

                        <button
                            type="submit"
                            disabled={isSigningUp}
                            className={`w-full px-4 py-2 text-white font-medium rounded-lg ${isSigningUp ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                        >
                            {isSigningUp ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </form>
                <p className="text-center text-sm">Already have an account? <Link href={'/login'} className="hover:underline font-bold">Sign in</Link></p>
                </div>
            </main>
        </div>
    )
}

export default Register
