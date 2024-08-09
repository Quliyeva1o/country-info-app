import React from "react";
import AComponent from "./components/localCountry";
import BComponent from "./components/searchCountry";
import styles from "./index.module.scss";
import CountriesTable from "./components/countries";
import { Flex } from "antd";
const Home: React.FC = () => {
  return (
    <>
      <div>
        <Flex gap={10} className={styles.home_hero}>
          <AComponent />
          <BComponent />
        </Flex>
        <CountriesTable />
      </div>
    </>
  );
};

export default Home;
