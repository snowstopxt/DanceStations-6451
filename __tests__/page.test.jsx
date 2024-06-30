import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LoginPage from '../src/app/login/page.tsx'
 
describe('Login page', () => {
  it('renders all inputs', () => {
    render(<LoginPage />)
    expect(screen.getByRole('textbox', { name: /email address/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });
 
   it('allows entering username and password', () => {
    render(<LoginPage />);
    userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
    userEvent.type(screen.getByLabelText(/password/i), 'password');
    expect(screen.getByLabelText(/email/i)).toHaveValue('user@example.com');
    expect(screen.getByLabelText(/password/i)).toHaveValue('password');
  
   });

   it('submits the form with username and password', async () => {
    render(<LoginPage />);
    // Mock the login function if it's passed as a prop or uses API calls
    const mockLogin = jest.fn();
    LoginPage.prototype.login = mockLogin; // Adjust based on your component's implementation

    userEvent.type(screen.getByLabelText(/email/i), 'user@example.com');
    userEvent.type(screen.getByLabelText(/password/i), 'password');
    userEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(mockLogin).toHaveBeenCalledWith('user@example.com', 'password');
  });
})