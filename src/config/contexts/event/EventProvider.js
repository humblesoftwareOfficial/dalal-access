import React, { Component } from "react";

import EventContext from "./Event";

export default class EventProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEvent: null,
    };
  }

  render() {
    return (
      <EventContext.Provider
        value={{
          newEvent: this.state.newEvent,
          setNewEvent: (newEvent) => {
            this.setState({
              newEvent,
            });
          },
        }}
      >
        {this.props.children}
      </EventContext.Provider>
    );
  }
}
