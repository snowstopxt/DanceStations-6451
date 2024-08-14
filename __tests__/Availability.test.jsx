import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Availability from '../src/app/components/availability'; // Adjust import path
import { StudiosProvider, useStudios } from '../src/contexts/studiosContext'; 
import { ChakraProvider } from '@chakra-ui/react';
import {APIProvider} from '@vis.gl/react-google-maps';
import { AuthProvider, useAuth } from '../src/contexts/authContext.jsx';
import { createBooking, fetchBookingsForDay } from '../src/app/firebase/clientApp';


// Mock Firebase functions
jest.mock('../src/app/firebase/clientApp', () => ({
  createBooking: jest.fn(),
  fetchBookingsForDay: jest.fn(),
}));


jest.mock('../src/contexts/studiosContext', () => ({
    useStudios: jest.fn(),
  }));


  jest.mock('../src/contexts/authContext', () => ({
    useAuth: jest.fn()
  }));
  
  jest.mock('../src/app/firebase/clientApp', () => ({
    auth: { currentUser: { uid: '123', email: 'test@example.com' } }
  }));



  const AllProviders = ({ children }) => {
    return (
      <ChakraProvider>
      <APIProvider>
          {children}
      </APIProvider>
      </ChakraProvider>
    );
  };

describe('Availability Component', () => {
  it('renders correctly', () => {
    render(<Availability userId="user1" studioId="studio1" />, { wrapper: AllProviders });

    // Check if the component elements are present
    expect(screen.getByText('Select Date:')).toBeInTheDocument();
    expect(screen.getByText('Start Time:')).toBeInTheDocument();
    expect(screen.getByText('End Time:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reserve Now' })).toBeInTheDocument();
  });
});

describe('Availability Component Booking', () => {
    beforeEach(() => {
      // Mock fetchBookingsForDay to return booked slots
      fetchBookingsForDay.mockResolvedValue([{ time: '10', userId: 'user1' }]);
    });
  
    it('handles slot selection and reservation', async () => {
      render(<Availability userId="user1" studioId="studio1" />, { wrapper: AllProviders });
  
      // Simulate selecting a time slot
      fireEvent.click(screen.getByText('10:00'));
  
      // Check if the slot is selected (UI update verification)
      expect(screen.getByText('10:00')).toHaveStyle('background-color: rgb(255, 173, 0)'); // Adjust color based on your styles
  
      // Simulate reserving the slot
      createBooking.mockResolvedValue(false); // Mock a successful booking
      fireEvent.click(screen.getByRole('button', { name: 'Reserve Now' }));
  
      // Verify booking success
      expect(createBooking).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Reservation successful, please make payment through chat to confirm your booking');
    });
  
    it('shows error notification for unavailable slots', async () => {
      render(<Availability userId="user1" studioId="studio1" />, { wrapper: AllProviders });
  
      // Simulate selecting a time slot
      fireEvent.click(screen.getByText('10:00'));
  
      // Mock createBooking to fail
      createBooking.mockResolvedValue(true); // Mock an unsuccessful booking
      fireEvent.click(screen.getByRole('button', { name: 'Reserve Now' }));
  
      // Verify error message
      expect(createBooking).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith('Slot is unavailable, please choose other timings or dates');
    });
  });

  describe('Availability Component Edge Cases', () => {
    beforeEach(() => {
      // Mock fetchBookingsForDay to return booked slots
      fetchBookingsForDay.mockResolvedValue([]);
    });
  
    it('handles invalid date input', () => {
      render(<Availability userId="user1" studioId="studio1" />, { wrapper: AllProviders });
  
      // Simulate invalid date input
      fireEvent.change(screen.getByPlaceholderText('Date'), { target: { value: 'invalid-date' } });
  
      // Verify that the date input does not update
      expect(screen.getByPlaceholderText('Date').value).toBe('');
    });
  
    it('handles time input out of range', () => {
      render(<Availability userId="user1" studioId="studio1" />, { wrapper: AllProviders });
  
      // Simulate time input changes
      fireEvent.change(screen.getByLabelText('Start Time:'), { target: { value: '08:00' } });
      fireEvent.change(screen.getByLabelText('End Time:'), { target: { value: '25:00' } });
  
      // Verify time inputs handle out-of-range values
      expect(screen.getByLabelText('Start Time:').value).toBe('08:00');
      expect(screen.getByLabelText('End Time:').value).toBe('25:00'); // Adjust based on how your component handles this
    });
  });

