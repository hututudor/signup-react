import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    lastName: '',
    firstName: '',

    emailError: false,
    passwordError: false,
    firstNameError: false,
    lastNameError: false
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

    if (!this.state.firstName) {
      this.setError('lastName', true);
    } else {
      this.setError('lastName', false);
    }

    if (!this.state.lastName) {
      this.setError('firstName', true);
    } else {
      this.setError('firstName', false);
    }

    axios.post('/api/register', {
      name: this.state.firstName + ' ' + this.state.lastName,
      email: this.state.email,
      password: this.state.password
    }).then(() => {
      this.props.history.push('login');
    })
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Register</h1>
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
          <label>First Name</label>
          <input
            name="firstName"
            onChange={this.handleChange}
            value={this.state.firstName}
          />
          {this.state.firstNameError && (
            <span>The first name must not be empty</span>
          )}
        </div>
        <div className="group">
          <label>Last Name</label>
          <input
            name="lastName"
            onChange={this.handleChange}
            value={this.state.lastName}
          />
          {this.state.lastNameError && (
            <span>The last name must not be empty</span>
          )}
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
          <Link to="/login">Already have an account? Login</Link>
          <button>Register</button>
        </div>
      </form>
    );
  }
}

export default Login;
