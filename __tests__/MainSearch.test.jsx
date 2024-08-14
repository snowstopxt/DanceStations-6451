import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MainSearch from '../src/app/components/searchInput/mainSearch'; // Update with the correct path
import { ChakraProvider } from '@chakra-ui/react';
import { StudiosProvider, useStudios } from '../src/contexts/studiosContext';
import Link from 'next/link';


const AllProviders = ({ children }) => {
    return (
      <ChakraProvider>
      <StudiosProvider>
          {children}
      </StudiosProvider>
      </ChakraProvider>
    );
  };


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


describe('MainSearch Component', () => {
  test('renders the main search bar', () => {
    render(<ChakraProvider><MainSearch /></ChakraProvider>);

    expect(screen.getByPlaceholderText('Studio Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('MRT Station')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Find Studio' })).toBeInTheDocument();
  });

  test('updates input values on change', () => {
    render(<ChakraProvider><MainSearch /></ChakraProvider>);

    const studioNameInput = screen.getByPlaceholderText('Studio Name');
    const mrtStationInput = screen.getByPlaceholderText('MRT Station');

    fireEvent.change(studioNameInput, { target: { value: 'Dance Studio' } });
    fireEvent.change(mrtStationInput, { target: { value: 'Central' } });

    expect(studioNameInput.value).toBe('Dance Studio');
    expect(mrtStationInput.value).toBe('Central');
  });

  test('navigates to the correct URL with search params on button click', () => {
    render(<ChakraProvider><MainSearch /></ChakraProvider>);

    const studioNameInput = screen.getByPlaceholderText('Studio Name');
    const mrtStationInput = screen.getByPlaceholderText('MRT Station');
    const findButton = screen.getByRole('button', { name: 'Find Studio' });

    fireEvent.change(studioNameInput, { target: { value: 'Dance Studio' } });
    fireEvent.change(mrtStationInput, { target: { value: 'Central' } });

    fireEvent.click(findButton);

    // You would need to mock or intercept the navigation
    // Check if the URL changes to /map?studioName=Dance%20Studio&mrt=Central
    // This part depends on how you handle routing in your tests
    expect(window.location.href).toContain('/map?studioName=Dance%20Studio&mrt=Central');
  });

  test('handles errors gracefully (if applicable)', () => {
    // You would need to simulate an error condition if your component handles errors
    // This might require mocking or other setup depending on your error handling logic
    render(<MainSearch />, { wrapper: AllProviders });

    // For example, if there is a validation or error message to test
    // You can check for its presence or absence based on the conditions
  });
});