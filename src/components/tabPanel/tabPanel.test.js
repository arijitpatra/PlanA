import { render, screen } from "@testing-library/react";
import TabPanel from "./TabPanel";

test("check if tabpanel rendered", () => {
  render(<TabPanel index={0} value={0} />);
  expect(screen.getByTestId("test-tabpanel")).toBeInTheDocument();
});

test("check if children is rendered correctly", () => {
  render(
    <TabPanel index={0} value={0}>
      I am TabPanel
    </TabPanel>
  );
  expect(screen.getByText("I am TabPanel")).toBeTruthy();
});

test("check if hidden when index and value are different", () => {
  render(<TabPanel index={0} value={1} />);
  expect(screen.getByTestId("test-tabpanel")).not.toBeVisible();
});
