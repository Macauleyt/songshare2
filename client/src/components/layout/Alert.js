import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Alert = ({ alerts }) =>
  //Error checking to see if alert is present
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    //check for alert  message and alert type div for use with css styling
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

//Mapping redux state to prop for access
const mapStateToProps = state => ({
  alerts: state.alert
});
export default connect(mapStateToProps)(Alert);
