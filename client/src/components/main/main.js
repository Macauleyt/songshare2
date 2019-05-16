import React, { useEffect, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";

import PropTypes from "prop-types";
import LoadGif from "../layout/LoadGif";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";

const Main = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
    console.log("hello");
  }, []);
  //If profile is null or still loading
  return loading && profile === null ? (
    <LoadGif />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Profile</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Welcome Back {user && user.name}!
      </p>
      {profile !== null ? (
        <Fragment> has </Fragment>
      ) : (
        <Fragment>
          <p>You have not set up a profile yet.</p>
          <Link to="/create-profile" className="tn btn-primary my-1">
            Create a profile here!
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};
Main.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Main);
