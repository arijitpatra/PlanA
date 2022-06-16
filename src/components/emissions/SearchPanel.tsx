import type { ChangeEvent, CSSProperties } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import type { DatePickerProps } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import { Moment } from "moment";
import type { Product } from "../../api/emissions/getProducts";
import countries from "../../utils/getCountries";
import type { SearchPanelData } from "../../App";
import styled from "styled-components";
import { dateFormat } from "../../utils/getDateFormat";

const StyledSearchPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > * {
    margin-right: 2rem !important;
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;

    & > * {
      margin-right: 0 !important;
      margin-bottom: 0.5rem !important;
    }
  }
`;

type Props = {
  products: Array<Product>;
  data: SearchPanelData;
  handleSelectOnChange: (e: ChangeEvent<any>) => void;
  handleDatePickerOnChange: (moment: Moment, name: string) => void;
};

export const toCapitalCase = (string: string) =>
  string.slice(0, 1).toUpperCase() + string.slice(1);

const SearchPanel = ({
  products,
  data,
  handleSelectOnChange,
  handleDatePickerOnChange,
}: Props) => {
  const formControlStyle: CSSProperties = { minWidth: "200px" };
  const datePickerProps: Partial<DatePickerProps> = {
    maxDate: new Date(),
    format: dateFormat,
  };
  return (
    <StyledSearchPanel>
      <FormControl style={formControlStyle}>
        <InputLabel id="product">Product</InputLabel>
        <Select
          name="product"
          value={data.product}
          onChange={handleSelectOnChange}
        >
          {products.map((product) => (
            <MenuItem key={product.name} value={product.name}>
              {toCapitalCase(product.name)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl style={formControlStyle}>
        <InputLabel id="country">Country</InputLabel>
        <Select
          name="country"
          value={data.country}
          onChange={handleSelectOnChange}
        >
          {countries.map((country) => (
            <MenuItem key={country.name} value={country.value}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
        <DatePicker
          {...datePickerProps}
          id="begin"
          variant="inline"
          label="Begin"
          value={data.begin}
          onChange={(moment) =>
            handleDatePickerOnChange(moment ? moment : data.begin, "begin")
          }
        />
        <DatePicker
          {...datePickerProps}
          id="end"
          variant="inline"
          label="End"
          value={data.end}
          onChange={(moment) =>
            handleDatePickerOnChange(moment ? moment : data.end, "end")
          }
        />
      </MuiPickersUtilsProvider>
    </StyledSearchPanel>
  );
};

export default SearchPanel;
