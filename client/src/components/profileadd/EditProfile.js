import React, { Fragment, useEffect, useState } from "react";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    location: "",

    artists: "",
    bio: "",
    twitter: "",
    facebook: "",
    youtube: "",
    instagram: ""
  });

  useEffect(() => {
    getCurrentProfile();
    setFormData({
      location: loading || !profile.location ? "" : profile.location,

      artists: loading || !profile.artists ? "" : profile.artists.join(","),

      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      spotify: loading || !profile.social ? "" : profile.social.linkedin,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram
    });
  }, [loading]);

  const {
    location,
    artists,
    bio,
    twitter,
    facebook,
    youtube,
    instagram,
    spotify
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user" /> Let's start by fleshing out your profile!
      </p>

      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Where are you from?</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Favourite Artists?"
            name="artists"
            value={artists}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. ACDC, Rolling Stones, The
            Beatles)
          </small>
        </div>

        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Tell us a little about yourself!</small>
        </div>

        <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x" />
          <input
            type="text"
            placeholder="Twitter URL"
            name="twitter"
            value={twitter}
            onChange={e => onChange(e)}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x" />
          <input
            type="text"
            placeholder="Facebook URL"
            name="facebook"
            value={facebook}
            onChange={e => onChange(e)}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x" />
          <input
            type="text"
            placeholder="YouTube URL"
            name="youtube"
            value={youtube}
            onChange={e => onChange(e)}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x" />
          <input
            type="text"
            placeholder="Spotify URL"
            name="spotify"
            value={spotify}
            onChange={e => onChange(e)}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x" />
          <input
            type="text"
            placeholder="Instagram URL"
            name="instagram"
            value={instagram}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/main">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
