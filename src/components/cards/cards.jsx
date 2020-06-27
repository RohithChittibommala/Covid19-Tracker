import React from "react";
import { description } from "./../index.js";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import cx from "classnames";
import CountUp from "react-countup";
import styles from "./Cards.module.css";
const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  const renderCard = (label, { value }, lastUpdate, description) => {
    return (
      <Grid
        item
        component={Card}
        xs={12}
        md={3}
        className={cx(styles.card, styles[label])}
      >
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {label}
          </Typography>
          <Typography variant="h5">
            <CountUp start={0} end={value} duration={2.5} separator="," />
          </Typography>
          <Typography color="textSecondary">{lastUpdate}</Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </Grid>
    );
  };
  if (!confirmed) return "Loading";
  return (
    <div className={styles.container}>
      <Grid container spacing={4} justify="center">
        {renderCard(
          "infected",
          confirmed,
          new Date(lastUpdate).toDateString(),
          description.infected
        )}
        {renderCard(
          "recovered",
          recovered,
          new Date(lastUpdate).toDateString(),
          description.recovered
        )}
        {renderCard(
          "deaths",
          deaths,
          new Date(lastUpdate).toDateString(),
          description.death
        )}
      </Grid>
      ;
    </div>
  );
};

export default Cards;
