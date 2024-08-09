import React, { useState, useEffect } from "react";
import { Table, message, Modal, Card } from "antd";
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
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

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
          flag: country.flags.png,
          countryCode: country.cca2,
          countryPrefix: country.callingCodes ? `+${country.callingCodes[0]}` : "N/A"
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

  // Modal handler
  const handleRowClick = (record: Country) => {
    setSelectedCountry(record);
  };

  const handleModalClose = () => {
    setSelectedCountry(null);
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
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
      {selectedCountry && (
        <Modal
          title={selectedCountry.name}
          visible={!!selectedCountry}
          onCancel={handleModalClose}
          footer={null}
        >
          <Card
            cover={<img alt="flag" src={selectedCountry.flag} />}
          >
            <Card.Meta
              title={selectedCountry.name}
              description={`Code: ${selectedCountry.countryCode}, Prefix: ${selectedCountry.countryPrefix}`}
            />
            <p>Population: {selectedCountry.population}</p>
            <p>Region: {selectedCountry.region}</p>
            <p>Capital: {selectedCountry.capital}</p>
          </Card>
        </Modal>
      )}
    </div>
  );
};

export default CountriesTable;


// INTERFACES
interface Country {
  [x: string]: any;
  key: React.Key;
  name: string;
  population: number;
  region: string;
  capital: string;
}

// TABLE COLUMNS
const columns: TableColumnsType<Country> = [
  {
    title: "Flag",
    dataIndex: "flag",
    key: "flag",
    render: (text: string) => <img src={text} alt="flag" style={{ width: 30 }} />,
    width: 100,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: 200,
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: "Country Code",
    dataIndex: "countryCode",
    key: "countryCode",
    width: 150,
  },
  {
    title: "Population",
    dataIndex: "population",
    key: "population",
    width: 150,
    sorter: (a, b) => a.population - b.population,
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
  {
    title: "Country Prefix",
    dataIndex: "countryPrefix",
    key: "countryPrefix",
    width: 150,
  },
];

