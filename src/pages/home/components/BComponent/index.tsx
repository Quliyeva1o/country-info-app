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
import { Button, Input } from "antd";

const BComponent: React.FC = () => {
  //STATES
  const [countryCode, setCountryCode] = useState("");

  //REDUX
  const { searchData, loading, error } = useSelector(
    (state: RootState) => state.searchData
  );

  //DISPATCH
  const dispatch = useDispatch();

  //FETCHDATA
  const handleFetchData = () => {
    dispatch(setLoading(true));
    getUrl(BASE_URL)
      .then((res: any) => {
        const foundItem: CountryData | undefined = res.data.find(
          (item: CountryData) =>
            item.cca2.trim().toLocaleLowerCase() ===
              countryCode.trim().toLocaleLowerCase() ||
            item.name.common
              .trim()
              .toLocaleLowerCase()
              .includes(countryCode.trim().toLocaleLowerCase())
        );
        dispatch(setSearchData(foundItem || null));
      })
      .catch((err) => {
        console.error("Error fetching data", err);
        dispatch(setError("Error fetching data"));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.b_component}>
      {!searchData && <h1>Fetch Country Data</h1>}
      <form action="" onSubmit={handleFetchData} className={styles.form}>
        <Input
          type="text"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          placeholder="Enter country code (e.g., US)"
        />
        <Button htmlType="submit">Fetch Data</Button>
      </form>

      {searchData ? (
        <div>
          <div className={styles.local_hero}>
            <div className={styles.flag_div}>
              <img src={searchData.flags.png} alt={searchData.flags.alt} />
            </div>
            <div>
              <h4>Country Name: {searchData.name.common}</h4>
              <h4>Country Code: {searchData.cca2}</h4>
              <h4>Population: {searchData.population}</h4>
            </div>
          </div>
          <div className={styles.gerb_section}>
            <div>
              <h4>Timezone: {searchData.timezones[0]}</h4>
              <h4>Latitude: {searchData.latlng[0]}</h4>
              <h4>Longitude: {searchData.latlng[1]}</h4>
            </div>
            <div className={styles.gerb}>
              <img src={searchData.coatOfArms.png} alt="Coat of Arms" />
            </div>
          </div>
        </div>
      ) : (
        <p>No data found for the entered country code.</p>
      )}
    </div>
  );
};

export default BComponent;

//INTERFACE
interface CountryData {
  cca2: string;
  name: { common: string };
  flags: { png: string; alt: string };
  population: number;
  timezones: string[];
  latlng: [number, number];
  coatOfArms: { png: string };
}
