import { screen, render } from "@testing-library/react";
import EmissionsChart, {
  getTickXFormatted,
  getTickYFormatted,
  getFormattedLegend,
  getInterval,
} from "./EmissionsChart";
import { data as testData } from "../../utils/testData";

const data = [];

test("EmissionsChart renders", () => {
  const props = { data };
  render(<EmissionsChart {...props} />);
});

test("EmissionsChart renders blank message if no data", () => {
  const props = { data };
  render(<EmissionsChart {...props} />);
  expect(screen.getByText("No data found")).toBeTruthy();
});

test("should format X axis tick", () => {
  expect(getTickXFormatted(1, "2020-09-02T14:19:41.295000Z")).toBe(
    "2020-09-02"
  );
  expect(getTickXFormatted(0, "2020-09-02T14:19:41.295000Z")).toBe("");
});

test("should format Y axis tick", () => {
  expect(getTickYFormatted(1.00005151541)).toBe("1.00 CO2");
});

test("should format legend", () => {
  expect(getFormattedLegend("average")).toBe("Daily average CO2 emission");
  expect(getFormattedLegend("average", 0)).toBe("Yearly average CO2 emission");
  expect(getFormattedLegend("average", 1)).toBe(
    "Quarterly average CO2 emission"
  );
  expect(getFormattedLegend("average", 2)).toBe("Monthly average CO2 emission");
  expect(getFormattedLegend("test")).toBe("");
});

test("should get interval", () => {
  expect(getInterval(0, 1)).toBe(0);
  expect(getInterval(5, 1)).toBe(5);
  expect(getInterval(5, 5)).toBe(1);
});

test("should have 3 tabs", () => {
  const props = { data: testData };
  render(<EmissionsChart {...props} />);
  expect(screen.getAllByTestId("test-tabs").length).toBe(3);
});
