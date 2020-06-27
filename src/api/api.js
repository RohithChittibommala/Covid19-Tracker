import axios from "axios";
let url = "https://cors-anywhere.herokuapp.com/https://covid19.mathdro.id/api/";

export const Fetchdata = async (country) => {
  const changedUrl =
    country && country !== "Global" ? `${url}/countries/${country}` : url;

  const validUrl = changedUrl !== url ? changedUrl : url;
  console.log(validUrl);
  try {
    const {
      data: { confirmed, deaths, recovered, lastUpdate },
    } = await axios.get(`${validUrl}`);
    console.log(confirmed);
    return {
      confirmed,
      deaths,
      recovered,
      lastUpdate,
    };
  } catch (error) {}
};
export const FetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}daily`);
    const modifiedData = data.map((dailydata) => ({
      confirmed: dailydata.confirmed.total,
      deaths: dailydata.deaths.total,
      date: dailydata.reportDate,
    }));
    return modifiedData;
  } catch (error) {}
};

export const FetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}countries`);

    return countries.map((country) => country.name);
  } catch (error) {}
};
FetchCountries();
