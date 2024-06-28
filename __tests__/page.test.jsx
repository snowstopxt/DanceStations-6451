import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LoginPage from '../src/app/login/index.jsx'
 
describe('Page', () => {
  it('renders an email input', () => {
    render(<LoginPage />)
 
    const heading = screen.getByRole('textbox', {
        name: /email address/i
      })
 
    expect(heading).toBeInTheDocument()
  })
})