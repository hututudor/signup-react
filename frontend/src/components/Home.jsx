import React from 'react';

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <div className="details">
          <h1>Name</h1>
          <p>{this.props.auth.name} </p>
          <h1>Email</h1>
          <p>{this.props.auth.email}</p>
          <button onClick={this.props.logout}>Logout</button>
        </div>
      </div>
    );
  }
}

export default Home;
