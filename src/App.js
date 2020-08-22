import React from "react";

// For importing multiple components at once
import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api"; // it will search for index.js automatically
import covid from "./images/image.png"

// class-based component, the root componet for this app
class App extends React.Component {
  // Speical object in React, basically it includes any data this component needs
  // state is local
  // prop (property) is read only, store the input to this component
  state = {
    // data is a property.
    data: {},
    country: "",
  };

  // define a method in this class
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    this.setState({ data: fetchedData, country: country });
    //console.log(fetchedData);
    // fetch country data
    // set the state
  }

  render() {
    const { data, country } = this.state;

    return (
      // jsx: what's the UI gonna look like. this.state, here "this" means the current object
      <div className={styles.container}>
        <img className={styles.image} src={covid} alt="COVID-19"/>
        <Cards data={data}/> 
        <CountryPicker handleCountryChange={this.handleCountryChange}/> 
        <Chart data={data} country={country}/>
      </div>
    );
  }
}

export default App;
