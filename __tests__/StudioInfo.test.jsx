import { render, screen, waitFor } from '@testing-library/react';
import StudioInfo from '../src/app/components/studioInfo';
import { retrievePhoto } from '../src/app/firebase/clientApp';

jest.mock('../src/app/firebase/clientApp', () => ({
  retrievePhoto: jest.fn(),
}));

const stars = 4;

const studio = {
    name: 'Test Studio',
    mrt: 'Test MRT',
    size: '100',
    price: '50',
    description: 'A great studio!',
    image: 'test-image-url',
  };  

test('retrieves photo from Firestore and displays it', async () => {
  // Mock photo URL
  retrievePhoto.mockResolvedValue('test-photo-url');

  render(<StudioInfo stars={4} studio={studio} />);

  // Check if the photo is displayed
  await waitFor(() => {
    expect(screen.getByAltText(studio.name)).toHaveAttribute('src', 'test-photo-url');
  });
});


test('fetches studio and displays data', async () => {
  // Mock photo URL
  retrievePhoto.mockResolvedValue('test-photo-url');

  render(<StudioInfo stars={stars} studio={studio} />);

  // Check if the photo is displayed
  await waitFor(() => {
    expect(screen.getByAltText(studio.name)).toHaveAttribute('src', 'test-photo-url');
  });

  // Check studio details
  expect(screen.getByText(studio.name)).toBeInTheDocument();
  expect(screen.getByText(studio.mrt)).toBeInTheDocument();
  expect(screen.getByText(`${studio.size} square meters`)).toBeInTheDocument();
  expect(screen.getByText(`$${studio.price}/h`)).toBeInTheDocument();
  expect(screen.getByText(studio.description)).toBeInTheDocument();

});

test('renders availability based on user type', () => {
    const userType = 'dancer'; // Or 'owner'
    render(<StudioInfo stars={4} studio={studio} />);
  
    if (userType === 'dancer') {
      expect(screen.getByText('Availability')).toBeInTheDocument(); // Assuming you have this element
    } else {
      expect(screen.queryByText('Availability')).not.toBeInTheDocument();
    }
  });
