import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StudioForm from '../src/app/components/studioForm'; // Adjust import path
import {createStudio} from '../src/app/firebase/clientApp'; // Adjust import path

jest.mock('../src/app/firebase/clientApp', () => ({
  createStudio: jest.fn(),
}));

describe('StudioForm Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('submits the form with valid data', async () => {
    // Mock createStudio to resolve successfully
    firebase.createStudio.mockResolvedValue(true);

    render(<StudioForm />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText('Enter studio name'), { target: { value: 'Cool Studio' } });
    fireEvent.change(screen.getByPlaceholderText('Enter studio location'), { target: { value: '123 Studio Lane' } });
    fireEvent.change(screen.getByPlaceholderText('Enter mrt station'), { target: { value: 'Studio MRT' } });
    fireEvent.change(screen.getByPlaceholderText('Enter studio size'), { target: { value: '100' } });
    fireEvent.change(screen.getByPlaceholderText('Enter price per hour'), { target: { value: '50' } });
    fireEvent.change(screen.getByPlaceholderText('Enter studio description'), { target: { value: 'A spacious studio with all amenities.' } });

    // Mock geocoding
    global.alert = jest.fn(); // Mock alert function
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(firebase.createStudio).toHaveBeenCalledWith(expect.objectContaining({
        name: 'Cool Studio',
        location: '123 Studio Lane',
        mrt: 'Studio MRT',
        size: '100',
        price: '50',
        description: 'A spacious studio with all amenities.',
      }));
      expect(global.alert).toHaveBeenCalledWith('Studio created successfully!');
    });
  });
});

describe('StudioForm Component Error Handling', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });
  
    it('handles errors during form submission', async () => {
      // Mock createStudio to reject with an error
      firebase.createStudio.mockRejectedValue(new Error('Failed to create studio'));
  
      render(<StudioForm />);
  
      // Fill out the form
      fireEvent.change(screen.getByPlaceholderText('Enter studio name'), { target: { value: 'Cool Studio' } });
      fireEvent.change(screen.getByPlaceholderText('Enter studio location'), { target: { value: '123 Studio Lane' } });
      fireEvent.change(screen.getByPlaceholderText('Enter mrt station'), { target: { value: 'Studio MRT' } });
      fireEvent.change(screen.getByPlaceholderText('Enter studio size'), { target: { value: '100' } });
      fireEvent.change(screen.getByPlaceholderText('Enter price per hour'), { target: { value: '50' } });
      fireEvent.change(screen.getByPlaceholderText('Enter studio description'), { target: { value: 'A spacious studio with all amenities.' } });
  
      // Mock geocoding
      global.alert = jest.fn(); // Mock alert function
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  
      await waitFor(() => {
        expect(global.alert).toHaveBeenCalledWith('Error creating studio');
      });
    });
  });

  describe('StudioForm Component Invalid Inputs', () => {
    it('shows an alert for invalid image file', () => {
      render(<StudioForm />);
  
      // Simulate selecting an invalid file
      const fileInput = screen.getByLabelText('Upload a photo of your studio').querySelector('input[type="file"]');
      fireEvent.change(fileInput, {
        target: {
          files: [new File(['test'], 'test.txt', { type: 'text/plain' })]
        }
      });
  
      // Check for alert
      expect(global.alert).toHaveBeenCalledWith('Please upload a valid image file');
    });
  
    it('restricts non-numeric input for size and price fields', () => {
      render(<StudioForm />);
  
      // Simulate entering invalid characters
      fireEvent.change(screen.getByPlaceholderText('Enter studio size'), { target: { value: 'abc' } });
      fireEvent.change(screen.getByPlaceholderText('Enter price per hour'), { target: { value: 'xyz' } });
  
      // Check the inputs are not updated
      expect(screen.getByPlaceholderText('Enter studio size').value).toBe('');
      expect(screen.getByPlaceholderText('Enter price per hour').value).toBe('');
    });
  });

  describe('StudioForm Component End-to-End Flow', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });
  
    it('completes the flow from form submission to studio creation', async () => {
      // Mock successful geocoding and studio creation
      firebase.createStudio.mockResolvedValue(true);
  
      render(<StudioForm />);
  
      // Fill out the form
      fireEvent.change(screen.getByPlaceholderText('Enter studio name'), { target: { value: 'Cool Studio' } });
      fireEvent.change(screen.getByPlaceholderText('Enter studio location'), { target: { value: '123 Studio Lane' } });
      fireEvent.change(screen.getByPlaceholderText('Enter mrt station'), { target: { value: 'Studio MRT' } });
      fireEvent.change(screen.getByPlaceholderText('Enter studio size'), { target: { value: '100' } });
      fireEvent.change(screen.getByPlaceholderText('Enter price per hour'), { target: { value: '50' } });
      fireEvent.change(screen.getByPlaceholderText('Enter studio description'), { target: { value: 'A spacious studio with all amenities.' } });
  
      // Simulate image upload
      const fileInput = screen.getByLabelText('Upload a photo of your studio').querySelector('input[type="file"]');
      fireEvent.change(fileInput, {
        target: {
          files: [new File(['test'], 'image.jpg', { type: 'image/jpeg' })]
        }
      });
  
      // Mock geocoding
      global.alert = jest.fn(); // Mock alert function
      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));
  
      await waitFor(() => {
        expect(firebase.createStudio).toHaveBeenCalledWith(expect.objectContaining({
          name: 'Cool Studio',
          location: '123 Studio Lane',
          mrt: 'Studio MRT',
          size: '100',
          price: '50',
          description: 'A spacious studio with all amenities.',
          image: expect.anything() // Mock file input
        }));
        expect(global.alert).toHaveBeenCalledWith('Studio created successfully!');
      });
    });
  });