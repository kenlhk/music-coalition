import Footer from "../../../components/common/Footer";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

it("should render", () => {
  render(<Footer />);
  const footerText = screen.getByText("Developed by Ken")

  expect(footerText).toBeInTheDocument();
});
