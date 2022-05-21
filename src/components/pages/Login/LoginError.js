import React from "react";

import "./LoginError.scss";

const LoginError = (props) => {
  return (
    <div className="login-error">
      <p>{props.message}</p>
    </div>
  );
};

export default LoginError;
