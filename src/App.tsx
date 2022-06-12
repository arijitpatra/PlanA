import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import getProducts from "./api/emissions/getProducts";
import getAvgByProduct from "./api/emissions/getAvgByProduct";
import styled from "styled-components";
import SearchPanel from "./components/emissions/SearchPanel";
import EmissionsChart from "./components/emissions/EmissionsChart";
import { Title, Flex } from "./styles/lib";
import type { Product } from "./api/emissions/getProducts";
import type {
  AvgByProductParams,
  AvgByProduct,
} from "./api/emissions/getAvgByProduct";
import moment from "moment";
import type { Moment } from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import dateFormat from "./utils/getDateFormat";

const StyledApp = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem 0;

  @media only screen and (max-width: 768px) {
    margin: 1.5rem 0;
  }
`;

export type SearchPanelData = {
  product: string;
  country: string;
  begin: Moment;
  end: Moment;
};

const initialSearchPanelData: SearchPanelData = {
  product: "methane",
  country: "DE",
  begin: moment().subtract(1, "years"),
  end: moment(),
};

const App = () => {
  const [products, setProducts]: [Array<Product>, Function] = useState([]);
  const [avgEmissions, setAvgEmissions]: [Array<AvgByProduct>, Function] =
    useState([]);
  const [isLoading, setIsLoading]: [boolean, Function] = useState(true);
  const [searchPanelData, setSearchPanelData]: [SearchPanelData, Function] =
    useState(initialSearchPanelData);

  useEffect(() => {
    const loadProducts = async () => {
      const data: Array<Product> = await getProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const loadAvgEmissions = async () => {
      const getAvgByProductParams: AvgByProductParams = {
        ...searchPanelData,
        begin: searchPanelData.begin.format(dateFormat),
        end: searchPanelData.end.format(dateFormat),
      };
      sessionStorage.setItem(
        "startDate",
        searchPanelData.begin.format(dateFormat)
      );
      sessionStorage.setItem("endDate", searchPanelData.end.format(dateFormat));
      setIsLoading(true);
      // Get avg daily data only when product is selected
      if (searchPanelData.product) {
        const data: Array<AvgByProduct> = await getAvgByProduct(
          getAvgByProductParams
        );
        setAvgEmissions(data);
        setIsLoading(false);
      }
    };
    loadAvgEmissions();
  }, [searchPanelData]);

  const handleSelectOnChange = (e: ChangeEvent<any>): void =>
    setSearchPanelData({ ...searchPanelData, [e.target.name]: e.target.value });
  const handleDatePickerOnChange = (moment: Moment, name: string) =>
    setSearchPanelData({ ...searchPanelData, [name]: moment });

  return (
    <StyledApp>
      <Header>
        <Title>GHG Density</Title>
      </Header>
      <SearchPanel
        data={searchPanelData}
        products={products}
        handleSelectOnChange={handleSelectOnChange}
        handleDatePickerOnChange={handleDatePickerOnChange}
      />
      <Flex grow="1" alignItems="center" justifyContent="center">
        {isLoading ? (
          <CircularProgress size={100} />
        ) : (
          <EmissionsChart data={avgEmissions} />
        )}
      </Flex>
    </StyledApp>
  );
};

export default App;
