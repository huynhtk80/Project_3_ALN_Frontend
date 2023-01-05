//Imports
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

import Navbar from "../components/Navbar";

import Landing from "../pages/Landing";

//To Test
import HeroSection from "../components/HeroSection";

describe("first test", () => {
  test("Renders main page correctly", async () => {
    // Setup
    render(<HeroSection />, { wrapper: BrowserRouter });
    const title = await screen.queryByText(/Africa/);
    expect(title).toBeInTheDocument();
  });
});
