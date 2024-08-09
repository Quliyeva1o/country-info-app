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
import CountryInfo from "../CountryInfo";
import { Spin } from "antd";

const AComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { localCountry, localData, loading, error } = useSelector(
    (state: RootState) => state.localData
  );


//EFFECTS
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
  }, [localCountry]);

  if (loading)
    return (
      <div>
        <Spin />
      </div>
    );
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.a_component}>
      <h1>Data Based on Your Location</h1>
      {localData ? (
        <CountryInfo data={localData} className={`local`} />
      ) : (
        <p>No data found for your location.</p>
      )}
    </div>
  );
};

export default AComponent;
