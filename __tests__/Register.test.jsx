import React from 'react'
import '@testing-library/jest-dom'
import { render, act, fireEvent, waitFor, screen } from '@testing-library/react'
import Register from '../src/app/components/auth/register/index.jsx'
import { doCreateUserWithEmailAndPassword } from '../src/app/firebase/auth.js';
import { AuthProvider } from '../src/contexts/authContext.jsx';
import { ChakraProvider } from '@chakra-ui/react';

jest.mock('../src/app/firebase/auth.js', () => ({
    doCreateUserWithEmailAndPassword: jest.fn(),
}));

  jest.mock('firebase/auth', () => ({
    getAuth: jest.fn().mockReturnValue({
      signInWithEmailAndPassword: jest.fn(),
    }),
    onAuthStateChanged: (auth, callback) => {
      // Simulate not logged in scenario
      callback(null)},
    GoogleAuthProvider: {
      PROVIDER_ID: 'google.com',
    },
    updateProfile: jest.fn(),
  }));

  jest.mock('next/navigation', () => {
    return {
      __esModule: true,
      useRouter: () => ({
        push: jest.fn(),
        replace: jest.fn(),
        prefetch: jest.fn()
      }),
      useSearchParams: () => ({
        get: () => {}
      }),
      usePathname: () => {jest.fn()}
    }
  })

describe('RegisterComponent', () => {
    it('allows the user to register', async () => {
  
      //const children = true;
      render(<Register />, {wrapper: ChakraProvider, AuthProvider});
        //render(<Register />);
      screen.debug();
  
      const usernameInput =  await screen.findByPlaceholderText("Username");
      const emailInput =  await screen.findByPlaceholderText("Email");
      const passwordInput = await screen.findByPlaceholderText("Password");
      const registerButton = await screen.findByRole('button', { name: 'Sign Up' });
      
      act(() => {
        fireEvent.change(usernameInput, { target: { value: 'user' } })
        fireEvent.change(emailInput, { target: { value: 'user@example.com' } })
        fireEvent.change(passwordInput, { target: { value: 'password' } })
        fireEvent.click(registerButton)
      });
  
      expect(doCreateUserWithEmailAndPassword).toHaveBeenCalledWith('user@example.com', 'password');
      });
    });