import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import cx from "classnames";
import styles from "./Cards.module.css";
import CountUp from "react-countup"


/*
In App.js we only prop once, which is data={this.state.data}, so we need to
destructure data at first.
*/

// Cards: Stateless Functional Componet, without other methods other than render
// This type of component don't support "this" statement, we need to use "props" as argument
// Object destructure
const Cards = ({ data: { confirmed, recovered, deaths, lastUpdate } }) => {
  if(!confirmed) {
    return "Loading...";
  }
  // console.log(props);
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">

        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Infected</Typography>
            <Typography variant="h6">
              <CountUp 
              start={0}
              end={confirmed.value}
              duration={2.5}
              separator=","
              />
              </Typography>
            <Typography color="textSecondary">{new Date(lastUpdate).toLocaleDateString()}</Typography>
            <Typography variant="body2">Total positive cases </Typography>
          </CardContent>
        </Grid>

        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Recovered</Typography>
            <Typography variant="h6">
              <CountUp start={0} end={recovered.value} duration={2.5} separator="," />
              </Typography>
            <Typography color="textSecondary">{new Date(lastUpdate).toLocaleDateString()}</Typography>
            <Typography variant="body2">Total recoveries </Typography>
          </CardContent>
        </Grid>

        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Death</Typography>
            <Typography variant="h6">
            <CountUp start={0} end={deaths.value} duration={2.5} separator="," />
            </Typography>
            <Typography color="textSecondary">{new Date(lastUpdate).toLocaleDateString()}</Typography>
            <Typography variant="body2">Total deaths</Typography>
          </CardContent>
        </Grid>

      </Grid>
    </div>
  )
}

export default Cards;
