import React from "react";

const Notification = ({ message, type }) => !message ? null : (
    <div className={type}>
      {message}
    </div>
);

export default Notification;