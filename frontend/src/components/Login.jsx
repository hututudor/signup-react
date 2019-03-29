import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import {withRouter} from 'react-router-dom';

class Login extends React.Component {
  state = {
    email: '',
    password: '',

    emailError: false,
    passwordError: false,
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  setError = (name, val) => {
    this.setState({[name + 'Error']: val});
  };

  handleSubmit = e => {
    e.preventDefault();

    if (!this.state.email) {
      this.setError('email', true);
    } else {
      this.setError('email', false);
    }

    if (!this.state.password) {
      this.setError('password', true);
    } else {
      this.setError('password', false);
    }

    axios.post('/api/login', {
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      this.props.login(res.data.user.email,
                       res.data.user.name,
                       res.data.token);
      this.props.history.push('/');
    })

  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Login</h1>
        <div className="group">
          <label>Email</label>
          <input
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          {this.state.emailError && <span>The email must not be empty</span>}
        </div>
        <div className="group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          {this.state.passwordError && <span>The email must not be empty</span>}
        </div>
        <div className="actions">
          <Link to="/register">Not having an account? Register</Link>
          <button>Login</button>
        </div>
      </form>
    );
  }
}

export default withRouter(Login);
