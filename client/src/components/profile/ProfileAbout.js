import React from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    bio,
    artists,
    user: { name }
  }
}) => (
  <div className="profile-about bg-light p-2">
    <h2 className="text-primary">
      {name.trim().split(" ")[0]}s Favourite Artists
    </h2>
    <div className="skills">
      {artists.map((artist, index) => (
        <div key={index} className="p-1">
          <i className="fas fa-volume-up" /> {artist}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
