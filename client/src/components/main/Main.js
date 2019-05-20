import React, { useEffect, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import MainActions from "./MainActions";
import PropTypes from "prop-types";
import LoadGif from "../layout/LoadGif";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

const Main = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
    console.log("hello");
  }, [getCurrentProfile]);
  //If profile is null or still loading
  return loading && profile === null ? (
    <LoadGif />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Account</h1>
      <p className="lead">Welcome back {user && user.name}!</p>
      {profile !== null ? (
        <Fragment>
          <MainActions />
          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" />
              Delete Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not set up a profile yet.</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create a profile here!
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};
Main.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { deleteAccount, getCurrentProfile }
)(Main);

//Fix
