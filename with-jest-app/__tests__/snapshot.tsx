/**
 * @jest-environment jsdom
 */
import { render } from "@testing-library/react";
//import Home from "@/pages/home/index";
import LoginPage from '../../src/app/login/page'

it("renders homepage unchanged", () => {
  const { container } = render(<LoginPage />);
  expect(container).toMatchSnapshot();
});

