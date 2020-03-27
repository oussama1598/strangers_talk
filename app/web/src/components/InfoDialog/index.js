import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = () => ({
  note: {
    marginTop: 20
  }
});

class InfoDialog extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      gender: "Male"
    };
  }

  onFormControlChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.open}
        onClose={() => this.props.onClose(0)}
        aria-labelledby="info-dialog"
      >
        <DialogTitle id="info-dialog">User Info</DialogTitle>
        <DialogContent>
          <Grid container direction="column" alignItems="stretch">
            <Grid item>
              <FormControl fullWidth>
                <TextField
                  autoFocus
                  name="name"
                  type="text"
                  margin="dense"
                  color="secondary"
                  label="Name"
                  onChange={this.onFormControlChange}
                  value={this.state.name}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel id="gender-select">Gender</InputLabel>
                <Select
                  id="gender-select"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.onFormControlChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <DialogContentText className={classes.note}>
            Note: Leaving the name empty will set it to 'stranger' by default.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.props.onClose(0)} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => this.props.onClose(1, this.state)}
            color="secondary"
          >
            Enter
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(InfoDialog);
