import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Paper from "@material-ui/core/Paper";

import { withStyles } from "@material-ui/core/styles";

const useStyles = (theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class App extends Component {
  state = {
    filledForm: false,
    messages: [],
    value: "",
    name: "",
    room: "test",
  };

  client = new W3CWebSocket("ws://127.0.0.1:8000/ws/" + this.state.room + "/");

  onButtonClicked = (e) => {
    this.client.send(
      JSON.stringify({
        type: "message",
        text: this.state.value,
        sender: this.state.name,
      })
    );
    this.state.value = "";
    e.preventDefault();
  };

  componentDidMount() {
    this.client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    this.client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer) {
        this.setState((state) => ({
          messages: [
            ...state.messages,
            {
              msg: dataFromServer.text,
              name: dataFromServer.sender,
            },
          ],
        }));
      }
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        {this.state.filledForm ? (
          <div style={{ marginTop: 50 }}>
            Room Name: {this.state.room}
            <Paper
              style={{height: 500, maxHeight: 500, overflow: "auto", boxShadow: "none", }}
            >
              {this.state.messages.map((message) => (
                <>
                  <Card className={classes.root}>
                    <CardHeader title={message.name} subheader={message.msg} />
                  </Card>
                </>
              ))}
            </Paper>
            <form
              className={classes.form}
              noValidate
              onSubmit={this.onButtonClicked}
            >
              <TextField id="outlined-helperText" label="Write text" defaultValue="Default Value"
                variant="outlined"
                value={this.state.value}
                fullWidth
                onChange={(e) => {
                  this.setState({ value: e.target.value });
                  this.value = this.state.value;
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Send Message
              </Button>
            </form>
          </div>
        ) : (
          <div>
            <CssBaseline />
            <div className={classes.paper}>
              <form
                className={classes.form}
                noValidate
                onSubmit={(value) => this.setState({ filledForm: true })}
              >
                <TextField variant="outlined" margin="normal" required fullWidth label="Room name"
                  name="Room name"
                  autoFocus
                  value={this.state.room}
                  onChange={(e) => {
                    this.setState({ room: e.target.value });
                    this.value = this.state.room;
                  }}
                />
                <TextField variant="outlined" margin="normal" required fullWidth name="sender" label="sender"
                  type="sender"
                  id="sender"
                  value={this.state.name}
                  onChange={(e) => {
                    this.setState({ name: e.target.value });
                    this.value = this.state.name;
                  }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        )}
      </Container>
    );
  }
}
export default withStyles(useStyles)(App);
