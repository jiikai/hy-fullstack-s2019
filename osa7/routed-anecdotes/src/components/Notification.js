import React from 'react';
//import {connect} from 'react-redux';

const Notification = ({notification}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };
  return (
    <div style={{...style, display: notification.length ? '' : 'none'}}>
      {notification}
    </div>
  );
};

/*const mapStateToProps = (state) => ({
  notification: state.notification
});

export default connect(mapStateToProps, null)(Notification);*/
export default Notification;