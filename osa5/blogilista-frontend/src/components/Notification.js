import React from 'react';

const Notification = ({msgObj}) =>
  !msgObj | !msgObj.msg ? null : (
    <div className={msgObj.msgClass}>
      {msgObj.msg}
    </div>
  );

export default Notification;