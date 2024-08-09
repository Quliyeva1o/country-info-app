import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { getUrl } from "../../../../API/requests";
import { BASE_URL } from "../../../../API/constants";
import styles from "./index.module.scss";
import {
  setLoading,
  setError,
  setSearchData,
} from "../../../../redux/slices/searchDataSlice";
import { Button, Form, Input, Spin } from "antd";
import CountryInfo from "../countryDetail";

const SearchedCountry: React.FC = () => {
  // STATES
  const [countryCode, setCountryCode] = useState("");

  // REDUX
  const { searchData, loading, error } = useSelector(
    (state: RootState) => state.searchData
  );

  // DISPATCH
  const dispatch = useDispatch();

  // FETCH DATA
  const handleFetchData = () => {
    dispatch(setLoading(true));
    getUrl(BASE_URL)
      .then((res: any) => {
        const foundItem: CountryData | undefined = res.data.find(
          (item: CountryData) =>
            item.cca2.trim().toLowerCase() ===
              countryCode.trim().toLowerCase() ||
            item.name.common
              .trim()
              .toLowerCase()
              .includes(countryCode.trim().toLowerCase())
        );
        dispatch(setSearchData(foundItem || null));
      })
      .catch((err) => {
        console.error("Error fetching data", err);
        dispatch(setError("Sorry We can't get data"));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

 

  return (
    <div className={styles.search_country_component}>
      {error && <div>{error}</div>}

      {!searchData && <h1>Fetch Country Data</h1>}
      <Form onFinish={handleFetchData} className={styles.search_country_form}>
        <Form.Item
          className={styles.form_item}
          name="countryCode"
          rules={[{ required: true, message: "Please enter a country!" }]}
        >
          <Input
            type="text"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            placeholder="Enter country"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {loading ? <Spin /> : "Submit"}
          </Button>
        </Form.Item>
      </Form>

      {searchData ? (
        <CountryInfo data={searchData} className={`search`} />
      ) : (
        <p>No data found for the entered country code.</p>
      )}
    </div>
  );
};

export default SearchedCountry;

// INTERFACE
interface CountryData {
  cca2: string;
  name: { common: string };
  flags: { png: string; alt: string };
  population: number;
  timezones: string[];
  latlng: [number, number];
  coatOfArms: { png: string };
}
