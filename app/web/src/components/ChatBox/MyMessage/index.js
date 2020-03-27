import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography
} from "@material-ui/core";

const styles = () => ({
  avatar: {
    marginRight: 10
  },
  time: {
    marginTop: 5
  }
});

class MyMessage extends Component {
  render() {
    const { classes, message } = this.props;

    return (
      <Grid container direction="row" alignItems="center" justify="flex-end">
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Card cols={3} raised>
                <CardActionArea>
                  <CardContent>
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      component="p"
                    >
                      {message}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item>
              <Typography
                className={classes.time}
                variant="body2"
                color="textSecondary"
                component="p"
                align="right"
              >
                02:34
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(MyMessage);
