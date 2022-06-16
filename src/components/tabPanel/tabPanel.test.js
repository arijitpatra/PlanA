import { render, screen } from "@testing-library/react";
import TabPanel from "./TabPanel";

test("check if tabpanel rendered", () => {
  render(<TabPanel index={0} />);
  expect(screen.getByTestId("test-tabpanel")).toBeInTheDocument();
  //   expect(screen.getByText("Yearly")).toBeTruthy();
});
