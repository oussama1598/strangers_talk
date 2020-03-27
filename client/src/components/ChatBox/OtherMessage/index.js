import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Avatar
} from "@material-ui/core";

const styles = theme => ({
  avatar: {
    marginRight: 10
  },
  time: {
    marginTop: 5
  },
  card: {
    backgroundColor: theme.palette.secondary[500]
  }
});

class OtherMessage extends Component {
  render() {
    const { classes, message, name } = this.props;

    return (
      <Grid container direction="row" alignItems="center" justify="flex-start">
        <Grid item className={classes.avatar}>
          <Avatar></Avatar>
        </Grid>
        <Grid item>
          <Grid container direction="column">
            <Grid item>
              <Card cols={3} raised>
                <CardActionArea>
                  <CardContent className={classes.card}>
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
              >
                {name} - 02:34
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(OtherMessage);
