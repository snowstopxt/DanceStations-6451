/**
 * @jest-environment jsdom
 */

/*
import { render, screen } from "@testing-library/react";
import Home from "@/pages/home/index";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /welcome to next\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
*/

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LoginPage from '../../src/app/login/page'
 
describe('Page', () => {
  it('renders an email input', () => {
    render(<LoginPage />)
 
    const emailInput = screen.getByRole('textbox', {
        name: /email address/i
      })
 
    expect(emailInput).toBeInTheDocument()
  })
})
