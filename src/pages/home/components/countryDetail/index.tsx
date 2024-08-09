import React from "react";
import "./index.scss";
import { Button } from "antd";

//INTERFACES
interface CountryData {
  flags: {
    png: string;
    alt: string;
  };
  name: {
    common: string;
  };
  maps: {
    googleMaps: string;
  };
  cca2: string;
  population: number;
  timezones: string[];
  latlng: [number, number];
  coatOfArms: {
    png: string;
  };
}

interface CountryInfoProps {
  data: CountryData;
  className: string;
}

const CountryInfo: React.FC<CountryInfoProps> = ({ data, className }) => {

  //DATAS ARRAYS
  const infoItems = [
    { label: "Country Name", value: data.name.common },
    { label: "Country Code", value: data.cca2 },
    { label: "Population", value: data.population.toLocaleString() },
  ];

  const gerbItems = [
    { label: "Timezone", value: data.timezones[0] },
    { label: "Latitude", value: data.latlng[0] },
    { label: "Longitude", value: data.latlng[1] },
  ];

  return (
    <div className="country_info">
      <div className={`${className}_hero`}>
        <div className="flag_div">
          <img src={data.flags.png} alt={`Flag of ${data.name.common}`} />
        </div>
        <div className="flag_info">
          {infoItems.map((item) => (
            <h4 key={item.label}>{`${item.label}: ${item.value}`}</h4>
          ))}
        </div>
      </div>
      <div className="gerb_section">
        <div className="gerbitems">
          {gerbItems.map((item) => (
            <h4 key={item.label}>{`${item.label}: ${item.value}`}</h4>
          ))}
        </div>
        <div className="gerb">
          <img
            src={data.coatOfArms.png}
            alt={`Coat of Arms of ${data.name.common}`}
          />
        </div>
      </div>

      <Button target="_blank" type="primary" href={data.maps.googleMaps} className="mapBtn">
        Map
      </Button>
    </div>
  );
};

export default CountryInfo;
