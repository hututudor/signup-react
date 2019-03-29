class Auth {
  name: '';
  email: '';
  password: '';
  auth: false;

  register = (name, email, password) => {
    this.auth = true;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  login = (email, password) => {
    if (this.email === email && 
            this.password === password) {
      this.auth = true;
      this.email = email;
      this.password = password;
      return true;
    } else {
      return false;
    }
  }

  logout = () => {
    this.auth = false;
  }

  isAuth = () => {
    return this.auth;
  }
}

export default new Auth();
