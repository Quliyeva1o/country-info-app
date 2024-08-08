import React from "react";
import AComponent from "./components/AComponent";
import BComponent from "./components/BComponent";
import styles from "./index.module.scss";
import CountriesTable from "./components/CountriesTable";
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
