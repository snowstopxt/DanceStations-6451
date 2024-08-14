import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MyMap from '../src/app/components/map'; 
import { useStudios } from '../src/contexts/studiosContext';
import { ChakraProvider } from '@chakra-ui/react';
import {APIProvider} from '@vis.gl/react-google-maps';
import { AuthProvider, useAuth } from '../src/contexts/authContext.jsx';

jest.mock('../src/contexts/studiosContext', () => ({
    useStudios: jest.fn(),
  }));

  const AllProviders = ({ children }) => {
    return (
      <ChakraProvider>
      <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
          {children}
      </APIProvider>
      </ChakraProvider>
    );
  };

describe('MyMap Component', () => {
  it('shows no markers when there are no studios', () => {
    useStudios.mockReturnValue([]);

    render(<AllProviders><MyMap/></AllProviders>);

    expect(screen.queryByText('Studio 1')).toBeNull();
  });

  it('shows new markers when studios are added', async () => {
    const mockStudios = [
      { id: 1, location: { latitude: 1.3521, longitude: 103.8198 }, name: 'Studio 1' },
      { id: 2, location: { latitude: 1.3621, longitude: 103.8298 }, name: 'Studio 2' },
    ];

    useStudios.mockReturnValue(mockStudios);

    render(<AllProviders><MyMap/></AllProviders>);

    await waitFor(() => {
      mockStudios.forEach(studio => {
        expect(screen.getByText(studio.name)).toBeInTheDocument();
      });
    });
  });

  it('displays correct info window when clicking on a marker', async () => {
    const mockStudios = [
      { id: 1, location: { latitude: 1.3521, longitude: 103.8198 }, name: 'Studio 1' },
    ];

    useStudios.mockReturnValue(mockStudios);

    render(<AllProviders><MyMap/></AllProviders>);

    const marker = screen.getByTestId('marker'); // Ensure you add `data-testid="marker"` to AdvancedMarker

    fireEvent.click(marker);

    expect(screen.getByText('Studio 1')).toBeInTheDocument();
  });
});