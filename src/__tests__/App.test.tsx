//Imports
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import Navbar from "../components/Navbar";

import Landing from "../pages/Landing";

//To Test
beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

describe("first test", () => {
  test("Renders main page correctly", async () => {
    // Setup
    render(<App />);
    const title = await screen.queryByText(/Learn More About Africa/);
    expect(title).toBeInTheDocument();
  });
});
