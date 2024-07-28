import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import List from '../src/app/components/list'; 
import { StudiosProvider, useStudios } from '../src/contexts/studiosContext'; 
import { ChakraProvider } from '@chakra-ui/react';


jest.mock('../src/contexts/studiosContext', () => ({
  useStudios: jest.fn(),
}));

// Mock data for studios
const mockStudios = [
  { id: 1, name: 'Studio 1', size: 20, image: '/path/to/image1.jpg' },
  { id: 2, name: 'Studio 2', size: 20, image: '/path/to/image2.jpg' },
  { id: 3, name: 'Studio 3', size: 20, image: '/path/to/image3.jpg' },
];

describe('List Component', () => {
  beforeEach(() => {
    // Mock the useStudios hook to return the mock data
    useStudios.mockReturnValue(mockStudios);
  });

  test('renders studios correctly', async () => {
    render(
        <List setMinPrice={jest.fn()} setMaxPrice={jest.fn()} />
      );

    // Check if the loading indicator is displayed
    // screen.getByText('Loading...'); // Uncomment this line if you have a loading indicator

    // Wait for the studios to be displayed
    await waitFor(() => {
      mockStudios.forEach(studio => {
        expect(screen.getByText(studio.title)).toBeInTheDocument();
        expect(screen.getByText(studio.description)).toBeInTheDocument();
      });
    });
  });

  test('displays a message when no studios are available', async () => {
    // Mock the useStudios hook to return an empty array
    useStudios.mockReturnValue([]);

    render(
        <List setMinPrice={jest.fn()} setMaxPrice={jest.fn()} />
    );

    await waitFor(() => {
      expect(screen.getByText('Try searching with a different parameter')).toBeInTheDocument();
    });
  });
});