import React, { Component } from "react";
import { Cards, Chart, Countries } from "./components/index";
import styles from "./app.module.css";
import { Fetchdata } from "./api/api";
import { imageUrl } from "./components/index";
class App extends Component {
  state = {
    data: {},
    country: "",
  };
  async componentDidMount() {
    const data = await Fetchdata();
    this.setState({ data });
  }
  handleCountryChange = async (country) => {
    const data = await Fetchdata(country);
    this.setState({ data, country });
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img src={imageUrl} alt="Covid19" />
        <Cards data={data} />
        <Countries onChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
