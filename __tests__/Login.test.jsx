import React from 'react'
import '@testing-library/jest-dom'
import { render, act, fireEvent, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../src/app/components/auth/login/index.jsx'
import LoginPage from '../src/app/login/page.tsx'
import { AuthProvider } from '../src/contexts/authContext.jsx';
import { doSignInWithEmailAndPassword } from '../src/app/firebase/auth.js';
import { deselectOptions } from '@testing-library/user-event/dist/cjs/setup/directApi.js'

jest.mock('../src/app/firebase/auth.js', () => ({
  doSignInWithEmailAndPassword: jest.fn(),
}));

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn().mockReturnValue({
    signInWithEmailAndPassword: jest.fn(),
  }),
  onAuthStateChanged: jest.fn(),
  GoogleAuthProvider: {
    PROVIDER_ID: 'google.com',
  },
}));

const setCurrentUser = jest.fn();
const setIsEmailUser = jest.fn();
const setIsGoogleUser = jest.fn();
const setUserLoggedIn = jest.fn();

const mockInitializeUser = jest.fn(async (user) => {
  if (user) {
    setCurrentUser({ ...user });

    const isEmail = user.providerData.some(
      (provider) => provider.providerId === "password"
    );
    setIsEmailUser(isEmail);

    const isGoogle = user.providerData.some(
      (provider) => provider.providerId === "google.com" 
    );
    setIsGoogleUser(isGoogle);
    setUserLoggedIn(true);
  } else {
    setCurrentUser(null);
    setUserLoggedIn(false);
  }
  
  const setLoading = jest.fn();
  setLoading(false); 
});




describe('LoginComponent', () => {
  it('allows the user to log in', async () => {
    const { findByText, findByRole, findByPlaceholderText, findByLabelText} = render(<AuthProvider><Login/></AuthProvider>);

    const emailInput =  await screen.findByPlaceholderText("Email");
    const passwordInput = await screen.findByPlaceholderText("Password");
    const loginButton = await screen.findByRole('button', { name: 'Sign in' });
    
    act(() => {
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password' } })
      fireEvent.click(loginButton)
    });

    expect(doSignInWithEmailAndPassword).toHaveBeenCalledWith('user@example.com', 'password');
    });


});

 
// describe('Login page', () => {
//   it('renders all inputs', () => {
//     render(
//       <AuthProvider>
//         <LoginPage />
//       </AuthProvider>
//     )
//     expect(screen.getByRole('textbox', { name: /email address/i })).toBeInTheDocument()
//     expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
//     expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
//   });
 
//    it('allows entering username and password', () => {
//     render(
//       <AuthProvider>
//         <LoginPage />
//       </AuthProvider>
//     )
//     const user = userEvent.setup();
//     user.type(screen.getByLabelText(/email/i), 'user@example.com');
//     user.type(screen.getByLabelText(/password/i), 'password');
//     expect(screen.getByLabelText(/email/i)).toHaveValue('user@example.com');
//     expect(screen.getByLabelText(/password/i)).toHaveValue('password');
  
//    });

//    it('submits the form with username and password', async () => {
//     render(
//       <AuthProvider>
//         <LoginPage />
//       </AuthProvider>
//     )
//     // Mock the login function if it's passed as a prop or uses API callsMock the login function if it's passed as a prop or uses API calls
//     const mockLogin = jest.fn();
//     LoginPage.prototype.login = mockLogin; // Adjust based on your component's implementation
//     const user = userEvent.setup();
//     user.type(screen.getByLabelText(/email/i), 'user@example.com');
//     user.type(screen.getByLabelText(/password/i), 'password');
//     user.click(screen.getByRole('button', { name: /sign in/i }));

//     expect(mockLogin).toHaveBeenCalledWith('user@example.com', 'password');
//   });
// })