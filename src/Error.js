import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <h2>
      Sorry, the page you are looking for does not exist. Click{" "}
      <Link to="/">here</Link> to go back
    </h2>
  );
};

export default Error;
