import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import LoadGif from "../layout/LoadGif";
import PropTypes from "prop-types";
import ProfileAbout from "./ProfileAbout";

import ProfileTop from "./ProfileTop";
import { profileById } from "../../actions/profile";

const Profile = ({
  profileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    profileById(match.params.id);
  }, [profileById]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <LoadGif />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>

          <div class="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  profileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { profileById }
)(Profile);
