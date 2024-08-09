import React from "react";
import styles from "./index.module.scss";
import CountriesTable from "./components/countries";
import { Flex } from "antd";
import LocalCountry from "./components/localCountry";
import SearchedCountry from "./components/searchCountry";
const Home: React.FC = () => {
  return (
    <>
      <div>
        <Flex gap={10}  className={styles.home_hero}>
          <LocalCountry />
          <SearchedCountry />
        </Flex>
        <CountriesTable />
      </div>
    </>
  );
};

export default Home;
