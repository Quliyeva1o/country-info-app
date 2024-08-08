import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import type { TableColumnsType } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import {
  setAllCountry,
  setError,
  setLoading,
} from "../../../../redux/slices/AllDataSlice";
import { getUrl } from "../../../../API/requests";
import { BASE_URL } from "../../../../API/constants";
import styles from "./index.module.scss";

const CountriesTable: React.FC = () => {
  // STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  // DISPATCH
  const dispatch = useDispatch();

  // REDUX
  const { allCountry, loading: dataLoading } = useSelector(
    (state: RootState) => state.allData
  );

  // EFFECTS
  useEffect(() => {
    fetchRecords(currentPage, pageSize);
  }, [currentPage, pageSize]);

  // API FUNCTIONS
  const fetchRecords = (page: number, pageSize: number) => {
    dispatch(setLoading(true));
    getUrl(`${BASE_URL}?page=${page}&pageSize=${pageSize}`)
      .then((res: any) => {
        const data = res.data.map((country: any) => ({
          key: country.cca2,
          name: country.name.common,
          population: country.population,
          region: country.region,
          capital: country.capital ? country.capital[0] : "N/A",
        }));
        dispatch(setAllCountry(data));
        setTotalRecords(res.total);
      })
      .catch((err) => {
        console.error("Error fetching data", err);
        dispatch(setError("Error fetching data"));
        message.error("Error fetching data");
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  return (
    <div>
      <Table
        className={styles.countries_table_container}
        columns={columns}
        dataSource={allCountry}
        loading={dataLoading}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: totalRecords,
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
          },
        }}
      />
    </div>
  );
};

export default CountriesTable;

// INTERFACES
interface Country {
  key: React.Key;
  name: string;
  population: number;
  region: string;
  capital: string;
}

// TABLE COLUMNS
const columns: TableColumnsType<Country> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 200,
  },
  {
    title: "Population",
    dataIndex: "population",
    key: "population",
    width: 150,
  },
  {
    title: "Region",
    dataIndex: "region",
    key: "region",
    width: 150,
  },
  {
    title: "Capital",
    dataIndex: "capital",
    key: "capital",
    width: 150,
  },
];
