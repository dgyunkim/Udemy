import React, { useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alert } = alertContext;
  return (
    alert !== null && (
      <div className={`alert alert-${alert.color}`}>
        {" "}
        <i className="fas fa-info-circle"></i> {alert.message}
      </div>
    )
  );
};

export default Alert;
