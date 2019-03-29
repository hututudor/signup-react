import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import axios from 'axios';

class App extends Component {
  state = {
    auth: false,
    email: '',
    name: '',
    token: '',
    loading: true,
  };

  componentDidMount() {
    let token = localStorage.getItem('token');
    if (!token) {
      this.setState({
        loading: false,
      });
    }

    axios
      .get('/api/user', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then(res => {
        this.setState({
          auth: true,
          email: res.data.user.email,
          name: res.data.user.name,
          token,
          loading: false,
        });
      })
      .catch(res => {

        this.setState({
          loading: false,
        });
      });
  }

  login = (email, name, token) => {
    this.setState({
      auth: true,
      email,
      name,
      token,
    });

    localStorage.setItem('token', token);
  };

  logout = () => {
    this.setState({
      auth: false,
    });

    localStorage.removeItem('token');
  };

  render() {
    return (
      !this.state.loading && (
        <BrowserRouter>
          <Switch>
            <ProtectedRoute
              isAuth={this.state.auth}
              exact
              path="/"
              auth={this.state}
              logout={this.logout}
              component={Home}
            />
            <Route
              exact
              path="/login"
              render={() => <Login auth={this.state} login={this.login} />}
            />
            <Route exact path="/register" component={Register} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      )
    );
  }
}

export default App;
