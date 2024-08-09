import React from "react";
import AComponent from "./components/localCountry";
import BComponent from "./components/searchCountry";
import styles from "./index.module.scss";
import CountriesTable from "./components/countries";
const Home: React.FC = () => {
  return (
    <>
      <div>
        <div className={styles.home_hero}>
          <AComponent />
          <BComponent />
        </div>
        <CountriesTable />
      </div>
    </>
  );
};

export default Home;
