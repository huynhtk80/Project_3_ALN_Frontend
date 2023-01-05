//Imports
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import InterObserver from "../components/InterObserver";
import Navbar from "../components/Navbar";

import Landing from "../pages/Landing";

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
//To Test

describe("InterObserver Test", () => {
  test("Heading Prop is passing to page", async () => {
    // Setup
    render(
      <InterObserver
        image="https://picsum.photos/400/400"
        sectionId="Learn"
        heading="Learn More About Africa"
        message="hello"
        imagePosition="left"
      />
    );
    const title = await screen.queryByText(/Learn More About Africa/);
    expect(title).toBeInTheDocument();
  });
});
