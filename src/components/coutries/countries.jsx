import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";
import { FetchCountries } from "./../../api/api";
import styles from "./countries.module.css";

const Countries = ({ onChange }) => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const getCountries = async () => {
      setCountries(await FetchCountries());
    };
    getCountries();
  }, []);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect onChange={(e) => onChange(e.target.value)}>
        <option value="Global">Global</option>
        {countries.map((country) => (
          <option value={`${country}`} key={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default Countries;
