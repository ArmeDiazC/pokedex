import { render, screen } from "@testing-library/react";
import Home from "../Home";
import { BrowserRouter } from "react-router-dom";

test("renders Home button", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const button = screen.getByText(/Search/i);
  expect(button).toBeInTheDocument();
});

test("renders loading", async () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const card = await screen.getByTestId('spinner')
  expect(card).toBeInTheDocument();
  
});

