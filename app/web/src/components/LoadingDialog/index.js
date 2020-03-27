import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  CircularProgress,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  loadingSpinner: {
    margin: 10,
    marginRight: 20
  },
  loadingLabel: {
    paddingRight: 20
  }
});

class LoadingDialog extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Dialog open={this.props.open} aria-labelledby="loading-dialog">
        <DialogTitle id="loading-dialog">Please Wait</DialogTitle>
        <DialogContent>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              <CircularProgress
                color="secondary"
                className={classes.loadingSpinner}
              />
            </Grid>
            <Grid item>
              <Typography className={classes.loadingLabel}>
                Loading ...
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(LoadingDialog);
