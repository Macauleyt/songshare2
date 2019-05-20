import axios from "axios";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";

import { setAlert } from "../../actions/alert";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import React, { Fragment, useState } from "react";
//Destructuring prop type setAlert
const Register = ({ setAlert, isAuthenticated, register }) => {
  //Setting state and passing values as empty to begin with for register form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });
  //Desturcturing state into form data
  const { name, email, password, password2 } = formData;
  //Allows user to update field
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    //check for passwords matching
    if (password !== password2) {
      //Pass message to action
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
      // const newUser = {
      //   name,
      //   email,
      //   password
      // };

      // try {
      //   const config = {
      //     headers: {
      //       "Content-Type": "application/json"
      //     }
      //   };
      //   //Creating body from register inputs newUser
      //   const body = JSON.stringify(newUser);

      //   const res = await axios.post("/api/users", body, config);
      //   console.log(res.data);
      // } catch (err) {
      //   console.error(err.response.data);
      // }
    }
  };
  //Redirect to main page once registered
  if (isAuthenticated) {
    return <Redirect to="/main" />;
  }
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

//Pass action into connect
export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
