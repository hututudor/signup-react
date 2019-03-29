import React from 'react';
import {Route, Redirect} from 'react-router-dom';

class ProtectedRoute extends React.Component {
  renderAuthRoute = () => {
    const {component: Component} = this.props;

    if(this.props.isAuth) {
      return <Component {...this.props} />
    } else {
      return <Redirect to="/login" />
    }
  }
  
  render() {
    const {component: Component, ...rest} = this.props;
    return <Route {...rest} render={this.renderAuthRoute} />
  }
}

export default ProtectedRoute;
