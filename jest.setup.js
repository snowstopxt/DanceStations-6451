import '@testing-library/jest-dom/extend-expect'

class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  
  window.ResizeObserver = ResizeObserver;

  // Mock Firebase authentication and Firestore
jest.mock('./src/contexts/authContext', () => ({
    useAuth: jest.fn(),
  }));
  
  jest.mock('./src/app/firebase/clientApp', () => ({
    auth: {
      currentUser: { uid: '123', email: 'test@example.com' },
      // Add other properties or methods as needed
    },
  }));
  
  jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    doc: jest.fn(),
    setDoc: jest.fn(),
  }));
  
  // Set default return values for mocks if needed
  beforeEach(() => {
    const mockAuth = {
      user: { uid: '123', email: 'test@example.com' },
      isAuthenticated: true,
    };
  
    require('./src/contexts/authContext').useAuth.mockReturnValue(mockAuth);
  });

  jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
  }));