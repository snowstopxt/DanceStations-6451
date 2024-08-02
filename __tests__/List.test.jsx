import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import List from '../src/app/components/list'; 
import { StudiosProvider, useStudios } from '../src/contexts/studiosContext'; 
import { ChakraProvider } from '@chakra-ui/react';
import {APIProvider} from '@vis.gl/react-google-maps';
import { useAuth } from '../src/contexts/authContext';
import { AuthProvider } from '../src/contexts/authContext.jsx';



jest.mock('../src/contexts/studiosContext', () => ({
  useStudios: jest.fn(),
}));

/*
jest.mock('../src/contexts/authContext.jsx', () => ({
  useAuth: jest.fn(() =>
    ({
      userLoggedIn: true,
      setUserLoggedIn: jest.fn(),
      auth: { currentUser: { uid: '123', email: 'test@example.com' } },
    }))

}));
*/

jest.mock('../src/contexts/authContext', () => ({
  useAuth: jest.fn()
}));

jest.mock('../src/app/firebase/clientApp', () => ({
  auth: { currentUser: { uid: '123', email: 'test@example.com' } }
}));
/*
// mock user logged in, auth.currentUser
jest.mock('../src/contexts/authContext', () => ({
  useAuth: jest.fn(() => ({ userLoggedIn: true })),
  useAuth: jest.fn(() => ({ setUserLoggedIn: jest.fn() })),
  useAuth: jest.fn(() => ({ auth: { currentUser: true } })),
}));
*/



// Mock data for studios
const mockStudios = [
  { id: 1, name: 'Studio 1', size: 20, image: '/path/to/image1.jpg' },
  { id: 2, name: 'Studio 2', size: 20, image: '/path/to/image2.jpg' },
  { id: 3, name: 'Studio 3', size: 20, image: '/path/to/image3.jpg' },
];

const AllProviders = ({ children }) => {
  return (
    <ChakraProvider>
    <APIProvider>
        {children}
    </APIProvider>
    </ChakraProvider>
  );
};

describe('List Component', () => {
  beforeEach(() => {
    AuthProvider.mockReturnValue({
      userLoggedIn: true,
      setUserLoggedIn: jest.fn(),
      auth: { currentUser: { uid: '123', email: 'test@example.com' } },
    });
    // Mock the useStudios hook to return the mock data
    useStudios.mockReturnValue(mockStudios);
  });

  test('renders studios correctly', async () => {
    render(
        <List setMinPrice={jest.fn()} setMaxPrice={jest.fn()
        } />, {wrapper: AllProviders}
      );

    // Check if the loading indicator is displayed
    // screen.getByText('Loading...'); // Uncomment this line if you have a loading indicator

    // Wait for the studios to be displayed
    await waitFor(() => {
      mockStudios.forEach(studio => {
        expect(screen.getByText(studio.name)).toBeInTheDocument();
        expect(screen.getByText(studio.description)).toBeInTheDocument();
      });
    });
  });

  test('displays a message when no studios are available', async () => {
    // Mock the useStudios hook to return an empty array
    
    useStudios.mockReturnValue([]);

    render(
        <APIProvider><List setMinPrice={jest.fn()} setMaxPrice={jest.fn()} /></APIProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Try searching with a different parameter')).toBeInTheDocument();
    });
  });
});