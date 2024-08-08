import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { getUrl } from "../../../../API/requests";
import { BASE_URL, LOCAL_COUNTRY_URL } from "../../../../API/constants";
import styles from "./index.module.scss";
import {
  setLocalData,
  setLoading,
  setError,
  setLocalCountry,
} from "../../../../redux/slices/localDataSlice";

const AComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { localCountry, localData, loading, error } = useSelector(
    (state: RootState) => state.localData
  );

  // Fetch local country data
  useEffect(() => {
    dispatch(setLoading(true));
    getUrl(LOCAL_COUNTRY_URL)
      .then((res: any) => {
        dispatch(setLocalCountry(res.data.country));
      })
      .catch((err) => {
        console.error("Error fetching local country data", err);
        dispatch(setError("Error fetching local country data"));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  // Fetch data based on local country
  useEffect(() => {
    if (localCountry) {
      dispatch(setLoading(true));
      getUrl(BASE_URL)
        .then((res: any) => {
          const foundItem = res.data.find(
            (item: any) => item.cca2 === localCountry
          );
          dispatch(setLocalData(foundItem || {}));
        })
        .catch((err) => {
          console.error("Error fetching data", err);
          dispatch(setError("Error fetching data"));
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [localCountry, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.a_component}>
      <h1>Data Based on Your Location</h1>
      {localData ? (
        <div>
          <div className={styles.local_hero}>
            <div className={styles.flag_div}>
              <img src={localData.flags.png} alt={localData.flags.alt} />
            </div>
            <div>
              <h4>Country Name: {localData.name.common}</h4>
              <h4>Country Code: {localData.cca2}</h4>
              <h4>Population: {localData.population}</h4>
            </div>
          </div>
          <div className={styles.gerb_section}>
            <div>
              <h4>Timezone: {localData.timezones[0]}</h4>
              <h4>Latitude: {localData.latlng[0]}</h4>
              <h4>Longitude: {localData.latlng[1]}</h4>
            </div>
            <div className={styles.gerb}>
              <img src={localData.coatOfArms.png} alt="Coat of Arms" />
            </div>
          </div>
        </div>
      ) : (
        <p>No data found for your location.</p>
      )}
    </div>
  );
};

export default AComponent;
