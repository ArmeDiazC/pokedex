import {
  act,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Home from "../Home";
import { BrowserRouter } from "react-router-dom";

jest.setTimeout(50000)

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
  const spinner = await screen.getByTestId("spinner");
  expect(spinner).toBeInTheDocument();
});

test("renders Cards", async () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  await waitForElementToBeRemoved(screen.getByTestId("spinner"), { timeout: 45000 });

  //await waitForElementToBeRemoved(async() => await screen.getByTestId("spinner"));

  const selectElement = screen.getByDisplayValue('grass')

  //const card = screen.getByTestId("card");
  expect(selectElement).toBeInTheDocument();
});
