import React, { Component } from "react";
import { Cards, Chart, Countries } from "./components/index";
import styles from "./app.module.css";
import { Fetchdata } from "./api/api";
import { imageUrl } from "./components/index";
import { CubeGrid } from "styled-loaders-react";
import { blue } from "@material-ui/core/colors";
import DotScale from "styled-loaders-react/lib/components/DotScale";
class App extends Component {
  state = {
    data: {},
    country: "",
    loading: false,
  };
  async componentDidMount() {
    const data = await Fetchdata();
    this.setState({ data });
  }
  handleCountryChange = async (country) => {
    this.setState({ loading: true });
    const data = await Fetchdata(country);
    setTimeout(() => {
      this.setState({ loading: false });
    }, 50);
    this.setState({ data, country });
  };

  render() {
    const { data, country, loading } = this.state;
    return loading ? (
      <DotScale color="blue" className={styles.loader} />
    ) : (
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
