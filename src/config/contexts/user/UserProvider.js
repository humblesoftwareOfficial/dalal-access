import React, { Component } from "react";

import UserContext from "./User";

export default class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      account: null,
      canConnectWithAccessCode: false,
      isAuthenticated: false,
      letEnter: false,
      eventAccess: [],
    };
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          setUser: (user) => {
            this.setState({
              user,
            });
          },
          account: this.state.account,
          setAccount: (account) => {
            this.setState({
              account,
            });
          },

          canConnectWithAccessCode: this.state.canConnectWithAccessCode,
          setCanConnectWithAccessCode: (canConnectWithAccessCode) => {
            this.setState({
              canConnectWithAccessCode,
            });
          },

          isAuthenticated: this.state.isAuthenticated,
          setIsAuthenticated: (isAuthenticated) => {
            this.setState({
              isAuthenticated,
            });
          },

          letEnter: this.state.letEnter,
          setLetEnter: (letEnter) => {
            this.setState({
              letEnter,
            });
          },

          eventAccess: this.state.eventAccess,
          setEventAccess: (eventAccess) => {
            this.setState({
              eventAccess,
            });
          },
          
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
