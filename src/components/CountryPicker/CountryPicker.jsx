import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core"

import styles from "./CountryPicker.module.css";

import { fetchCountries } from "../../api";

// here props can be changed as: { hancleCountryChange }
const CountryPicker = (props) => {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  // callback
  useEffect(() => {
    const fetchAPI = async () => {
      setFetchedCountries(await fetchCountries());
    }
    // without the second parameter [setFetchedCountries], it will run endlessly
    // with this parameter here, 
    // this fetchCountries() func run only when setFetchedCountries changed
    fetchAPI();
  }, [setFetchedCountries]);

  // console.log(fetchedCountries);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect 
        defaultValue="" 
        onChange={(selected) => props.handleCountryChange(selected.target.value)}>
        <option value="">Global</option>
        {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
      </NativeSelect>
    </FormControl>
  )
}

export default CountryPicker;
